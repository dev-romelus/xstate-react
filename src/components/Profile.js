import React, { useContext } from 'react';
import { MachineContext } from '../context/MachineProvider';

const Profile = () => {
    const { state } = useContext(MachineContext);
    const user = state.context.user;

    return (
        <div>
            <div>Vous êtes connecté !</div>
            {JSON.stringify(user)}
        </div>
    )
}

export default Profile
