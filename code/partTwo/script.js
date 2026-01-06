
// ================== here is our data ==================
let students = JSON.parse(localStorage.getItem("students")) || [];
let absents = JSON.parse(localStorage.getItem("absents")) || [];
let retards = JSON.parse(localStorage.getItem("retards")) || [];
let studentsData = JSON.parse(localStorage.getItem("student")) || [];
let connectedStudent = JSON.parse(localStorage.getItem('currentApprenantId'));

console.log('connected user: ', connectedStudent);

// ================== selection HTML elements ==================
const recordedDays = document.getElementById("recorded-days");
const absences = document.getElementById("absences");
const retard = document.getElementById("retard");
const Rate = document.getElementById("Attendance-Rate");
const studentName = document.getElementById('userName');
const group = document.getElementById('group');
const statuss = document.getElementById('status')

// ================== function that shows data ==================
function dashboard() {
    studentName.textContent = connectedStudent.name;
    const getStatus = students.find(
        s => s.name.toLowerCase() === connectedStudent.name.toLowerCase()
    )?.status;

    statuss.textContent = getStatus || "N/A";
    console.log('tttttttttttt', getStatus);

    const getGroup = students.find(s => s.name === connectedStudent.name)?.group
    group.textContent = getGroup;

    const getAbsent = absents.filter(item => item.name === connectedStudent.name)
    absences.textContent = getAbsent.length

    const getRetard = retards.filter(item => item.name === connectedStudent.name);
    retard.textContent = getRetard.length;

        const days = new Set([
        ...absents.map(a => a.date),
        ...retards.map(r => r.date)
    ]);
    recordedDays.textContent = days.size;

    const totalEvents = getAbsent.length + getRetard.length;
    const attendanceRate = Math.max(100 - totalEvents * 5, 0);
    Rate.textContent = `${attendanceRate}%`;


    const retardTest = retards.filter(r => r.name == connectedStudent.name);
    const retardTable = document.getElementById('retard-table');

    retardTable.innerHTML = "";
console.log(retardTest);
    if (retardTest.length === 0) {
        retardTable.innerHTML = `
    <tr>
      <td colspan="4" class="text-center text-muted py-3">
        Aucun retard enregistré
      </td>
    </tr>
  `;
    } else {
        retardTest.slice(-3).forEach(r => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
      <td class="ps-4 fw-bold">${new Date().toLocaleDateString("fr-FR")}</td>
      <td>
        <span class="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill">
          Retard
        </span>
      </td>
      <td>${r.arrivalTime}</td>
      <td>${r.motive || "-"}</td>
    `;

            retardTable.appendChild(tr);
        });
    }

}
dashboard();