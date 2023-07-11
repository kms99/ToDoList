let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let tabItems = document.querySelectorAll(".tab-container div");
let underBar = document.getElementById("under-line");
let clock = document.getElementById("time");
let mode = "all";
let taskList = [];
let filterList =[];
let list = [];

for(let i=1;i<tabItems.length;i++){
    tabItems[i].addEventListener("click",function(event){ChangeMode(event)});  
    tabItems[i].addEventListener("click",function(){
        for(let j=1; j<tabItems.length;j++){
            if (j==i){
                tabItems.item(j).style.fontWeight = 'bold';
            }else{
                tabItems.item(j).style.fontWeight = 300;
            }
        }
    });  
}

userInput.addEventListener("focus",function(){
    userInput.value="";
})

userInput.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        AddTask();
    }
})

function getTime(){
    let date = new Date();
    let month = date.getMonth()+1>= 10 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
    let day = date.getDate()>= 10 ? date.getDate() : '0' + date.getDate();
    let hours = date.getHours()>= 10 ? date.getHours() : '0' + date.getHours();
    let minutes = date.getMinutes()>= 10 ? date.getMinutes() : '0' + date.getMinutes()
    let seconds = date.getSeconds()>= 10 ? date.getSeconds() : '0' + date.getSeconds()

    clock.innerHTML = `<h5>${month}월 ${day}일</h5>
    <h3>${hours} : ${minutes} : ${seconds}</h3>`
}

function init() {
    getTime();
    setInterval(getTime, 1000);
  }
  

function ChangeMode(event){
    filterList =[];
    mode = event.target.id;
    if(mode == "all"){
        GenList();
        return;
    }else if(mode == "notDone"){
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].check == false){
                filterList.push(taskList[i]);
            }
        }
    }else if(mode == "done"){
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].check == true){
                filterList.push(taskList[i]);
            }
        }
    }

    GenList();
}

tabItems.forEach((obj) =>
    obj.addEventListener("click",(e)=>UnderBarEvent(e)));

function UnderBarEvent(obj){
    underBar.style.left = obj.currentTarget.offsetLeft + "px";
    underBar.style.width = obj.currentTarget.offsetWidth + "px";
    underBar.style.top = obj.currentTarget.offsetTop+obj.currentTarget.offsetHeight + "px";

}

function AddTask(){
    if (userInput.value ==""){
        return;
    }
    let taskItems = {
        id : IdGenerator(),
        value : userInput.value,
        check : false
    };
    taskList.push(taskItems);
    if(mode !="done"){
        filterList.push(taskItems);
    }
    GenList();
    userInput.value="";
}

function GenList(){
    list = [];
    let addHtml = "";
    if(mode == "all"){
        list = taskList;
    }else if(mode == "notDone" || mode == "done"){
        list = filterList;
    }

    for(let i=0; i<list.length;i++){
        if(list[i].check==true){
            addHtml+=`<div class="task-list-check">
        <div class="checked-event">${list[i].value}</div>
        <div>
            <button onClick="CheckTask('${list[i].id}')"><i class="fa-solid fa-rotate-left checked-icon"></i></button>
            <button onClick="DeleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can trash-icon"></i></button>
        </div>
        </div>`
        }else{
            addHtml+=`<div class="task-list">
        <div>${list[i].value}</div>
        <div>
            <button onClick="CheckTask('${list[i].id}')"><i class="fa-solid fa-check unchecked-icon"></i></button>
            <button onClick="DeleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can trash-icon"></i></button>
        </div>
        </div>`
        }
        
    }

    document.getElementById("task-list-container").innerHTML = addHtml;
}

function IdGenerator(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function CheckTask(id){
    for(let i=0; i<taskList.length;i++){
        if(id == taskList[i].id){
            taskList[i].check = !taskList[i].check;
            break;
        }
    }
    GenList();
}

function DeleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(id == taskList[i].id){
            taskList.splice(i,1);
            break;
        }
    }

    for(let i=0; i<filterList.length;i++){
        if(id == filterList[i].id){
            filterList.splice(i,1);
            break;
        }
    }

    GenList();
}

addButton.addEventListener("click",AddTask);
init();