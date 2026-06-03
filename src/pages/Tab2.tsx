import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className='form-field'
            label="Nombre del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='nombre-repositorio'
          ></IonInput>
          <IonTextarea
            className='form-field'
            label="Descripción del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del repositorio'
            rows={6}
            autoGrow
          ></IonTextarea>
          <IonButton className='form-field' expand='block' fill='solid'>Crear repositorio
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
