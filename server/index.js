const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/api/test", async (req, res) => {
    try {
        const { name, phone } = req.body;

        const text = `
📩 Yangi so'rov

👤 Ism: ${name}
📞 Telefon: ${phone}
`;

        await axios.post(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: text,
            }
        );

        res.json({
            message: "Telegramga yuborildi!"
        });

    } catch (error) {
        console.log(error.response?.data || error.message);

        res.status(500).json({
            message: "Xatolik yuz berdi"
        });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server ishlayapti: ${PORT}`);
});