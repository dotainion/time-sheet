import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../config/AuthConfig';
import { addUser, getUser } from '../database/accounts/AccountsDb';
import { routes } from '../routes/Routes';

const AuthContextProvider = createContext();
export const useAuth = () => useContext(AuthContextProvider);

export const AuthContext = ({children}) =>{
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [triggerAuthChange, setTriggerAuthChange] = useState();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState();

    const signIn = async(email, password) =>{
        try{
            const response = await auth.signInWithEmailAndPassword(email, password);
            //return setTriggerAuthChange(response);
        }catch(error){
            return {error:error.message};
        }
    }

    const signOut = async() =>{
        await auth.signOut();
        history.push(routes.signIn);
    }

    const createUser = async(nUser) =>{
        try{
            const response = await auth.createUserWithEmailAndPassword(nUser.email, nUser.password);
            await addUser({
                email: nUser.email,
                firstName: nUser.firstName,
                lastName: nUser.lastName,
                role: nUser.role
            }, response?.user?.uid);
            //return setTriggerAuthChange(response);
        }catch(error){
            return {error: error.message};
        }
    }

    const initialize = async() =>{
        let authUser = await getUser(isAuthenticated?.uid);
        if (Object.keys(authUser || {}).length){
            authUser["id"] = isAuthenticated?.uid;
        }
        setUser(authUser);
    }

    useEffect(()=>{
        initialize();
    }, [isAuthenticated]);

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            /*let authUser = await getUser(user?.uid);
            if (Object.keys(authUser || {}).length) authUser["id"] = user?.uid;
            setUser(authUser);*/
            setIsAuthenticated(user);
            setLoading(false);
        });
    },[]);

    const providerValue = {
        user,
        signIn,
        signOut,
        createUser,
        isAuthenticated,
    }
    return(
        <AuthContextProvider.Provider value={providerValue}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}