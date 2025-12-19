const students = [
  { id: 1, name: "Amal bas", group: "Groupe 4 · ID #001", initials: "MC" },
  { id: 2, name: "Nouhayla mac", group: "Groupe 4 · ID #002", initials: "FI" },
  { id: 3, name: "Sara char", group: "Groupe 3 · ID #010", initials: "SH" },
];


let presenceData = JSON.parse(localStorage.getItem("presenceData")) || {};


let retardStudentId = null;

const studentsContainer = document.getElementById("studentsContainer");
const searchInput = document.getElementById("searchInput");
const dateInput = document.getElementById("date");
const retardBox = document.getElementById("retardBox");
const retardTimeInput = document.getElementById("retardTime");
const retardMotifInput = document.getElementById("retardMotif");
const saveRetardBtn = document.getElementById("saveRetardBtn");
const saveBtn = document.getElementById("saveBtn");


function setTodayDate() {
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
}
setTodayDate();


function displayStudents(filter = "") {
  studentsContainer.innerHTML = "";

 
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    studentsContainer.innerHTML =
      `<p class="text-center text-gray-400">Aucun étudiant trouvé.</p>`;
    return;
  }

  filtered.forEach(s => {
    
    const date = dateInput.value;
    const presence = presenceData[date]?.[s.id] || { status: "Present" };

    
    function btnClass(status) {
      if (presence.status === status) {
        switch (status) {
          case "Present":
            return "bg-green-500";
          case "Absent":
            return "bg-red-500";
          case "Retard":
            return "bg-yellow-400 text-black";
        }
      }
      return "bg-transparent border border-white/30 hover:bg-white/20";
    }

    const studentDiv = document.createElement("div");
    studentDiv.className =
      "bg-[#0b1d3a] p-4 rounded-xl flex justify-between items-center";

    studentDiv.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
          ${s.initials}
        </div>
        <div>
          <p class="font-semibold">${s.name}</p>
          <p class="text-sm text-gray-400">${s.group}</p>
        </div>
      </div>

      <div class="flex bg-[#16345c] p-1 rounded-lg gap-1">
        <button
          class="px-4 py-1 rounded ${btnClass("Present")}"
          onclick="selectStatus(${s.id}, 'Present')"
          data-student-id="${s.id}"
          data-status="Present"
        >
          Present
        </button>
        <button
          class="px-4 py-1 rounded ${btnClass("Absent")}"
          onclick="selectStatus(${s.id}, 'Absent')"
          data-student-id="${s.id}"
          data-status="Absent"
        >
          Absent
        </button>
        <button
          class="px-4 py-1 rounded ${btnClass("Retard")}"
          onclick="selectStatus(${s.id}, 'Retard')"
          data-student-id="${s.id}"
          data-status="Retard"
        >
          Retard
        </button>
      </div>
    `;

    studentsContainer.appendChild(studentDiv);
  });
}


function selectStatus(studentId, status) {
  const date = dateInput.value;
  if (!date) {
    alert("Veuillez sélectionner une date !");
    return;
  }

  if (!presenceData[date]) presenceData[date] = {};

  if (status === "Retard") {
   
    retardStudentId = studentId;
    const pres = presenceData[date][studentId] || {};
    
    retardTimeInput.value = pres.time || "";
    retardMotifInput.value = pres.motif || "";
    retardBox.classList.remove("hidden");
  } else {
  
    retardStudentId = null;
    retardBox.classList.add("hidden");
    presenceData[date][studentId] = { status };
    saveLocalStorage();
    displayStudents(searchInput.value);
  }
}


saveRetardBtn.addEventListener("click", () => {
  const time = retardTimeInput.value.trim();
  const motif = retardMotifInput.value.trim();

  if (!time || !motif) {
    alert("Merci de remplir toutes les informations du retard !");
    return;
  }

  const date = dateInput.value;
  presenceData[date][retardStudentId] = {
    status: "Retard",
    time,
    motif,
  };

  saveLocalStorage();
  retardBox.classList.add("hidden");
  displayStudents(searchInput.value);
});


saveBtn.addEventListener("click", () => {
  const date = dateInput.value;
  if (!date) {
    alert("Veuillez sélectionner une date !");
    return;
  }

 
  if (!retardBox.classList.contains("hidden")) {
    alert("Veuillez enregistrer les informations du retard avant de continuer !");
    return;
  }

  alert("Présence enregistrée pour le " + date + " !");
  saveLocalStorage();
});


function saveLocalStorage() {
  localStorage.setItem("presenceData", JSON.stringify(presenceData));
}


searchInput.addEventListener("input", (e) => {
  displayStudents(e.target.value);
});


dateInput.addEventListener("change", () => {
  displayStudents(searchInput.value);
});


displayStudents();
