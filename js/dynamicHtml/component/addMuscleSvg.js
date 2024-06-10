const muscleTranslation = {
	abductors: "대퇴근",
	abs: "복근",
	adductors: "내전근",
	biceps: "이두근",
	calves: "종아리",
	chest: "가슴",
	forearms: "팔뚝",
	glutes: "둔근",
	hamstrings: "햄스트링",
	"hip-flexors": "엉덩이 굴곡근",
	"it-band": "장경인대",
	lats: "허리",
	"lower-back": "등 아래쪽",
	"upper-back": "등 위쪽",
	neck: "목",
	obliques: "외복사근",
	"palmar-fascia": "긴손바닥근",
	"plantar-fascia": "족저근막",
	quads: "대퇴사두근",
	shoulders: "어깨",
	traps: "승모근",
	triceps: "삼두근",
};

document.addEventListener("DOMContentLoaded", function () {
	var muscleDiv = document.getElementById("muscle-part");
	var muscleName = document.getElementById("muscle-name");
	var selectedMuscle = null;

	d3.xml("../img/Anatomy-both.svg").then(function (data) {
		muscleDiv.innerHTML = ""; // Clear existing content
		var svgNode = data.documentElement;
		muscleDiv.appendChild(svgNode); // Append SVG node

		var muscleGroups = [
			"abductors",
			"abs",
			"adductors",
			"biceps",
			"calves",
			"chest",
			"forearms",
			"glutes",
			"hamstrings",
			"hip-flexors",
			"it-band",
			"lats",
			"lower-back",
			"upper-back",
			"neck",
			"obliques",
			"palmar-fascia",
			"plantar-fascia",
			"quads",
			"shoulders",
			"traps",
			"triceps",
		];

		muscleGroups.forEach(function (group) {
			d3.selectAll("g." + group)
				.on("mouseover", function () {
					if (this !== selectedMuscle) {
						d3.select(this).style("fill", "#00ffc8");
					}
				})
				.on("mouseout", function () {
					if (this !== selectedMuscle) {
						d3.select(this).style("fill", "lightgray");
					}
				})
				.on("click", function () {
					console.log("Clicked on:", group);
					if (selectedMuscle === this) {
						// 이미 선택된 근육을 다시 클릭하면..
						d3.select(this).style("fill", "lightgray").classed("selected", false);
						selectedMuscle = null;
						muscleName.textContent = "전체";
						// 전체 운동 리스트로
						window.filteringHandler("전체");
					} else {
						// 다른 근육을 클릭하면
						if (selectedMuscle) {
							console.log("Deselecting muscle:", selectedMuscle);
							d3.select(selectedMuscle).style("fill", "lightgray").classed("selected", false);
						}
						selectedMuscle = this;
						console.log("Selecting muscle:", selectedMuscle);
						d3.select(this).style("fill", "#3ed4b3").classed("selected", true);
						var muscleNameTranslated = muscleTranslation[group] || group.charAt(0).toUpperCase() + group.slice(1);
						muscleName.textContent = muscleNameTranslated;
						window.filteringHandler(muscleNameTranslated, true);
					}
				});
		});
	});
});
