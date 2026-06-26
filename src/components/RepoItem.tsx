import './RepoItem.css';
import React from 'react';
import { Repository } from '../interfaces/Repository';
import { pencilOutline, text, trash } from 'ionicons/icons';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { deleteRepository } from '../services/GithubService';
import { useHistory } from 'react-router-dom';

//se utiliza para poder llamar a loadRepos
interface RepoItemProps extends Repository {
    loadRepos: () => void;
}

const RepoItem: React.FC<RepoItemProps> = (repo) => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();

    //maneja el patch
    const handleEdit = () => {

        history.push('/tab2', {
            repository: {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                owner: repo.owner
            }
        });

    };
    //maneja el delete
    const handleDelete = () => {
        presentAlert({
            header: "Eliminar repositorio",
            message: `¿Seguro que quieres eliminar este repositorio ${repo.name}?`,
            buttons: [
                {
                    text: "Cancelar",
                    role: "cancel"
                },
                {
                    text: "Eliminar",
                    role: "destructive",
                    handler: async () => {

                        await deleteRepository(
                            repo.owner.login,
                            repo.name
                        );
                        repo.loadRepos();
                    }
                }
            ]
        });
    }

    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={repo.owner.avatar_url} alt="GitHub Logo" />
                </IonThumbnail>
                <IonLabel>
                    <h3>{repo.name}</h3>
                    {repo.description && <p>{repo.description}</p>}
                    {repo.language && (
                        <p><strong>Language:</strong> {repo.language}</p>
                    )}
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption onClick={handleEdit} >
                    <IonIcon icon={pencilOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color={"danger"}>
                    <IonIcon icon={trash} onClick={handleDelete} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};
export default RepoItem;