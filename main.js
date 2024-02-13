const express = require("express");
const port = 2500;

let app = express();

app.use(express.raw())

app.get("/",(req,res) => {
    res.redirect("identify.html");
});

app.post("/main",(req,res) => {
    writeFileSync("/public/doc.pdf", req.body)
    res.sendStatus(200);
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`API launched on ${2500}`);
})