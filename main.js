const express = require("express");
let bodyParser = require("body-parser");
const fileUpload=require("express-fileupload");
const path=require("path");
const URL_STAGE = 'http://localhost:3010/stage'
const port = 2500;

let app = express();

app.use(express.raw())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
    createParentPath:true
}));

app.get("/",(req,res) => {
    res.redirect("identify.html");
});

app.post("/main",(req,res) => {
    writeFileSync("/public/doc.pdf", req.body)
    res.sendStatus(200);
});

app.post("/connexion",async (req,res) => {
    let type_of_data = 'id';
    let rawdata = req.body;
    console.log(rawdata);
    let data = {};
    
    for (key in rawdata){
        value=rawdata[key];
        //if(value.match(/**/) == null){
            //document.getElementById("error").innerHTML = "Identifiants incorrects";
            //event.preventDefault();
            //return;
        //}
        data[key] = value;
        //if(key='mdp'){
            //sha512(data[key]);
        //}
    };
    let final_data = {key:type_of_data, data:data};
    let get_info = await send(final_data);
    if(get_info.ok){
        let info_data = await get_info.json();
        console.log(info_data);
        res.redirect("hub.html?token="+info_data.Token+"&role="+info_data.role);
    }
    else{
        res.redirect("identify.html");
        return;
    }

    
});

app.post("/file", async (req,res)=>{
    try{
        const file= req.files.doc;
        console.log(file);
        const savePath=path.join(__dirname,"file",req.query.id,file.name);

        if(file.mimetype!=="application/pdf"){
            throw new Error('Only pdf are supported');
        }

        let data={key:"file",data:{token:req.query.token,role:req.query.role,id:req.query.id,file:file.name}}
        let rep=await send(data)
        if(rep.ok) await file.mv(savePath);
        else throw new Error("Can't save file in DB")

        const User="token="+req.query.token+"&role="+req.query.role;
        res.redirect("/finish.html?"+User);


    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`API launched on ${2500}`);
})

const send= item => fetch(URL_STAGE, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
})