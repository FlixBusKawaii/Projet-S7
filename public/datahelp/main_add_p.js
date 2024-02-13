const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
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

const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

form_for_products.addEventListener("submit", event => {
    let type_of_data = 'Produit';
    let rawdata = new FormData(form_for_products);
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
    let final_data = {key:type_of_data, data:data};
    event.preventDefault();
    return add_product(final_data);
});

const add_product = item => fetch(URL_FOR_PRODUCTS, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
})  .then(res=>res.text())
    .then(res=>{
        if(!isNaN(parseInt(res)))
        {
            alert("Votre produit a été placé dans l'armoire "+res+".");
        }
        else{
            alert(res);
        }
})
    .then(document.location.href="recap_produit.html");

const construct_picto = binary_seq => {
    let mot_picto = "<td>";
    let i=1;
    for(let P of binary_table){
        if((binary_seq&P) == P){
            let pick = 'P'+i.toString()+'.jpg';
            mot_picto += '<img id="more" src="'+pick+'">';
        }
        i+=1;
    }
    if(mot_picto == "<td>"){
        mot_picto += "Produit non dangereux";
    }
    mot_picto += "</td>";
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
        <td>${item.Nom}</td>
        <td><img id="more" src="http://localhost:3010${item.Image}"></td>
        ${picto}
        <td><a href="detailled_product.html?id=${item.id}"><img id="more" src="more.svg"></a></td>
        `;
        table.appendChild(row); 
    }
};

const get_type_products = () => fetch(URL_FOR_PRODUCTS+"?key=Type")
    .then(res => res.json())
    .then(json => constructTableProduct(json));