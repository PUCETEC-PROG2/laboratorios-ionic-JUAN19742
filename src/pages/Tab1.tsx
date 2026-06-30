import React from 'react';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { fetchRepositories, updateRepository, deleteRepository } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';


const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Estado para confirmar eliminación (DELETE)
  const [repoToDelete, setRepoToDelete] = React.useState<Repository | null>(null);

  // Estado para el modal de edición (PATCH)
  const [repoToEdit, setRepoToEdit] = React.useState<Repository | null>(null);
  const [editData, setEditData] = React.useState<RepositoryPayload>({ name: '', description: '' });
  const [editErrorMsg, setEditErrorMsg] = React.useState('');

  // Feedback visual para el usuario
  const [showToast, setShowToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [toastColor, setToastColor] = React.useState<'success' | 'danger'>('success');

  const fetchRepos = async() => {
    try{
      const repos=await fetchRepositories();
      setRepositoryList(repos);
    } catch(error){
      console.error('Error obteniendo repositorios:', error);
    }
  };

  useIonViewWillEnter(()=>{
    fetchRepos();
  });

  const notify = (message: string, color: 'success' | 'danger') => {
    setToastMsg(message);
    setToastColor(color);
    setShowToast(true);
  };

  // ----- DELETE -----
  const handleDeleteRequest = (repo: Repository) => {
    setRepoToDelete(repo);
  };

  const confirmDelete = async () => {
    if (!repoToDelete) return;
    setLoading(true);
    try {
      await deleteRepository(repoToDelete.owner.login, repoToDelete.name);
      setRepositoryList((prev) => prev.filter((r) => r.id !== repoToDelete.id));
      notify('Repositorio eliminado correctamente.', 'success');
    } catch (error) {
      notify('Error al eliminar el repositorio: ' + (error as Error).message, 'danger');
    } finally {
      setLoading(false);
      setRepoToDelete(null);
    }
  };

  // ----- PATCH -----
  const handleEditRequest = (repo: Repository) => {
    setEditErrorMsg('');
    setEditData({ name: repo.name, description: repo.description ?? '' });
    setRepoToEdit(repo);
  };

  const closeEditModal = () => {
    setRepoToEdit(null);
  };

  const saveEdit = async () => {
    if (!repoToEdit) return;

    if (editData.name.trim() === '') {
      setEditErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading(true);
    updateRepository(repoToEdit.owner.login, repoToEdit.name, editData)
      .then((updated) => {
        setRepositoryList((prev) =>
          prev.map((r) => (r.id === repoToEdit.id ? { ...r, ...updated } : r))
        );
        notify('Repositorio actualizado correctamente.', 'success');
        setRepoToEdit(null);
      })
      .catch((error) => {
        setEditErrorMsg('Error al actualizar el repositorio: ' + (error as Error).message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>

          {repositoryList.map((repo)=>(
            <RepoItem
              {...repo}
              key={repo.id}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
            />
          ))}

        </IonList>

        {/* Confirmación de acción destructiva (DELETE) */}
        <IonAlert
          isOpen={repoToDelete !== null}
          header="Eliminar repositorio"
          message={`¿Seguro que deseas eliminar "${repoToDelete?.name}"? Esta acción no se puede deshacer.`}
          onDidDismiss={() => setRepoToDelete(null)}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: confirmDelete
            }
          ]}
        />

        {/* Modal de edición (PATCH) */}
        <IonModal isOpen={repoToEdit !== null} onDidDismiss={closeEditModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Repositorio</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeEditModal}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="form-container">
              <IonInput
                className="form-field"
                label="Nombre del Repositorio"
                placeholder="Ingrese el nombre del repositorio"
                labelPlacement="floating"
                value={editData.name}
                onIonInput={(e) => setEditData({ ...editData, name: e.detail.value! })}
              />

              <IonTextarea
                className="form-field"
                label="Descripción"
                placeholder="Ingrese la descripción del repositorio"
                labelPlacement="floating"
                value={editData.description}
                onIonInput={(e) => setEditData({ ...editData, description: e.detail.value! })}
                rows={4}
              />

              {editErrorMsg && <IonText color="danger">{editErrorMsg}</IonText>}

              <IonButton
                className="submit-button"
                expand="block"
                fill="solid"
                color="primary"
                onClick={saveEdit}
              >
                Guardar Cambios
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Feedback visual de éxito/error para DELETE y PATCH */}
        <IonToast
          isOpen={showToast}
          message={toastMsg}
          duration={2500}
          color={toastColor}
          onDidDismiss={() => setShowToast(false)}
        />

        {loading && <LoadingSpinner />}

      </IonContent>
    </IonPage>
  );
};

export default Tab1;