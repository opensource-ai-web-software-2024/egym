export function createExerciseProfile(exerciseInfo) {
    var exerciseProfile = document.createElement("div");
    exerciseProfile.id = "exercise-profile";
    
    var headline = document.createElement("h2");
    headline.textContent = "운동 프로필";
    exerciseProfile.appendChild(headline);

    var exerciseProfileTable = document.createElement("table");
    exerciseProfileTable.id = "exercise-profile-table";
    
    for (var key in exerciseInfo) {
        var tr = document.createElement("tr");
        
        var keyTd = document.createElement("td");
        keyTd.textContent = key;
        tr.appendChild(keyTd);

        var valueTd = document.createElement("td");
        valueTd.textContent = exerciseInfo[key];
        tr.appendChild(valueTd);

        exerciseProfileTable.appendChild(tr);
    }
        
    exerciseProfile.appendChild(exerciseProfileTable);
    return exerciseProfile;
}