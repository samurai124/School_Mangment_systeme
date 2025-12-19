console.log(getDayDate(1));


const date_cards = document.querySelector("#date_cards");
for (let i = 1; i < 5; i++) {
    date_cards.insertAdjacentHTML('beforeend', `<div class="d-flex flex-column gap-2 bg-black p-2 rounded">
                    <div class="ps-2 text-white d-flex align-items-center justify-content-start gap-4">
                        <i class="fa-regular fa-calendar fs-4"></i>
                        <span>La date : ${getDayDate(i)}</span>
                    </div>
                    <div class="ps-5 text-secondary d-flex align-items-center justify-content-start gap-4">
                        <span>${getAbsentsBydates(getDayDate(i)).length} Absent</span>
                        <span>${getRetardsBydate(getDayDate(i)).length} Retards</span>
                        <span>${getStudents().length} Personne</span>
                    </div>
                    <div class=" ps-5 text-white d-flex align-items-center justify-content-start gap-4">
                        <button onclick = "showdetails('${getDayDate(i)}')" class="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                            <i class="fa-solid fa-eye"></i>
                            <span>Voir les détails</span>
                        </button>
                    </div>
                </div>`);
}


function showdetails(date) {
    const absents = getAbsentsBydates(date);
    const retards = getRetardsBydate(date);
    const students = getStudents();
    console.log(date);
    

    const container = document.querySelector("#details_container");
    container.innerHTML = "";

    container.insertAdjacentHTML('afterbegin', `
        <div class="d-flex align-items-center justify-content-between mb-3 pb-4 text-white border-bottom">
            <h4 class="m-0">Details : <span>${date}</span></h4>
        </div>
        <div class="d-flex flex-column gap-2">
            <h5 class="text-danger">Absent :</h5>
            ${absents.map(element => {
        const student = students.find(s => s.id === element.studentID);
        return `
                <div class="d-flex flex-row justify-content-between bg-black p-2 rounded">
                    <div class="d-flex flex-row gap-3">
                        <div class="bg-secondary px-2 rounded d-flex align-items-center">
                            <i class="fa-solid fa-user fs-1"></i>
                        </div>
                        <div class="d-flex flex-column justify-content-between p-2 fs-5">
                            <span class="text-white">${student.name}</span>
                            <div class="text-secondary">
                                <span>Group: ${student?.group ?? "N/A"}</span>
                                <span class="ms-2">ID: ${element.studentID}</span>
                            </div>
                        </div>
                    </div>
                    <div class="align-self-center p-2 fs-5 text-white bg-danger rounded-pill">
                        Absent
                    </div>
                </div>`;
    }).join("")}
        </div>
        <div class="d-flex flex-column gap-2 mt-3">
            <h5 class="text-warning">Retards :</h5>
            ${retards.map(element => {
        const student = students.find(s => s.id === element.studentID);
        return `
                <div class="d-flex flex-row justify-content-between bg-black p-2 rounded">
                    <div class="d-flex flex-row gap-3">
                        <div class="bg-secondary px-2 rounded d-flex align-items-center">
                            <i class="fa-solid fa-user fs-1"></i>
                        </div>
                        <div class="d-flex flex-column justify-content-between p-2 fs-5">
                            <span class="text-white">${student.name}</span>
                            <div class="text-secondary">
                                <span>Group: ${student?.group ?? "N/A"}</span>
                                <span class="ms-2">ID: ${element.studentID}</span>
                            </div>
                        </div>
                    </div>
                    <div class="align-self-center p-2 fs-5 text-white bg-warning rounded-pill">
                        Retard
                    </div>
                </div>`;
    }).join("")}
        </div>
    `);
}
