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

      if (Info3.length == 4) {
        var overview = Info3[1];
        var instruction = Info3[2];
        var tip = Info3[3];

        overview = overview.split('Overview');
        overview = overview[1];

        instruction = instruction.split('Instructions');
        instruction = instruction[1];

        tip = tip.split('Tips');
        tip = tip[1];

        console.log(overview);
        console.log(instruction);
        console.log(tip);

      } else if (Info3.length == 3) {
        var instruction = Info3[1];
        var tip = Info3[2];

        instruction = instruction.split('Instructions');
        instruction = instruction[1];

        tip = tip.split('Tips');
        tip = tip[1];

        console.log(instruction);
        console.log(tip);

      } else if (Info3.length == 2) {
        Info3 = Info3[1];
        try {
          Info3 = Info3.split('Exercise Tips:');
          var instruction = Info3[0];

          instruction = instruction.split('Instructions');
          instruction = instruction[1];

          var tip = Info3[1];
        } catch (error) {
          Info3 = Info3.split('Tips:');
          var instruction = Info3[0];

          instruction = instruction.split('Instructions');
          instruction = instruction[1];

          var tip = Info3[1];
        }

        try {
          overview = overview.split("\n").join("");
        } catch {
      
        }
        
        instruction = instruction.split("\n").join("");
        tip = tip.split("\n").join("");

        console.log(instruction);
        console.log(1);
        console.log(tip);

      }
      

      // const exerciseObject = new Object();

      // exerciseObject.exerciseName = `${exerciseName[i]}`;
      // exerciseObject.targetMuscle = `${targetMuscle}`;
      // exerciseObject.exerciseType = `${exerciseType}`;
      // exerciseObject.equipmentRequired = `${equipmentRequired}`;
      // exerciseObject.mechanics = `${mechanics}`;
      // exerciseObject.forceType = `${forceType}`;
      // exerciseObject.experienceLevel = `${experienceLevel}`;
      // exerciseObject.secondaryMuscle = `${secondaryMuscle}`;
      // exerciseObject.overview = `${overview}`;
      // exerciseObject.instructions = `${instructions}`;
      // exerciseObject.tips = `${tips}`;  

      // return exerciseObject;

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

  // let toString = data.toString();
  // var Info = toString.split('Exercise Profile');
  // var Name = Info[0]; // 운동 이름
  // console.log('Name: ' + Name);
  // Info = Info[1];
  // Info = Info.split('Target Muscle Group');
  // Info = Info[1];
  // Info = Info.split('Exercise Type');
  // var targetMuscle = Info[0]; // 운동 부위
  // Info = Info[1].split('Equipment Required');
  // var exerciseType = Info[0]; // 운동 종류
  // Info = Info[1].split('Mechanics');
  // var equipmentRequired = Info[0]; // 도구 필요
  // Info = Info[1].split('Force Type');
  // var mechanics = Info[0]; // 원리
  // Info = Info[1].split('Experience Level');
  // var forceType = Info[0]; // 힘의 방향
  // Info = Info[1].split('Secondary Muscles');
  // var experienceLevel = Info[0]; // 난이도
  // var secondaryMuscle = Info[1]; // 협응근
  // secondaryMuscle = secondaryMuscle.split("\n").join("");

  // var Info2 = a[2];

  // Info2 = Info2[1].split('Overview');
  // Info2 = Info2[1];
  // Info2 = Info2[1].split('Instructions');
  // var overview = Info2[0];
  // overview = overview.split(Name);
  // overview = overview[0];
  // overview = overview.split("\n").join("");
  // Info2 = Info2[1].split('Tips');
  // var instructions = Info2[0];
  // instructions = instructions.split(Name);
  // instructions = instructions[0];
  // instructions = instructions.split("\n").join("");
  // var tips = Info2[1];
  // tips = tips.split("\n").join("");

  // const exerciseObject = new Object();

  // exerciseObject.targetMuscle = `${targetMuscle}`;
  // exerciseObject.exerciseType = `${exerciseType}`;
  // exerciseObject.equipmentRequired = `${equipmentRequired}`;
  // exerciseObject.mechanics = `${mechanics}`;
  // exerciseObject.forceType = `${forceType}`;
  // exerciseObject.experienceLevel = `${experienceLevel}`;
  // exerciseObject.secondaryMuscle = `${secondaryMuscle}`;
  // exerciseObject.overview = `${overview}`;
  // exerciseObject.instructions = `${instructions}`;
  // exerciseObject.tips = `${tips}`;

  // return exerciseObject;


  // let exerciseObjectList = [];

  // const promises = data.map(async (data, i) => {
  //   try {
  //     let toString = data.toString();
  //     var a = toString.split('Target Muscle Group');
  //     var Info = a[1];
  //     Info = Info.split('Exercise Type');

  //     var targetMuscle = Info[0];
  //     var Info = Info[1].split('Equipment Required');
  //     var exerciseType = Info[0];
  //     var Info = Info[1].split('Mechanics');
  //     var equipmentRequired = Info[0];
  //     var Info = Info[1].split('Force Type');
  //     var mechanics = Info[0];
  //     var Info = Info[1].split('Experience Level');
  //     var forceType = Info[0];
  //     var Info = Info[1].split('Secondary Muscles');
  //     var experienceLevel = Info[0];
  //     var secondaryMuscle = Info[1];
  //     secondaryMuscle = secondaryMuscle.split("\n").join("");

  //     var Info2 = a[2];
      
  //     Info2 = Info2.split(targetMuscle);
  //     try {
  //       Info2 = Info2[1].split('Overview');
  //     } catch (error) {
  //       var overview = 'None';
  //     }
  //     try {
  //       Info2 = Info2[1].split('Instructions');
  //     } catch (error) {
  //       var instructions = 'None';
  //     }
  //     var overview = Info2[0];
  //     overview = overview.split(exerciseName[i]);
  //     overview = overview[0];
  //     overview = overview.split("\n").join("");
  //     try {
  //       Info2 = Info2[1].split('Tips');
  //       var instructions = Info2[0];
  //       instructions = instructions.split(exerciseName[i]);
  //       instructions = instructions[0];
  //       instructions = instructions.split("\n").join("");
  //       var tips = Info2[1];
  //       tips = tips.split("\n").join("");
  //     } catch (error) {
  //       var instructions = 'None';
  //       var tips = 'None';
  //     }

  //     const exerciseObject = new Object();

  //     exerciseObject.exerciseName = `${exerciseName[i]}`;
  //     exerciseObject.targetMuscle = `${targetMuscle}`;
  //     exerciseObject.exerciseType = `${exerciseType}`;
  //     exerciseObject.equipmentRequired = `${equipmentRequired}`;
  //     exerciseObject.mechanics = `${mechanics}`;
  //     exerciseObject.forceType = `${forceType}`;
  //     exerciseObject.experienceLevel = `${experienceLevel}`;
  //     exerciseObject.secondaryMuscle = `${secondaryMuscle}`;
  //     exerciseObject.overview = `${overview}`;
  //     exerciseObject.instructions = `${instructions}`;
  //     exerciseObject.tips = `${tips}`;  

  //     return exerciseObject;

  //   } catch (error) {
  //       console.log("Error: ", error);
  //       throw error; 
  //   }
  // });

  // try {
  //   exerciseObjectList = await Promise.all(promises);
  //   console.log(exerciseObjectList);
  //   return exerciseObjectList;
  // } catch (error) {
  //   console.log("Error in Promise.all: ", error);
  //   throw error; // Promise.all 중 발생한 에러 처리
  // }

  
}

(async () => {
  const muscleGroup = deduplicationA(await crawlingMuscleGroup()); // 근육 목록 가져오기
  console.log(muscleGroup); 
  const exerciseGroup = deduplicationB(await deleteMuscle(await crawlingExerciseGroup(muscleGroup), muscleGroup)); // 운동 목록 가져오기
  console.log(exerciseGroup);
  const exerciseInfoGroup = await crawlingExerciseInfoGroup(exerciseGroup); // 운동 상세 정보 가져오기 (유튜브 등)
  console.log(exerciseInfoGroup);
  const exerciseObjectList = await exerciseInfoObject(exerciseInfoGroup);
  // console.log(exerciseObjectList);
  // return exerciseObjectList;
})();