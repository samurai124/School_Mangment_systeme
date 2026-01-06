function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getTheFirstDayOfTheMonth(year, month) {
    const firstDayDate = new Date(year, month, 1);
    const dayOfWeek = firstDayDate.getDay();
    return dayOfWeek;
}
function getCurrentMonth(par = 0) {
    const now = new Date();
    now.setMonth(now.getMonth() + par);
    return now.getMonth();
}
function getCurrentYear(par = 0) {
    const now = new Date();
    now.setMonth(now.getMonth() + par);
    return now.getFullYear();
}
function getDayName(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (dayIndex < 0 || dayIndex > 6) {
        return "Invalid Day Index";
    }
    return days[dayIndex];
}
function getMonthName(monthIndex) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    if (monthIndex < 0 || monthIndex > 11) {
        return "Invalid Month Index";
    }
    return months[monthIndex];
}
















const absents = [
    // --- 2025 Data (Previous Year) ---
    { date: "2025-10-29", studentID: 3 },
    { date: "2025-11-29", studentID: 3 },
    { date: "2025-12-20", studentID: 3 },
    { date: "2025-12-26", studentID: 1 },
    { date: "2025-12-26", studentID: 3 },
    { date: "2025-12-27", studentID: 2 },
    { date: "2025-12-28", studentID: 3 },

    // --- 2026 Data (Current Year) ---
    { date: "2026-01-01", studentID: 3 }, // New Year's Day
    { date: "2026-01-15", studentID: 3 }, 
    { date: "2026-02-05", studentID: 3 },
    { date: "2026-02-28", studentID: 3 }, // Last day of Feb
    { date: "2026-03-15", studentID: 3 },
    { date: "2026-04-10", studentID: 3 },
    { date: "2026-05-20", studentID: 3 },
    
    // --- Specific Case: Leap Year 2024 ---
    { date: "2024-02-29", studentID: 3 } // Only shows if you scroll back to 2024
];

const retards = [
    // --- 2025 Data ---
    { date: "2025-10-28", studentID: 3, minutesLate: 10 },
    { date: "2025-11-28", studentID: 3, minutesLate: 15 },
    { date: "2025-12-10", studentID: 3, minutesLate: 5 },
    { date: "2025-12-26", studentID: 3, minutesLate: 10 },
    { date: "2025-12-27", studentID: 3, minutesLate: 10 },
    { date: "2025-12-28", studentID: 3, minutesLate: 20 },

    // --- 2026 Data ---
    { date: "2026-01-05", studentID: 3, minutesLate: 30 },
    { date: "2026-01-20", studentID: 3, minutesLate: 12 },
    { date: "2026-02-14", studentID: 3, minutesLate: 45 }, // Valentine's Day Late
    { date: "2026-03-01", studentID: 3, minutesLate: 10 },
    { date: "2026-06-15", studentID: 3, minutesLate: 60 }  // June test
];

let studentLates  = retards.filter((e)=> e.studentID == 3);
let studentAbsents = absents.filter((e)=> e.studentID == 3);




function fillCalender(year, month) {
    let calendar_container = document.querySelector('#calendar_container');
    calendar_container.innerHTML = "";
    
    let days = getDaysInMonth(year, month);
    let firstDay = getTheFirstDayOfTheMonth(year, month);
    
    let studentAbsentsperMonth = studentAbsents.filter((e) => new Date(e.date).getMonth() == month && new Date(e.date).getFullYear() == year);
    let studentLatesperMonth = studentLates.filter((e) => new Date(e.date).getMonth() == month && new Date(e.date).getFullYear() == year);

    for (let i = 0; i < firstDay; i++) {
        calendar_container.insertAdjacentHTML('beforeend', `<div class="calendar-cell bg-light"></div>`);
    }


    for (let i = 1; i <= days; i++) {
        let hasAbsent = studentAbsentsperMonth.some(e => new Date(e.date).getDate() === i);
        let hasLate = studentLatesperMonth.some(e => new Date(e.date).getDate() === i);
        
        let statusClass = "";
        let indicator = "";

        if (hasAbsent) {
            statusClass = "absent-unexcused";
            indicator = `<div onclick="ShowDetails(${year}, ${month}, ${i})" class="mt-1"><span class="badge bg-danger" style="font-size: 8px; cursor:pointer;">Absent</span></div>`;
        } else if (hasLate) {
            statusClass = "absent-excused";
            indicator = `<div onclick="ShowDetails(${year}, ${month}, ${i})" class="mt-1"><span class="badge bg-warning text-dark" style="font-size: 8px; cursor:pointer;">Late</span></div>`;
        }

        calendar_container.insertAdjacentHTML('beforeend', `
            <div class="calendar-cell ${statusClass}" onclick="ShowDetails(${year}, ${month}, ${i})">
                <span class="small fw-medium text-muted">${i}</span>
                ${indicator}
            </div>
        `);
    }
}

function ShowDetails(year, month, day) {
    let info_card = document.querySelector("#info_card");
    if(!info_card) return;
    const selectedDate = new Date(year, month, day);
    const dayName = getDayName(selectedDate.getDay());

    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const absentData = studentAbsents.find(a => a.date === dayStr);
    const lateData = studentLates.find(l => l.date === dayStr);

    let statusHtml = '<span class="badge bg-success-subtle text-success px-3 py-2">Present</span>';
    let reason = "Scheduled School Day";

    if (absentData) {
        statusHtml = '<span class="badge bg-danger-subtle text-danger px-3 py-2">Absent</span>';
        reason = "Family Emergency / Sick Leave";
    } else if (lateData) {
        statusHtml = `<span class="badge bg-warning-subtle text-warning px-3 py-2">Late (${lateData.minutesLate} mins)</span>`;
        reason = "Transportation Delay";
    }

    info_card.innerHTML = `
        <div class="card border-0 rounded-4 shadow-sm overflow-hidden sticky-top" style="top: 2rem;">
            <div class="p-4 bg-light border-bottom">
                <h3 class="fw-bold h5 mb-1">${getMonthName(month)} ${day}, ${year}</h3>
                <p class="text-muted small mb-0">${dayName} Detail</p>
            </div>
            <div class="card-body p-4">
                <div class="d-flex gap-3 mb-4">
                    <div class="bg-primary-subtle text-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style="width: 40px; height: 40px;">
                        <span class="material-symbols-outlined fs-5">info</span>
                    </div>
                    <div>
                        <p class="small fw-bold text-muted text-uppercase mb-0">Reason</p>
                        <p class="fw-medium mb-0">${reason}</p>
                    </div>
                </div>
                
                <div class="mb-4">
                    <p class="small fw-bold text-muted text-uppercase mb-2">Status</p>
                    ${statusHtml}
                </div>
                <button class="btn btn-outline-secondary w-100 py-2 fw-bold rounded-3">
                    Request Correction
                </button>
            </div>
        </div>`;
}












let counter = 0;
function toggleMonthsBackword() {
    counter--;
    let date_container = document.querySelector('#date_container');
    let year = getCurrentYear(counter);
    let month = getCurrentMonth(counter);
    let monthName = getMonthName(month);
    date_container.innerHTML = `${monthName} ${year}`;
    fillCalender(year, month);
}

function toggleMonthsForword() {
    counter++; 
    let date_container = document.querySelector('#date_container');
    let year = getCurrentYear(counter);
    let month = getCurrentMonth(counter);
    let monthName = getMonthName(month);
    date_container.innerHTML = `${monthName} ${year}`;
    fillCalender(year, month);
}

let previous_months = document.querySelector('#previous_months');
let comming_months = document.querySelector('#comming_months');
previous_months.addEventListener("click", () => {
    toggleMonthsBackword();
});

comming_months.addEventListener("click", () => {
    toggleMonthsForword();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM is ready!");
    let date_container = document.querySelector('#date_container');
    let year = getCurrentYear();
    let month = getCurrentMonth();
    let monthName = getMonthName(month);
    date_container.innerHTML = `${monthName} ${year}`;
    fillCalender(year, month);
});


