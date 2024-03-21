// 추후 데이터베이스 연결을 위한
const muscleTranslation = {
	대퇴근: "abductors",
	복근: "abs",
	대퇴내전근: "adductors",
	이두근: "biceps",
	종아리: "calves",
	가슴: "chest",
	팔뚝: "forearms",
	둔근: "glutes",
	햄스트링: "hamstrings",
	"고관절 굴곡근": "hip flexors",
	장경인대: "it band",
	광배근: "lats",
	"등 아래쪽": "lower back",
	"등 위쪽": "upper back",
	목: "neck",
	외복사근: "obliques",
	긴손바닥근: "palmar fascia",
	족저근막: "plantar fascia",
	대퇴사두근: "quads",
	어깨: "shoulders",
	승모근: "traps",
	삼두근: "triceps",
};

const musclePart = {
	하체: ["대퇴근", "대퇴내전근", "종아리", "둔근", "햄스트링", "고관절 굴곡근", "장경인대", "허벅지", "족저근막"],
	가슴: ["가슴"],
	등: ["광배근", "등 아래쪽", "등 위쪽"],
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
			"대퇴내전근",
			"이두근",
			"종아리",
			"가슴",
			"팔뚝",
			"둔근",
			"햄스트링",
			"고관절 굴곡근",
			"장경인대",
			"광배근",
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

function toggleHandler(event) {
	console.log(event.target);

	const label = event.target.parentNode;
	if (event.target.checked) {
		console.log(event.target.checked);
		const label = event.target.parentNode;
		label.style.backgroundColor = 'blue'; // 부모 요소의 배경색을 파란색으로 변경
	} else {
		label.style.backgroundColor = 'none'; 
	}
}

const categorySelectors = document.getElementById("category-selectors");

categoryInfos.forEach((category) => {
	// 카테고리 컨테이너 제작
	const categoryDiv = document.createElement("div");
	categoryDiv.id = category.categoryTag;
	categoryDiv.classList.add("category-container"); // CSS 적용을 위한 요소

	// 제목 추가
	const categoryTitle = document.createElement("h2");
	categoryTitle.textContent = category.categoryName;
	categoryDiv.appendChild(categoryTitle);

	// 라디오 버튼 넣을 컨테이너 추가
	const radioContainer = document.createElement("div");
	radioContainer.classList.add("radio-container"); // 가로 정렬

	let index = 0;
	// 라디오 버튼 추가
	category.toggleBtnList.forEach((element) => {
		const radioLabel = document.createElement("label");
		const radioInput = document.createElement("input");
		radioInput.type = "radio";
		// 같은 그룹 묶기 위해 categoryTag
		radioInput.name = category.categoryTag;
		// value 우선 한글로 저장, 추후 데이터 연결 위해서 영어로 변환 필요성?
		radioInput.value = element;
		// 맨 처음 요소는 checked
		if (index == 0) {
			index = 1;
			radioInput.checked = true;
		}
		radioInput.addEventListener('click', toggleHandler);

		// radio 버튼 label에 삽입
		radioLabel.appendChild(radioInput);
		// 라벨 텍스트 지정 (toggleBtnList 항목)
		radioLabel.appendChild(document.createTextNode(element));
		radioContainer.appendChild(radioLabel);
	});
	categoryDiv.appendChild(radioContainer);
	index = 0;

	// 카테고리 선택기에 추가
	categorySelectors.appendChild(categoryDiv);
});
