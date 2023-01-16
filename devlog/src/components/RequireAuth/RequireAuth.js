import React from 'react'
import app from '../../Firebase/Firebase.init'
// import useFirebase from '../../hooks/useFirebase'
import {getAuth} from 'firebase/auth'
import { Navigate, useLocation } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'; 
const auth = getAuth(app);

const RequireAuth = ({children}) => {
    const [user] = useAuthState (auth);
    const location = useLocation(); 
    if(!user){
        return <Navigate to='/login' state={{from:location}} replace></Navigate>

    }
  return children;
  
}

export default RequireAuth