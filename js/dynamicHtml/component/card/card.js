import { cardInfosExample } from '../../shared/cardInfosExample.js';
import { createExerciseInfoContainer } from '../exerciseInfoContainer/exerciseInfoContainer.js'

export function filteringHandler(query) {
	searchResult = cardInfos;
	console.log(query);
	if (query.trim() !== "") {
		searchResult = searchResult.filter((exerciseInfo) => {
			return query === exerciseInfo.exerciseName;
		});
	}
	console.log(searchResult);
	makingCards();
}

var cardInfos = cardInfosExample;
var searchResult = cardInfos;

function makingCards() {
	// div.card 검색
	// 유사 배열 객체
	var searchResultDiv = document.getElementById("search-result");
	searchResultDiv.innerHTML = "";
	searchResult.forEach((searchInfo) => {
		// 카드 추가
		var card = document.createElement("div");
		card.classList.add("card");
		searchResultDiv.appendChild(card);

		card.addEventListener('click', () => {
			console.log(searchInfo);
			createExerciseInfoContainer(searchInfo);
		});

		// 카드 div 추가
		var cardDiv = document.createElement("div");
		cardDiv.classList.add("card-div");
		card.appendChild(cardDiv);

		// 카드 이미지 추가
		var cardImg = document.createElement("div");
		cardImg.classList.add("card-img");
		cardDiv.appendChild(cardImg);

		// 카드 이미지 삽입
		var thumbnail = document.createElement("img");
		thumbnail.classList.add("thumbnail");
		thumbnail.src = searchInfo.thumbnailLink;
		cardImg.appendChild(thumbnail);

		// 카드 푸터 추가
		var cardFooter = document.createElement("div");
		cardFooter.classList.add("card-footer");
		cardDiv.appendChild(cardFooter);

		// 푸터에 이름 삽입
		var cardName = document.createElement("h3");
		cardName.classList.add("card-name");
		cardName.textContent = searchInfo.exerciseName;
		cardFooter.appendChild(cardName);

		// 푸터에 카드 마크div 추가
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
			// 카드 마크 추가
			var cardMark = document.createElement("div");
			cardMark.classList.add("card-mark");

			cardMarks.appendChild(cardMark);
			// 카드 마크에 key와 value 추가
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