document.addEventListener("DOMContentLoaded", function () {
	const exerciseSelect = document.getElementById("exercise"); // 운동 선택 요소 가져오기

	fetch("../csv/exercise.csv")
		.then((response) => response.text())
		.then((text) => {
			const lines = text.split("\n"); // 줄 단위로 분리
			lines.forEach((line, index) => {
				if (line.trim()) {
					const jsonStartIndex = line.indexOf('{"'); // JSON 시작 인덱스
					const jsonEndIndex = line.lastIndexOf("}") + 1; // JSON 끝 인덱스
					// JSON가 존재하면
					if (jsonStartIndex > -1 && jsonEndIndex > jsonStartIndex) {
						// 운동 이름 뒤에 ," 삭제
						const exerciseName = line.substring(0, jsonStartIndex).trim().replace(/,"$/, "");
						const exerciseDetails = line.substring(jsonStartIndex, jsonEndIndex).trim();

						const option = document.createElement("option"); // select에 option 추가
						option.value = exerciseDetails.replace(/"{2}/g, '"'); // 이중 인용부호 정정 알고리즘
						option.textContent = exerciseName;
						exerciseSelect.appendChild(option);

						// 페이지 처음 로드되었을 때에도 출력되도록
						if (index === 0) {
							option.selected = true;
							selectedExercise();
						}
					}
				}
			});
		})
		.catch((error) => console.error("CSV Error : ", error)); // 오류 처리

	exerciseSelect.addEventListener("change", selectedExercise); // 운동 선택 시 추가
});

// 운동 세부정보 출력
function selectedExercise(event) {
	const selectedValue = event ? event.target.value : document.getElementById("exercise").value; // 페이지 처음 로드됐을 때도 출력하기 위해서 이렇게 수정함
	try {
		const details = JSON.parse(selectedValue); // JSON 파싱
		document.getElementById("exerciseDetails").innerHTML = generateTable(details); // 테이블 만들어서 표시
		document.getElementById("exerciseDetails").style.display = "block"; // 디스플레이
	} catch (e) {
		console.error("JSON 에러 :", e);
	}
}

// 보기 좋은 테이블 생성
function generateTable(details) {
	let table = "<table>";
	// 각 키, 값 쌍에 대해 테이블 행 생성
	for (const key in details) {
		table += `<tr><th>${key}</th><td>${details[key]}</td></tr>`;
	}
	table += "</table>";
	return table;
}
