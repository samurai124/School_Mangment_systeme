function tauxAbsenceParJour(date) {
    const students = getStudents();
    const absents = getAbsents();
    if (students.length === 0) return 0;
    const absentsDuJour = absents.filter(a => a.date === date);
    const taux = (absentsDuJour.length / students.length) * 100;
    return taux.toFixed(0);
}

function tauxRetardsParJour(date) {
    const students = getStudents();
    const retards = getRetards();
    if (students.length === 0) return 0;
    const retardsDuJour = retards.filter(a => a.date === date);
    const taux = (retardsDuJour.length / students.length) * 100;
    return taux.toFixed(0);
}

function tauxPresenceParJour(date) {
    const students = getStudents();
    const absents = getAbsents();
    if (students.length === 0) return 0;
    const absentsDuJour = absents.filter(a => a.date === date);
    const presents = students.length - absentsDuJour.length;
    const taux = (presents / students.length) * 100;
    return taux.toFixed(0);
}

function top3Students(dataList) {
    const students = getStudents();
    const counter = {};
    dataList.forEach(item => {
        counter[item.studentID] = (counter[item.studentID] || 0) + 1;
    });
    return Object.entries(counter)
        .map(([id, total]) => {
            const student = students.find(s => s.id == id);
            return {
                id,
                name: student?.name || "Inconnu",
                group: student?.group || "?",
                total
            };
        })
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);
}

function renderTop3Row(item, index, type) {
    const initials = item.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const colors = ['#3b82f6', '#ef4444', '#eab308']; 
    const rankColor = colors[index] || '#6c757d'; 
    let badgeClass = '';
    let label = '';
    if (type === 'absent') {
        badgeClass = 'background: #9b1c1c; border-radius: 20px; padding: 5px 15px; font-size: 0.8rem;';
        label = 'absences';
    } else {
        badgeClass = 'background: #92400e; border: 1px solid #f59e0b; border-radius: 20px; padding: 5px 15px; font-size: 0.8rem;';
        label = 'retards';
    }

    return `
        <tr>
            <td style="background-color: #0d2142; padding: 12px; border-radius: 5px 0 0 5px;">${index + 1}</td>
            <td style="background-color: #0d2142; text-align: left; padding: 12px;">
                <span style="width: 35px; height: 35px; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10px; background: ${rankColor}; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${initials}</span>
                <div style="display: inline-block; vertical-align: middle;">
                    <span style="font-weight: 600; display: block; line-height: 1;">${item.name}</span>
                    <span style="font-size: 0.7rem; color: #cbd5e1;">Groupe ${item.group}</span>
                </div>
            </td>
            <td style="background-color: #0d2142; padding: 12px; border-radius: 0 5px 5px 0;">
                <span style="${badgeClass}">${item.total} ${label}</span>
            </td>
        </tr>
    `;
}

function updateStates() {
    const today = getDayDate(); 
    document.querySelector("#taux_absence").innerText = `${tauxAbsenceParJour(today)}%`;
    document.querySelector("#taux_retards").innerText = `${tauxRetardsParJour(today)}%`;
    document.querySelector("#taux_presence").innerText =`${tauxPresenceParJour(today)}%`;
    const topAbsents = top3Students(getAbsents());
    const topRetards = top3Students(getRetards());
    const absentsBody = document.getElementById("top3AbsentsBody");
    if (absentsBody) {
        if (topAbsents.length === 0) {
            absentsBody.innerHTML = `<tr><td colspan="3" class="text-white-50 p-3">Aucune absence enregistrée</td></tr>`;
        } else {
            absentsBody.innerHTML = topAbsents.map((item, index) => renderTop3Row(item, index, 'absent')).join('');
        }
    }
    const retardsBody = document.getElementById("top3RetardsBody");
    if (retardsBody) {
        if (topRetards.length === 0) {
            retardsBody.innerHTML = `<tr><td colspan="3" class="text-white-50 p-3">Aucun retard enregistré</td></tr>`;
        } else {
            retardsBody.innerHTML = topRetards.map((item, index) => renderTop3Row(item, index, 'retard')).join('');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    updateStates();
});


console.log(tauxPresenceParJour(getDayDate()));
