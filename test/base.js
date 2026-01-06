
    const initialStudents = [
        { id: 1, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 2, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 3, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 4, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 5, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 6, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 7, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 8, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 9, name: "Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
        { id: 10, name:"Zaidi Hamza", email: "email@example.com", group: 2, status: "active" },
    ];
    const absents = [
        { date: "2025-12-26", studentID: 1 },
        { date: "2025-12-27", studentID: 2 },
        { date: "2025-12-28", studentID: 3 },
        { date: "2025-12-29", studentID: 3 },
        { date: "2025-12-29", studentID: 3 },
        { date: "2025-12-29", studentID: 3 },
        { date: "2025-12-29", studentID: 3 },
    ];

const retards = [
    { date: "2025-12-26", studentID: 3, minutesLate: 10 },
    { date: "2025-12-27", studentID: 4, minutesLate: 10 },
    { date: "2025-12-28", studentID: 5, minutesLate: 10 }
];

function getStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    return students;
}
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


const newStudent = {
    id: 11,
    name: "New Hamza",
    email: "email@example.com",
    group: 1
};

function addStudent(newStudent) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
}


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







