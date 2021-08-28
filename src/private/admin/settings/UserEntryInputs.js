import React, { useEffect, useRef, useState } from 'react';
import { Profile } from '../../../apps/other/Profile';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { InputSelect } from '../../../components/widgets/InputSelect';
import { ROLES } from '../../../contents/lists';
import { updateUser } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { adminRoutes } from '../../../utils/routes/Routes';


const roleDefault = "Select Role";
export const UserEntryInputs = ({useUpdate, profileMsg, border, profileFName, profileLName, profileStyle, roleDisabled, userSelected, onUpdateComplete}) =>{
    const { checkObject, processPayload, setPayload } = useError();
    const { user, adminCreateUser } = useAuth();
    const { setLoader } = useStore();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [fNameError, setFNameError] = useState("");
    const [lNameError, setLNameError] = useState("");
    const [passError, setPassError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [userImg, setUserImg] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

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
            role: roleRef.current.value,
            image: userImg || ""
        };
        setMsgSuccess("");
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
                        role: userObj.role,
                        image: userObj.image
                    }, userSelected?.id);
                    onUpdateComplete?.();
                }else response = {error:"No user selected."};
            }else response = await adminCreateUser(userObj);
            
            if (response?.error){
                setPayload(response?.error);
                processPayload();
            }
            else{
                reset();
                setMsgSuccess("User added successfully");
            }
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
        <div className="add-update-new-user-info">
            <Profile
                cssClass="admin-profile-hover"
                style={{
                    marginBottom:"60px",
                    ...profileStyle,
                    boxShadow:"none",
                    borderBottom:"1px solid skyblue",
                    borderColor:border?"rgb(0,0,0,0)":"transparent"
                }}
                firstName={profileFName || userSelected?.firstName}
                lastName={profileLName || userSelected?.lastName}
                msg={profileMsg || userSelected?.role}
                img={userSelected?.image}
                onImgSelected={setUserImg}
                useUpdateImage
                //onClick
            />
            <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                <InputEntry labelFixed inputRef={emailRef} label="Email" maxWidth error={emailError} errorReset={setEmailError} disabled={useUpdate} />
            </div>
            <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                <InputEntry labelFixed inputRef={fNameRef} label="First Name" maxWidth titleCase error={fNameError} errorReset={setFNameError} />
            </div>
            <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                <InputEntry labelFixed inputRef={lNameRef} label="Last Name" maxWidth titleCase error={lNameError} errorReset={setLNameError} />
            </div>
            <div hidden={useUpdate} className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                <InputEntry labelFixed inputRef={passRef} label="Password" maxWidth error={passError} errorReset={setPassError} hidden={useUpdate} type="password" />
            </div>
            <div className="h-seperator relative" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                <InputSelect labelFixed inputRef={roleRef} label="Role" disabled={roleDisabled} options={ROLES} defaultOption={roleDefault} error={roleError} errorReset={setRoleError} />
            </div>   

            <div className="flex h-seperator" style={{paddingTop:"10px",paddingBottom:"20px",display:useUpdate && "none",borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                <input style={{margin:"15px"}} type="checkbox" />
                <div style={{margin:"11px"}}>Notify user</div>
            </div>  
            <div style={{paddingTop:"40px"}}>
                <button onClick={onAddUser} disabled={loading} className="btn btn-hover">{useUpdate? "UPDATE": "ADD USER"}</button>
                <label className="centered" style={{marginLeft:"10%",color:"lightgreen"}}>{msgSuccess}</label>
            </div>
        </div>
    )
}