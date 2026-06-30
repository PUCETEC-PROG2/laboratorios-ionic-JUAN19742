import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';
import React from 'react';
import { pencil, trash } from 'ionicons/icons';

interface RepoItemProps extends Repository {
    onEdit?: (repository: Repository) => void;
    onDelete?: (repository: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ onEdit, onDelete, ...repository }) => {
    const slidingRef = React.useRef<HTMLIonItemSlidingElement>(null);

    const handleEdit = () => {
        slidingRef.current?.close();
        onEdit?.(repository);
    };

    const handleDelete = () => {
        slidingRef.current?.close();
        onDelete?.(repository);
    };

    return (
        <IonItemSliding ref={slidingRef}>
            <IonItem>
              <IonThumbnail slot="start">
                <img src = {repository.owner.avatar_url}
                 alt="Avatar" 
                 />
              </IonThumbnail>
              <IonLabel>  
                <h3>{repository.name}</h3>
                {repository.description && (
                  <p>{repository.description}</p>
                )}
                {repository.language && (
                  <p><strong>Lenguaje:</strong> {repository.language}</p>
                )}
              </IonLabel>
            </IonItem>
            <IonItemOptions>

              <IonItemOption color="primary" onClick={handleEdit}>
                <IonIcon icon= {pencil} slot= "icon-only"/>
              </IonItemOption>

            <IonItemOption color="danger" onClick={handleDelete}>
              <IonIcon icon= {trash} slot= "icon-only"/>
            </IonItemOption> 
              
            </IonItemOptions>
          </IonItemSliding>
    );
}


export default RepoItem;