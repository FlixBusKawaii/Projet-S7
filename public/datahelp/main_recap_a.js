const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#armor");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

const binary_table = [
    0b000000001, 
    0b000000010, 
    0b000000100, 
    0b000001000, 
    0b000010000, 
    0b000100000, 
    0b001000000, 
    0b010000000, 
    0b100000000, 
];

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const check_Armor={
    NomArmoire: /^[A-Za-z0-9-_]+$/,
    Localisation: /^[A-Za-z0-9-_]+$/,
};

const get_armoires = () => fetch(URL_FOR_PRODUCTS+"?key=Armor")
    .then(res => res.json())
    .then(json => constructTableArmoire(json));

const constructTableArmoire = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        let row = document.createElement("tr");
        row.id = "?-" + item.idArmoire;
        row.innerHTML = `
        <td>${item.idArmoire}</td>
        <td>${item.NomArmoire}</td>
        <td>${item.Localisation}</td>
        <td><a href="detailled_armor.html?id=${item.idArmoire}"><img id="more" src="more.svg"></a></td>
        `;
        table.appendChild(row); 
    }
};

get_armoires();