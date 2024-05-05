var todoList = []
var comdoList = [];
var remList = [];
var addButton = document.getElementById("ekle")
var todoInput = document.getElementById("gorev-giris")
var deleteAllButton = document.getElementById("hepsini-sil")
var allTodos = document.getElementById("tum-gorev");
var deleteSButton = document.getElementById("biteni-sil")



addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)


document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'biten' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'sil' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
    if (e.target.className.split(' ')[0] == 'duzenle' || e.target.className.split(' ')[0] == 'di') {
        duzenleTodo(e)
    }
    if (e.target.id == "hepsi") {
        viewAll();
    }
    if (e.target.id == "devam") {
        viewRemaining();
    }
    if (e.target.id == "biten") {
        viewCompleted();
    }

})
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete

    })
    remList = todoList.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();

}


function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("👋 hey isim kısmını boş bırakamzsınız")
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";
    update();
    addinmain(todoList);
}


function editTask(button) {
    const span = button.previousElementSibling;
    const newTaskName = prompt("Enter new task name:", span.textContent);
    if (newTaskName !== null) {
      span.textContent = newTaskName;
    }
  }


function addinmain(todoList) {
    allTodos.innerHTML = ""
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="gorev-oge">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="gorev-yap">

                 <button class="duzenle btn btn-success">
                ⚙️
                </button>
                <button class="biten btn btn-success">
                    ✔️
                </button>

                <button class="sil btn btn-error" >
                    ✖️
                </button>
                
            </div>
        </li>`
        allTodos.innerHTML += x
    });
}



function duzenleTodo(e) {
    var renamed = e.target.parentElement.parentElement.getAttribute('id');
  var newTodoName = prompt('Yeni görev adını girin:');

  if (newTodoName !== null && newTodoName.trim() !== '') {
    todoList.forEach((obj) => {
      if (obj.id == renamed) {
        obj.task = newTodoName;  
        var taskElement = e.target.parentElement.parentElement.querySelector("#task");
        taskElement.textContent = newTodoName;
        taskElement.classList.remove("line");
      }
    });

    update();
    addinmain(todoList);
  }

}

function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(todoList);

}

function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    })

    update();
    addinmain(todoList);
}


function deleteAll(todo) {

    todoList = []

    update();
    addinmain(todoList);

}

function deleteS(todo) {

    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(todoList);

}


function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {

    addinmain(remList);
}
function viewAll() {
    addinmain(todoList);
}