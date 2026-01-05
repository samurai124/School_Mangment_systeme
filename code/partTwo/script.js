let students = JSON.parse(localStorage.getItem("students")) || [];
console.log(students);
let absents = JSON.parse(localStorage.getItem("absents")) || [];
console.log(absents);
let retards = JSON.parse(localStorage.getItem("retards")) || [];
let studentsData = JSON.parse(localStorage.getItem("student")) || [];
let connectedStudent = JSON.parse(localStorage.getItem('currentApprenantId'));
console.log('connected user: ', connectedStudent.name);

const recordedDays = document.getElementById("recorded-days");
const absences = document.getElementById("absences");
const retard = document.getElementById("retard");
const Rate = document.getElementById("Attendance-Rate");
const studentName = document.getElementById('userName');
const group = document.getElementById('group');
const statuss = document.getElementById('status')


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
    console.log(attendanceRate);
    Rate.textContent = `${attendanceRate}%`;

    const pieCtx = document.getElementById("pieChart");

    new Chart(pieCtx, {
        type: "pie",
        data: {
            labels: ["Absent", "Retard"],
            datasets: [{
                data: [getAbsent.length, getRetard.length],
                backgroundColor: ["#dc3545", "#2a7d19ff"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

dashboard()