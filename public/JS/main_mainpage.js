const URL_STAGE = 'http://localhost:3010/stage'
const table = document.querySelector("#infostage");


const param = new URLSearchParams(document.location.search);
const User="token="+param.get("token")+"&role="+param.get("role");


const get_stage = () => {
    fetch((URL_STAGE+"?key=stageDetail&"+User+"&Id_Stage="+param.get("id")))
    .then(res => res.json())
    .then(json => constructTableProduct(json));
};

const constructTableProduct = item => {
    table.innerHTML = "";
    
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.Nom}</td>
        <td>${item.Statut}</td>
        <td>${item.Stagiaire}</td>
        <td>${item.Tuteur}</td>
        <td>${item.Jury}</td>
        <td>${item.Rapport}</td>
        <td>${item.Eval}</td>
        `;
        table.appendChild(row); 
    
};

const send_doc = async data => fetch(URL_STAGE, {
    method: "post",
    headers: {
        "Content-Type": "application/octet-stream"
    },
    body: data
});

const read = async () => {
    /** @type {File} */
    let file = document.querySelector("#doc").files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
        send_doc(reader.result);
    }
};

get_stage();