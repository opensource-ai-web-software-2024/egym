document.addEventListener("DOMContentLoaded", function () {
	const searchResultDiv = document.getElementById("search-result");
	searchResultDiv.addEventListener("dragstart", dragStart);
	searchResultDiv.addEventListener("dragend", dragEnd);

	const routineListDiv = document.getElementById("routine-list");
	routineListDiv.addEventListener("drop", drop);
	routineListDiv.addEventListener("dragover", allowDrop);

	loadRoutine(); // 로컬 스토리지에서 데이터를 불러오는 함수 호출
});

function dragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
	e.target.classList.add("dragging");
}

function dragEnd(e) {
	e.target.classList.remove("dragging");
}

function allowDrop(e) {
	e.preventDefault();
}

function drop(e) {
	e.preventDefault();
	const cardId = e.dataTransfer.getData("text/plain");
	const draggedCard = document.getElementById(cardId);

	if (draggedCard && !draggedCard.classList.contains("cloned")) {
		const clonedCard = draggedCard.cloneNode(true);

		clonedCard.classList.add("cloned");
		clonedCard.setAttribute("draggable", "true");
		clonedCard.addEventListener("dragstart", dragStart);
		clonedCard.addEventListener("dragend", dragEnd);

		const routineList = document.getElementById("routine-list");
		const exerciseDiv = document.createElement("div");
		exerciseDiv.classList.add("exercise-div");

		const exerciseName = draggedCard.querySelector(".card-name").textContent;
		const thumbnailLink = draggedCard.querySelector(".thumbnail").src;
		const cardMarks = draggedCard.querySelectorAll(".card-marks .card-mark");

		const setsRepsDiv = document.createElement("div");
		setsRepsDiv.classList.add("sets-reps-div");

		const setsLabel = document.createElement("span");
		setsLabel.textContent = "Sets: ";
		const setsInput = document.createElement("input");
		setsInput.type = "number";
		setsInput.min = "1";
		setsInput.value = "3";
		setsInput.addEventListener("change", function () {
			updateExerciseLocalStorage(exerciseName, setsInput.value, repsInput.value);
		});

		const repsLabel = document.createElement("span");
		repsLabel.textContent = "Reps: ";
		const repsInput = document.createElement("input");
		repsInput.type = "number";
		repsInput.min = "1";
		repsInput.value = "10";
		repsInput.addEventListener("change", function () {
			updateExerciseLocalStorage(exerciseName, setsInput.value, repsInput.value);
		});

		setsRepsDiv.appendChild(setsLabel);
		setsRepsDiv.appendChild(setsInput);
		setsRepsDiv.appendChild(repsLabel);
		setsRepsDiv.appendChild(repsInput);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "삭제";
		deleteButton.classList.add("delete-button");
		deleteButton.addEventListener("click", function () {
			exerciseDiv.classList.add("fade-out");
			setTimeout(() => {
				routineList.removeChild(exerciseDiv);
				deleteExerciseLocalStorage(exerciseName);
			}, 500); // 애니메이션 시간이 끝난 후 요소를 제거
		});

		exerciseDiv.appendChild(clonedCard);
		exerciseDiv.appendChild(setsRepsDiv);
		exerciseDiv.appendChild(deleteButton);
		routineList.appendChild(exerciseDiv);

		const exerciseInfo = {
			exerciseName: exerciseName,
			thumbnailLink: thumbnailLink,
			targetMuscleGroup: cardMarks[0].querySelector(".value").textContent,
			equipmentRequired: cardMarks[1].querySelector(".value").textContent,
			mechanics: cardMarks[2].querySelector(".value").textContent,
			experienceLevel: cardMarks[3].querySelector(".value").textContent,
			sets: setsInput.value,
			reps: repsInput.value,
		};

		saveExerciseLocalStorage(exerciseInfo);
	}
}

function saveExerciseLocalStorage(exerciseInfo) {
	const routineName = new URLSearchParams(window.location.search).get("routineName") || "defaultRoutine";

	let routine = JSON.parse(localStorage.getItem(routineName)) || [];
	routine.push(exerciseInfo);
	localStorage.setItem(routineName, JSON.stringify(routine));
}

function deleteExerciseLocalStorage(exerciseName) {
	const routineName = new URLSearchParams(window.location.search).get("routineName") || "defaultRoutine";

	let routine = JSON.parse(localStorage.getItem(routineName)) || [];
	routine = routine.filter((exercise) => exercise.exerciseName !== exerciseName);
	localStorage.setItem(routineName, JSON.stringify(routine));
}

function updateExerciseLocalStorage(exerciseName, sets, reps) {
	const routineName = new URLSearchParams(window.location.search).get("routineName") || "defaultRoutine";

	let routine = JSON.parse(localStorage.getItem(routineName)) || [];
	routine = routine.map((exercise) => {
		if (exercise.exerciseName === exerciseName) {
			return { ...exercise, sets, reps };
		}
		return exercise;
	});
	localStorage.setItem(routineName, JSON.stringify(routine));
}

function loadRoutine() {
	const routineName = new URLSearchParams(window.location.search).get("routineName") || "defaultRoutine";
	const routine = JSON.parse(localStorage.getItem(routineName)) || [];

	const routineList = document.getElementById("routine-list");
	routine.forEach((exercise) => {
		const exerciseDiv = document.createElement("div");
		exerciseDiv.classList.add("exercise-div");

		const cardDiv = document.createElement("div");
		cardDiv.classList.add("card", "cloned");
		cardDiv.setAttribute("draggable", "true");

		const cardInnerDiv = document.createElement("div");
		cardInnerDiv.classList.add("card-div");
		cardDiv.appendChild(cardInnerDiv);

		const cardImg = document.createElement("div");
		cardImg.classList.add("card-img");
		cardInnerDiv.appendChild(cardImg);

		const thumbnail = document.createElement("img");
		thumbnail.classList.add("thumbnail");
		thumbnail.src = exercise.thumbnailLink;
		cardImg.appendChild(thumbnail);

		const cardFooter = document.createElement("div");
		cardFooter.classList.add("card-footer");
		cardInnerDiv.appendChild(cardFooter);

		const cardName = document.createElement("h3");
		cardName.classList.add("card-name");
		cardName.textContent = exercise.exerciseName;
		cardFooter.appendChild(cardName);

		const cardMarks = document.createElement("div");
		cardMarks.classList.add("card-marks");
		cardFooter.appendChild(cardMarks);

		const markInfos = [
			{ key: "자극 부위", value: exercise.targetMuscleGroup },
			{ key: "운동 장비", value: exercise.equipmentRequired },
			{ key: "운동 구분", value: exercise.mechanics },
			{ key: "난이도", value: exercise.experienceLevel },
		];

		markInfos.forEach((markInfo) => {
			const cardMark = document.createElement("div");
			cardMark.classList.add("card-mark");

			const key = document.createElement("p");
			key.classList.add("key");
			key.textContent = markInfo.key;
			cardMark.appendChild(key);

			const value = document.createElement("p");
			value.classList.add("value");
			value.textContent = markInfo.value;
			cardMark.appendChild(value);

			cardMarks.appendChild(cardMark);
		});

		const setsRepsDiv = document.createElement("div");
		setsRepsDiv.classList.add("sets-reps-div");

		const setsLabel = document.createElement("span");
		setsLabel.textContent = "Sets: ";
		const setsInput = document.createElement("input");
		setsInput.type = "number";
		setsInput.min = "1";
		setsInput.value = exercise.sets;
		setsInput.addEventListener("change", function () {
			updateExerciseLocalStorage(exercise.exerciseName, setsInput.value, repsInput.value);
		});

		const repsLabel = document.createElement("span");
		repsLabel.textContent = "Reps: ";
		const repsInput = document.createElement("input");
		repsInput.type = "number";
		repsInput.min = "1";
		repsInput.value = exercise.reps;
		repsInput.addEventListener("change", function () {
			updateExerciseLocalStorage(exercise.exerciseName, setsInput.value, repsInput.value);
		});

		setsRepsDiv.appendChild(setsLabel);
		setsRepsDiv.appendChild(setsInput);
		setsRepsDiv.appendChild(repsLabel);
		setsRepsDiv.appendChild(repsInput);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "삭제";
		deleteButton.classList.add("delete-button");
		deleteButton.addEventListener("click", function () {
			exerciseDiv.classList.add("fade-out");
			setTimeout(() => {
				routineList.removeChild(exerciseDiv);
				deleteExerciseLocalStorage(exercise.exerciseName);
			}, 500); // 애니메이션 시간이 끝난 후 요소를 제거
		});

		exerciseDiv.appendChild(cardDiv);
		exerciseDiv.appendChild(setsRepsDiv);
		exerciseDiv.appendChild(deleteButton);
		routineList.appendChild(exerciseDiv);

		cardDiv.addEventListener("dragstart", dragStart);
		cardDiv.addEventListener("dragend", dragEnd);
	});
}
