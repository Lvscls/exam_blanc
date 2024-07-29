import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css";

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AddVehicle = () => {
  const [immatriculation, setImmatriculation] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [client_id, setClientId] = useState(0);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${baseURI}api/clients`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setClients(data);
        } else {
          console.error("Failed to fetch clients");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVehicle = {
      immatriculation,
      marque,
      modele,
      annee,
      client_id,
    };
    console.log(newVehicle);

    try {
      const response = await fetch(`${baseURI}api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(
          `Erreur: ${
            errorData.message || "Erreur lors de la création de la voiture"
          }`
        );
      }
    } catch (error) {
      alert("Erreur réseau");
      console.error("Network error:", error);
    }

    setImmatriculation("");
    setMarque("");
    setModele("");
    setAnnee("");
    setClientId("");
  };

  return (
    <div className="add-vehicle">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Immatriculation:</label>
          <input
            type="text"
            value={immatriculation}
            onChange={(e) => setImmatriculation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Marque:</label>
          <input
            type="text"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Modele:</label>
          <input
            type="text"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Annee:</label>
          <input
            type="text"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Client :</label>
          <select
            value={client_id}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.firstname} {client.lastname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
