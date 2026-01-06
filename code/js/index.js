
document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("#toggleBtn");
    if (toggleBtn) {
        // Toggle the sidebar itself (inside the imported NavBar.html content)
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.toggle("collapsed");
        }

        // Toggle the spacer container in the main page
        const spacer = document.getElementById("navbar");
        if (spacer) {
            spacer.classList.toggle("collapsed");
        }
    }
});




function localStorageSettings() {
    localStorage.clear();
    // students list :
    // const initialStudents = [
    //     { id: 1, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 2, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 3, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 4, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 5, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 6, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 7, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 8, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 9, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    //     { id: 10, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    // ];

    if (!localStorage.getItem("students")) {
        localStorage.setItem("students", JSON.stringify(initialStudents));
    }


    // absent list
  
    if (!localStorage.getItem("absents")) {
        localStorage.setItem("absents", JSON.stringify(absents));
    }
}

// students list :
// const students = [
//     {id : 1, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 2, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 3, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 4, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 5, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 6, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 7, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 8, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id : 9, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
//     {id :10, name : "Zaidi Hamza" , email : "email@example.com" , group : 2},
// ]
// localStorage.setItem("students", JSON.stringify(students));


// const students= JSON.parse(localStorage.getItem("students"));

// students.forEach(element => {
//     console.log(element);
// });


// absent list
// const absents = [
//     { date: "2025-12-17", studentID: 1 },
//     { date: "2025-12-17", studentID: 2 },
//     { date: "2025-12-16", studentID: 3 },
//     { date: "2025-12-15", studentID: 3 },
//     { date: "2025-12-15", studentID: 3 },
//     { date: "2025-12-18", studentID: 3 },
//     { date: "2025-12-18", studentID: 3 },
// ];




//localStorage.setItem("absents",JSON.stringify(absents));
// retard list 
// const retards = [
//     { date: "2025-12-26", studentID: 3, minutesLate: 10 },
//     { date: "2025-12-27", studentID: 4, minutesLate: 10 },
//     { date: "2025-12-28", studentID: 5, minutesLate: 10 }
// ];
if (!localStorage.getItem("retards")) {
    localStorage.setItem("retards", JSON.stringify(retards));
}


//localStorage.setItem("retards",JSON.stringify(retards));
// let students = JSON.parse(localStorage.getItem("students")) || [];
// console.log('all:  ',students);
    let students = JSON.parse(localStorage.getItem("students")) || [];

function getStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    return students;
}
const data=getStudents()
console.log(data);
function getAbsents() {
    let absents = JSON.parse(localStorage.getItem("absents")) || [];
    return absents;
}
function getAbsentsBydates(date) {
    let absents = JSON.parse(localStorage.getItem("absents")) || [];
    absents = absents.filter((e) => e.date == date) || [];
    return absents;
}
function getRetards() {
    let retards = JSON.parse(localStorage.getItem("retards")) || [];
    return retards;
}

function getRetardsBydate(date) {
    let retards = JSON.parse(localStorage.getItem("retards")) || [];
    retards = retards.filter((e) => e.date == date) || [];
    return retards;
}


// const newStudent = {
//     id: 11,
//     name: "New Hamza",
//     email: "email@example.com",
//     group: 1
// };

function addStudent(newStudent) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
}


// enregistrer un retard

const newRetard = {
    date: "2025-12-18",
    studentID: 4,
    minutesLate: 10
}
function enregistrerRetard(newRetard) {
    let retards = JSON.parse(localStorage.getItem("retards")) || [];
    retards.push(newRetard);
    localStorage.setItem("retards", JSON.stringify(retards));
}



// enregistrer un absent
const newAbsent = {
    date: "2025-12-18",
    studentID: 4,
    minutesLate: 10
}
function enregistrerAbsent(newAbsent) {
    let absents = JSON.parse(localStorage.getItem("absents")) || [];
    absents.push(newAbsent);
    localStorage.setItem("absents", JSON.stringify(absents));
}

function getDayDate(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

