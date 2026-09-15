let todos = [{
    id: Date.now(),
    text: "Go ",
    isCompleted: false
},
{
    id: Date.now() + 1,
    text: "Go to gym",
    isCompleted: true
},
{
    id: Date.now() + 2,
    text: "Go to gym",
    isCompleted: false
}];
let form = document.querySelector("#form");
let list = document.querySelector("#list");
let inp = document.querySelector("#inp");
let formbtn = document.querySelector("#form-button")
let tcount = document.querySelector("#t-count")
let ccount = document.querySelector("#c-count")
let editId = null;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formbtn.textContent === "Add") {
        let val = inp.value.trim();
        if (!val) return
        let newVal = {
            id: Date.now(),
            text: val,
            isCompleted: false
        }
        todos.push(newVal);
        addToList(newVal)
        inp.value = "";
    }
    if (formbtn.textContent === "Update") {
        todos.forEach((todo) => {
            if (todo.id === Number(editId)) {
                todo.text = inp.value;
            }
        })
        // console.log(todos); 
        listpush();
        formbtn.textContent = "Add";
        inp.value = "";
    }
})
function listpush() {
    list.innerHTML = "";
    todos.forEach((todo) => {
        addToList(todo)
    })
    tcount.textContent=`Tasks (${todos.length})`
    ccount.textContent= `Completed :${todos.filter((todo)=>todo.isCompleted).length}`
}
listpush();
function addToList(todo) {
    let li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = 'flex gap-2 border border-slate-300 p-4 rounded-md'
    li.innerHTML =
        `<input data-id=${todo.id} ${todo.isCompleted ? "checked" : ""} type="checkbox">
            <p class="flex-1 ${todo.isCompleted ? "line-through" : ""}">${todo.text}</p>
            <div>
                <button data-action="edit" data-id=${todo.id} >Edit</button>
                <button data-action="delete" data-id=${todo.id} >Delete</button>
            </div>`
    list.append(li);
}

list.addEventListener("click", (e) => {
    let li = e.target.closest('li');
    let btn = e.target.closest('button');
    let action = btn?.dataset.action;
    let id = li?.dataset?.id;
    let checkbox = e.target.closest('input[type="checkbox"]')
    //    console.log(btn?.dataset.action);

    if (action === "edit") {
        // console.log("editing");
        let currentTodo = todos.find((todo) => {
            if (todo.id === Number(id)) {
                editId = todo.id;
                return todo;
            }
        })
        inp.value = currentTodo.text
        formbtn.textContent = "Update"
    }
    if (action === "delete") {
        console.log("deleting");
        deleteTodo(e, id);
    }
    if (checkbox) {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        })
        // console.log(todos);
        listpush();
    }
})
function deleteTodo(e, id) {
    e.target.closest("li").remove()
    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo;
        }
    })
}