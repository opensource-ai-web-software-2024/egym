import { getUniqueNowDateString } from "../shared/nowDate.js";

const routineListSelector = document.getElementById("routine-list");

document.addEventListener("DOMContentLoaded", function () {
	const createButton = document.getElementById("create");

	// 'create' 버튼 클릭 이벤트 리스너
	createButton.addEventListener("click", function () {
		const todayDate = getUniqueNowDateString(); // 루틴 제목 자동 생성을 위한 현재 날짜 저장

		// 새로운 루틴 박스 생성
		const routineDiv = createNewRoutine(todayDate);
		routineDiv.appendChild(createNewRoutineToggle()); // 토글 버튼 추가
		routineDiv.appendChild(createAdditionalContent(todayDate)); // 추가 컨텐츠 추가

		routineListSelector.appendChild(routineDiv); // 생성된 루틴 박스를 리스트에 추가
	});

	// 루틴 이름 변경 이벤트 리스너
	routineListSelector.addEventListener("click", changeTitle);
	// 세부 루틴 펼치기/접기 이벤트 리스너
	routineListSelector.addEventListener("click", toggleRoutine);
	// 루틴 삭제 이벤트 리스너
	routineListSelector.addEventListener("click", deleteRoutine);
	// 루틴 수정 이벤트 리스너
	routineListSelector.addEventListener("click", modifyRoutine);
});

// 새로운 루틴 생성 함수
function createNewRoutine(newName) {
	// new-routine 박스 생성 (루틴 큰 상자)
	const routineDiv = document.createElement("div");
	routineDiv.classList.add("new-routine");

	// new-routine 박스 타이틀 설정
	const routineTitle = document.createElement("h2");
	routineTitle.textContent = newName;

	// 루틴 이름을 사용하여 localStorage에 저장
	if (!localStorage.getItem(newName)) {
		localStorage.setItem(newName, JSON.stringify([]));
	}

	routineDiv.appendChild(routineTitle);
	return routineDiv;
}

// new-routine 박스 토글 버튼 생성 함수
function createNewRoutineToggle() {
	const toggleButton = document.createElement("span");
	toggleButton.classList.add("toggle-button", "material-icons");
	toggleButton.textContent = "expand_more";

	return toggleButton;
}

// new-routine에서 토글 버튼 눌렀을 시 펼쳐질 추가 컨텐츠 생성 함수
function createAdditionalContent(routineName) {
	const additionalContent = document.createElement("div");
	additionalContent.classList.add("additional-content");

	// 로컬스트로지에서 루틴의 운동 목록을 가져와 표시
	const routineExercises = JSON.parse(localStorage.getItem(routineName)) || [];
	const exerciseListDiv = document.createElement("div");
	exerciseListDiv.classList.add("exercise-list");

	routineExercises.forEach((exercise) => {
		const exerciseDiv = document.createElement("div");
		exerciseDiv.classList.add("exercise-item");
		exerciseDiv.textContent = `${exercise.exercise} - 세트: ${exercise.sets}, 횟수: ${exercise.reps}`;
		exerciseListDiv.appendChild(exerciseDiv);
	});

	// 수정 버튼 생성
	const modifyButton = document.createElement("span");
	const modifyButtonLabel = document.createElement("span");
	modifyButtonLabel.classList.add("button-label");
	modifyButtonLabel.textContent = "수정하기";
	modifyButton.classList.add("material-icons", "edit-button");
	modifyButton.textContent = "edit";
	modifyButton.appendChild(modifyButtonLabel);

	// 삭제 버튼 생성
	const deleteButton = document.createElement("span");
	const deleteButtonLabel = document.createElement("span");
	deleteButtonLabel.classList.add("button-label");
	deleteButtonLabel.textContent = "삭제하기";
	deleteButton.classList.add("material-icons", "delete-button");
	deleteButton.textContent = "delete";
	deleteButton.appendChild(deleteButtonLabel);

	additionalContent.appendChild(deleteButton);
	additionalContent.appendChild(modifyButton);
	additionalContent.appendChild(exerciseListDiv);

	return additionalContent;
}

// new-routine 제목 변경 로직
function changeTitle(event) {
	if (event.target.tagName === "H2") {
		const currentText = event.target.textContent;
		const input = document.createElement("input");
		input.type = "text";
		input.value = currentText;
		input.style.width = event.target.offsetWidth + "px";
		input.style.height = event.target.offsetHeight + "px";
		input.style.font = window.getComputedStyle(event.target).font;

		// 입력 상자 포커스가 해제되었을 때 이벤트
		input.addEventListener("blur", function () {
			const newName = input.value;
			const routineDiv = event.target.closest(".new-routine");

			if (newName && newName !== currentText) {
				// localStorage에서 이름 변경
				if (localStorage.getItem(currentText)) {
					localStorage.setItem(newName, localStorage.getItem(currentText));
					localStorage.removeItem(currentText);
				}

				event.target.textContent = newName;
			} else {
				event.target.textContent = currentText;
			}
		});

		event.target.textContent = "";
		event.target.appendChild(input);
		input.focus();
	}
}

// 세부 루틴 펼치기/접기 로직
function toggleRoutine(event) {
	if (event.target.classList.contains("toggle-button")) {
		const routineDiv = event.target.closest(".new-routine");
		const additionalContent = routineDiv.querySelector(".additional-content");

		if (additionalContent.style.display === "none") {
			additionalContent.style.display = "flex"; // 수직으로 내용을 나열하도록 함
			event.target.textContent = "expand_less"; // 아이콘 변경
		} else {
			additionalContent.style.display = "none";
			event.target.textContent = "expand_more"; // 아이콘 변경
		}
	}
}

// 루틴 삭제 로직
function deleteRoutine(event) {
	if (event.target.classList.contains("delete-button") || event.target.closest(".delete-button")) {
		const routineDiv = event.target.closest(".new-routine");
		const routineTitle = routineDiv.querySelector("h2").textContent;
		routineDiv.classList.add("fade-out"); // 삭제 효과
		setTimeout(function () {
			routineDiv.remove(); // 일정 시간 후 요소 삭제
			localStorage.removeItem(routineTitle);
		}, 300); // 0.3초 후에 삭제 (css 시간과 일치)
	}
}

// 루틴 수정 로직
function modifyRoutine(event) {
	if (event.target.classList.contains("edit-button") || event.target.closest(".edit-button")) {
		const routineDiv = event.target.closest(".new-routine");
		const routineTitle = routineDiv.querySelector("h2").textContent;
		location.href = `edit_routine.html?routineName=${encodeURIComponent(routineTitle)}`; // 루틴 수정 페이지로 이동, 루틴 이름 전달
	}
}

// 페이지 로드 시 루틴 리스트를 불러와서 표시
function loadRoutines() {
	for (const key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			const routineDiv = createNewRoutine(key);
			routineDiv.appendChild(createNewRoutineToggle());
			routineDiv.appendChild(createAdditionalContent(key));
			routineListSelector.appendChild(routineDiv);
		}
	}
}

// DOM이 준비되면 루틴 리스트를 불러옴
document.addEventListener("DOMContentLoaded", loadRoutines);
