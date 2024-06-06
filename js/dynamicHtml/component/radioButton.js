// radioButton.js

// const muscleTranslation = {
// 	대퇴근: "abductors",
// 	복근: "abs",
// 	내전근: "adductors",
// 	이두근: "biceps",
// 	종아리: "calves",
// 	가슴: "chest",
// 	팔뚝: "forearms",
// 	둔근: "glutes",
// 	햄스트링: "hamstrings",
// 	"엉덩이 굴곡근": "hip flexors",
// 	장경인대: "it band",
// 	허리: "lats",
// 	"등 아래쪽": "lower back",
// 	"등 위쪽": "upper back",
// 	목: "neck",
// 	외복사근: "obliques",
// 	긴손바닥근: "palmar fascia",
// 	족저근막: "plantar fascia",
// 	대퇴사두근: "quads",
// 	어깨: "shoulders",
// 	승모근: "traps",
// 	삼두근: "triceps",
// };

const musclePart = {
	하체: ["대퇴근", "내전근", "종아리", "둔근", "햄스트링", "엉덩이 굴곡근", "장경인대", "허벅지", "족저근막"],
	가슴: ["가슴"],
	등: ["허리", "등 아래쪽", "등 위쪽"],
	팔: ["팔뚝", "긴손바닥근", "어깨"],
	복부: ["복근"],
};

const categoryInfos = [
	{
		categoryName: "부위",
		categoryTag: "part",
		toggleBtnList: ["전체", "하체", "가슴", "등", "팔", "복부", "기타"],
	},
	{
		categoryName: "상세 부위",
		categoryTag: "detail-part",
		toggleBtnList: [
			"전체",
			"대퇴근",
			"복근",
			"내전근",
			"이두근",
			"종아리",
			"가슴",
			"팔뚝",
			"둔근",
			"햄스트링",
			"엉덩이 굴곡근",
			"장경인대",
			"허리",
			"등 아래쪽",
			"등 위쪽",
			"목",
			"외복사근",
			"긴손바닥근",
			"족저근막",
			"대퇴사두근",
			"어깨",
			"승모근",
			"삼두근",
		],
	},
	{
		categoryName: "운동 구분",
		categoryTag: "exercise-part",
		toggleBtnList: ["전체", "맨몸 운동", "기구 운동"],
	},
	{
		categoryName: "난이도",
		categoryTag: "difficulty",
		toggleBtnList: ["전체", "초급", "중급", "고급"],
	},
];

const selectedTags = [];

// 필터링 기능 추가
function toggleHandler(event) {
	const radioLabels = document.querySelectorAll(`input[name='${event.target.name}']`);
	radioLabels.forEach((label) => {
		label.parentNode.classList.remove("radio-container-checked");
	});
	event.target.parentNode.classList.add("radio-container-checked");

	// 필터링 호출
	window.filteringHandler(event.target.name, event.target.value);

	if (event.target.name === "part") {
		disableDetailPart(event.target.value);
	}
}

// CSS 추가
function disableDetailPart(selectedPart) {
	const detailPartInputs = document.querySelectorAll(`input[name='detail-part']`);
	detailPartInputs.forEach((input) => {
		if (selectedPart === "전체") {
			input.disabled = false;
			input.parentNode.classList.remove("disabled");
		} else {
			if (musclePart[selectedPart].includes(input.value)) {
				input.disabled = false;
				input.parentNode.classList.remove("disabled");
			} else {
				input.disabled = true;
				input.parentNode.classList.add("disabled");
			}
		}
	});
}

const categorySelectors = document.getElementById("category-selectors");

categoryInfos.forEach((category) => {
	const categoryDiv = document.createElement("div");
	categoryDiv.id = category.categoryTag;
	categoryDiv.classList.add("category-container");

	const categoryTitle = document.createElement("h2");
	categoryTitle.textContent = category.categoryName;
	categoryDiv.appendChild(categoryTitle);

	const radioContainer = document.createElement("div");
	radioContainer.classList.add("radio-container");

	let index = 0;
	category.toggleBtnList.forEach((element) => {
		const radioLabel = document.createElement("label");
		const radioInput = document.createElement("input");
		radioInput.type = "radio";
		radioInput.name = category.categoryTag;
		radioInput.value = element;
		if (index == 0) {
			index = 1;
			radioInput.checked = true;
			radioLabel.classList.add("radio-container-checked");
		}
		radioInput.addEventListener("click", toggleHandler);

		radioLabel.appendChild(radioInput);
		radioLabel.appendChild(document.createTextNode(element));
		radioContainer.appendChild(radioLabel);
	});
	categoryDiv.appendChild(radioContainer);
	index = 0;

	categorySelectors.appendChild(categoryDiv);
});

// 페이지 로드 시 '전체' 버튼에 색상 유지
document.addEventListener("DOMContentLoaded", () => {
	const checkedInputs = document.querySelectorAll("input:checked");
	checkedInputs.forEach((input) => {
		input.parentNode.classList.add("radio-container-checked");
		if (input.name === "part") {
			disableDetailPart(input.value);
		}
	});
});

window.filteringHandler = function (categoryTag, value) {
	const categoryMapping = {
		part: "부위",
		"detail-part": "상세 부위",
		"exercise-part": "운동 구분",
		difficulty: "난이도",
	};
	cardFilteringHandler(categoryMapping[categoryTag], value);
};
