import { createBackBtn } from "./backBtn.js";

export function createExerciseInfoHeader(exerciseListContainer, cardInfo) {
	// 운동 상세 정보 페이지 헤더 만드는 함수
	var exerciseInfoHeader = document.createElement("div");
	var exerciseInfoContainer = document.getElementById("exercise-info-container");

	exerciseInfoHeader.id = "exercise-info-header";
	// 뒤로 가기 버튼 만들기
	var backBtn = createBackBtn(exerciseListContainer, exerciseInfoContainer);
	exerciseInfoHeader.appendChild(backBtn);

	var exerciseName = document.createElement("h1");
	exerciseName.textContent = cardInfo.exerciseName;
	exerciseInfoHeader.appendChild(exerciseName);

	return exerciseInfoHeader;
}
