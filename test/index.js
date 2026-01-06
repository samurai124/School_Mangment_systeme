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
    { date: "2025-12-26", studentID: 1 },
    { date: "2025-12-27", studentID: 2 },
    { date: "2025-12-28", studentID: 3 },
    { date: "2025-12-26", studentID: 3 },
    { date: "2025-11-29", studentID: 3 },
    { date: "2025-10-29", studentID: 3 },
    { date: "2025-12-20", studentID: 3 },
];
const retards = [
    { date: "2025-12-26", studentID: 3, minutesLate: 10 },
    { date: "2025-12-27", studentID: 3, minutesLate: 10 },
    { date: "2025-12-28", studentID: 3, minutesLate: 10 },
    { date: "2025-11-28", studentID: 3, minutesLate: 10 },
    { date: "2025-10-28", studentID: 3, minutesLate: 10 }
];

let studentLates  = retards.filter((e)=> e.studentID == 3);
let studentAbsents = absents.filter((e)=> e.studentID == 3);





function fillCalender(year, month) {
    let calendar_container = document.querySelector('#calendar_container');
    calendar_container.innerHTML = "";
    let days = getDaysInMonth(year, month);
    let firstDay = getTheFirstDayOfTheMonth(year, month);

    for (let i = 0; i < firstDay; i++) {
        calendar_container.insertAdjacentHTML('beforeend', `<div class="calendar-cell bg-light"><span class="small fw-medium text-muted"></span></div>`);
    }

    for (let i = 1; i <= days; i++) {
        calendar_container.insertAdjacentHTML('beforeend', `<div class="calendar-cell"><span class="small fw-medium text-muted">${i}</span></div>`);
    }
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


