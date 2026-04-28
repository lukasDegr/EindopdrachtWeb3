import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage =() =>{
    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord]= useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/login",{
                email,
                wachtwoord,
            });
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.gebruiker));

            navigate("/beginPage");
        }
        catch(err: any){
            setError(err.response?.data?.message || "Inloggen mislukt");
        }
    };
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">Inloggen</h2>
                {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                <input
                  type ="email"
                  placeholder="E-mailadres"
                  className="w-full p-2 mb-4 border rounded"
                  value = {email}
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                ></input>
                <input
                  type="password"
                  placeholder="Wachtwoord"
                  className="w-full p-2 mb-6 border rounded"
                  value ={wachtwoord}
                  onChange={(e) => setWachtwoord(e.target.value)}
                  required
                ></input>
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Inloggen
                </button>
            </form>
        </div>
    );
};

export default LoginPage;