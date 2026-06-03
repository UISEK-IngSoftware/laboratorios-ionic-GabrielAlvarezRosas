import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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
          <IonCard className='card'>
            <img src="https://avatars.githubusercontent.com/u/205797987?v=4" alt="Avatar" />
            <IonCardHeader>
              <IonCardTitle>Gabriel Alvarez Rosas</IonCardTitle>
              <IonCardSubtitle>gabito:p</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Este es el perfil de Gabriel Alvarez Rosas, un desarrollador apasionado por la tecnología y el desarrollo de aplicaciones web. Con experiencia en diversas tecnologías y un enfoque en la creación de soluciones innovadoras, Gabriel se destaca por su dedicación y habilidades técnicas.
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
