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
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState();

    const signIn = async(email, password) =>{
        try{
            const response = await auth.signInWithEmailAndPassword(email, password);
            return setIsAuthenticated(response);
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
            return response;
        }catch(error){
            return {error: error.message};
        }
    }

    const initialize = async() =>{

    }

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            let authUser = await getUser(user?.uid);
            if (Object.keys(authUser || {}).length) authUser["id"] = user?.uid;
            setUser(authUser);
            await initialize();
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