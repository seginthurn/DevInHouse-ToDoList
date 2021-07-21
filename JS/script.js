/* Início do código */
var taskId;
showDate();

/* Verifica estado do localStorage e cria elemento TaskId */
if (!localStorage.getItem("taskId")) {
    localStorage.setItem("taskId", 0);
    taskId = 0;
} else {
    taskId = localStorage.getItem("taskId");
    loadTask();
}

/* Início das variáveis e eventos: */
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", getTask);

/* Início das funções: */

/* Coleta a informação da tarefa do campo */
function getTask(event) {
    var taskInput = document.querySelector("input#taskInputField");
    const taskValue = taskInput.value;
    event.preventDefault();
    if (taskInput.value) {
        newTask(taskValue);
    }
    taskInput.value = null;
    taskInput.focus();

}

/* Cria um novo ID para a tarefa: */

function newTaskId() {
    var newId = parseInt(localStorage.getItem("taskId"));
    newId = newId += 1;
    localStorage.setItem("taskId", newId);
    taskId = newId;
    return newId;
}

/* Deleta o elemento da Página */
function deleteTask(cardId) {
    const taskCard = document.getElementById('card-' + cardId);
    const cardParent = taskCard.parentNode;
    var delConfirm = confirm("Você realmente deseja excluir esta atividade?");
    if (delConfirm) {
        cardParent.removeChild(taskCard);
        localStorage.removeItem(cardId);
    }

}

/* Marca Elemento como Concluído */
function taskComplete(cardId) {
    const card = document.getElementById(cardId);
    const spanCard = document.getElementById("span-" + cardId);
    const checkbox = card.firstChild;
    var taskId = splitTask(cardId);
    var switcher = JSON.parse(localStorage.getItem(taskId));
    if (checkbox.checked) {
        spanCard.style.textDecoration = "line-through";
        spanCard.style.textDecorationColor = "grey";
        spanCard.style.color = "grey";
        switcher[2] = "true";
    } else {
        card.style.backgroundColor = "#F5F5F5";
        spanCard.style.textDecoration = "none";
        spanCard.style.color = "black";
        switcher[2] = "false";
    }
    switcher = JSON.stringify(switcher);
    localStorage.setItem(taskId, switcher);
}

/* Cria novo checkbox para nova tarefa / tarefa recrida */
function newCheckbox(newId) {
    console.log(newId);
    var newCheckbox = document.createElement('input');
    newCheckbox.type = "checkbox";
    newCheckbox.id = "checkbox-card-" + newId;
    newCheckbox.className = "checkbox-card";
    newCheckbox.setAttribute("onclick", "taskComplete('card-" + newId + "')");
    return newCheckbox;

}

/* Cria novo span para nova tarefa / tarefa recriada */
function newSpan(newId, taskValue) {
    var newSpan = document.createElement("span");
    newSpan.innerText = taskValue;
    newSpan.id = "span-card-" + newId;
    return newSpan;
}

/* Cria novo botão para nova tarefa / tarefa recriada */
function newButton(newId) {
    var newButton = document.createElement('button');
    newButton.id = "delete-card-" + newId;
    newButton.className = "delButton";
    newButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
    newButton.className = "deleteButton";
    newButton.setAttribute("onclick", "deleteTask(" + newId + ")");
    return newButton;
}


/* Armazena id e valor da Tarefa no local Storage  */
function setTask(taskId, taskValue) {
    localStorage.setItem(taskId, taskValue);
}


/* Cria nova tarefa */
function newTask(taskValue) {
    const newId = newTaskId(taskId);
    var target = document.getElementById('taskList');
    var newTask = document.createElement('div');
    var checkbox = newCheckbox(newId);
    var span = newSpan(newId, taskValue);
    var button = newButton(newId);
    var taskInfo;
    newTask.className = "card";
    newTask.id = "card-" + newId;
    target.appendChild(newTask);
    target.appendChild(newTask);
    newTask.appendChild(checkbox);
    newTask.appendChild(span);
    newTask.appendChild(button);
    taskInfo = ([newId, taskValue, "false"]);
    newInfo = JSON.stringify(taskInfo);
    setTask(newId, newInfo);
};

/* Carrega as Tarefas armazenadas no localStorage */

function loadTask() {
    for (i = 0; i < (taskId + 1); i++) {
        var loadedTask = localStorage.getItem(i);
        if (loadedTask != null) {
            var aux = JSON.parse(loadedTask);
            var loadedId = aux[0];
            var loadedTaskValue = aux[1];
            var taskIsDone = aux[2];
            recreateTasks(loadedId, loadedTaskValue, taskIsDone);
        }
    }
}

/* Recria as tarefas armazenadas no localStorage */
function recreateTasks(loadedId, loadedTaskValue, taskIsDone) {
    var target = document.getElementById('taskList');
    var newTask = document.createElement('div');
    var checkbox = newCheckbox(loadedId);
    var span = newSpan(loadedId, loadedTaskValue);
    var button = newButton(loadedId);
    newTask.className = "card";
    newTask.id = "card-" + loadedId;
    target.appendChild(newTask);
    newTask.appendChild(checkbox);
    newTask.appendChild(span);
    newTask.appendChild(button);
    if (taskIsDone == "true") {
        newTask.firstChild.checked = "true";
        span.style.textDecoration = "line-through";
        span.style.textDecorationColor = "grey";
        span.style.color = "grey";

    }
}

/* Separa o prefixo "card-" do valor da tarefa para ser utilizado nas funções */
function splitTask(cardId) {
    var cardSplitted = cardId.split("-", 2);
    console.log(cardSplitted);
    return cardSplitted[1];
}

function showDate() {
    var date = new Date();
    var weekDay = date.getDay();
    var newDay = date.getDate();
    var newMonth = date.getMonth();
    var newYear = date.getFullYear();
    weekDay = dayName(weekDay);
    newMonth = monthName(newMonth);



    var actualDay = document.getElementById("day-time");
    actualDay.innerText = weekDay + ", " + newDay + " de " + newMonth + " de " + newYear;

}


function dayName(dayNumb) {
    switch (dayNumb) {

        case 1:
            return "Segunda-Feira";

        case 2:
            return "Terça-Feira";

        case 3:
            return "Quarta-Feira";

        case 4:
            return "Quinta-Feira";

        case 5:
            return "Sexta-Feira";

        case 6:
            return "Sábado";

        case 7:
            return "Domingo";
    }
}

function monthName(monthNumb) {
    switch (monthNumb) {

        case 1:
            return "Janeiro";

        case 2:
            return "Fevereiro";

        case 3:
            return "Março";
        case 4:
            return "Abril";

        case 5:
            return "Maio";

        case 6:
            return "Junho";

        case 7:
            return "Julho";

        case 8:
            return "Agosto";

        case 9:
            return "Setembro";

        case 10:
            return "Outubro";

        case 11:
            return "Novembro";

        case 12:
            return "Dezembro";

    }
}

