import { CardInfo } from '../class/cardInfo.js';
import { ExerciseInfo } from '../class/exerciseInfo.js';
import { createExerciseInfoContainer } from './exerciseInfoContainer.js'

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

var cardInfos = [
	new CardInfo(
		"라잉 플로어 레그 레이즈",
		new ExerciseInfo("복근", "힘", "맨몸 운동", "고립 운동", "장력", "초보자", "없음"),
		"라잉 플로어 레그 레이즈는 복부 크런치의 변형이며, 복부 근육을 고립시키는 데 사용되는 운동입니다.\n기본적으로 굴곡 기반의 운동으로, 움직이는 동안 하부 복부 근육을 지속적으로 긴장시킵니다",
		[
			"편안한 자세로 등을 바닥에 눕습니다. 다리는 직진하고 손은 허리 아래에 두어 지지합니다.",
			"다리를 직진한 상태로 유지하고 복부를 수축시키고 숨을 내쉬면서 이를 이마 쪽으로 들어올립니다.",
			"복부가 완전히 수축되고 다리가 약간 평행한 상태가 되면 천천히 다리를 시작 위치로 내려놓습니다.",
			"할당된 반복 횟수를 완료합니다.",
		],
		[
			"촛불을 끄는 듯이 강하게 숨을 내쉬고, 마음과 근육 사이의 연결을 개선하기 위해 수축을 1초 동안 유지합니다.",
			"이 운동 중에 허리 아랫부분에 불편함이 느껴진다면, 더 많은 안티 익스텐션 및 안티 로테이션을 기반으로 하는 동작을 선택하세요.",
			"머리 뒤에 손을 두는 것을 피하세요. 이렇게 하면 목에 과도한 압력이 가해질 수 있습니다.",
		],
		"https://i.ytimg.com/vi_webp/r24ntO4IvKc/maxresdefault.webp",
		"https://youtu.be/r24ntO4IvKc"
	),
	new CardInfo(
		"푸쉬 업",
		new ExerciseInfo("종아리", "힘", "맨몸 운동", "고립 운동", "장력", "초보자", "없음"),
		"라잉 플로어 레그 레이즈는 복부 크런치의 변형이며, 복부 근육을 고립시키는 데 사용되는 운동입니다.\n기본적으로 굴곡 기반의 운동으로, 움직이는 동안 하부 복부 근육을 지속적으로 긴장시킵니다",
		[
			"편안한 자세로 등을 바닥에 눕습니다. 다리는 직진하고 손은 허리 아래에 두어 지지합니다.",
			"다리를 직진한 상태로 유지하고 복부를 수축시키고 숨을 내쉬면서 이를 이마 쪽으로 들어올립니다.",
			"복부가 완전히 수축되고 다리가 약간 평행한 상태가 되면 천천히 다리를 시작 위치로 내려놓습니다.",
			"할당된 반복 횟수를 완료합니다.",
		],
		[
			"촛불을 끄는 듯이 강하게 숨을 내쉬고, 마음과 근육 사이의 연결을 개선하기 위해 수축을 1초 동안 유지합니다.",
			"이 운동 중에 허리 아랫부분에 불편함이 느껴진다면, 더 많은 안티 익스텐션 및 안티 로테이션을 기반으로 하는 동작을 선택하세요.",
			"머리 뒤에 손을 두는 것을 피하세요. 이렇게 하면 목에 과도한 압력이 가해질 수 있습니다.",
		],
		"https://i.ytimg.com/vi_webp/r24ntO4IvKc/maxresdefault.webp",
		"https://youtu.be/r24ntO4IvKc"
	),
	new CardInfo(
		"레그 익스텐션",
		new ExerciseInfo("어깨", "힘", "맨몸 운동", "고립 운동", "장력", "초보자", "없음"),
		"라잉 플로어 레그 레이즈는 복부 크런치의 변형이며, 복부 근육을 고립시키는 데 사용되는 운동입니다.\n기본적으로 굴곡 기반의 운동으로, 움직이는 동안 하부 복부 근육을 지속적으로 긴장시킵니다",
		[
			"편안한 자세로 등을 바닥에 눕습니다. 다리는 직진하고 손은 허리 아래에 두어 지지합니다.",
			"다리를 직진한 상태로 유지하고 복부를 수축시키고 숨을 내쉬면서 이를 이마 쪽으로 들어올립니다.",
			"복부가 완전히 수축되고 다리가 약간 평행한 상태가 되면 천천히 다리를 시작 위치로 내려놓습니다.",
			"할당된 반복 횟수를 완료합니다.",
		],
		[
			"촛불을 끄는 듯이 강하게 숨을 내쉬고, 마음과 근육 사이의 연결을 개선하기 위해 수축을 1초 동안 유지합니다.",
			"이 운동 중에 허리 아랫부분에 불편함이 느껴진다면, 더 많은 안티 익스텐션 및 안티 로테이션을 기반으로 하는 동작을 선택하세요.",
			"머리 뒤에 손을 두는 것을 피하세요. 이렇게 하면 목에 과도한 압력이 가해질 수 있습니다.",
		],
		"https://i.ytimg.com/vi_webp/r24ntO4IvKc/maxresdefault.webp",
		"https://youtu.be/r24ntO4IvKc"
	),
];

for (let i = 0; i < 1000; i++) {
	cardInfos.push(
		new CardInfo(
			"복근",
			new ExerciseInfo("복근", "힘", "맨몸 운동", "고립 운동", "장력", "초보자", "없음"),
			"라잉 플로어 레그 레이즈는 복부 크런치의 변형이며, 복부 근육을 고립시키는 데 사용되는 운동입니다.\n기본적으로 굴곡 기반의 운동으로, 움직이는 동안 하부 복부 근육을 지속적으로 긴장시킵니다",
			[
				"편안한 자세로 등을 바닥에 눕습니다. 다리는 직진하고 손은 허리 아래에 두어 지지합니다.",
				"다리를 직진한 상태로 유지하고 복부를 수축시키고 숨을 내쉬면서 이를 이마 쪽으로 들어올립니다.",
				"복부가 완전히 수축되고 다리가 약간 평행한 상태가 되면 천천히 다리를 시작 위치로 내려놓습니다.",
				"할당된 반복 횟수를 완료합니다.",
			],
			[
				"촛불을 끄는 듯이 강하게 숨을 내쉬고, 마음과 근육 사이의 연결을 개선하기 위해 수축을 1초 동안 유지합니다.",
				"이 운동 중에 허리 아랫부분에 불편함이 느껴진다면, 더 많은 안티 익스텐션 및 안티 로테이션을 기반으로 하는 동작을 선택하세요.",
				"머리 뒤에 손을 두는 것을 피하세요. 이렇게 하면 목에 과도한 압력이 가해질 수 있습니다.",
			],
			"https://i.ytimg.com/vi_webp/r24ntO4IvKc/maxresdefault.webp",
			"https://youtu.be/r24ntO4IvKc"
		)
	);
}
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