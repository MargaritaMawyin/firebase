
import { useHistory } from "react-router";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import EditProfileView from "./editProfileView";
import SignOutView from "./signOutView";
import { IonBadge, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from "@ionic/react-router";
import { calendar, personCircle, map } from 'ionicons/icons'
import { Route } from "react-router-dom";

export default function DashboardView() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState(0);
    const [text, setText] = useState('')
    
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


    return (
        <IonPage>
            <IonReactRouter>
                <IonContent >

                    <IonList>
                        {/* <IonItemDivider>Default Input with Placeholder</IonItemDivider>
          <IonItem>
            <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(!e.detail.value)}></IonInput>
          </IonItem> */}

                        <IonItemDivider>Input with clear button when there is a value</IonItemDivider>
                        <IonItem>
                            <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(!e.detail.value)} clearInput></IonInput>
                        </IonItem>

                        {/* <IonItemDivider>Number type input</IonItemDivider>
          <IonItem>
            <IonInput type="number" value={number} placeholder="Enter Number" onIonChange={e => setNumber(parseInt(!e.detail.value, 10))}></IonInput>
          </IonItem> */}

                        <IonItemDivider>Disabled input</IonItemDivider>
                        <IonItem>
                            <IonInput value={text} disabled></IonInput>
                        </IonItem>

                        <IonItemDivider>Readonly input</IonItemDivider>
                        <IonItem>
                            <IonInput value={text} readonly></IonInput>
                        </IonItem>
                    </IonList>

                    <IonTabs>
                        <IonRouterOutlet >
                            <Route path="/dashboard" component={DashboardWrapper} />
                            <Route path="/profile" component={EditProfileView} />
                            <Route path="/signout" component={SignOutView} />
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="dashboard" href="/dashboard">
                                <IonIcon icon={calendar} />
                                <IonLabel>Dashboard</IonLabel>
                                <IonBadge>6</IonBadge>
                            </IonTabButton>

                            <IonTabButton tab="profile" href="/profile">
                                <IonIcon icon={personCircle} />
                                <IonLabel>Profile</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="signout" href="/signout">
                                <IonIcon icon={calendar} />
                                <IonLabel>Sign Out</IonLabel>
                            </IonTabButton>
                        </IonTabBar>

                    </IonTabs>

                </IonContent >
            </IonReactRouter>
        </IonPage>

    )
}