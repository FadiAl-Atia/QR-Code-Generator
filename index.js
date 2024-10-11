import express from "express";
import bodyParser from "body-parser";
import qrcode from "qrcode";
import session from "express-session"; // Add session handling

const app = express();
const port = 3000;

// Set up session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    const qrCode = req.session.qrCode || null;
    req.session.qrCode = null;
    res.render("index", { qrCode: qrCode });
});

app.post('/', async (req, res) => {
    const submittedURL = req.body.url;

    if (submittedURL) {
        try {
            const qrCodeBase64 = await qrcode.toDataURL(submittedURL);
            req.session.qrCode = qrCodeBase64;
            res.redirect('/');
        } catch (error) {
            console.error("QR Code generation error:", error);
            res.status(500).send("Failed to generate QR Code");
        }
    } else {
        res.status(400).send('No URL!!');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
