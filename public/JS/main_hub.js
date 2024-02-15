const URL_STAGE = 'http://localhost:3010/stage'
const table = document.querySelector("#tablestage");


const param = new URLSearchParams(document.location.search);
const User="token="+param.get("token")+"&role="+param.get("role");



const get_stage = () => {
    fetch((URL_STAGE+"?key=stage&"+User))
    .then(res => res.json())
    .then(json => constructTableProduct(json));
};

const constructTableProduct = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        console.log(item.bonus);
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.Nom}</td>
        <td>${item.Statut}</td>
        <td><a href="main_page.html?id=${item.id}&${User}"><img src="more.svg"></a></td>
        <td><a href=${item.bonus.action}?id=${item.id}&${User}>${item.bonus.nom}</a></td>
        `;
        table.appendChild(row); 
    }
};

get_stage();