const URL_STAGE = 'http://localhost:3010/stage'
const grid = document.querySelector("#grid");


const param = new URLSearchParams(document.location.search);
const User="token="+param.get("token")+"&role="+param.get("role");

//Calls constructGrid by giving the datasets containing all the informations of the stage
const get_stage = () => {
    fetch((URL_STAGE+"?key=stageDetail&"+User+"&Id_Stage="+param.get("id")))
    .then(res => res.json())
    .then(json => constructGrid(json));
};

//Allows to construct the array containing the informations of the selected internship
const constructGrid = item => {
    let content = document.createElement("p");

    let name = document.querySelector("#Nom");
    name.innerHTML = "";
    content.innerText = `${item.Name}`;
    name.appendChild(content);
    content = document.createElement("p");

    let details = document.querySelector("#Detail");
    details.innerHTML = "";
    content.innerText = `${item.Detail}`;
    details.appendChild(content);
    content = document.createElement("p");

    let state = document.querySelector("#Statut");
    state.innerHTML = "";
    content.innerText = `${item.State}`;
    state.appendChild(content);
    content = document.createElement("p");

    let student = document.querySelector("#Stagiaire");
    student.innerHTML = "";
    content.innerText = `${item.Student}`;
    student.appendChild(content);
    content = document.createElement("p");

    let tutor = document.querySelector("#Tuteur");
    tutor.innerHTML = "";
    content.innerText = `${item.Tutor}`;
    tutor.appendChild(content);
    content = document.createElement("p");

    let teachers = document.querySelector("#Jury");
    teachers.innerHTML = "";
    content.innerText = `${item.Teacher}`;
    teachers.appendChild(content);
    content = document.createElement("p");

    let doc = document.querySelector("#CR");
    doc.innerHTML = "";
    content.innerHTML = `<a href=file/${item._id}/${item.CR}>${item.CR}</a>`;
    doc.appendChild(content);
    content = document.createElement("p");

    let grade = document.querySelector("#Note");
    grade.innerHTML = "";
    if(item.Note === undefined) content.innerText = "Pas de note";
    else content.innerText = `${item.Note}`;
    grade.appendChild(content);
    content = document.createElement("p");
};

//Allows to give a document to the database
const send_doc = async data => fetch(URL_STAGE, {
    method: "post",
    headers: {
        "Content-Type": "application/octet-stream"
    },
    body: data
});

//Allows to get a document from the database
const read = async () => {
    /** @type {File} */
    let file = document.querySelector("#doc").files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
        send_doc(reader.result);
    }
};

get_stage();