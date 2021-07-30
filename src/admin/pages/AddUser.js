import React, { useRef, useState } from 'react';
import { useAuth } from '../../auth/Authentication';
import { AdminNavBar } from '../../container/AdminNavBar';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { ROLES } from '../../contents/lists';


const roleDefault = "No Role";
export const AddUser = () =>{
    const { createUser } = useAuth();

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

    const isFeildsNotValid = () =>{
        let msg = "";
        if (!emailRef.current.value) msg = msg + " a valid email address";
        if (!fNameRef.current.value) msg = msg + " first name";
        if (!lNameRef.current.value) msg = msg + " last name";
        if (!passRef.current.value) msg = msg + " Please password";
        if (roleRef.current.value === roleDefault) msg = msg + " Please select a role";
        if (!msg) return false;
        alert("Plaase add" + msg);
        return true;
    }

    const onAddUser = async () =>{
        if (isFeildsNotValid()) return;
        setLoading(true);
        const response = await createUser({
            email: emailRef.current.value,
            firstName: fNameRef.current.value,
            lastName: lNameRef.current.value,
            password: passRef.current.value,
            role: roleRef.current.value
        });
        if (response?.error) alert(response?.error);
        else reset();
        setLoading(false);
    }
    return (
        <AdminNavBar>
            <ContentsWrapper isOpen={true} noScroll>
                <div className="flex h-seperator">
                    <div className="admin-user-name">
                        <div className="float-center">Email</div>
                    </div>
                    <div className="admin-user-input">
                        <input ref={emailRef} className="input input-hover" placeholder="Email" />
                    </div>
                </div> 
                <div className="flex h-seperator">
                    <div className="admin-user-name">
                        <div className="float-center">First Name</div>
                    </div>
                    <div className="admin-user-input">
                        <input ref={fNameRef} className="input input-hover" placeholder="First Name" />
                    </div>
                </div> 
                <div className="flex h-seperator">
                    <div className="admin-user-name">
                        <div className="float-center">Last Name</div>
                    </div>
                    <div className="admin-user-input">
                        <input ref={lNameRef} className="input input-hover" placeholder="Last Name" />
                    </div> 
                </div>  
                <div className="flex h-seperator">
                    <div className="admin-user-name">
                        <div className="float-center">Password</div>
                    </div>
                    <div className="admin-user-input">
                        <input ref={passRef} className="input input-hover" placeholder="Password" />
                    </div>                
                </div>  
                <div className="flex h-seperator">
                    <div className="admin-user-name">
                        <div className="float-center">Role</div>
                    </div>
                    <div className="admin-user-input">
                        <select ref={roleRef} className="input input-hover">
                            <option hidden defaultChecked>{roleDefault}</option>
                            {ROLES.map((role, key)=>(
                                <option key={key}>{role}</option>
                            ))}
                        </select>
                    </div>
                </div>   
                <div className="flex h-seperator" style={{paddingTop:"10px",paddingBottom:"20px"}}>
                    <div className="admin-user-name">
                        <input type="checkbox" className="float-center" />
                    </div> 
                    <div className="admin-user-input">Notify user</div>
                </div>  
                <div style={{textAlign:"right",paddingTop:"40px"}}>
                    <button onClick={onAddUser} disabled={loading} className="btn btn-hover">Add user</button>
                </div>          
            </ContentsWrapper>
        </AdminNavBar>
    )
}