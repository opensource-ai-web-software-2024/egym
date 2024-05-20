import { readCsv } from "../../csvHandler/readCsv.js";

document.addEventListener("DOMContentLoaded", async function () {
	// CSV 파일을 읽어와 운동 데이터를 가져옴
	const result = await readCsv("exercise.csv");
	const datas = result.data;

	const exerciseSelect = document.getElementById("exercise"); // 운동 선택 dropdown 요소
	const exerciseDetails = document.getElementById("exercise-details");

	// 선택된 운동 이름을 표시할 요소 생성
	const exerciseName = document.createElement("p");
	exerciseName.id = "exercise-name";
	exerciseName.textContent = exerciseSelect.value;

	exerciseDetails.appendChild(exerciseName);

	document.getElementById("exercise-details").style.display = "block"; // 운동 세부사항 표시

	// CSV 데이터로부터 운동 옵션을 dropdown에 추가
	datas.forEach((data) => {
		const option = document.createElement("option"); // 운동 option 추가
		option.textContent = data[0]; // 운동명 추가
		exerciseSelect.appendChild(option);
	});

	// 운동 선택 변경 시 운동 세부 정보 출력
	exerciseSelect.addEventListener("change", selectedExercise);

	// '저장하기' 버튼 클릭 시 로컬스토리지에 운동 추가
	document.getElementById("edit-form").addEventListener("submit", saveExerciseLocalStorage);
});

// 운동 세부정보 출력 함수
function selectedExercise(event) {
	const selectedValue = event.target.value; // 선택된 운동명
	console.log(selectedValue);
	document.getElementById("exercise-name").textContent = selectedValue; // 운동명을 표시
}

// 로컬스토리지에 운동을 저장하는 함수
function saveExerciseLocalStorage(event) {
	event.preventDefault(); // 폼 제출 기본 동작 방지

	const exerciseSelect = document.getElementById("exercise");
	const selectedExercise = exerciseSelect.value; // 선택된 운동명
	const routineName = new URLSearchParams(window.location.search).get("routineName"); // URL에서 루틴 이름 가져오기

	// 세트와 횟수 값을 가져오기
	const setCount = document.getElementById("set").value;
	const repCount = document.getElementById("count").value;

	if (routineName && selectedExercise && setCount && repCount) {
		// 루틴 이름을 키로 하여 로컬스토리지에 저장
		let routine = JSON.parse(localStorage.getItem(routineName)) || [];
		routine.push({
			exercise: selectedExercise,
			sets: setCount,
			reps: repCount,
		});
		localStorage.setItem(routineName, JSON.stringify(routine));

		// 페이지 닫기
		window.close();
	}
}

// 보기 좋은 테이블 생성 함수
function generateTable(exerciseProfile) {
	const table = document.createElement("table");

	// 운동 프로필 데이터를 테이블에 추가
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
