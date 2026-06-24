import { IonCard, IonCardContent,IonText, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, useIonViewWillEnter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { GithubUser } from '../interfaces/GithubUser';
import React from 'react';
import { fetchUserInfo } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {

  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  useIonViewWillEnter(() => {
    setLoading(true);
    fetchUserInfo().then((user) => {
      setUserInfo(user);
    }).catch((error) => {
      setErrorMsg("Error obteniendo información del usuario: " + (error as Error).message);
    }).finally(() => {
      setLoading(false);
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil De Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil De Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img 
            src={userInfo?.avatar_url} 
            alt={userInfo?.name}/>

            <IonCardHeader>
              <IonCardTitle>{userInfo?.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>{userInfo?.bio}</p>
            </IonCardContent>
          </IonCard>

          {errorMsg && errorMsg !== '' && <IonText color="danger"><p>{errorMsg}</p></IonText>}
          
        </div>

        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;