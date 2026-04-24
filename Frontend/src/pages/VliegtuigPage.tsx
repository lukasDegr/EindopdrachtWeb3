import React,{useEffect,useState} from "react";
import Header from "../components/Header";
import SplitLayout from "../layouts/SplitLayout";
import axios from "axios";
const VliegtuigPage = () =>{
    const [vliegtuigen,setVliegtuigen] = useState<Vliegtuig[]>([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/vliegtuigen")
        .then((response) =>{
            console.log("DATA:",response.data);
            setVliegtuigen(response.data);
        })
        .catch((error) =>{
            console.log("Error fetching vliegtuigen:", error);
        });
    },[]);
    const [selectedVliegtuig, setSelectedVliegtuig] = useState<Vliegtuig | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editNaam, setEditNaam] = useState("");
    const startEdit = (vliegtuig: Vliegtuig) =>{
        setSelectedVliegtuig(vliegtuig);
        setEditNaam(vliegtuig.naam);
        setEditMode(true);
    }
    const [errors, setErrors] = useState({
        naam:"",
    })
    const validate = () =>{
        let valid = true;
        const newErrors = {naam: ""};
         if (!editNaam.trim()) {
            newErrors.naam = "Naam is verplicht";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    }
     const saveEdit = () => {
        if (!selectedVliegtuig) return;
        if (!validate()) return;
        const updatedVliegtuigen = vliegtuigen.map((vliegtuig) => 
            vliegtuig.id === selectedVliegtuig.id ? { ...vliegtuig, naam: editNaam } : vliegtuig
        );
        setVliegtuigen(updatedVliegtuigen);

        const updateSelected = updatedVliegtuigen.find((vliegtuig) => vliegtuig.id === selectedVliegtuig.id) || null;
        setSelectedVliegtuig(updateSelected);
        setEditMode(false);
    };

    return (
        <div>
            <Header></Header>
           <SplitLayout
                items={vliegtuigen}
                selectedItem={selectedVliegtuig}
                onSelectItem={setSelectedVliegtuig}
                renderListItem={(vliegtuig) => (
                    <div>
                        <h3>{vliegtuig.naam}</h3>
                    </div>
                )}
                renderDetail={(vliegtuig) => (
                    <div className="space-y-4">{editMode && selectedVliegtuig?.id === vliegtuig.id ? (
                        <div>
                            <h2>Vliegtuig bewerken</h2>
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
                            <h2 className="text-2xl font-bold">{vliegtuig.naam}</h2>

                            <button
                                onClick={() => startEdit(vliegtuig)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >Wijzig naam</button>
                        </div>
                    )}
                    </div>
                )}
            ></SplitLayout>
        </div>
    );
}
export default VliegtuigPage;