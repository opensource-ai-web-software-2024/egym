import { createExerciseInfoHeader } from "./exerciseInfoHeader.js";
import { createExerciseCategoryClassification}  from './exerciseCategoryClassification.js';
import { createExerciseVideoFrame } from './exerciseVideoFrame.js';
import { createExerciseProfile } from './exerciseProfile.js';
import { createExerciseIntroduction, createExerciseProcedure, createExerciseTips } from "./exerciseSentences.js";


export function createExerciseInfoContent(exerciseInfoContainer, exerciseListContainer, cardInfo) {
    var exerciseInfoContent = document.createElement("div");
    exerciseInfoContent.id = "exercise-info-content";
    
    // 운동 상세 정보 페이지 헤더 만들기
    var exerciseInfoHeader = createExerciseInfoHeader(exerciseListContainer, cardInfo);
    exerciseInfoContent.appendChild(exerciseInfoHeader);

    var exerciseCategoryClassification = createExerciseCategoryClassification(cardInfo);
    exerciseInfoContent.appendChild(exerciseCategoryClassification);

    // 운동 영상 프레임 만들기
    var exerciseVideo = createExerciseVideoFrame(cardInfo.youtubeLink);
    exerciseInfoContent.appendChild(exerciseVideo);
    exerciseInfoContainer.appendChild(exerciseInfoContent);

    // 운동 프로필 만들기
    var exerciseProfile = createExerciseProfile(cardInfo.exerciseInfo);
    exerciseInfoContent.appendChild(exerciseProfile);   

    // 운동 소개 만들기
    var exerciseIntroduction = createExerciseIntroduction(cardInfo.exerciseIntroduction);
    exerciseInfoContent.appendChild(exerciseIntroduction);

    // 운동 순서 만들기
    var exerciseProcedure = createExerciseProcedure(cardInfo.exerciseProcedure);
    exerciseInfoContent.appendChild(exerciseProcedure);     

    // 운동 팁 만들기
    var exerciseTips = createExerciseTips(cardInfo.exerciseTips);
    exerciseInfoContent.appendChild(exerciseTips);
    
    exerciseInfoContainer.appendChild(exerciseInfoContent);
}

