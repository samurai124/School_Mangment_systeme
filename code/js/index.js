// toggle button function :
document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("#toggleBtn");
    
    if (toggleBtn) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.toggle("collapsed");
        }
    }
});

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


// how to get the students list 

// Toggle button function
document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("#toggleBtn");

    if (toggleBtn) {
        const sidebar = document.getElementById("sidebar");
        sidebar?.classList.toggle("collapsed");
    }
});

// 1️⃣ Get students list safely
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display students
students.forEach(student => {
    console.log(student);
});


// 2️⃣ Add / Update students list
const newStudent = {
    id: 11,
    name: "New Hamza",
    email: "email@example.com",
    group: 1
};

students.push(newStudent);

// Save back to localStorage
localStorage.setItem("students", JSON.stringify(students));


