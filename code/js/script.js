let students = JSON.parse(localStorage.getItem('student')) || [];

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
    students = JSON.parse(localStorage.getItem('student')) || [];
    students.push({ fullName: fullName.value,  email: email.value, group: group.value, status: statusInput.value});

    localStorage.setItem('student', JSON.stringify(students));
    studentsData = students; 
    displayStudents();
}

saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('test');
    saveInfo();
});



let studentsData = JSON.parse(localStorage.getItem("student")) || [];


function displayStudents() {
    tableBody.textContent = "";

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

//            ----------- search function -----------

function showSearch(data) {
    tableBody.innerHTML = '';

    data.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${student.fullName}</td>
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
        student.fullName.toLowerCase().includes(filter)
    );

    showSearch(result);
};

searchInput.addEventListener('input', searchByName);

function editStudent(studentName){
    let student = students.find(item => item.fullName === studentName)

}

function displayStudents() {
    tableBody.innerHTML = "";

    studentsData.forEach((student, index) => {
        tableBody.innerHTML += `
        <tr>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.group}</td>
            <td>${student.status}</td>
            <td>  
                <i class="bi bi-pencil me-3 text-warning"
                   style="cursor:pointer"
                   onclick="editStudent(${index})"></i>

                <i class="bi bi-trash text-danger"></i>
            </td>
        </tr>
        `;
    });
}