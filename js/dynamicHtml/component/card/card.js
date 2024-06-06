import { cardInfosExample } from "../../shared/cardInfosExample.js";
import { createExerciseInfoContainer } from "../exerciseInfoContainer/exerciseInfoContainer.js";

// musclePart 변수 정의
const musclePart = {
	하체: ["대퇴근", "내전근", "종아리", "둔근", "햄스트링", "엉덩이 굴곡근", "장경인대", "허벅지", "족저근막"],
	가슴: ["가슴"],
	등: ["허리", "등 아래쪽", "등 위쪽"],
	팔: ["팔뚝", "긴손바닥근", "어깨"],
	복부: ["복근"],
};

// 필터링 변경
export function filteringHandler(category, value) {
	searchResult = cardInfos;
	if (value !== "전체") {
		searchResult = searchResult.filter((exerciseInfo) => {
			if (category === "부위") {
				return musclePart[value].includes(exerciseInfo.exerciseInfo.targetMuscleGroup);
			} else if (category === "상세 부위") {
				return exerciseInfo.exerciseInfo.targetMuscleGroup === value;
			} else if (category === "운동 구분") {
				if (value === "맨몸 운동") {
					return exerciseInfo.exerciseInfo.equipmentRequired === "체중";
				} else if (value === "기구 운동") {
					return exerciseInfo.exerciseInfo.equipmentRequired !== "체중";
				}
			} else if (category === "난이도") {
				return exerciseInfo.exerciseInfo.experienceLevel === value;
			}
			return true;
		});
	}
	makingCards();
}

var cardInfos = cardInfosExample;
var searchResult = cardInfos;

function makingCards() {
	var searchResultDiv = document.getElementById("search-result");
	searchResultDiv.innerHTML = "";
	searchResult.forEach((searchInfo) => {
		var card = document.createElement("div");
		card.classList.add("card");
		searchResultDiv.appendChild(card);

		card.addEventListener("click", () => {
			createExerciseInfoContainer(searchInfo);
		});

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
			{
				key: "자극 부위",
				value: searchInfo.exerciseInfo.targetMuscleGroup,
			},
			{
				key: "운동 장비",
				value: searchInfo.exerciseInfo.equipmentRequired,
			},
			{
				key: "운동 구분",
				value: searchInfo.exerciseInfo.mechanics,
			},
			{
				key: "난이도",
				value: searchInfo.exerciseInfo.experienceLevel,
			},
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
	});
}

makingCards();
window.cardFilteringHandler = filteringHandler;
