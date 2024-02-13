const URL_STAGE = 'http://localhost:3010/stage'
const table = document.querySelector("#infostage");

const info_user = new URLSearchParams(URL_STAGE+"?token=%40&role=%40");

const get_stage = (info) => res = info
    .then(res => res.json())
    .then(json => constructTableProduct(json));

const constructTableProduct = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
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
    }
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
}

document.querySelector("#doc").addEventListener("change", read);

get_stage(info_user);