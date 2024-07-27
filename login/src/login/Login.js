
import './Login.scss';
import React, { useState } from 'react';
import SimpleButton from '../buttons/simple/SimpleButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import RegisterButton from '../buttons/registerButton/RegisterButton';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('testuser@test.com');
    const [password, setPassword] = useState('testpassword');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            const chatGPTResponse = await fetch('http://127.0.0.1:9000/getRandomText');
            const chatGPTData = await chatGPTResponse.json();
            //  toast.success(chatGPTData.text);
            alert(chatGPTData.text)
        } else {
            toast.error(data.message);
        }
    };


    return (
        <div className="main">

            <div className='box1'>
                <div className='logo' />
                <div className='imageRegistration' />
                <div className='texts'>
                    <h1>
                        Welcome aboard my friend
                    </h1>
                    <h2>
                        just a couple of clicks and we start
                    </h2>
                </div>
            </div>
            <div className='box2'>
                <div className='box2-title'>
                    Log in
                </div>
                <div className="login-container" onSubmit={handleLogin}>
                    <form className="login-form">
                        <div className="input-group">
                            <i className="fas  icon email-icon"></i>
                            <input
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Email"
                                className="input-field"
                            />
                        </div>
                        <div className="input-group">
                            <i className="fas lock-icon icon"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                className={`fas ${showPassword ? 'eye-icon' : 'eye-icon'} icon-toggle`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
                <div className='centers'>
                    <div className='or'>
                        <div className='orRec'></div>
                        <div className='orLabel'>Or</div>
                        <div className='orRec'></div>
                    </div>

                </div>
                <div className='socialButtons'>
                    <SimpleButton icon={"google"} label={"Google"} />

                    <SimpleButton icon={"facebook"} label={"Facebook"} />
                </div>

                <div className='centers'>
                    <div className='havenoaccount'>
                        Have no account yet?
                    </div>
                </div>

                <div className='centers'>
                    <RegisterButton />
                </div>
            </div>

        </div>
    );
}

export default Login;
