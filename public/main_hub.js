const URL_STAGE = 'http://localhost:3010/stage'
const table = document.querySelector("#tablestage");

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
        <td><a href="main_page.html?id=${item.id}">${item.Nom}</a></td>
        <td>${item.Statut}</td>
        `;
        table.appendChild(row); 
    }
};

get_stage(info_user);