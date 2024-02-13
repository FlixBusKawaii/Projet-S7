const URL_STAGE = 'http://localhost:3010/stage'
const form_id = document.querySelector("#idform");
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');

form_id.addEventListener("submit", async event => {
    let type_of_data = 'id';
    let rawdata = new FormData(form_id);
    let data = {};
    rawdata.forEach((value, key) => {
        if(value.match(/**/) == null){
            document.getElementById("error").innerHTML = "Identifiants incorrects";
            event.preventDefault();
            return;
        }
        data[key] = value;
        if(key='mdp'){
            sha512(data[key]);
        }
    });
    for(let input of document.querySelectorAll("form input:not([type='submit'])")){
        input.value = "";
    }
    let final_data = {key:type_of_data, data:data};
    let get_info = await send_id(final_data);
    if(get_info.ok){
        let info_data = await get_info.json();
        document.location.href="hub.html?token=@"+info_data.token+"&role=@"+info_data.role;
        return;
    }
    else{
        document.getElementById("error").innerHTML = "Identifiants incorrects";
        event.preventDefault();
        return;
    }
});

const send_id = item => fetch(URL_STAGE, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
})