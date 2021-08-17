import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/AuthConfig';
import { ADMINISTRATOR, ADMIN_SUPERVISER, SUPERVISOR } from '../../contents/AuthValue';
import { addUser, getUser, getUsers, updateUser } from '../../database/accounts/AccountsDb';
import { addCreds, getCreds } from '../../database/credentials/CredentialsDb';
import { routes } from '../../utils/routes/Routes';
import { secure } from '../../security/Security';
import { tools } from '../../utils/tools/Tools';
import { addSettings, getSettings } from '../../database/settings/Settings';



const AuthContextProvider = createContext();
export const useAuth = () => useContext(AuthContextProvider);

const defaultSettings = {
    workDuration: 4
}
export const AuthContext = ({children}) =>{
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState();

    const passwordRef = useRef();
    const creatingUser = useRef();

    const signIn = async(email, password) =>{
        try{
            const response = await auth.signInWithEmailAndPassword(email, password);
            passwordRef.current = password;
            return response;
        }catch(error){
            return {error:error.message};
        }
    }

    const changePassword = async(password) =>{
        try{
            return await auth.currentUser.updatePassword(password);
        }catch(error){
            return {error:error.message};
        }
    }

    const resetPasswordViaEmail = async(email) =>{
        try{
            return await auth.sendPasswordResetEmail(email);
        }catch(error){
            return {error:error.message};
        }
    }

    const changeEmail = async(email) =>{
        try{
            return await auth.currentUser.updateEmail(email);
        }catch(error){
            return {error:error.message};
        }
    }

    const changeUserEmail = async(uUser) =>{
        if (!ADMIN_SUPERVISER.includes(user?.role)){
            return {error: "You dont have access to create this user"};
        }
        const {email, password} = tools.store.getAuthAccess();
        if (!email && !password) return {error:"Something went wrong, user was not created"}
        try{
            creatingUser.current = true;
            const uCreds = await getCreds(uUser?.id);
            const response = await signIn(uUser?.email, secure.decrypt(uCreds?.password));
            response?.currentUser?.updateEmail?.(uUser?.email);
            await updateUser({email:uUser?.email}, uUser?.id);
            await signIn(email, secure.decrypt(password));
            return response;
        }catch(error){
            return {error: error.message};
        }
    }

    const signOut = async() =>{
        creatingUser.current = null;
        passwordRef.current = null;
        tools.store.clearAuthAccess();
        await auth.signOut();
        history.push(routes.signIn);
    }

    //create user by administrator or supervisor
    const adminCreateUser = async(nUser) =>{
        if (!ADMIN_SUPERVISER.includes(user?.role)){
            return {error: "You dont have access to create this user"};
        }
        const {email, password} = tools.store.getAuthAccess();
        if (!email && !password) return {error:"Something went wrong, user was not created"}
        try{
            creatingUser.current = true;
            const response = await createUser(nUser, true, user?.accessId, user?.id);
            await signIn(email, secure.decrypt(password));
            return response;
        }catch(error){
            return {error: error.message};
        }
    }

    //create user when not logged in {new prospects}
    const createUser = async(nUser, userByAdmin=false, accessId=null, supervisorId=null) =>{
        try{
            const response = await auth.createUserWithEmailAndPassword(nUser.email, nUser.password);
            await addUser({
                email: nUser.email?.toLowerCase?.(),
                firstName: tools.titleCase(nUser.firstName),
                lastName: tools.titleCase(nUser.lastName),
                role: nUser.role,
                accessId: accessId || ADMINISTRATOR+"~"+response?.user?.uid,
                supervisorId: supervisorId || response?.user?.uid
            }, response?.user?.uid);

            //console.log(response.user.sendEmailVerification());

            const encriptPass = secure.encrypt(nUser?.password);

            await addCreds({
                admin: accessId || ADMINISTRATOR+"~"+response?.user?.uid,
                password: encriptPass
            }, response?.user?.uid);

            if (ADMINISTRATOR === nUser?.role && !userByAdmin){
                storeHashCreds(nUser.email, encriptPass);
                await addSettings(defaultSettings, response?.user?.uid)
            }
            return response;
        }catch(error){
            return {error: error.message};
        }
    }

    const storeHashCreds = (email, password) =>{
        tools.store.setAuthAccess(email, password);
    }

    const initUser = async() =>{
        let iUser = await getUser(user?.id);
        iUser["id"] = user?.id;
        setUser(iUser);
    }

    const initialize = async() =>{
        
    }

    useEffect(()=>{
        initialize();
    }, [user]);

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            if (!creatingUser.current){
                let authUser = await getUser(user?.uid);
                if (Object.keys(authUser || {}).length){
                    authUser["id"] = user?.uid;
                }

                if (passwordRef.current && ADMIN_SUPERVISER.includes(authUser?.role)){
                    storeHashCreds(authUser?.email, secure.encrypt(passwordRef.current));
                }
                setIsAuthenticated(user);
                setUser(authUser);
                setLoading(false);
            }
        });
    },[]);

    const providerValue = {
        user,
        signIn,
        signOut,
        createUser,
        adminCreateUser,
        isAuthenticated,
        changePassword,
        resetPasswordViaEmail,
        initUser,
        changeEmail,
        changeUserEmail
    }
    return(
        <AuthContextProvider.Provider value={providerValue}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}