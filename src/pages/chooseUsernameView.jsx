import { useHistory } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { existUsername, updateUser } from "../FireBase/Firebase";
import { Link } from "react-router-dom";

export default function ChooseUsernameView() {
    const [state, setState] = useState(0);
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [userName, setUserName] = useState({});

    function handleUserLoggedIn(user) {
        history.push('/dashboard');
    }
    function handleUserNotRegistered(user) {
        setCurrentUser(user)
        setState(3)
    }
    function handleUserNotLoggedIn() {
        history.push("/login")

    }

    function handleInputUsername(e) {
        setUserName(e.target.value)
    }
    async function handleContinue() {
        if (userName !== "") {
            const exist = await existUsername(userName);
            if(exist){
                setState(5);
            }
            else{
                const tmp = {...currentUser}
                tmp.userName = userName;
                tmp.processCompleted =true;
                await updateUser(tmp);
                setState(6);

            }
        }
    }
    if (state === 3 || state ===5) {
        return (
            <div>
                <h1>Bienvindio {currentUser.displayName}</h1>
                <p>PR terminr el proceso elige  un nombre de usuario</p>
                {state ===5 ? <p>El nombre de usuario, escoge otro</p> : ""}
                <div>
                    <input type="text" onInput={handleInputUsername} />
                </div>
                <div><button onClick={handleContinue}>Continue</button></div>
            </div>
        )
    }

    if( state === 6){
        return (
        <div>
            <h1>Felicidades</h1>
            <Link to="/dashboard">Continuar</Link>
            </div>
        )
    }
    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
        </AuthProvider>
    )
}