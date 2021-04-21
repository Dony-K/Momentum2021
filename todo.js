const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; 
//todo 많으니까 배열로 저장하기 위해 변수 생성

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //localstorage는 string만 저장되므로 string으로 바꿔줘야 함.
}

function paintToDo(text) {
    const li = document.createElement("li");
    //li만드는 변수 생성.
    const delBtn = document.createElement("button");
    delBtn.innerText="❌"
    const span=document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    //li내에 span을 자식으로 생성
    li.appendChild(delBtn);
    li.id = newId;
    //지울 때 리스트 번호로 지우기 위해..
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
        //local storage에도 저장하기 위해 id 부여
    }
    toDos.push(toDoObj);
    //toDos 배열에 입력값을 객체형태로 저장.
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    //paintToDo로 값 넘겨보내고 input 초기화
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

