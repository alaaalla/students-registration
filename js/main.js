var studentName = document.querySelector("#studentName");
var phoneNumber = document.querySelector("#phoneNumber");
var studentEmail = document.querySelector("#studentEmail");
var studentGPA = document.querySelector("#studentGPA");
var save = document.querySelector("#save");
save.addEventListener("click", saveUpdate);
var sort = document.querySelector("#sort");
sort.addEventListener("click", sortingStudents);
var counter;
var studentsList;
studentName.addEventListener("input", validateName);
phoneNumber.addEventListener("input", validateNumber);
studentEmail.addEventListener("input", validateEmail);
studentGPA.addEventListener("input", validateGPA);
var add = document.querySelector(".add");
add.addEventListener("click", addStudent);
var search = document.querySelector(".search");
search.addEventListener("input", function () { searchStudent(this.value) })
localStorage.getItem("studentsList") == null ? studentsList = [] : studentsList = JSON.parse(localStorage.getItem("studentsList"));
displayStudent(studentsList);
function addStudent() {
  var student = {
    name: studentName.value,
    phone: phoneNumber.value,
    email: studentEmail.value,
    GPA: studentGPA.value
  };
  if (validateName() && validateNumber() && validateEmail() && validateGPA()) {
    studentsList.push(student);
    localStorage.setItem("studentsList", JSON.stringify(studentsList));
    displayStudent(studentsList);
    validateName();
    validateNumber();
    validateEmail();
    validateGPA();
    clearInput();
    save.classList.add("d-none");
  }
}

function displayStudent(data) {
  var cartona = ``;
  for (var i = 0; i < data.length; i++) {
    cartona += `<tr>
            <td>${data[i].newName ? data[i].newName : data[i].name}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].email}</td>
            <td>${data[i].newGPA ? data[i].newGPA : data[i].GPA}</td>
            <td><button class="btn btn-warning" onclick ="Update(${i})">Update</button></td>
            <td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function Delete(index) {
  studentsList.splice(index, 1)
  localStorage.setItem("studentsList", JSON.stringify(studentsList));
  displayStudent(studentsList);
}

function clearInput() {
  studentName.value = '',
    phoneNumber.value = '',
    studentEmail.value = '',
    studentGPA.value = ''
};

function Update(index) {
  studentName.value = studentsList[index].name,
    phoneNumber.value = studentsList[index].phone,
    studentEmail.value = studentsList[index].email,
    studentGPA.value = studentsList[index].GPA,
    counter = index;
  save.classList.remove("d-none");
}

function saveUpdate() {
  studentsList[counter].name = studentName.value,
    studentsList[counter].phone = phoneNumber.value,
    studentsList[counter].email = studentEmail.value,
    studentsList[counter].GPA = studentGPA.value
  localStorage.setItem("studentsList", JSON.stringify(studentsList));
  displayStudent(studentsList);
  save.classList.add("d-none");
  clearInput();
}
function validateName() {
  var regex = /^[A-Z]/;
  if (regex.test(studentName.value)) {
    studentName.style.border = "none";
    document.getElementById("invalidName").classList.add("d-none");
    return true;
  }
  else {
    studentName.style.border = "solid 4px red";
    document.getElementById("invalidName").classList.remove("d-none");
    return false;
  }
}
function validateNumber() {
  var regex = /^(202)?01[0125][0-9]{8}$/
  if (regex.test(phoneNumber.value)) {
    phoneNumber.style.border = "none";
    document.getElementById("invalidNumber").classList.add("d-none");
    return true;
  }
  else {
    phoneNumber.style.border = "solid 4px red";
    document.getElementById("invalidNumber").classList.remove("d-none");
    return false;
  }
}
function validateEmail() {
  var regex = /^\w+\@\w+\.\w+/ig;
  if (regex.test(studentEmail.value)) {
    studentEmail.style.border = "none";
    document.getElementById("invalidEmail").classList.add("d-none");
    return true;
  }
  else {
    studentEmail.style.border = "solid 4px red";
    document.getElementById("invalidEmail").classList.remove("d-none");
    return false;
  }
}
function validateGPA() {
  var regex = /^[0-4](\.(\d{1}|\d{2}|\d{3}))?$/;
  if (regex.test(studentGPA.value)) {
    studentGPA.style.border = "none";
    document.getElementById("invalidGPA").classList.add("d-none");
    return true;
  }
  else {
    studentGPA.style.border = "solid 4px red";
    document.getElementById("invalidGPA").classList.remove("d-none");
    return false;
  }
}
function searchStudent(input) {
  var newstudentsList = [];
  for (var i = 0; i < studentsList.length; i++) {
    if (studentsList[i].name.toLowerCase().includes(input.toLowerCase())) {
      studentsList[i].newName = studentsList[i].name.replaceAll(input, `<span class="text-success">${input}</span>`)
      newstudentsList.push(studentsList[i]);
    }
    displayStudent(newstudentsList);
  }
}

function sortingStudents() {
  let temp;
  var newList = [];
  for (let i = 0; i < studentsList.length; i++) {
    for (let j = 0; j < studentsList.length - 1; j++) {
      if (studentsList[j].GPA < studentsList[j + 1].GPA) {
        temp = studentsList[j];
        studentsList[j] = studentsList[j + 1];
        studentsList[j + 1] = temp;
      }
    }
    newList.push(studentsList[i])
    displayStudent(newList);
  }
}

