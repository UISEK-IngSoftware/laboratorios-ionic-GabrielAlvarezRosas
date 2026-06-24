import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './login.css';
import { logoGithub } from 'ionicons/icons';
import AuthService from '../services/AuthService';


const Login: React.FC = () => {
    const[username, setUsername]=useState("");
    const[token, setToken]=useState("");
    const[errorMsg, setErrorMsg]=useState("");

    const handleLogin = (e: React.FormEvent)=>{
        e.preventDefault();
        setErrorMsg("");

        if (username.trim() === "" || token.trim() ===""){
            setErrorMsg("El usuario y/o token son obligatorios")
            return
        }
        if(AuthService.login(username.trim(),token.trim())){
            window.location.href="/tab1"
        }else{
            setErrorMsg("Error al iniciar sesión")
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle> Iniciar sesión </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Iniciar sesión</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="login-container">
                    <form className="login-form" onSubmit={handleLogin}>
                        <IonIcon  icon={logoGithub} className="login-logo" />

                        <IonInput
                            className="login-field"
                            label="Usuario de Github"
                            labelPlacement="floating"
                            fill="outline"
                            type="text"
                            value={username}
                            onIonChange={e=> setUsername(e.detail.value!)}
                            required
                        />

                        <IonInput
                            className="login-field"
                            label="Token de Github"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonChange={e=>setToken(e.detail.value!)}
                            required
                        />
                        {errorMsg!= "" &&(<IonText className='danger'>{errorMsg}</IonText>)}
                        <IonButton className= "login-button" expand="block" type="submit">Iniciar sesión</IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;