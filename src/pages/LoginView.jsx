
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react";
import { auth, userExist } from "../FireBase/Firebase"
import { useHistory } from 'react-router-dom';
import { Route } from "workbox-routing";
import AuthProvider from "../components/authProvider";


export default function LoginView() {
    const history = useHistory();
    /*
    Sate
    0:inicializado
    1:loaging
    2:login completo 
    3: login pero sin registro
    4: no hay nadie logueado
    5: el usuario ya existe
    6: nuevo username, click para continuar
    */
    const [state, setCurrentState] = useState(0);

    async function handleOnClick() {
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);

    }

    async function signInWithGoogle(googleProvider) {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res);
        }
        catch (error) {
            console.error(error);
        }
    }
    function handleUserLoggedIn(user) {
        history.push('/dashboard');
    }
    function handleUserNotRegistered(user) {
        history.push('/choose-username');
    }
    function handleUserNotLoggedIn() {
        setCurrentState(4)

    }

    // if(state ===2){
    //     return <div>Estas autenticado y  registrado</div>
    // }
    // if(state ===3){
    //     return <div>Estas autenticado pero no registrado</div>
    // }
    if(state ===4){
        return (
            <div>
                <button onClick={handleOnClick}>
                Login with Google
                </button>
            </div>
        )
    }
    // return <div>Loading ...</div>

    // if(state ===3 ){
    //     return <div>
    //         <h1>Bienvindio {currentUser.displayName}</h1>
    //     </div>

    // }
    return(
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>Loading ...</div>
        </AuthProvider>
    );
}