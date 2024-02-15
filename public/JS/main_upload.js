//When the internship is loaded, this function get IDs and all the informations needed
window.onload = (event) => {

    const param = new URLSearchParams(document.location.search);
    const User="token="+param.get("token")+"&role="+param.get("role");

    document.getElementById("form").action="/file?id="+param.get("id")+"&"+User;

    console.log("Page is fully loaded");
};