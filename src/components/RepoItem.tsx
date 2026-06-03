import './RepoItem.css';
import React from 'react';
import { pencilOutline, trash } from 'ionicons/icons';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';

interface RepoProps {
    name: string;
    avatarUrl: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, avatarUrl }) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={avatarUrl} alt="GitHub Logo" />
                </IonThumbnail>
                <IonLabel>{name}</IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption>
                    <IonIcon icon={pencilOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color={"danger"}>
                    <IonIcon icon={trash} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default RepoItem;