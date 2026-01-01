let globalAppStudents = getStudents();
console.log(globalAppStudents);
const searchInput = document.querySelector('#search');
const searchbTN = document.querySelector('#search-btn');
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const group = document.querySelector('#group');
const saveBtn = document.querySelector('#saveBtn');
const tableBody = document.getElementById("studentsTable");
const statusInput = document.querySelector('#status');

//            -----------save data in local Storage-----------
function saveInfo() {
    let students = getStudents();
    const maxId = students.length > 0 ? Math.max(...students.map(s => s.id || 0)) : 0;
    students.push({ id: maxId + 1, name: fullName.value, email: email.value, group: group.value, status: statusInput.value });

    localStorage.setItem('students', JSON.stringify(students));
    studentsData = students;
    displayStudents();
}

saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    saveInfo();
    location.reload();
});



let studentsData = globalAppStudents;

//            ----------- search function -----------

function showSearch(data) {
    tableBody.innerHTML = '';

    data.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${student.name || student.fullName}</td>
          <td>${student.email}</td>
          <td>${student.group}</td>
          <td>${student.status}</td>
          <td>
            <i class="bi bi-eye me-3"></i>
            <i class="bi bi-pencil me-3"></i>
            <i class="bi bi-trash text-danger"></i>
          </td>
        `;

        tableBody.appendChild(row);
    });
}

const searchByName = function () {
    const filter = searchInput.value.toLowerCase().trim();

    const result = studentsData.filter(student =>
        (student.name || student.fullName).toLowerCase().includes(filter)
    );

    showSearch(result);
};

searchInput.addEventListener('input', searchByName);

function editStudent(id) {
    let student = globalAppStudents.find(item => item.id == id);
    if (student) {
        fullName.value = student.name;
        email.value = student.email;
        group.value = student.group;
        statusInput.value = student.status;
        const modal = new bootstrap.Modal(document.getElementById('addModal'));
        modal.show();
    }
}

function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        globalAppStudents = globalAppStudents.filter(s => s.id != id);
        localStorage.setItem("students", JSON.stringify(globalAppStudents));
        studentsData = globalAppStudents;
        displayStudents();
        location.reload(); 
    }
}

function displayStudents() {
    console.log(studentsData);
    tableBody.innerHTML = "";

    studentsData.forEach((student) => {
        tableBody.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.group}</td>
            <td>${student.status}</td>
            <td>  
                <i class="bi bi-trash text-danger"
                   style="cursor:pointer"
                   onclick="deleteStudent(${student.id})"></i>
            </td>
        </tr>
        `;
    });
}

function updateStats() {
    let activeStudents = globalAppStudents.filter((e) => e.status == "Actif" || e.status == "active");
    let nonActiveStudents = globalAppStudents.filter((e) => e.status == 'Inactif' || e.status == "nonActive");

    const totalEl = document.querySelector('#studentsTotal');
    const activeEl = document.querySelector('#activeStudents');
    const nonActiveEl = document.querySelector('#nonActiveStudents');

    if (totalEl) {
        totalEl.textContent = globalAppStudents.length;
    }
    if (activeEl) {
        activeEl.textContent = activeStudents.length;
    }
    if (nonActiveEl) {
        nonActiveEl.textContent = nonActiveStudents.length;
    }
}

updateStats();
displayStudents();


