let currentAttendance = {};
let allStudents = [];

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    let students = JSON.parse(localStorage.getItem("students"));
    if (!students || students.length === 0) {
        students = [
            { id: 1, name: "Zaidi Hamza", email: "email@example.com", group: 2 },
            { id: 2, name: "Amina Benali", email: "amina@example.com", group: 1 },
            { id: 3, name: "Karim Safi", email: "karim@example.com", group: 2 },
            { id: 4, name: "Sara Toumi", email: "sara@example.com", group: 1 },
            { id: 5, name: "Mohamed Rami", email: "mohamed@example.com", group: 2 }
        ];
        localStorage.setItem("students", JSON.stringify(students));
    }

    allStudents = students;

    // 2. Initial Render
    renderStudents(allStudents);

    // 3. Attach Global Event Listeners
    document.getElementById("searchInput").addEventListener("input", cherecherEtudient);
    document.getElementById("saveBtn").addEventListener("click", saveAllAttendance);
}

function renderStudents(studentsToRender) {
    const studentsContainer = document.querySelector("#studentsContainer");
    studentsContainer.innerHTML = "";

    if (studentsToRender.length === 0) {
        studentsContainer.innerHTML = `<div class="text-white text-center opacity-50">Aucun étudiant trouvé</div>`;
        return;
    }

    studentsToRender.forEach((e, index) => {
        const domKey = `${e.id}-${index}`;
        const initials = e.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        const groupName = `statusGroup-${domKey}`;
        const currentStatus = currentAttendance[e.id]?.status;
        studentsContainer.insertAdjacentHTML('beforeend', `
            <div class="d-flex align-items-center justify-content-between p-3 mb-2" 
                style="background-color: #1a3761; border-radius: 15px; color: white;">
                <div class="d-flex align-items-center gap-3">
                    <div style="width: 45px; height: 45px; border-radius: 50%; background-color: #6f42c1; 
                                display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid rgba(255,255,255,0.2);">
                        ${initials}
                    </div>
                    <div>
                        <p class="mb-0" style="font-weight: 600; line-height: 1.2;">${e.name}</p>
                        <p class="mb-0 text-white-50" style="font-size: 0.85rem;">Groupe ${e.group}</p>
                    </div>
                </div>
                <div class="btn-group" role="group" aria-label="Status selection" style="background-color: #0d2142; padding: 4px; border-radius: 10px;">
                    <input type="radio" class="btn-check" name="${groupName}" id="present-${domKey}" autocomplete="off" 
                        ${currentStatus === 'Present' ? 'checked' : ''} onchange="selectStatus(${e.id}, 'Present', '${domKey}')">
                    <label class="btn btn-sm btn-outline-success border-0 px-3" for="present-${domKey}" style="border-radius: 8px !important;">Present</label>
                    
                    <input type="radio" class="btn-check" name="${groupName}" id="absent-${domKey}" autocomplete="off" 
                        ${currentStatus === 'Absent' ? 'checked' : ''} onchange="selectStatus(${e.id}, 'Absent', '${domKey}')">
                    <label class="btn btn-sm btn-outline-danger border-0 px-3" for="absent-${domKey}" style="border-radius: 8px !important;">Absent</label>
                    
                    <input type="radio" class="btn-check" name="${groupName}" id="retard-${domKey}" autocomplete="off" 
                        ${currentStatus === 'Retard' ? 'checked' : ''} onchange="selectStatus(${e.id}, 'Retard', '${domKey}')">
                    <label class="btn btn-sm btn-outline-warning border-0 px-3" for="retard-${domKey}" style="border-radius: 8px !important;">Retard</label>
                </div>
            </div>
            <div id="retard-form-container-${domKey}"></div>
        `);
    });
}

function cherecherEtudient() {
    const searchTerm = document.querySelector("#searchInput").value.trim().toLowerCase();
    if (searchTerm === "") {
        renderStudents(allStudents);
        return;
    }
    const filteredStudents = allStudents.filter(e =>
        e.name.toLowerCase().includes(searchTerm)
    );
    renderStudents(filteredStudents);
}

function selectStatus(studentId, status, domKey) {
    const formContainer = document.getElementById(`retard-form-container-${domKey}`);
    if (formContainer) formContainer.innerHTML = "";
    if (status === "Retard") {
        currentAttendance[studentId] = { status: "Retard" };
        formOflates(studentId, domKey);
    } else {
        currentAttendance[studentId] = { status: status };
    }
}

function formOflates(studentId, domKey) {
    const container = document.getElementById(`retard-form-container-${domKey}`);
    if (!container) return;
    const currentTime = new Date().toTimeString().slice(0, 5);
    container.innerHTML = `
        <div class="p-3 mb-3 shadow-sm fade-in-up" style="background-color: #0d2142; border-radius: 15px; border-left: 5px solid #ffc107; color: white;">
            <div class="row g-3 align-items-end">
                <div class="col-md-3">
                    <label class="form-label small text-white-50">Heure d'arrivée</label>
                    <input type="time" id="time-${domKey}" value="${currentTime}" class="form-control form-control-sm" 
                          style="background: #1a3761; border: 1px solid rgba(255,255,255,0.1); color: white;">
                </div>
                <div class="col-md-6">
                    <label class="form-label small text-white-50">Motif du retard</label>
                    <input type="text" id="motive-${domKey}" placeholder="Raison..." class="form-control form-control-sm" 
                          style="background: #1a3761; border: 1px solid rgba(255,255,255,0.1); color: white;">
                </div>
                <div class="col-md-3 d-flex gap-2">
                    <button class="btn btn-sm btn-warning w-100 fw-bold" onclick="saveLateData(${studentId}, '${domKey}')">Valider</button>
                    <button class="btn btn-sm btn-outline-light" onclick="cancelRetard(${studentId}, '${domKey}')">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function cancelRetard(studentId, domKey) {
    const container = document.getElementById(`retard-form-container-${domKey}`);
    if (container) container.innerHTML = "";
    delete currentAttendance[studentId];
    const groupName = `statusGroup-${domKey}`;
    const radios = document.getElementsByName(groupName);
    radios.forEach(r => r.checked = false);
}

function saveLateData(studentId, domKey) {
    const timeInput = document.getElementById(`time-${domKey}`);
    const motiveInput = document.getElementById(`motive-${domKey}`);
    const arrivalTime = timeInput.value;
    const motive = motiveInput.value.trim();
    if (!arrivalTime || !motive) {
        alert("Veuillez remplir l'heure et le motif du retard.");
        return;
    }
    currentAttendance[studentId] = {
        status: "Retard",
        time: arrivalTime,
        motive: motive
    };
    const container = document.getElementById(`retard-form-container-${domKey}`);
    if (container) {
        container.innerHTML = `
            <div class="text-center py-2 text-warning animate-pulse">
                <i class="fa-solid fa-check-circle"></i> Retard noté à ${arrivalTime}
            </div>
        `;
    }
}

function saveAllAttendance() {
    let absents = JSON.parse(localStorage.getItem("absents")) || [];
    let retards = JSON.parse(localStorage.getItem("retards")) || [];
    const todayDate = new Date().toISOString().split('T')[0]; 
    let countSaved = 0;
    for (const [studentId, data] of Object.entries(currentAttendance)) {
        const id = parseInt(studentId);
        if (data.status === 'Absent') {
            absents.push({
                date: todayDate,
                studentID: id
            });
            countSaved++;
        } else if (data.status === 'Retard') {
            retards.push({
                date: todayDate,
                studentID: id,
                minutesLate: 0, 
                arrivalTime: data.time,
                motive: data.motive
            });
            countSaved++;
        }
    }
    localStorage.setItem("absents", JSON.stringify(absents));
    localStorage.setItem("retards", JSON.stringify(retards));
    if (countSaved > 0) {
        alert(`Succès ! ${countSaved} entrées enregistrées.`);
        currentAttendance = {};
        renderStudents(allStudents);
    } else {
        alert("Aucun changement (Absent/Retard) à enregistrer.");
    }
}
