import { cardInfosExample } from "../../shared/cardInfosExample.js";

const musclePart = {
	하체: ["대퇴근", "내전근", "종아리", "둔근", "햄스트링", "엉덩이 굴곡근", "장경인대", "족저근막"],
	가슴: ["가슴"],
	등: ["허리", "등 아래쪽", "등 위쪽"],
	팔: ["팔뚝", "긴손바닥근", "어깨"],
	복부: ["복근"],
};

function filteringHandler(value) {
	searchResult = cardInfos;
	if (value !== "전체") {
		searchResult = searchResult.filter((exerciseInfo) => {
			return Object.values(musclePart).flat().includes(value) && exerciseInfo.exerciseInfo.targetMuscleGroup === value;
		});
	}
	makingCards();
}

var cardInfos = cardInfosExample;
var searchResult = cardInfos;

export function createCard(searchInfo, index) {
	var card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("draggable", "true");
	card.setAttribute("id", `card-${index}`); // 고유한 ID 부여
	card.addEventListener("dragstart", dragStart);
	card.addEventListener("dragend", dragEnd);

	var cardDiv = document.createElement("div");
	cardDiv.classList.add("card-div");
	card.appendChild(cardDiv);

	var cardImg = document.createElement("div");
	cardImg.classList.add("card-img");
	cardDiv.appendChild(cardImg);

	var thumbnail = document.createElement("img");
	thumbnail.classList.add("thumbnail");
	thumbnail.src = searchInfo.thumbnailLink;
	cardImg.appendChild(thumbnail);

	var cardFooter = document.createElement("div");
	cardFooter.classList.add("card-footer");
	cardDiv.appendChild(cardFooter);

	var cardName = document.createElement("h3");
	cardName.classList.add("card-name");
	cardName.textContent = searchInfo.exerciseName;
	cardFooter.appendChild(cardName);

	var cardMarks = document.createElement("div");
	cardMarks.classList.add("card-marks");
	cardFooter.appendChild(cardMarks);

	var markInfos = [
		{ key: "자극 부위", value: searchInfo.exerciseInfo.targetMuscleGroup },
		{ key: "운동 장비", value: searchInfo.exerciseInfo.equipmentRequired },
		{ key: "운동 구분", value: searchInfo.exerciseInfo.mechanics },
		{ key: "난이도", value: searchInfo.exerciseInfo.experienceLevel },
	];

	markInfos.forEach((markInfo) => {
		var cardMark = document.createElement("div");
		cardMark.classList.add("card-mark");

		cardMarks.appendChild(cardMark);
		var key = document.createElement("p");
		key.classList.add("key");
		key.textContent = markInfo.key;
		cardMark.appendChild(key);

		var value = document.createElement("p");
		value.classList.add("value");
		value.textContent = markInfo.value;
		cardMark.appendChild(value);
	});

	return card;
}

export function makingCards() {
	var searchResultDiv = document.getElementById("search-result");
	searchResultDiv.innerHTML = "";
	searchResult.forEach((searchInfo, index) => {
		var card = createCard(searchInfo, index);
		searchResultDiv.appendChild(card);
	});
}

function dragStart(e) {
	e.dataTransfer.setData("text", e.target.id);
	e.dataTransfer.setData("text/plain", e.target.querySelector(".card-name").textContent);
	e.target.classList.add("dragging");
}

function dragEnd(e) {
	e.target.classList.remove("dragging");
}

makingCards();
window.filteringHandler = filteringHandler;
