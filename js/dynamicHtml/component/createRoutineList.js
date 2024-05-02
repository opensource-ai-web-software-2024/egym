const routineListSelector = document.getElementById("routine-list");

document.addEventListener("DOMContentLoaded", function () {
	var createButton = document.getElementById("create");

	createButton.addEventListener("click", function () {
		// 루틴 제목 자동 생성을 위한 날짜 저장
		const todayDate = createDate();

		// new-routine 박스 생성
		const routineDiv = createNewRoutine(todayDate);
		// new-routine 박스 토글 버튼 추가
		routineDiv.appendChild(createNewRoutineToggle());
		// 토글 버튼 눌렀을 시 추가
		routineDiv.appendChild(createAdditionalContent());

		routineListSelector.appendChild(routineDiv);
	});

	// 루틴 이름 변경
	routineListSelector.addEventListener("click", changeTitle);
	// 세부 루틴 펼치기, 접기
	routineListSelector.addEventListener("click", toggleRoutine);
	// 루틴 삭제
	routineListSelector.addEventListener("click", deleteRoutine);
});

// 루틴 생성
function createDate() {
	// 루틴 제목 자동 생성을 위한 날짜 저장
	const today = new Date();
	const year = today.getFullYear(); // 연도
	const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
	const day = today.getDate(); // 일

	return year + "-" + month + "-" + day;
}

function createNewRoutine(todayDate) {
	// new-routine 박스 생성 (루틴 큰 상자)
	const routineDiv = document.createElement("div");
	routineDiv.classList.add("new-routine");
	// new-routine 박스 타이틀 설정
	const routineTitle = document.createElement("h2");
	routineTitle.textContent = todayDate;
	routineDiv.appendChild(routineTitle);

	return routineDiv;
}

function createNewRoutineToggle() {
	// new-routine 박스 토글 버튼 추가
	const toggleButton = document.createElement("span");
	toggleButton.classList.add("toggle-button", "material-icons");
	toggleButton.textContent = "expand_more";

	return toggleButton;
}

function createAdditionalContent() {
	// new-routine에서 토글 버튼 눌렀을 시 펼쳐질 additional-content
	const additionalContent = document.createElement("div");
	additionalContent.classList.add("additional-content");

	// additional-content에 들어갈 삭제 버튼
	const deletButton = document.createElement("span");
	const deletButtonLabel = document.createElement("span");
	deletButtonLabel.classList.add("button-label");
	deletButtonLabel.textContent = "삭제하기";
	deletButton.classList.add("material-icons", "delete-button");
	deletButton.textContent = "delete";

	deletButton.appendChild(deletButtonLabel);
	additionalContent.appendChild(deletButton);

	return additionalContent;
}

// new-routine 제목 변경 로직
function changeTitle(event) {
	// 클릭된 요소가 h2인지 확인
	if (event.target.tagName === "H2") {
		// h2 요소를 클릭했을 때 처리할 내용

		// 새로 input 박스 생성
		const currentText = event.target.textContent;
		const input = document.createElement("input");
		input.type = "text";
		input.value = currentText;
		input.style.width = event.target.offsetWidth + "px";
		input.style.height = event.target.offsetHeight + "px";
		input.style.font = window.getComputedStyle(event.target).font;

		// 입력 상자 이벤트
		input.addEventListener("blur", function () {
			event.target.textContent = input.value;
		});

		event.target.textContent = "";
		event.target.appendChild(input);
		input.focus();
	}
}

// 세부 루틴 펼치기, 접기
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

// 루틴 삭제
function deleteRoutine(event) {
	if (event.target.classList.contains("delete-button") || event.target.classList.contains("button-label")) {
		const routineDiv = event.target.closest(".new-routine");
		routineDiv.classList.add("fade-out"); // 삭제 효과
		setTimeout(function () {
			routineDiv.remove(); // 일정 시간 후 요소 삭제
		}, 300); // 0.3초 후에 삭제
	}
}
