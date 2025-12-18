let students = [];
const searchInput = document.querySelector('#search');
const searchbTN = document.querySelector('#search-btn');
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const group = document.querySelector('#group');
const saveBtn = document.querySelector('#saveBtn');
// const noActive = document.querySelector('#noActive').value;
const statusInput = document.querySelector('#status');
// searchInput.addEventListener('')
// const students = [
//     { id: 1, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 2, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 3, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 4, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 5, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 6, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 7, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 8, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 9, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
//     { id: 10, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
// ]

//            ----------- search function -----------
const searchByName = function () {
    const filter = searchInput.value.toLowerCase();

    const result = students.filter(student =>
        students.name.toLowerCase().include(filter)
    )
    showSearch(result);

    console.log(result);
}


function showSearch(data) {
    studentTable.textContent = '';

    data.forEach(student => {
        const row = document.createElement('tr');

        row.textContent = `
            <td>${student.name} ${student.lname}</td>
            <td>${student.email || ''}</td>
            <td>${student.group}</td>
        `;
        studentTable.appendChild(row);
    });
}

searchInput.addEventListener('input', searchByName);


let students_serialized = JSON.stringify(students);
console.log(students);
//            -----------save data in local Storage-----------
function saveInfo() {
    students = JSON.parse(localStorage.getItem('student')) || [];
    students.push({ fullName: fullName.value, email: email.value, group: group.value, status : statusInput.value  })
    localStorage.setItem('student', JSON.stringify(students))
};

saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('test');
    saveInfo();
});

const tableBody = document.getElementById("studentsTable");

let studentsData = JSON.parse(localStorage.getItem("student")) || [];
console.log(students);


function displayStudents() {
    tableBody.innerHTML = ""; // clear table

    studentsData.forEach((student, index) => {
        tableBody.innerHTML += `
        <tr>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.group}</td>
            <td> ${student.status} </td>
        <td>  
            <i class="bi bi-eye me-3"></i>
            <i class="bi bi-pencil me-3"></i>
            <i class="bi bi-trash text-danger"></i>
        </td>
      </tr>
    `;
    });
}

displayStudents();
