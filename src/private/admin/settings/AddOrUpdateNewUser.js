import React, { useEffect, useRef, useState } from 'react';
import { ROLES } from '../../../contents/lists';
import { updateUser } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { useStore } from '../../../state/stateManagement/stateManagement';


const roleDefault = "No Role";
export const AddOrUpdateNewUser = ({useUpdate, roleDisabled, userSelected, onUpdateComplete}) =>{
    const { checkObject, processPayload, setPayload } = useError();
    const { adminCreateUser } = useAuth();
    const { setLoader } = useStore();

    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const passRef = useRef();
    const roleRef = useRef();

    const reset = () =>{
        emailRef.current.value = "";
        fNameRef.current.value = "";
        lNameRef.current.value = "";
        passRef.current.value = "";
        roleRef.current.value = roleDefault;
    }

    const onAddUser = async () =>{
        const userObj = {
            email: emailRef.current.value,
            firstName: fNameRef.current.value,
            lastName: lNameRef.current.value,
            password: useUpdate? true: passRef.current.value,
            role: roleRef.current.value
        };
        try{
            if (!checkObject(userObj)) return processPayload();
            if (userObj.role === roleDefault){
                setPayload("No role selected");
                return processPayload();
            } 
            setLoader(true);
            setLoading(true);

            let response = null;
            if (useUpdate){
                if (Object.keys(userSelected || {}).length){
                    response = await updateUser({
                        email: userObj.email,
                        firstName: userObj.firstName,
                        lastName: userObj.lastName,
                        role: userObj.role
                    }, userSelected?.id);
                    onUpdateComplete?.();
                }else response = {error:"No user selected."};
            }else response = await adminCreateUser(userObj);
            
            if (response?.error){
                setPayload(response?.error);
                processPayload();
            }
            else reset();
        }catch{

        }finally{
            setLoading(false);
            setLoader(false);
        }
        
    }

    useEffect(()=>{
        if (Object.keys(userSelected || {}).length){
            emailRef.current.value = userSelected?.email || "";
            fNameRef.current.value = userSelected?.firstName || "";
            lNameRef.current.value = userSelected?.lastName || "";
            roleRef.current.value = userSelected?.role || roleDefault;
        }else{
            emailRef.current.value = "";
            fNameRef.current.value = "";
            lNameRef.current.value = "";
            roleRef.current.value = roleDefault;
        }
    }, [userSelected]);
    return (
        <div>
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Email</div>
                </div>
                <div className="admin-user-input">
                    <input disabled={useUpdate} ref={emailRef} className={`input lower-case ${!useUpdate && "input-hover"}`} style={{backgroundColor:useUpdate && "rgb(192, 217, 245)",color:useUpdate && "gray"}} placeholder="Email" type="email" />
                </div>
            </div> 
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">First Name</div>
                </div>
                <div className="admin-user-input">
                    <input ref={fNameRef} className="input input-hover title-case" placeholder="First Name" />
                </div>
            </div> 
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Last Name</div>
                </div>
                <div className="admin-user-input">
                    <input ref={lNameRef} className="input input-hover title-case" placeholder="Last Name" />
                </div> 
            </div>  
            <div className="flex h-seperator" style={{display:useUpdate && "none"}}>
                <div className="admin-user-name">
                    <div className="float-center">Password</div>
                </div>
                <div className="admin-user-input">
                    <input ref={passRef} className="input input-hover" placeholder="Password" type="password" />
                </div>                
            </div>  
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Role</div>
                </div>
                <div className="admin-user-input">
                    <select disabled={roleDisabled} ref={roleRef} style={{backgroundColor:roleDisabled && "rgb(192, 217, 245)",color:roleDisabled && "gray"}} className={`input ${!roleDisabled && "input-hover"}`}>
                        <option hidden defaultChecked>{roleDefault}</option>
                        {ROLES.map((role, key)=>(
                            <option key={key}>{role}</option>
                        ))}
                    </select>
                </div>
            </div>   
            <div className="flex h-seperator" style={{paddingTop:"10px",paddingBottom:"20px",display:useUpdate && "none"}}>
                <div className="admin-user-name">
                    <input type="checkbox" className="float-center" />
                </div> 
                <div className="admin-user-input">Notify user</div>
            </div>  
            <div style={{textAlign:"right",paddingTop:"40px"}}>
                <button onClick={onAddUser} disabled={loading} className="btn btn-hover">{useUpdate? "UPDATE": "Add user"}</button>
            </div>
        </div>
    )
}