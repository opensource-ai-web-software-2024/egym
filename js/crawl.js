async function crawling(url, parent_selector, selector, type, attr) {
  try {
    console.log("fetch 시도");
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    if (response.ok) {
      const html = data.html;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      console.log("selector: " + selector);
      const parentTag = doc.querySelector(parent_selector); // 부모 선택자로 상위 태그 선택
      const tags = parentTag.querySelectorAll(selector); // 상위 태그에서 하위 태그 여러 개를 선택
      var targetData = [];
      if (type === "attr") { // attribute가 필요할 때
        [...tags].forEach((tag) => {
          targetData.push(tag.getAttribute(attr));
        });
      } else { // textContent가 필요할 때
        [...tags].forEach((tag) => {
          targetData.push(tag.textContent.trim());
        })
      }
      return targetData;
    } else {
      console.log("Error:", data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.log("fetch 실패");
    throw error;
  }
}

function deduplicationA(data) {
  var newData = [];
  for (let i = 0; i < data.length; i += 2) {
    newData.push(data[i]);
  }
  return newData;
}

async function crawlingMuscleGroup() {
  const url = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com/exercises";
  try {
    const muscleGroup = await crawling(
      url,
      ".mainpage-category-list.exercise-category-list",
      "a",
      "attr",
      "href"
    );
    return muscleGroup;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}

async function crawlingExerciseGroup(muscleGroup) {
  const baseUrl = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com";
  let exerciseGroup = []; 

  const promises = muscleGroup.map(async (muscle) => {
    try {
      const fullUrl = `${baseUrl}${muscle}`; 
      const exercises = await crawling(
        fullUrl,
        "#mnsview-list",
        "a",
        "attr",
        "href"
      );
      return exercises;
    } catch (error) {
      console.log("Error: ", error);
      throw error; 
    }
  });

  try {
    exerciseGroup = await Promise.all(promises); // 모든 비동기 작업이 완료될 때까지 대기
    console.log(exerciseGroup);
    return exerciseGroup.flat(); // 2차원 배열을 1차원 배열로 평탄화하여 반환
  } catch (error) {
    console.log("Error in Promise.all: ", error);
    throw error; // Promise.all 중 발생한 에러 처리
  }
}

function deduplicationB(data) {
  var newData = [];
  for (let i = 0; i < data.length; i += 3) {
    newData.push(data[i]);
  }
  return newData;
}

async function crawlingExerciseInfoGroup(exerciseGroup) {
  // 윤태 형이 작업할 부분
  // card.js에 있는 객체들 참고하여 운동 정보 반환하도록 할 것

  const baseUrl = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com";
  let exerciseInfo = [];

  const promises = exerciseGroup.map(async (exercise) => {
    try {
      const fullUrl = `${baseUrl}${exercise}`;
      console.log(fullUrl);
      const Info = await crawling(
        fullUrl,
        "#block-system-main",
        "article",
        "text"
      );
      console.log(Info);
      return Info; 
    } catch (error) {
        console.log("Error: ", error);
        throw error; 
    }
  });

  try {
    exerciseInfo = await Promise.all(promises);
    console.log(exerciseInfo);
    return exerciseInfo;
  } catch (error) {
    console.log("Error in Promise.all: ", error);
    throw error; // Promise.all 중 발생한 에러 처리
  }
}

async function deletePage(data, muscle) {
  var newData = [];
  for (let i = 0; i < data.length; i += 1) {
    let a = 0;
    for(let j = 0; j < muscle.length; j += 1) {
      if (data[i].indexOf(muscle[j]) != -1) {
        a = 1;
      }
    }
    if (a != 1) {
      newData.push(data[i]);
    }
  }
  return newData;
}

(async () => {
  const muscleGroup = deduplicationA(await crawlingMuscleGroup()); // 근육 목록 가져오기
  console.log(muscleGroup);
  const exerciseGroup = deduplicationB(await deletePage(await crawlingExerciseGroup(muscleGroup), muscleGroup)); // 운동 목록 가져오기
  console.log(exerciseGroup);
  const exerciseInfoGroup = await crawlingExerciseInfoGroup(exerciseGroup); // 운동 상세 정보 가져오기 (유튜브 등)
  console.log(exerciseInfoGroup);
})();