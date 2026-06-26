import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { fetchRepositories } from '../services/GithubService';
import { Repository } from '../interfaces/Repository';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string >("");

  const loadRepos = async () => {
      setLoading(true);
      fetchRepositories().then((reposData) => {
          setRepos(reposData);
      }).catch((error) => {
          setErrorMsg("error al cargar los repositorios: " + error);
      }).finally(() => setLoading(false))
  }

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repos.map(repo => (
            <RepoItem key={repo.id} {...repo} loadRepos={loadRepos} />
          ))}
        </IonList>
        {loading && <LoadingSpinner isOpen={loading} />}
        {errorMsg !=="" && (
          <IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
