// 웹 스크래핑 JS

// 근육 부위 가져오기
async function getMuscleParts() {
  console.log("근육 부위 가져오기 테스트 시행");
  const url = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com/exercises";

  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    if (response.ok) {
      const html = data.html;
      console.log(html);
      return crawlMuscleParts(html);
    } else {
      console.log("Error:", data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}

// 운동 목록 가져오기
async function getExercises(additionalLink) {
  console.log("운동 목록 가져오기 테스트 시행");

  // 초기 URL 생성
  let url = `http://localhost:5001/getHTML?url=https://www.muscleandstrength.com${additionalLink}`;

  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    const html = data.html;
    console.log(html);
    crawlExercises(html);
  } catch (error) {
    console.log("접속 실패: ", error);
    throw error;
  }
}

// 근육 파트 가져오기
function crawlMuscleParts(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // .mainpage-category-list.exercise-category-list에 해당하는 첫번째 요소를 가져옴
  const muscleCategoryList = doc.querySelector(".mainpage-category-list.exercise-category-list");

  if (muscleCategoryList) {
    // muscleCategoryList 내에 있는 .category-name에 해당하는 모든 요소들을 가져옴
    const links = muscleCategoryList.querySelectorAll("div.cell a");

    // categoryElements 내에 있는 텍스트들을 가져와 배열로 만듦
    const hrefValues = Array.from(links).map((link) => link.getAttribute("href"));
    console.log("Category Texts:", hrefValues);
    return hrefValues;
  } else {
    console.log("검색 실패");
    return null;
  }
}

// 각 근육별 운동 가져오기
function crawlExercises(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const exerciseList = doc.querySelector("#mnsview-list");

  if (exerciseList) {
    // muscleCategoryList 내에 있는 .category-name에 해당하는 모든 요소들을 가져옴
    const exerciseElements = exerciseList.querySelectorAll(".node-title");

    // categoryElements 내에 있는 텍스트들을 가져와 배열로 만듦
    const exerciseTexts = Array.from(exerciseElements).map((element) => element.textContent.trim());
    console.log("Exercise Texts:", exerciseTexts);
    return exerciseTexts;
  }
}
