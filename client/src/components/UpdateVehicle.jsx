import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateVehicle.css';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const UpdateVehicle = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [clients, setClients] = useState([]);
  const [immatriculation, setImmatriculation] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [annee, setAnnee] = useState('');
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${baseURI}api/cars/${carId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        const data = await response.json();
        setVehicle(data);
        setImmatriculation(data.immatriculation);
        setMarque(data.marque);
        setModele(data.modele);
        setAnnee(data.annee);
        setClientId(data.client_id);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch(`${baseURI}api/clients`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchVehicle();
    fetchClients();
  }, [carId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURI}api/cars/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          immatriculation,
          marque,
          modele,
          annee,
          client_id: clientId,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        alert('Error updating vehicle');
      }
    } catch (error) {
      alert('Network error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Etes-vous sur de vouloir supprimer la voiture ?')) {
      try {
        const response = await fetch(`${baseURI}api/cars/${carId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/dashboard');
        } else {
          alert('Error deleting vehicle');
        }
      } catch (error) {
        alert('Network error');
      }
    }
  };

  return (
    <div className="update-vehicle-container">
      <h2>Modifier la voiture</h2>
      {vehicle ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Immatriculation:</label>
            <input
              type="text"
              value={immatriculation}
              onChange={(e) => setImmatriculation(e.target.value)}
            />
          </div>
          <div>
            <label>Marque:</label>
            <input
              type="text"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
            />
          </div>
          <div>
            <label>Modele:</label>
            <input
              type="text"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
            />
          </div>
          <div>
            <label>Annee:</label>
            <input
              type="number"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
            />
          </div>
          <div>
            <label>Client:</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.lastname} {client.firstname}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Modifier</button>
        </form>
      ) : (
        <p>Loading vehicle details...</p>
      )}
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default UpdateVehicle;
