
window.onload = (event) => {

    const param = new URLSearchParams(document.location.search);
    const User="token="+param.get("token")+"&role="+param.get("role");

    document.getElementById("finish").innerText="Votre document a été enregistrer";

    document.getElementById("after").href="hub.html?"+User

    console.log("page is fully loaded");
};