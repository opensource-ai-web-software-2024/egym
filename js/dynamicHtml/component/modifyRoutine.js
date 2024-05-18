import { readCsv } from "../../csvHandler/readCsv.js";

document.addEventListener("DOMContentLoaded", async function () {
	
	const result = await readCsv("exercise.csv"); // csv 읽어오기
    const datas = result.data;

	const exerciseSelect = document.getElementById("exercise"); // 운동 select elem 추가
	
	const exerciseDetails = document.getElementById("exercise-details");
	const exerciseName = document.createElement("p");
	exerciseName.id = "exercise-name";
	exerciseName.textContent = exerciseSelect.value;
	
	exerciseDetails.appendChild(exerciseName);
	
	document.getElementById("exercise-details").style.display = "block"; // 디스플레이

	datas.forEach((data) => {
		const option = document.createElement("option"); // 운동 option 추가
		option.textContent = data[0]; // 운동명 추가
		exerciseSelect.appendChild(option);
	});
	
	exerciseSelect.addEventListener("change", selectedExercise);
});

// 운동 세부정보 출력
function selectedExercise(event) {
	const selectedValue = event.target.value; // 페이지 처음 로드됐을 때도 출력하기 위해서 이렇게 수정함
	console.log(selectedValue);
	document.getElementById("exercise-name").textContent = selectedValue;


}

// 보기 좋은 테이블 생성
function generateTable(exerciseProfile) {
    const table = document.createElement("table");

    for (let key in exerciseProfile) {
        if (exerciseProfile.hasOwnProperty(key)) {
            const row = document.createElement("tr");

            const cell1 = document.createElement("th");
            cell1.textContent = key;

            const cell2 = document.createElement("td");
            cell2.textContent = exerciseProfile[key];

            row.appendChild(cell1);
            row.appendChild(cell2);

            table.appendChild(row);
        }
    }

	table.style.display = "none";

    return table;
}