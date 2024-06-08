// 한글 출력을 위해 변환
const keyMapping = {
	targetMuscleGroup: "타겟 부위",
	exerciseType: "운동 유형",
	equipmentRequired: "필요 장비",
	mechanics: "기술",
	forceType: "힘의 유형",
	experienceLevel: "경험 수준",
	secondaryMuscles: "보조 근육",
};

export function createExerciseProfile(exerciseInfo) {
	console.log("운동 정보", exerciseInfo);

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

		keyTd.textContent = keyMapping[key];
		tr.appendChild(keyTd);

		var valueTd = document.createElement("td");
		valueTd.textContent = exerciseInfo[key];
		tr.appendChild(valueTd);

		exerciseProfileTable.appendChild(tr);
	}

	exerciseProfile.appendChild(exerciseProfileTable);
	return exerciseProfile;
}
