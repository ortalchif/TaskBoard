const myKey = "storedTask";

function resetForm() {
  const taskInputVal = (document.getElementById("taskInput").value = "");
  const dateInputVal = (document.getElementById("dateInput").value = "");
  const timeInputVal = (document.getElementById("timeInput").value = "");
}
////////////////////////////////////////////////////////////////////////
function validation() {
  //this function check if the date&time fields are full, and return boolean var if it does or doesn't
  var flag = true;
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");

  if (taskInput.value.length === 0) {
    alert("Task field is required");
    taskInput.focus();
    event.preventDefault();
    flag = false;
  }
  if (dateInput.value.length === 0) {
    alert("Date field is required");
    dateInput.focus();
    event.preventDefault();
    flag = false;
  }
  return flag;
}
////////////////////////////////////////////////////////////////////////////
function createNote() {
  var valid;
  valid = save();
  if (valid == false) {
    return;
  }
  const taskArray = loadUserTask();
  createAndAppendNoteToHTML(
    taskArray[taskArray.length - 1].task,
    taskArray[taskArray.length - 1].dueDate,
    taskArray[taskArray.length - 1].dueTime,
    taskArray[taskArray.length - 1].idNum
  );
}
////////////////////////////////////////////////////////////////////////////
function createAndAppendNoteToHTML(task, dueDate, dueTime, idNum) {
  const divContent = document.getElementById("content");
  const Textarea = document.createElement("TEXTAREA");
  const spanDate = document.createElement("SPAN");
  const spanTime = document.createElement("SPAN");
  const deleteBtn = document.createElement("BUTTON");
  const div = document.createElement("DIV");
  div.className = "noteStyle";
  divContent.appendChild(div);
  div.appendChild(Textarea);
  div.appendChild(spanDate);
  div.appendChild(document.createElement("br"));
  spanDate.className = "spanDateClass";
  div.appendChild(spanTime);
  spanTime.className = "spanTimeClass";
  div.appendChild(deleteBtn);
  deleteBtn.classList = "bi-x-circle-fill";

  var idNum = idNum;
  deleteBtn.addEventListener("click", function () {
    deleteNote(idNum);
  });

  Textarea.innerText = task;
  spanDate.innerText = dueDate;
  spanTime.innerText = dueTime;
}
/////////////////////////////////////////////////////////////////////////////////
function deleteNote(idNum) {
  //console.log("im in delete func");
  var idNumNoteForDelete = idNum; // מספר הזהות של הפתק אותו אני רוצה למחוק
  const arrayFromLocalStorage = loadUserTask(); // אני רוצה לקבל את המערך של המשימות האחסון ולמחוק ספציפית פתק מסוים לפי הת.ז שלו
  console.log("need to delete:" + idNumNoteForDelete + " idNum"); //הוא מזהה את מי צריך למחוק
  console.log("local storage before delete: ");
  console.log(arrayFromLocalStorage);

  for (var j = 0; j < arrayFromLocalStorage.length; j++) {
    if (arrayFromLocalStorage[j].idNum === idNumNoteForDelete) {
      arrayFromLocalStorage.splice(j, 1);
      console.log("local storage after delete: ");
      console.log(arrayFromLocalStorage);
      const userTaskNewArray = JSON.stringify(arrayFromLocalStorage);
      localStorage.setItem(myKey, userTaskNewArray);
      location.reload();
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////
function save() {
  var valid;
  valid = validation();
  if (valid == false) {
    return false;
  }

  const taskInputVal = document.getElementById("taskInput").value;
  const dateInputVal = document.getElementById("dateInput").value;
  const timeInputVal = document.getElementById("timeInput").value;

  const idNumOfTsk = Math.floor(Math.random() * 1000) + 1;
  const userTask = {
    task: taskInputVal,
    dueDate: dateInputVal,
    dueTime: timeInputVal,
    idNum: idNumOfTsk,
  };
  const savedTaskArrayJson = localStorage.getItem(myKey);
  let userTaskArray =
    savedTaskArrayJson === null ? [] : JSON.parse(savedTaskArrayJson);
  userTaskArray.push(userTask);

  const userTaskArrayJson = JSON.stringify(userTaskArray);
  localStorage.setItem(myKey, userTaskArrayJson);
  return true;
}
//////////////////////////////////////////////////////////////////////////////
function loadUserTask() {
  const savedTaskArrayJson = localStorage.getItem(myKey);
  let taskArray =
    savedTaskArrayJson === null ? [] : JSON.parse(savedTaskArrayJson);
  return taskArray;
}
//////////////////////////////////////////////////////////////////////////////
function loadPage() {
  const taskArray = loadUserTask();
  for (var i = 0; i <= taskArray.length - 1; i++) {
    createAndAppendNoteToHTML(
      taskArray[i].task,
      taskArray[i].dueDate,
      taskArray[i].dueTime,
      taskArray[i].idNum
    );
  }
}
