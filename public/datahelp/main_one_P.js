const URL_FOR_PRODUCTS = 'http://localhost:3010/products'
const table = document.querySelector("#prod");
const form_for_products = document.querySelector("#pform");
const form_for_armoire = document.querySelector("#aform");

let products_keys = ["id", "idType", "idArmoir", "DatePeremption"];
let type_product_keys = ["idType", "Nom", "ImageP", "LienFicheDeSecurite", "Pictogramme"];
let armoir_keys = ["idArmoir", "NomArmoire", "Localisation", "Image"];

const binary_table = [
    s1 = 0b000000001, 
    s2 = 0b000000010, 
    s3 = 0b000000100, 
    s4 = 0b000001000, 
    s5 = 0b000010000, 
    s6 = 0b000100000, 
    s7 = 0b001000000, 
    s8 = 0b010000000, 
    s9 = 0b100000000, 
];

const check_Produit={
    idType: /^[0-9]+$/,
    DatePeremption: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
};

let current_product;

const construct_picto = binary_seq => {
    let mot_picto = "";
    let i=1;
    for(let P of binary_table){
        if((binary_seq&P) == P){
            let pick = 'P'+i.toString()+'.jpg';
            mot_picto += '<img id="pic" src="'+pick+'">';
        }
        i+=1;
    }
    if(mot_picto == ""){
        mot_picto += "Produit non dangereux";
    }
    return mot_picto;
};

const load_P=()=>{
    let param = new URLSearchParams(document.location.search);
    fetch(URL_FOR_PRODUCTS+"?key=id&data="+param.get("id"))
    .then(res => res.json())
    .then(json => constructProduct(json));
}

const constructProduct=product=>{
    console.log(product);
    for(let item in product)
    {
        let affich = document.getElementById(item);
        if(item == 'Image'){
            let im = "http://localhost:3010/products"+product[item];
            affich.innerHTML = `<img id="imP" src="${im}">`;
        }
        else if(item == 'Pictogramme'){
            affich.innerHTML = construct_picto(product[item]);
        }
        else if(item == 'LienFichedeSecurite'){
            affich.innerHTML = `<a href="${product[item]}">Fiche de sécurité</a>`;
        }
        else{affich.innerHTML = item+'<br>'+product[item];}
    }
}


/*const get_more_of_P = () => {
    let new_user = {};
    let row = document.getElementById("user-" + current_product.id);
    let row_data = row.children;
    row_json = document.createElement("tr");
    row_json.id = "?-" + item.id;
    row_json.innerHTML = `
    <td>${item.id}</td>
    <td>${item.idType}</td>
    <td>${item.idArmoir}</td>
    <td>${item.DatePeremption}</td>
    ${picto}
    `;
    table.appendChild(row);
};*/