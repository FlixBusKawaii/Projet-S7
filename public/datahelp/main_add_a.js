const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#products");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const check_Armor={
    NomArmoire: /^[A-Za-z0-9-_]+$/,
    Localisation: /^[A-Za-z0-9-_]+$/,
};



form_for_armoire.addEventListener("submit", event => {
    let type_of_data = 'Armor';
    let rawdata = new FormData(form_for_armoire);
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
    let final_data = {key:type_of_data, data:data};
    event.preventDefault();
    return add_armoire(final_data);
});

const add_armoire = item => fetch(URL_FOR_PRODUCTS, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
}).then(()=>
        {alert("L'armoire a été placé.");
        document.location.href="recap_armoire.html";});