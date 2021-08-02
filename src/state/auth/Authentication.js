import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/AuthConfig';
import { ADMINISTRATOR, ADMIN_SUPERVISER, SUPERVISOR } from '../../contents/AuthValue';
import { addUser, getUser } from '../../database/accounts/AccountsDb';
import { addCreds } from '../../database/credentials/Credentials';
import { routes } from '../../utils/routes/Routes';
import { secure } from '../../security/Security';
import { tools } from '../../utils/tools/Tools';

const AuthContextProvider = createContext();
export const useAuth = () => useContext(AuthContextProvider);

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
                email: nUser.email,
                firstName: nUser.firstName,
                lastName: nUser.lastName,
                role: nUser.role,
                accessId: accessId || ADMINISTRATOR+"~"+response?.user?.uid,
                supervisorId: supervisorId || response?.user?.uid
            }, response?.user?.uid);

            const encriptPass = secure.encrypt(nUser?.password);

            await addCreds({
                admin: accessId,
                password: encriptPass
            }, response?.user?.uid);

            if (ADMINISTRATOR === nUser?.role && !userByAdmin){
                storeHashCreds(nUser.email, encriptPass);
            }
            return response;
        }catch(error){
            return {error: error.message};
        }
    }

    const storeHashCreds = (email, password) =>{
        tools.store.setAuthAccess(email, password);
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
    }
    return(
        <AuthContextProvider.Provider value={providerValue}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}