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

    muscleGroup.push(a[2].getAttribute("href"));
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

      var videoLink = null;
      try {
        videoLink = exerciseDoc.querySelector(".video-wrap iframe");
        videoLink = videoLink.getAttribute("src");
      } catch {
      }

      var exerciseProfileList = []
      var exerciseProfile = exerciseDoc.querySelectorAll(".node-stats-block li");
      exerciseProfile.forEach((text) => {
        text = text.textContent;
        exerciseProfileList.push(text);
      })

      var targetMuscle = exerciseProfileList[0];
      targetMuscle = targetMuscle.split("Target Muscle Group")[1];

      var exerciseType = exerciseProfileList[1];
      exerciseType = exerciseType.split("Exercise Type")[1];

      var equipment = exerciseProfileList[2];
      equipment = equipment.split("Equipment Required")[1];

      var mechanism = exerciseProfileList[3];
      mechanism = mechanism.split("Mechanics")[1];

      var forceType = exerciseProfileList[4];
      forceType = forceType.split("Force Type")[1];

      var level = exerciseProfileList[5];
      level = level.split("Experience Level")[1];

      var second = exerciseProfileList[6];
      second = second.split("Secondary Muscles")[1];
      second = second.replaceAll("\n", '');


      var overview = null;
      var overviewList = []
      try {
        overview = exerciseDoc.querySelectorAll(".content h2");
        overview.forEach((text)=>{
          text = text.textContent;
          text = text.split(`${exercise.name}`)[1];
          text = text.replaceAll(" ", '');
          overviewList.push(text);
        })
        console.log(overviewList);
      } catch {
      }
      console.log(exercise.name);
      try {
        var overview = exerciseDoc.querySelector(".field-name-field-exercise-overview");
        overview = overview.textContent;
        console.log(overview);
      } catch {

      }

      var tip = null;

      try {
        var instruction = exerciseDoc.querySelector(".field-type-text-with-summary");
        instruction = instruction.textContent;
        instruction = instruction.replaceAll("\n", ' ');
        if (instruction.split("Tips:")[1] != null){
          tip = instruction.split("Tips:")[1];
          instruction = instruction.split("Tips:")[0];
          console.log(instruction);
          console.log(tip);
        } else if (instruction.split("Tips")[1] != null) {
          tip = instruction.split("Tips")[1];
          instruction = instruction.split("Tips")[0];
          console.log(instruction);
          console.log(tip);
        } else {
          console.log(instruction);
        }
      } catch {

      }

      try {
        tip = exerciseDoc.querySelector(".field-name-field-exercise-tips");
        tip = tip.textContent;
        tip = tip.replaceAll("\n", ' ');
        console.log(tip);
      } catch {
        
      }

      var exerciseInfo = new Object();

      exerciseInfo.name = exercise.name;
      exerciseInfo.link = exercise.link;
      exerciseInfo.videoLink = videoLink;
      exerciseInfo.targetMuscle = targetMuscle;
      exerciseInfo.exerciseType = exerciseType;
      exerciseInfo.equipment = equipment;
      exerciseInfo.mechanism = mechanism;
      exerciseInfo.forceType = forceType;
      exerciseInfo.level = level;
      exerciseInfo.second = second;
      exerciseInfo.overview = overview;
      exerciseInfo.instruction = instruction;
      exerciseInfo.tip = tip;

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