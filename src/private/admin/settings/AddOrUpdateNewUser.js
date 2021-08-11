import React, { useEffect, useRef, useState } from 'react';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { InputSelect } from '../../../components/widgets/InputSelect';
import { ROLES } from '../../../contents/lists';
import { updateUser } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { adminRoutes } from '../../../utils/routes/Routes';


const roleDefault = "Select Role";
export const AddOrUpdateNewUser = ({useUpdate, roleDisabled, userSelected, onUpdateComplete}) =>{
    const { checkObject, processPayload, setPayload } = useError();
    const { adminCreateUser } = useAuth();
    const { setLoader } = useStore();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [fNameError, setFNameError] = useState("");
    const [lNameError, setLNameError] = useState("");
    const [passError, setPassError] = useState("");
    const [roleError, setRoleError] = useState("");

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
            password: passRef.current.value,
            role: roleRef.current.value
        };
        try{
            let STATE = true;
            if (!userObj.email){
                STATE = false;
                setEmailError("Invalid email address");
            }
            if (!userObj.firstName){
                STATE = false;
                setFNameError("A valid name is required");
            }
            if (!userObj.lastName){
                STATE = false;
                setLNameError("A valid name is required");
            }
            if (!userObj.password && !useUpdate){
                STATE = false;
                setPassError("A valid password is required");
            }
            if (userObj.role === roleDefault){
                STATE = false;
                setRoleError("Please provide a role");
            } 

            if (!STATE) return;

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
            <div className="h-seperator">
                <InputEntry inputRef={emailRef} label="Email" error={emailError} errorReset={setEmailError} disabled={useUpdate} />
            </div>
            <div className="h-seperator">
                <InputEntry inputRef={fNameRef} label="First Name" error={fNameError} errorReset={setFNameError} />
            </div>
            <div className="h-seperator">
                <InputEntry inputRef={lNameRef} label="Last Name" error={lNameError} errorReset={setLNameError} />
            </div>
            <div hidden={useUpdate} className="h-seperator">
                <InputEntry inputRef={passRef} label="Password" error={passError} errorReset={setPassError} hidden={useUpdate} />
            </div>
            <div className="h-seperator relative">
                <InputSelect inputRef={roleRef} label="Role" disabled={roleDisabled} options={ROLES} defaultOption={roleDefault} error={roleError} errorReset={setRoleError} />
            </div>   

            <div className="flex h-seperator" style={{paddingTop:"10px",paddingBottom:"20px",display:useUpdate && "none"}}>
                <input style={{margin:"15px"}} type="checkbox" />
                <div style={{margin:"11px"}}>Notify user</div>
            </div>  
            <div style={{paddingTop:"40px"}}>
                <button onClick={onAddUser} disabled={loading} className="btn btn-hover">{useUpdate? "UPDATE": "ADD USER"}</button>
            </div>
        </div>
    )
}