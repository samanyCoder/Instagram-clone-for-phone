const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
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
            message: "Telegramga yuborildi!",
        });
    } catch (error) {
        console.log(error.response?.data || error.message);

        res.status(500).json({
            message: "Xatolik yuz berdi",
        });
    }
});

app.listen(PORT, () => {
    console.log("Server ishlayapti: http://localhost:5000");
});