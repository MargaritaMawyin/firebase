import { onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react";
import { auth, getUserInfo, registerNewUser, userExist } from "../FireBase/Firebase"
import { useHistory } from 'react-router-dom';
import { register } from "../serviceWorkerRegistration";
// import AuthProvider from "../components/authProvider";

export default function AuthProvider({
    children,
    onUserLoggedIn,
    onUserNotLoggedIn,
    onUserNotRegistered }) {
    const history = useHistory();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // debugger;
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    const userInfo = await getUserInfo(user.uid);
                    if(userInfo.processCompleted){
                        onUserLoggedIn(userInfo)
                    }
                    else{
                        onUserNotRegistered(userInfo);

                    }
                    
                }
                else {
                    await registerNewUser({
                        uid: user.uid,
                        displayName : user.displayName,
                        profilePicture : '',
                        userName: '',
                        processCompleted: false,

                    })
                    onUserNotRegistered(user)
                }

            }
            else {
                onUserNotLoggedIn()
            }
        });
    }, [history, onUserLoggedIn,
        onUserNotLoggedIn,
        onUserNotRegistered]);

    return <div>{children}</div>
}