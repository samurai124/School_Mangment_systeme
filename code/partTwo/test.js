let students = [
  {
    nom: "amine",
    prenom: "Bounou",
    retardTime: "5:50",
    absences: 5,
    retards: 3,
    presence: 20,
    group: "G1",
  },
  {
    nom: "Ali",
    prenom: "Bounou",
    retardTime: "7:20",
    absences: 4,
    retards: 6,
    presence: 18,
    group: "G2",
  },
  {
    nom: "Mohamed",
    prenom: "Bounou",
    retardTime: "2:45",
    absences: 8,
    retards: 2,
    presence: 15,
    group: "G3",
  },
  {
    nom: "Youssef",
    prenom: "Bounou",
    retardTime: "8:50",
    absences: 2,
    retards: 7,
    presence: 21,
    group: "G1",
  },
  {
    nom: "soufiane",
    prenom: "Bounou",
    retardTime: "4:00",
    absences: 2,
    retards: 3,
    presence: 11,
    group: "G2",
  },
];

function initDashboard() {
  const connectedName = localStorage.getItem("connectedUser");

  const user = students.find(
    (s) => s.nom.toLowerCase() === connectedName.toLowerCase()
  );

  if (user) {
    document.getElementById("userNameDisplay").textContent =
      user.nom + " " + user.prenom;
    document.getElementById("userGroup").textContent = user.group;
    document.getElementById("statAbsences").textContent = user.absences;
    document.getElementById("statRetards").textContent = user.retards;
    document.getElementById("lastRetardTime").textContent = user.retardTime;

    const totalDays = user.presence + user.absences;
    const rate = totalDays > 0 ? Math.round((user.presence / totalDays) * 100) : 0;

    document.getElementById("statTotalDays").textContent = totalDays;
    document.getElementById("statRate").textContent = rate + "%";

    const progressBar = document.getElementById("progressBar");
    const rateText = document.getElementById("statRate");

    progressBar.style.width = rate + "%";

    if (rate < 70) {
      progressBar.className = "bg-red-500 h-1.5 rounded-full";
      rateText.className = "text-3xl font-bold text-red-600 mt-2";
    } else {
      progressBar.className = "bg-green-500 h-1.5 rounded-full";
      rateText.className = "text-3xl font-bold text-green-600 mt-2";
    }
  } else {
    alert("Erreur: Utilisateur non trouvé dans la liste.");
  }
}
window.onload = initDashboard;