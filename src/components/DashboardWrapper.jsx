import { IonReactRouter } from "@ionic/react-router";
// import { calendar, personCircle, map } from 'ionicons/icons'
import { Route } from "react-router-dom";
import { IonButton, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import AuthProvider from "../components/authProvider";

import dashboardView from "../pages/dashboardView";
import editProfileView from "../pages/editProfileView";
import SignOutView from "../pages/signOutView";
import { insertNewLink } from "../FireBase/Firebase";
import { useHistory } from "react-router-dom";

export default function DashboardWrapper({ children }) {
    const history = useHistory();

    const [titulo, setTitulo] = useState('')
    const [url, setUrl] = useState('')
    const [state, setState] =useState(0)
    // const [number, setNumber] = useState(0)
    const [currentUser, setCurrentUser] = useState({})
    const [links, setLinks] = useState([])

    function handleUserLoggedIn(user) {
        setCurrentUser(user)
        setState(2);
    }
    function handleUserNotRegistered(user) {
        history.push("/login")
    }
    function handleUserNotLoggedIn() {
        history.push("/login")

    }
    if (state === 0) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegistered={handleUserNotRegistered}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                Loading ....
            </AuthProvider>
        );
    }
    function handleOnSubmit(e) {
        e.preventDefault();
        // console.log(e.target.value)
        console.log(titulo, url)
        addLink();

    }
    function handleChangeTitulo(e) {
        setTitulo(e.target.value)
        // console.log(titulo)
    }
    function handleChangeUrl(e) {
        setUrl(e.target.value)
        // console.log(url)
    }

    function addLink() {
        if (titulo !== '' && url !== '') {
            const newlink = {
                id: uuidv4(),
                titulo: titulo,
                url: url,
                uid: currentUser.uid
                

            };
            console.log(newlink)
            const res = insertNewLink(newlink);
            newlink.docId = res.id
            setTitulo('')
            setUrl('')
            setLinks([...links, newlink])
        }
    }
    return (
        <form action="" onSubmit={(e) => handleOnSubmit(e)}>
            <IonList >
                {/* <IonItemDivider>Default Input with Placeholder</IonItemDivider>
            <IonItem>
                <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(!e.detail.value)}></IonInput>
            </IonItem> */}

                <IonItemDivider>Titulo</IonItemDivider>
                <IonItem>
                    <IonInput value={titulo} placeholder="Ingrese el titulo" onIonChange={handleChangeTitulo} clearInput></IonInput>
                </IonItem>

                <IonItemDivider>URL</IonItemDivider>
                <IonItem>
                    <IonInput value={url} placeholder="Ingrese el url" onIonChange={handleChangeUrl} clearInput></IonInput>
                </IonItem>

                <IonButton type="submit" color="success" >Crear un nuevo Link</IonButton>
                {/* <IonItemDivider>Number type input</IonItemDivider>
            <IonItem>
                <IonInput type="number" value={number} placeholder="Enter Number" onIonChange={e => setNumber(parseInt(!e.detail.value, 10))}></IonInput>
            </IonItem>

            <IonItemDivider>Disabled input</IonItemDivider>
            <IonItem>
                <IonInput value={text} disabled></IonInput>
            </IonItem>

            <IonItemDivider>Readonly input</IonItemDivider>
            <IonItem>
                <IonInput value={text} readonly></IonInput>
            </IonItem> */}
            </IonList>
        </form >

    )
}