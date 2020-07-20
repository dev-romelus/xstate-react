import React, { createContext } from 'react';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const login = (context, event) => new Promise((resolve, reject)=>{
  const { email, password } = event;

  if(email !== 'john.doe@gmail.com' || password !== 'azerty'){
    return reject({ error: 'Le mot de passe ou l\'email est incorrect !' })
  }

  return resolve({ email, password });

});

const authMachine = Machine({
  id: 'signIn',
  initial: 'disconnected',
  context:{
    user: null,
    error: ''
  },
  on: {
    LOGIN: {
      target: 'authentication.started'
    }
  },
  states: {
    authentication:{
      states:{
        started: {
          invoke: {
            id: 'login',
            src: login,
            onDone: {
              target: 'success',
              actions: assign({ user: (_, event) => event.data })
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (_, event) => event.data.error })
            }
          }
        },
        success: {},
        failure: {}
      }
    },
    disconnected: {}
  }
});

export const MachineContext = createContext();

const MachineProvider = ({children}) => {

  const [state, send] = useMachine(authMachine);

  return (
    <MachineContext.Provider value={{state, send}}>
      {children}
    </MachineContext.Provider>
  );

}

export default MachineProvider;
