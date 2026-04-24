import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import SplitLayout from "../layouts/SplitLayout";

const AdminPage = () => {
    const [gebruikers,setGebruikers] = useState<Gebruiker[]>([]);

    useEffect(() => {
      axios.get("http://localhost:3001/users")
        .then((response) => {
          console.log("DATA:", response.data);
          setGebruikers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching gebruikers:", error);
        });
    }, []);

    const [selectedGebruiker,setSelectedGebruiker] = useState<Gebruiker | null>(null);
    const [newNaam, setNewNaam] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAdmin, setNewAdmin] = useState(false);  

    const [editMode, setEditMode] = useState(false);
    const [editNaam, setEditNaam] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAdmin, setEditAdmin] = useState(false);
    const startEdit = (gebruiker: Gebruiker) => {
        setSelectedGebruiker(gebruiker);
        setEditNaam(gebruiker.naam);
        setEditEmail(gebruiker.email);
        setEditAdmin(gebruiker.admin);
        setEditMode(true);
    }

    const [errors, setErrors] = useState({
        naam: "",
        email: "",
    })
    const validate = () => {
        let valid = true;
        const newErrors = { naam: "", email: "" };
        if (!editNaam.trim()) {
            newErrors.naam = "Naam is verplicht";
            valid = false;
        }
        if (!editEmail.trim()) {
            newErrors.email = "Email is verplicht";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(editEmail)) {
            newErrors.email = "Ongeldig emailadres";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };
    const loadUsers = () => {
        axios.get("http://localhost:3001/users")
          .then((response) => {
            setGebruikers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching gebruikers:", error);
          });
      };
    
    const addUser = async () => {
      try{
        await axios.post("http://localhost:3001/users", {
          naam: newNaam,
          email: newEmail,
          admin: newAdmin
        });
        loadUsers();
        setNewNaam("");
        setNewEmail("");
        setNewAdmin(false);
      }
      catch (error) {
        console.error("Error adding user:", error);
      }
    }
      
    const saveEdit = async ()=>{
        if (!selectedGebruiker) return;
        if (!validate()) return;
        try{
          await axios.put(`http://localhost:3001/users/${selectedGebruiker.id}`, {
            naam: editNaam,
            email: editEmail,
            admin: editAdmin
          });
          loadUsers();
          setEditMode(false);
        } catch (error) {
          console.error("Error updating user:", error);

        }
        // const updatedGebruikers = gebruikers.map((gebruiker) => gebruiker.id === selectedGebruiker.id 
        // ? { ...gebruiker, naam: editNaam, email: editEmail, admin: editAdmin } : gebruiker
        // );
        // setGebruikers(updatedGebruikers);

        // const updatedSelected = updatedGebruikers.find((gebruiker) =>gebruiker.id === selectedGebruiker.id) || null;
        // setSelectedGebruiker(updatedSelected);
        // setEditMode(false);
    }
   

    return (
    <div>
      <Header></Header>
      <div className="p-4 border-b space-y-2">
        <input
          type="text"
          placeholder="Naam"
          value={newNaam}
          onChange={(e) => setNewNaam(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newAdmin}
            onChange={(e) => setNewAdmin(e.target.checked)}
          />
          Admin
        </label>
        <button
          onClick={addUser}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Toevoegen
        </button>
      </div>
      <SplitLayout
        items={gebruikers}
        selectedItem={selectedGebruiker}
        onSelectItem={setSelectedGebruiker}
        renderListItem={(gebruiker) => (
          <div>
            <h3 className="font-semibold">{gebruiker.naam}</h3>
            <p>{gebruiker.email}</p>
            <p>
              {gebruiker.admin ? "Admin" : "Gebruiker"}
            </p>
          </div>
        )}
        renderDetail={(gebruiker) => (
          <div className="space-y-4">
            {editMode &&
            selectedGebruiker?.id === gebruiker.id ? (
              <>
                <h2 className="text-2xl font-bold">
                  Gebruiker bewerken
                </h2>

                <input
                  type="text"
                  value={editNaam}
                  onChange={(e) =>
                    setEditNaam(e.target.value)
                  }
                  className="border p-2 rounded w-full"
                />{errors.naam && (
                    <p className="text-red-500 text-sm">{errors.naam}</p>
                )}

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) =>
                    setEditEmail(e.target.value)
                  }
                  className="border p-2 rounded w-full"
                />{errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editAdmin}
                    onChange={(e) =>
                      setEditAdmin(e.target.checked)
                    }
                  />
                  Admin
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Opslaan
                  </button>

                  <button
                    onClick={() =>
                      setEditMode(false)
                    }
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Annuleren
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-2xl font-bold">
                  {gebruiker.naam}
                </h2>

                <p>Email: {gebruiker.email}</p>

                <p>
                  {gebruiker.admin
                    ? "Admin"
                    : "Gebruiker"}
                </p>
                

                <button
                  onClick={() => startEdit(gebruiker)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Bewerken
                </button>
              </div>
              
            )}
          </div>
        )}
      ></SplitLayout>
    </div>
  );
};
export default AdminPage;