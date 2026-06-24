import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {

  const history = useHistory();
  const [repositoryData, setRepositoryData] = React.useState<RepositoryPayload>({
    name: '',
    description: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const saveRepository = async () => {
    if (repositoryData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }
    setLoading(true);
    createRepository(repositoryData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      setErrorMsg("Error al crear el repositorio: " + error);
      console.error("Error al crear el repositorio:", error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useIonViewWillEnter(() => {
    setRepositoryData({
      name: '',
      description: '',
    });
    setErrorMsg('');
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario De Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
            value={repositoryData.name}
            onIonInput={(e) => setRepositoryData({ ...repositoryData, name: e.detail.value! })}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            placeholder="Ingrese la descripción del repositorio"
            labelPlacement="floating"
            value={repositoryData.description}
            onIonInput={(e) => setRepositoryData({ ...repositoryData, description: e.detail.value! })}
            rows={4}
          />

          {errorMsg && <IonText color="danger">{errorMsg}</IonText>}

          <IonButton
            className="submit-button"
            expand="block"
            fill="solid"
            color="primary"
            onClick={saveRepository}
          >
            Guardar
          </IonButton>
        </div>

        {loading && <LoadingSpinner />}

      </IonContent>
    </IonPage>
  );
};

export default Tab2;