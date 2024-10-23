let row= 100;
let columns =27;

//head row 
const headRow = document.querySelector(".head-row");
for(let i=0;i<columns;i++){
    let headCell = document.createElement("div");
    if(i===0){
        headRow.appendChild(headCell);
        continue;
    }
    
    headCell.innerText =String.fromCharCode(i+64);
    headCell.classList.add("col-head");
    headRow.appendChild(headCell);
}


//serial no-col
const snoCol = document.querySelector(".serial-no");
for(let i=0; i<row; i++){
    let headColCell = document.createElement("div");
    headColCell.innerText = i+1;
    headColCell.classList.add("sno-col");
    snoCol.appendChild(headColCell);
}

//body 

const body = document.querySelector(".body");

for(let i=1;i<=row;i++){

    let rowCell = document.createElement("div");
    rowCell.classList.add("row");

    for(let j=1;j<columns;j++){
        let colCell = document.createElement("span");
        colCell.classList.add("cell");
        colCell.contentEditable= "true";
        colCell.id = `${String.fromCharCode(j+64)}${i}`;
        rowCell.appendChild(colCell);
    }

    body.appendChild(rowCell);
}


//events
let selectedCell="";
let activeCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("#options-form");
const expressionInput = document.querySelector("#expression");

let state ={};
let defaultState ={
    innerText:"",
    fontFamily:"Default",
    fontSize :"16",
    isBold: false,
    isItalic : false,
    isUnderlined: false,
    align: "left",
    textColor: "#000000",
    backGroundColor:"#ffffff",
}

function applyCellInfoToForm(){
    if(!state[selectedCell.id]){
        // console.log(defaultState);
        syncFormOptions(defaultState);
        form.reset();
        return;
    }

    syncFormOptions(state[selectedCell.id])
}

function syncFormOptions(selectedCellState){

    for(let key in selectedCellState){
        if(key==="isBold" || key==="isItalic" || key==="isUnderlined"){
            form[key].checked = selectedCellState[key];
            // console.log(form)
        }

        else{
            form[key].value = selectedCellState[key];
            // console.log(form)
        }   
    }

}


body.addEventListener("click",(e)=>{
    // console.log(e.target);
    if(selectedCell){
        selectedCell.classList.remove("active-cell");
    }
    selectedCell = e.target;
    selectedCell.classList.add("active-cell");
    activeCellElement.innerText = selectedCell.id;
    // console.log("selectedcellID---", selectedCell.id)
    applyCellInfoToForm();
})

//events forms , link them , eval div creation;



form.addEventListener("change", ()=>{
    // console.log("event triggered");
    if(!selectedCell){
        alert("please select cells");
        form.reset();
        return;
    }

    const formData = {
        fontFamily : form["fontFamily"].value,
        fontSize : form["fontSize"].value,
        isBold : form["isBold"].checked,
        isItalic : form["isItalic"].checked,
        isUnderlined : form["isUnderlined"].checked,
        align : form["align"].value,
        textColor : form["textColor"].value,
        backGroundColor : form["backGroundColor"].value,
    }

    state[selectedCell.id] = {...formData, innerText:selectedCell.innerText};
    console.log(state);

    // console.log(formData);

    applyStylesToSelectedCell(formData);
})

function applyStylesToSelectedCell(formData){
    selectedCell.style.fontSize = formData.fontSize +"px";
    selectedCell.style.fontFamily = formData.fontFamily;
    selectedCell.style.fontWeight = formData.isBold ? "bold":"normal";
    selectedCell.style.fontStyle = formData.isItalic?"italic":"normal";
    selectedCell.style.textDecoration = formData.isUnderlined?"underline":"none";
    selectedCell.style.textAlign = formData.align;
    selectedCell.style.color = formData.textColor;
    selectedCell.style.backgroundColor = formData.backGroundColor;  
} 

//eval-div - eval()


expressionInput.addEventListener("keyup", (e)=>{
    // console.log(e);
    if(e.key==="Enter"){
        const result = eval(e.target.value);
        selectedCell.innerText = result;
    }
})

