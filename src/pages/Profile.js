import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {

    const [privateContent, setPrivateContent] = useState({})
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        async function fetchPrivateData() {

            try {
                const response = await axios.get(`http://localhost:3000/660/private-content`, {
                    headers: {
                        " Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }

                })
                setPrivateContent(response.data)
                console.log(response)

            } catch (e) {
                console.error(e)
            }
        }



        void fetchPrivateData()
    }, []);


    //  https://github.com/hogeschoolnovi/frontend-fake-server#afgeschermde-data-opvragen

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong>{user.username} </p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>{privateContent.title}</h2>
                <p>{privateContent.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;