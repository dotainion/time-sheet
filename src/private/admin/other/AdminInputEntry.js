import React, { useEffect, useRef, useState } from 'react';
import { Profile } from '../../../components/other/Profile';
import { IconCheckbox } from '../../../components/widgets/IconCheckbox';
import { InputCheckbox } from '../../../components/widgets/InputCheckbox';
import { InputEntry } from '../../../components/widgets/InputEntry';
import { InputSelect } from '../../../components/widgets/InputSelect';
import { ROLES } from '../../../contents/lists';
import { addUser, updateUser } from '../../../database/accounts/AccountsDb';
import { useAuth } from '../../../state/auth/Authentication';
import { useError } from '../../../state/errors/Error';
import { useStore } from '../../../state/stateManagement/stateManagement';
import { IconButton } from '../../../components/widgets/IconButon';
import { adminRoutes } from '../../../utils/routes/Routes';


const roleDefault = "Select Role";
export const AdminInputEntry = ({useUpdate, border, profileFName, profileLName, profileStyle, roleDisabled, userSelected, onUpdateComplete}) =>{
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
    const [emailForInfo, setEmailForInfo] = useState("");

    const emailRef = useRef();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const passRef = useRef();
    const roleRef = useRef();
    const notifyRef = useRef();

    const numberRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();
    const bankNameRef = useRef();
    const bankNumberRef = useRef();
    const nisRef = useRef();

    const onClickClear = () =>{
        //trigger click event to reset input
        //only fire if input is empty
        emailRef.current.click();
        fNameRef.current.click();
        lNameRef.current.click();
        passRef.current.click();
        numberRef.current.click();
        cityRef.current.click();
        addressRef.current.click();
        bankNameRef.current.click();
        bankNumberRef.current.click();
        nisRef.current.click();
    }

    const reset = () =>{
        emailRef.current.value = "";
        fNameRef.current.value = "";
        lNameRef.current.value = "";
        passRef.current.value = "";
        numberRef.current.value = "";
        cityRef.current.value = "";
        addressRef.current.value = "";
        bankNameRef.current.value = "";
        bankNumberRef.current.value = ""
        nisRef.current.value = "";
        roleRef.current.value = roleDefault;
        onClickClear();
    }

    const onAddUser = async () =>{
        const userObj = {
            email: emailRef.current.value,
            firstName: fNameRef.current.value,
            lastName: lNameRef.current.value,
            password: passRef.current.value,
            role: roleRef.current.value,
            image: userImg || "",
            notify: notifyRef.current.checked,
            number: numberRef.current.value,
            city: cityRef.current.value,
            address: addressRef.current.value,
            bank: bankNameRef.current.value,
            bankNumber: bankNumberRef.current.value,
            nis: nisRef.current.value,
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
                        image: userObj.image,
                        number: userObj.number,
                        city: userObj.city,
                        address: userObj.address,
                        bank: userObj.bank,
                        bankNumber: userObj.bankNumber,
                        nis: userObj.nis,
                    }, userSelected?.id);
                    onUpdateComplete?.();
                }else response = {error:"No user selected."};
            }else{
                response = await adminCreateUser(userObj);
            }
            
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
            emailRef.current.value = userSelected?.info?.email || "";
            fNameRef.current.value = userSelected?.info?.firstName || "";
            lNameRef.current.value = userSelected?.info?.lastName || "";
            numberRef.current.value = userSelected?.info?.number || "";
            cityRef.current.value = userSelected?.info?.city || "";
            addressRef.current.value = userSelected?.info?.address || "";
            bankNameRef.current.value = userSelected?.info?.bank || "";
            bankNumberRef.current.value = userSelected?.info?.bankNumber || "";
            nisRef.current.value = userSelected?.info?.nis || "";
            roleRef.current.value = userSelected?.info?.role || roleDefault;
            onClickClear();
        }else{
            reset();
        }
    }, [userSelected]);
    return (
        <div onKeyUp={()=>setMsgSuccess("")} className="add-update-new-user-info">
            <div className="add-update-new-user-info-btn">
                <IconButton onClick={onAddUser} icon="users" cssClass="pad-mini" label={useUpdate? "UPDATE": "ADD USER"} />
            </div>
            <div className="max-width flex d-flex-on-mobile pad">
                <div className="max-width">
                    <Profile 
                        floatLeft
                        useSelectImage
                        info={false}
                        cssClass="add-user-new-image"
                        firstName={profileFName || userSelected?.firstName}
                        lastName={profileLName || userSelected?.lastName}
                        image={userSelected?.image}
                        role={"Optional"}
                        style={{...profileStyle}} 
                        onClick={setUserImg}
                    />
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={emailRef} onChange={setEmailForInfo} label="Email" error={emailError} errorReset={setEmailError} disabled={useUpdate} />
                    </div>
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={fNameRef} label="First Name" titleCase error={fNameError} errorReset={setFNameError} />
                    </div>
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={lNameRef} label="Last Name" titleCase error={lNameError} errorReset={setLNameError} />
                    </div>
                    <div hidden={useUpdate} className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={passRef} label="Password" error={passError} errorReset={setPassError} hidden={useUpdate} type="password" />
                    </div>
                    <div className="h-seperator relative" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputSelect labelFixed inputRef={roleRef} label="Role" disabled={roleDisabled} options={ROLES} defaultOption={roleDefault} error={roleError} errorReset={setRoleError} />
                    </div>   

                    <div className="h-seperator" style={{paddingTop:"10px",paddingBottom:"20px",display:useUpdate && "none",borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputCheckbox inputRef={notifyRef} label="Email verification" />
                        <div style={{marginLeft:"27px",fontSize:"13px",color:"var(--primary-color)"}}>
                            This will send a email to {emailForInfo? "(" + emailForInfo + ")": "a new user account"} in order to verify their E-mail address so they can verify and login to their account.
                        </div>
                    </div>  
                </div>

                <div className="add-update-new-user-info-optional">
                    <div style={{marginTop:"20px",marginBottom:"55px"}}>
                        <b>Optional information</b>
                    </div>
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={numberRef} label="Phone Number" titleCase type="number" />
                    </div>  
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={cityRef} label="City" titleCase />
                    </div> 
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={addressRef} label="Home Address" titleCase />
                    </div>  
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={bankNameRef} label="Name of Bank" titleCase />
                    </div>  
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={bankNumberRef} label="Bank Number" titleCase type="number" />
                    </div>  
                    <div className="h-seperator" style={{borderColor:border?"rgb(0,0,0,0)":"transparent"}}>
                        <InputEntry labelFixed inputRef={nisRef} label="NIS Number" titleCase type="number" />
                    </div>  
                </div>
            </div>
        </div>
    )
}