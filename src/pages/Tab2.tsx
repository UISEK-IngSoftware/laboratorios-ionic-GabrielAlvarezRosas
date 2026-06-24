import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");


  const repoFormData: RepositoryPayload = {
    name: '',
    description: '',
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  }

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  }

  const saveRepository = () => {
    if (repoFormData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio');
      return;
    }
    setLoading(true);
    createRepository(repoFormData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      setErrorMsg('Error al crear el repositorio' + error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useIonViewWillEnter(() => setErrorMsg(''));

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
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
          ></IonInput>
          <IonTextarea
            className='form-field'
            label="Descripción del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del repositorio'
            rows={6}
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
            autoGrow
          ></IonTextarea>
          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton className='form-field' expand='block' fill='solid'
            onClick={saveRepository}>Crear repositorio</IonButton>
        </div>
        {loading && <LoadingSpinner isOpen={loading} />}
      </IonContent>
    </IonPage>
  );

};
export default Tab2;
