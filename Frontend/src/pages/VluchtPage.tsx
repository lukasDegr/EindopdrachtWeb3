import React, { use, useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import SplitLayout from "../layouts/SplitLayout";
import axios from "axios";
interface Vlucht {
  id: number;
  naam: string;
  Vliegtuig: Vliegtuig;
  Gebruiker : Gebruiker;
}
const VluchtPage = () => {
    const [vluchten, setVluchten] = useState<Vlucht[]> ([])
    const [alleVliegtuigen, setAlleVliegtuigen] = useState<Vliegtuig[]>([]);
    const [alleGebruikers, setAlleGebruikers] = useState<Gebruiker[]>([]);
    useEffect(() =>{
        axios.get("http://localhost:3001/vluchten")
        .then((response) =>{
            console.log("DATA:", response.data);
            setVluchten(response.data);
        })
        .catch((error)=>{
            console.error("Error fetching vluchten:",error);
        });
    },[]);
    useEffect(() =>{
        axios.get("http://localhost:3001/vliegtuigen")
        .then(res =>setAlleVliegtuigen(res.data));
        axios.get("http://localhost:3001/users")
        .then(res => setAlleGebruikers(res.data));
    },[]);


    const [selectedVlucht,setSelectedVlucht] = useState<Vlucht | null>(null);
    const [newNaam, setNewNaam] = useState("");
    const [selectedVliegtuigId, setSelectedVliegtuigId] = useState<number>(0);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);
    const [editMode, setEditMode] = useState(false);
    const [editNaam, setEditNaam] = useState("");
    const [editVliegtuigId, setEditVliegtuigId] = useState<number>(0);
    const [editUserId, setEditUserId] = useState<number>(0);
    const startEdit = (vlucht: Vlucht) => {
        setSelectedVlucht(vlucht);
        setEditNaam(vlucht.naam);
        setEditVliegtuigId(vlucht.Vliegtuig.id);
        setEditUserId(vlucht.Gebruiker.id);
        setEditMode(true);
    }
    const [errors, setErrors] = useState({
        naam: "",
    })
    const validate = () => {
        let valid = true;
        const newErrors = { naam: "" };
        if (!editNaam.trim()) {
            newErrors.naam = "Naam is verplicht";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };
    const loadVluchten = ()=>{
        axios.get("http://localhost:3001/vluchten")
        .then((response) =>{
            setVluchten(response.data);
        })
        .catch((error) =>{
            console.error("Error fetching vuchten:", error);
        });
    };

    const addVlucht = async() =>{
        if(!newNaam || !selectedVliegtuigId || !selectedUserId){
            alert("vul alle velden in!");
            return;
        }
        try{
            await axios.post("http://localhost:3001/vluchten",{
                naam: newNaam,
                vliegtuigId: selectedVliegtuigId,
                userId: selectedUserId
            });
            loadVluchten();
            setNewNaam("");
        }catch (error) {
            console.error("Error adding vliegtuig:", error);
        }
    }
    const saveEdit = async ()=>{
        if (!selectedVlucht || !validate()) {
            return;
        }
        try {
            await axios.put(`http://localhost:3001/vluchten/${selectedVlucht?.id}`,{
            naam: editNaam,
            vliegtuigId: editVliegtuigId,
            userId: editUserId
        });
        await loadVluchten();
        setEditMode(false);
        setSelectedVlucht({...selectedVlucht, naam: editNaam});
        }catch (error){
            console.error("Error updating vlucht:", error);
        };
        
        // if (!validate()) return;
        // const updatedVlucht = vluchten.map((vlucht) => vlucht.id === selectedVlucht.id 
        // ? { ...vlucht, name: editNaam } : vlucht
        // );

        // setvluchten(updatedVlucht);
        
        // const updatedSelected = updatedVlucht.find((vlucht) => vlucht.id === selectedVlucht.id) || null;
        // setSelectedVlucht(updatedSelected);
        // setEditMode(false);
    }
    
    return (
       <div>
        <Header></Header>
        <div className="p-4 border-b space-y-2 bg-gray-50">
            <h2 className="font-bold">Nieuwe Vlucht</h2>
            <div className="flex gap-2">
                <input
                    type="text" placeholder="vlucht naam" value={newNaam}
                    onChange={(e) => setNewNaam(e.target.value)} className="border p-2 rounded"
                ></input>

                <select onChange={(e) => setSelectedVliegtuigId(Number(e.target.value))} className="border p-2 rounded">
                    <option value="">Kies vliegtuig</option>
                    {alleVliegtuigen.map(v=> <option key={v.id} value={v.id}>{v.naam}</option>)}
                </select>

                <select onChange={(e) => setSelectedUserId(Number(e.target.value))} className="border p-2 rounded">
                    <option value="">Kies piloot</option>
                    {alleGebruikers.map(u =><option key={u.id} value={u.id}>{u.naam}</option>)}
                </select>
                <button onClick={addVlucht} className="bg-green-500 text-white px-4 py-2 rounded">
                    Vlucht Toevoegen
                </button>
            </div>
        </div>
            <SplitLayout
                items={vluchten}
                selectedItem = {selectedVlucht}
                onSelectItem = {setSelectedVlucht}
                renderListItem = {(vlucht) => (
                    <div>
                        <h3>{vlucht.naam}</h3>
                        <p>{vlucht.Vliegtuig.naam}</p>
                        <p>{vlucht.Gebruiker.naam}</p>
                    </div>
                )}
                renderDetail = {(vlucht) => (
                    <div className="space-y-4">{editMode && selectedVlucht?.id === vlucht.id ? (
                        <div>
                            <h2>Vlucht bewerken</h2>
                            <input
                                type="text"
                                value={editNaam}
                                onChange={(e) => setEditNaam(e.target.value)}
                                className="border p-2 rounded w-full"
                            ></input>
                            {errors.naam && (
                                <p className="text-red-500 text-sm">{errors.naam}</p>
                            )}
                            <div className="flex gap-2">
                                <select 
                                value={editVliegtuigId} 
                                onChange={(e) => setEditVliegtuigId(Number(e.target.value))} 
                                className="border p-2 rounded w-full">
                                    <option value="">Kies vliegtuig</option>
                                {alleVliegtuigen.map(v =><option key={v.id} value={v.id}>{v.naam}</option>)}
                                </select>

                                <select
                                value={editUserId}
                                onChange={(e) =>setEditUserId(Number(e.target.value))}
                                   className="border p-2 rounded w-full">
                                    <option value="">Kies piloot</option>
                                {alleGebruikers.map(v=><option key={v.id} value={v.id}>{v.naam}</option>)}
                                </select>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={saveEdit}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >Opslaan</button>

                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >Annuleren</button>
                            </div>
                        </div>
                    ):(
                        <div>
                            <h2 className="text-2xl font-bold">{vlucht.naam}</h2>
                            <p>vliegtuig: {vlucht.Vliegtuig.naam}</p>
                            <p>piloot: {vlucht.Gebruiker.naam}</p>

                            <button
                                onClick={() => startEdit(vlucht)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >Wijzig vlucht</button>
                        </div>
                    )}
                    </div>
                )}
            ></SplitLayout>
        </div>
    );
}
export default VluchtPage;