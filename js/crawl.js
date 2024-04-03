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

  // try { // 테스트용
  //   const fullUrl = `${baseUrl}${muscleGroup[0]}`; 
  //   const exercises = await crawling(
  //     fullUrl,
  //     "#mnsview-list",
  //     "a",
  //     "attr",
  //     "href"
  //   );
  //   return exercises;
  // } catch (error) {
  //   console.log("Error: ", error);
  //   throw error; 
  // }

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

// async function crawlingExerciseName(muscleGroup) {
//   const baseUrl = "http://localhost:5001/getHTML?url=https://www.muscleandstrength.com";
//   let exerciseGroup = []; 

//   // for (const muscle of muscleGroup) {
//   //   try {
//   //     const fullUrl = `${baseUrl}${muscle}`; 
//   //     const exercises = await crawling(
//   //       fullUrl,
//   //       "#mnsview-list",
//   //       ".node-title",
//   //       "text"
//   //     );
//   //     exerciseGroup.push(exercises);
//   //   } catch (error) {
//   //     console.log("Error: ", error);
//   //     throw error; 
//   //   }
//   // }

//   // console.log(exerciseGroup);
//   // return exerciseGroup.flat(); 

//   const promises = muscleGroup.map(async (muscle) => {
//     try {
//       const fullUrl = `${baseUrl}${muscle}`; 
//       const exercises = await crawling(
//         fullUrl,
//         "#mnsview-list",
//         ".node-title",
//         "text"
//       );
//       return exercises;
//     } catch (error) {
//       console.log("Error: ", error);
//       throw error; 
//     }
//   });

//   try {
//     exerciseGroup = await Promise.all(promises); // 모든 비동기 작업이 완료될 때까지 대기
//     console.log(exerciseGroup);
//     return exerciseGroup.flat(); // 2차원 배열을 1차원 배열로 평탄화하여 반환
//   } catch (error) {
//     console.log("Error in Promise.all: ", error);
//     throw error; // Promise.all 중 발생한 에러 처리
//   }
// }

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
  
  // try {
  //   const fullUrl = `${baseUrl}${exerciseGroup[0]}`;
  //   console.log(fullUrl);
  //   const Info = await crawling(
  //     fullUrl,
  //     "#block-system-main",
  //     "article",
  //     "text"
  //   );
  //   var Name = await crawling(
  //     fullUrl,
  //     "#block-system-main",
  //     "h1",
  //     "text"
  //   );
  //   Name = Name.toString();
  //   Name = Name.split('Video');
  //   Name = Name[0];
  //   var result = Name + Info;
  //   return result;
  // } catch (error) {
  //     console.log("Error: ", error);
  //     throw error; 
  // }


  const promises = exerciseGroup.map(async (exercise, i) => {
    try {
      const fullUrl = `${baseUrl}${exercise}`;
      console.log(fullUrl);
      const Info = await crawling(
        fullUrl,
        "#block-system-main",
        "article",
        "text",
        console.log(i)
      );
      var Name = await crawling(
        fullUrl,
        "#block-system-main",
        "h1",
        "text"
      );
      Name = Name.toString();
      Name = Name.split('Video');
      Name = Name[0];
      console.log(Info);
      console.log(Name);
      console.log(i);
      var result = Name + Info;
      return result;
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

async function deleteMuscle(data, muscle) {
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

async function exerciseInfoObject(data) {

  let exerciseObjectList = [];

  const promises = data.map(async (data, i) => {
    try {
      let toString = data.toString();
      var Info = toString.split('Target Muscle Group');
      
      var Info1 = Info[0]; // 운동 이름
      Info1 = Info1.split(' Exercise Profile');
      Info1 = Info1[0];
      var exerciseName = Info1;
      console.log(exerciseName);

      var Info2 = Info[1]; // 운동 정보
      Info2 = Info2.split('Exercise Type');
      var targetMuscle = Info2[0];
      console.log(targetMuscle);

      Info2 = Info2[1];
      Info2 = Info2.split('Equipment Required');
      var exerciseType = Info2[0];
      console.log(exerciseType);

      Info2 = Info2[1];
      Info2 = Info2.split('Mechanics');
      var equipmentRequired = Info2[0];
      console.log(equipmentRequired);

      Info2 = Info2[1];
      Info2 = Info2.split('Force Type');
      var mechanics = Info2[0];
      console.log(mechanics);

      Info2 = Info2[1];
      Info2 = Info2.split('Experience Level');
      var forceType = Info2[0];
      console.log(forceType);

      Info2 = Info2[1];
      Info2 = Info2.split('Secondary Muscles');
      var experienceLevel = Info2[0];
      console.log(experienceLevel);

      var secondaryMuscle = Info2[1];
      secondaryMuscle = secondaryMuscle.split("\n").join("");
      console.log(secondaryMuscle);

      var Info3 = Info[2]; // 운동 설명
      Info3 = Info3.split(exerciseName);

      var overview = 'None';
      var instruction = 'None';
      var tip = 'None';

      if (Info3.length == 4) {
        overview = Info3[1];
        instruction = Info3[2];
        tip = Info3[3];

        overview = overview.split('Overview');
        overview = overview[1];

        instruction = instruction.split('Instructions');
        instruction = instruction[1];

        tip = tip.split('Tips');
        tip = tip[1];

      } else if (Info3.length == 3) {
        instruction = Info3[1];
        tip = Info3[2];

        instruction = instruction.split('Instructions');
        instruction = instruction[1];

        tip = tip.split('Tips');
        tip = tip[1];

      } else if (Info3.length == 2) {
        Info3 = Info3[1];
        try {
          Info3 = Info3.split('Exercise Tips:');
          instruction = Info3[0];

          instruction = instruction.split('Instructions');
          instruction = instruction[1];

          tip = Info3[1];
        } catch (error) {
          Info3 = Info3.split('Tips:');
          instruction = Info3[0];

          instruction = instruction.split('Instructions');
          instruction = instruction[1];

          tip = Info3[1];
        }
      }

      try {
        overview = overview.trim();
      } catch {}

      try {
        instruction = instruction.trim();
      } catch {}

      if (tip != null) {
        if (tip.indexOf(':') != -1) {
          tip = tip.split(':');
          tip = tip[1];
        } else {}
      } else {}

      try {
        tip = tip.trim();
      } catch{}    

      const exerciseObject = new Object();

      exerciseObject.exerciseName = `${exerciseName}`;
      exerciseObject.targetMuscle = `${targetMuscle}`;
      exerciseObject.exerciseType = `${exerciseType}`;
      exerciseObject.equipmentRequired = `${equipmentRequired}`;
      exerciseObject.mechanics = `${mechanics}`;
      exerciseObject.forceType = `${forceType}`;
      exerciseObject.experienceLevel = `${experienceLevel}`;
      exerciseObject.secondaryMuscle = `${secondaryMuscle}`;
      exerciseObject.overview = `${overview}`;
      exerciseObject.instructions = `${instruction}`;
      exerciseObject.tips = `${tip}`;  

      return exerciseObject;

    } catch (error) {
        console.log("Error: ", error);
        throw error; 
    }
  });

  try {
    exerciseObjectList = await Promise.all(promises);
    console.log(exerciseObjectList);
    return exerciseObjectList;
  } catch (error) {
    console.log("Error in Promise.all: ", error);
    throw error; // Promise.all 중 발생한 에러 처리
  }  
}

async function convertToCSV(objArray) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let csv = '';

  // 헤더 생성
  csv += Object.keys(array[0]).join(',') + '\n';

  // 데이터 생성
  array.forEach(item => {
      csv += Object.values(item).join(',') + '\n';
  });

  return csv;
}

(async () => {
  const muscleGroup = deduplicationA(await crawlingMuscleGroup()); // 근육 목록 가져오기
  console.log(muscleGroup); 
  const exerciseGroup = deduplicationB(await deleteMuscle(await crawlingExerciseGroup(muscleGroup), muscleGroup)); // 운동 목록 가져오기
  console.log(exerciseGroup);
  const exerciseInfoGroup = await crawlingExerciseInfoGroup(exerciseGroup); // 운동 상세 정보 가져오기 (유튜브 등)
  console.log(exerciseInfoGroup);
  const exerciseObjectList = await exerciseInfoObject(exerciseInfoGroup);

  const csvContent = await convertToCSV(exerciseObjectList);
  const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'exercises.csv');
  document.body.appendChild(link); // 필요시 다른 요소에 추가 가능
  link.click();
})();