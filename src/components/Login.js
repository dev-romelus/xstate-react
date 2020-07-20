import React, { useState, useContext } from 'react';
import { MachineContext } from '../context/MachineProvider';
import { Redirect } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state , send } = useContext(MachineContext);

    const { error } = state.context;

    const handleSubmit = e =>{
        e.preventDefault();

        send('LOGIN', { email, password });        
    };

    return (
        <form className="form" onSubmit={handleSubmit}>  
            <h2>Connexion</h2>
            {state.matches('authentication.failure') && <div style={{color: 'red'}}>{error}</div>}
            <div>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            </div>
            <div>
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"/>
            </div>
            <div>
            <button>Se connecter</button>
            {state.matches('authentication.success') && <Redirect to="/profile"/>}
            </div>
        </form>
    )
}

export default Login;
