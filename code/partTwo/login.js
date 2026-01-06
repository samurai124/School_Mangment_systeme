const login = document.querySelector("#login");
const fullNameInput = document.querySelector("#identifiant");
// let studentsData = JSON.parse(localStorage.getItem("student")) || [];
let students = JSON.parse(localStorage.getItem("students")) || [];
// console.log(students);

login.addEventListener("click", function (e) {
  e.preventDefault();
  console.log('test');

  const fullName = fullNameInput.value.trim().toLowerCase();

  if (fullName === "") {
    alert("Please enter your full name");
    return;
  }

  if (students.length === 0) {
    alert("No learners found in the system")
    return;
  }

  const apprenant = students.find(a =>a.name ==fullName);

  if (!apprenant) {
    alert("Learner not found")
    return;
  }
  
  JSON.stringify(localStorage.setItem("currentApprenantId", JSON.stringify(apprenant)))
  window.location.href = "dashboard.html";
});
