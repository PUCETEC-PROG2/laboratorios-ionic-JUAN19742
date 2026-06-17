import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Ususario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del Ususario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/48026030?v=4" 
            alt="Foto de Perfil" 
             />
             <IonCardHeader>
              <IonCardTitle>Juan Rueda</IonCardTitle>
              <IonCardSubtitle>JuanRueda</IonCardSubtitle>
             </IonCardHeader>
             <IonCardContent>
              <p>Desarrollador de Software</p>
              <p>Adicto a todo lo malo</p>
             </IonCardContent>
          </IonCard>
        </div>

        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
