const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; 
//todo 많으니까 배열로 저장하기 위해 변수 생성

function deleteToDo(event) {
    const btn = event.target;
    //이벤트가 일어난 버튼 반환
    const li = btn.parentNode;
    //버튼의 부모 반환
    toDoList.removeChild(li);
    //toDoList의 자식인 클릭된 li를 삭제.
    const cleanToDos = toDos.filter(function(toDo) {
       return toDo.id !== parseInt(li.id);
       //li.id 는 string이라 숫자로 변환하기 위해 parseInt
    });
    //filter는 배열 내 모든 요소에 함수를 돌려 조건에 맞는 값 새 배열로 반환
    toDos = cleanToDos;
    for (let i = 0; i < toDos.length; i++) {
        toDoList.children[i].id = i + 1;
        toDos[i].id = i + 1;
        }
        
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //localstorage는 string만 저장되므로 string으로 바꿔줘야 함.
}

function paintToDo(text) {
    const li = document.createElement("li");
    //li만드는 변수 생성.
    const delBtn = document.createElement("button");
    const span=document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo)
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

