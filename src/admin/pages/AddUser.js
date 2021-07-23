import React, { useRef, useState } from 'react';
import { useAuth } from '../../auth/Authentication';
import { AdminPageWrapper } from '../../container/AdminPageWrapper';


const roleDefault = "No Role";
export const AddUser = ({isOpen}) =>{
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

    const onAddUser = async () =>{
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
        <AdminPageWrapper isOpen={isOpen} noScroll>
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Email</div>
                </div>
                <div className="admin-user-input">
                    <input ref={emailRef} className="input" placeholder="Email" />
                </div>
            </div> 
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">First Name</div>
                </div>
                <div className="admin-user-input">
                    <input ref={fNameRef} className="input" placeholder="First Name" />
                </div>
            </div> 
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Last Name</div>
                </div>
                <div className="admin-user-input">
                    <input ref={lNameRef} className="input" placeholder="Last Name" />
                </div> 
            </div>  
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Password</div>
                </div>
                <div className="admin-user-input">
                    <input ref={passRef} className="input" placeholder="Password" />
                </div>                
            </div>  
            <div className="flex h-seperator">
                <div className="admin-user-name">
                    <div className="float-center">Role</div>
                </div>
                <div className="admin-user-input">
                    <select ref={roleRef} className="input">
                        <option hidden defaultChecked>{roleDefault}</option>
                        <option>Administrator</option>
                        <option>Employee</option>
                        <option>Constractor</option>
                        <option>Intern</option>
                        <option>Other</option>
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
                <button onClick={onAddUser} disabled={loading} className="btn">Add user</button>
            </div>          
        </AdminPageWrapper>
    )
}