const URL_FOR_PRODUCTS = 'http://localhost:3010/stage'
const table = document.querySelector("#products");
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
const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

const get_products = () => fetch(URL_FOR_PRODUCTS)
    .then(res => res.json())
    .then(json => constructTableProduct(json))
    .then(json => constructTableArmoire(json));

const construct_picto = binary_seq => {
    let mot_picto = "";
    let i=1;
    for(let P of binary_table){
        if(binary_seq&P == P){
            let pick = 'P'+i.toString()+'.jpg';
            mot_picto += '<td><img src="'+pick+'"></td>';
        }
        i += 1;
    }
    return mot_picto;
};

const constructTableProduct = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        let picto = construct_picto(item.Pictogramme);
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.idType}</td>
        <td>${item.idArmoir}</td>
        <td>${item.DatePeremption}</td>
        ${picto}
        `;
        table.appendChild(row); 
    }
};

const constructTableArmoire = tab => {
    table.innerHTML = "";
    for(let item of tab)
    {
        let row = document.createElement("tr");
        row.id = "?-" + item.id;
        row.innerHTML = `
        <td>${item.idArmoire}</td>
        <td>${item.NomArmoire}</td>
        <td>${item.Localisation}</td>
        <td>${item.Image}</td>
        `;
        table.appendChild(row); 
    }
};

form_for_products.addEventListener("submit", event => {
    let type_of_data = 'Produit';
    let rawdata = new FormData(form);
    let data = {};
    rawdata.forEach((value, key) => {
        if(value.match(check_Produit[key]) == null){
            document.getElementById("error").innerHTML = "Vérifiez les informations";
            event.preventDefault();
            return;
        }
        data[key] = value;
    });
    for(let input of document.querySelectorAll("form input:not([type='submit'])")){
        input.value = "";
    }
    let final_data = {type_of_data, data};
    event.preventDefault();
    return add_product(final_data);
});

form_for_armoire.addEventListener("submit", event => {
    let type_of_data = 'Armor';
    let rawdata = new FormData(form);
    let data = {};
    rawdata.forEach((value, key) => {
        if(value.match(check_Armor[key]) == null){
            document.getElementById("error").innerHTML = "Vérifiez les informations";
            event.preventDefault();
            return;
        }
        data[key] = value;
    });
    for(let input of document.querySelectorAll("form input:not([type='submit'])")){
        input.value = "";
    }
    let final_data = {type_of_data, data};
    event.preventDefault();
    return add_armoire(final_data);
});

const add_product = item => fetch(URL_FOR_PRODUCTS, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
})  .then(res=>res.text())
    .then(armor=>{
        alert("Votre produit a été placé dans l'armoire "+res+".");
    }).then(get_products);

const add_armoire = item => fetch(URL_FOR_PRODUCTS, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
})  .then(res=>res.text())
    .then(armor=>{
        alert("Votre produit a été placé dans l'armoire "+res+".");
    }).then(get_products);

get_products();