import React, {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    function login(jwt) {
        console.log('Gebruiker is ingelogd!');
        console.log(jwt);
        localStorage.setItem('token', jwt);
        // toggleIsAuth({isAuth:true});
        const decodedToken = jwtDecode(jwt);
        fetchData(jwt, decodedToken.sub);

    }

    async function fetchData(token, id) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response)
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },

            })
            navigate('/profile');

        } catch (e) {
            console.error(e)
        }
    }


    function logout(jwt) {
        console.log('Gebruiker is uitgelogd!');
        console.log(jwt);
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null
        });
        navigate('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;