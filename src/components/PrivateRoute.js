import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MachineContext } from '../context/MachineProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { state } = useContext(MachineContext);
    const user = state.context.user;

    return (
        <Route 
        {...rest} 
        render={props =>
        user ? ( 
            <Component {...props}/> 
        ) : (
            <Redirect
                to={{
                    pathname: '/',
                    state: { from: props.location }
                }}
            />
        )}
        />
    );
}

export default PrivateRoute
