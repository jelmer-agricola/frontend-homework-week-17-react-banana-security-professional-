import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault()
        try{
            const response = await axios.post(`http://localhost:3000/register`, {
                email: email,
                password: password,
                username: username,
            })
            console.log(response)

            navigate(`/signin`)
        } catch (e) {
            console.error()
        }

    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={register}>
                <label htmlFor="username">
                    Gebruikersnaam
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="emailadress">
                    emailadres
                    <input
                        type="email"
                        id="emailadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </label>

                <label htmlFor="password">
                    Wachtwoord
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </label>


                <button
                    type="submit"
                >
                    Registreren
                </button>

            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;