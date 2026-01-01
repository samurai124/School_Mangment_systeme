const login = document.querySelector("#login");
const fullNameInput = document.querySelector("#identifiant");
let studentsData = JSON.parse(localStorage.getItem("student")) || [];
console.log(studentsData);

login.addEventListener("click", function (e) {
  e.preventDefault();
  console.log('test');

  const fullName = fullNameInput.value.trim().toLowerCase();

  if (fullName === "") {
    alert("Please enter your full name");
    return;
  }

  if (studentsData.length === 0) {
    alert("No learners found in the system")
    return;
  }

  const apprenant = studentsData.find(a => {
    const storedFullName = `${a.fullName}`.toLowerCase();
    return storedFullName === fullName;
  });

  if (!apprenant) {
    alert("Learner not found")
    return;
  }
  localStorage.setItem("currentApprenantId", apprenant.id);

  window.location.href = "dashboard.html";
});
