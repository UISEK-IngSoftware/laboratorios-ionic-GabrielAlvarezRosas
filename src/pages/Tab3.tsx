import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab3.css';
import React from 'react';
import { GithubUser } from '../interfaces/GithubUser';
import { getUserInfo } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';
import { logOutOutline } from 'ionicons/icons';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string >("");
  const history = useHistory()

const loadUserInfo = async () => {
  setLoading(true);
  getUserInfo().then((user) => setUserInfo(user))
  .catch((error) => setErrorMsg("error al cargar la información del usuario: " + error))
  .finally(() => setLoading(false))
}

const handleLogout=()=>{
  AuthService.logout()
  history.replace('/login')
}

useIonViewWillEnter(() => {
  loadUserInfo();
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          {userInfo&& (<IonCard className='card'>
            <img src={userInfo?.avatar_url} alt={userInfo?.login} />
            <IonCardHeader>
              <IonCardTitle>{userInfo?.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo?.bio}</IonCardContent>
          </IonCard>)}
          {errorMsg !=="" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton
          expand='block'
          color="danger"
          onClick={handleLogout}
          >
            <IonIcon slot='start' icon= {logOutOutline}/>
            salir
          </IonButton>
        </div>
        {loading && <LoadingSpinner isOpen={loading} />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
