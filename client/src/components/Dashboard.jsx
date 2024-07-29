import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const response = await fetch(baseURI + 'api/clients/count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setClientCount(data.count);
        } else {
          alert('Erreur lors de la récupération du nombre de clients');
          navigate('/')
        }
      } catch (error) {
        alert('Erreur réseau');
        navigate('/')
      }
    };

    fetchClientCount();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(baseURI + 'api/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          console.log(data);
        } else {
          alert('Erreur lors de la récupération des voitures');
         
        }
      } catch (error) {
        alert('Erreur réseau');
       
      }
    };

    fetchCars();
  }
  , []);

  const handleRowClick = (carId) => {
    navigate(`/update-vehicle/${carId}`);
  };

  return (
    <div className="admin-dashboard">
      <h2>Tableau de bord admin</h2>
      <p>Nombre de clients inscrits : {clientCount}</p>
      <h3>Liste des voitures</h3>
      <table>
        <thead>
          <tr>
            <th>Immatriculation</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
        {cars.map((car) => (
            <tr key={car.immatriculation} onClick={() => handleRowClick(car.immatriculation)}>
              <td>{car.immatriculation}</td>
              <td>{car.marque}</td>
              <td>{car.modele}</td>
              <td>{car.annee}</td>
              <td>{car.lastname} {car.firstname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/add-vehicle')}> ajouter un véhicule </button>
    </div>
  );
};

export default AdminDashboard;
