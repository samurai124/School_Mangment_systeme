document.addEventListener("click", (e) => {
    // Check if the clicked element is the toggle button or inside it
    const toggleBtn = e.target.closest("#toggleBtn");
    
    if (toggleBtn) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.toggle("collapsed");
        }
    }
});

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

const students= JSON.parse(localStorage.getItem("students"));

students.forEach(element => {
    console.log(element);
});