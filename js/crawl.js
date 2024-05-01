async function crawling(url) {
  try {
    console.log("fetch 시도");
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    if (response.ok) {
      const html = data.html;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc;

    } else {
      console.log("Error: ", data.error);
      throw new Error(data.error);
    }
  } catch(error) {
    console.log("fetch 실패");
    throw error;
  }
}

async function href(doc) {
  var muscleGroup = [];

  try {
    const content = doc.querySelector(".mainpage-category-list");
    const a = content.querySelectorAll("a");

    //전체 크롤링

    // a.forEach(element => {
    //   muscleGroup.push(element.getAttribute("href")); 
    // });
    // return muscleGroup;

    //테스트용 크롤링

    muscleGroup.push(a[1].getAttribute("href"));
    console.log("muclsGroup:", muscleGroup);
    return muscleGroup;

  } catch(error) {
    console.log("error:", error);
  }
}

async function allExercise(muscleGroup){
  const baseUrl = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com";
  let exerciseGroup = []

  const promises = muscleGroup.map(async (muscle)=>{
    try {
      const fullUrl = `${baseUrl}${muscle}`;
      console.log(fullUrl);
      const exerciseDoc = await crawling(fullUrl);

      const content1 = exerciseDoc.querySelector("#mnsview-list");
      const exerciseList = content1.querySelectorAll(".node-title a");

      let exerciseArray = []

      exerciseList.forEach((a, i)=>{
        var exerciseName = new Object();
        console.log(a.textContent.trim());
        console.log(a.getAttribute("href"));
        exerciseName.name = a.textContent.trim();
        exerciseName.link = a.getAttribute("href");
        exerciseArray.push(exerciseName);
      })

      return exerciseArray;

    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  });

  try {
    exerciseGroup = await Promise.all(promises); // 모든 비동기 작업이 완료될 때까지 대기
    return exerciseGroup.flat(); // 2차원 배열을 1차원 배열로 평탄화하여 반환
  } catch (error) {
    console.log("Error in Promise.all: ", error);
    throw error; // Promise.all 중 발생한 에러 처리
  }
}

async function getExerciseInfo(exercises) {
  let exerciseInfoList = []
  const baseUrl = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com";

  const promises = exercises.map(async (exercise)=>{
    try {
      const fullUrl = `${baseUrl}${exercise.link}`;
      console.log(fullUrl);
      const exerciseDoc = await crawling(fullUrl);

      var title = exercise.name;
      var videoLink = null;
      try {
        videoLink = exerciseDoc.querySelector(".video-wrap iframe");
        videoLink = videoLink.getAttribute("src");
      } catch {
      }
      var targetMuscle = exerciseDoc.querySelector(".node-stats-block a");
      targetMuscle = targetMuscle.textContent.trim();
      console.log(targetMuscle);
      
      var exerciseProfileList = []
      var exerciseProfile = exerciseDoc.querySelectorAll(".node-stats-block li");
      exerciseProfile.forEach((text) => {
        text = text.textContent;
        exerciseProfileList.push(text);
      })

      console.log(title);
      var overview = null;
      try {
        overview = exerciseDoc.querySelector(".field-name-field-exercise-overview");
        overview = overview.textContent;
        console.log(overview);
      } catch {
      }

      var exerciseInfo = new Object();

      exerciseInfo.name = exercise.name;
      exerciseInfo.link = exercise.link;
      exerciseInfo.videoLink = videoLink;
      exerciseInfo.targetMuscle = targetMuscle;
      exerciseInfo.exerciseProfile = exerciseProfileList;
      exerciseInfo.overview = overview;

      return exerciseInfo;

    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  });

  try {
    exerciseInfoList = await Promise.all(promises); // 모든 비동기 작업이 완료될 때까지 대기
    return exerciseInfoList.flat(); // 2차원 배열을 1차원 배열로 평탄화하여 반환
  } catch (error) {
    console.log("Error in Promise.all: ", error);
    throw error; // Promise.all 중 발생한 에러 처리
  }
}

// async function convertToCSV(objArray) {
//   const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//   let csv = '';

//   // 헤더 생성
//   csv += Object.keys(array[0]).join(',') + '\n';

//   // 데이터 생성
//   array.forEach(item => {
//       csv += Object.values(item).join(',') + '\n';
//   });

//   return csv;
// }

(async () => {

  const source = await crawling("http://localhost:5001/getHTML?url=https://www.muscleandstrength.com/exercises");
  const href1 = await href(source);
  const exercises = await allExercise(href1);
  const exerciseInfo = await getExerciseInfo(exercises);
  console.log(exerciseInfo);
})();