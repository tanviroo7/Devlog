import { useEffect, useState } from "react"
import app from './../Firebase/Firebase.init';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
    onAuthStateChanged,
	signOut,
} from 'firebase/auth';



const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const useFirebase = () =>{
	const [user, setUser] = useState({});

	console.log(user);

	    const signInWithGoogle = () => {
		  signInWithPopup(auth, provider)
		  .then((result) => {
		const user = result.user;
        console.log(user)
		setUser(user);
		// ...
		    }).catch((error) => {
		     console.log(error)
		    });
		}
		const handleSignOut = () => {
			signOut(auth)
			.then(()=>{
				setUser({});
			})
			.catch(error =>{
				setUser({});
			})
	    };
        useEffect (()=>{
            onAuthStateChanged(auth, user=>{
                setUser(user);
				console.log(user)
            })

        },[])

	return {
		user,
		signInWithGoogle,
        handleSignOut,
		
	};
}
export default useFirebase; 