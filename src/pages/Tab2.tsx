import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import { updateRepository } from '../services/GithubService';
import { Repository } from '../interfaces/Repository';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  //constantespara editar
  const location = useLocation<{ repository?: Repository }>();
  const repository = location.state?.repository;

  const repoFormData: RepositoryPayload = {
    //adaptamos el repoFormData para que según el origen nos muestre el dato o vacio
    name: repository?.name || '',
    description: repository?.description || ''
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
    //se agrega la acción de editar
    const action = repository
    ?updateRepository(
      repository.owner.login,
      repository.name,
      repoFormData
    )
    :
    createRepository(repoFormData);
    action.then(() => {
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
          //se modifica el boton para que sea dinamico a la acción
            onClick={saveRepository}>{repository ? "Actualizar repositorio" : "Crear repositorio"}</IonButton>
        </div>
        {loading && <LoadingSpinner isOpen={loading} />}
      </IonContent>
    </IonPage>
  );

};
export default Tab2;
