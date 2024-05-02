import { createExerciseInfoContent } from "./exerciseInfoContent.js";

// 페이지 생성 여부
// 컴포넌트를 한 번만 생성해야 하므로 변수가 필요
var isCreated = false; 
var prevCardInfo = null;
var exerciseListContainer = document.getElementById("exercise-list-container"); // 검색 페이지
var exerciseInfoContainer = document.getElementById("exercise-info-container"); // 운동 상세 페이지

export function createExerciseInfoContainer(cardInfo) {  // 운동 상세 정보 페이지 만들기 함수
    exerciseListContainer.style.display = "none"; // 운동 검색 정보 페이지는 안 보이도록 설정  
    
    var existingContent = document.getElementById("exercise-info-content");
    if (existingContent) {
        existingContent.remove();
        createExerciseInfoContent(exerciseInfoContainer, exerciseListContainer, cardInfo);
    }
}   





function createExerciseCategoryClassification(cardInfo) { // 카테고리 정보 만드는 함수
    var exerciseCategoryClassification = document.createElement("div");
    exerciseCategoryClassification.id = "exercise-category-classfication";

    var categories = [ cardInfo.exerciseInfo.targetMuscleGroup, cardInfo.exerciseInfo.equipmentRequired, cardInfo.exerciseInfo.experienceLevel ];
    categories.forEach((category) => {
        var categoryIndicator = document.createElement("div");
        categoryIndicator.classList.add("category-indicator");
        categoryIndicator.textContent = category;
        exerciseCategoryClassification.appendChild(categoryIndicator);
    })

    return exerciseCategoryClassification;  
}

function createExerciseVideo(youtubeLink) {
    var exerciseVideo = document.createElement("div");
    exerciseVideo.id = "exercise-video";
    
    var exerciseVideoFrame = createExerciseVideoFrame(youtubeLink);
    exerciseVideo.appendChild(exerciseVideoFrame);
    
    return exerciseVideo;
}

function createExerciseVideoFrame(youtubeLink) { // 비디오 프레임 만드는 함수
    // 비디오 프레임 만들기
    var exerciseVideoFrame = document.createElement("iframe");
    exerciseVideoFrame.id = "exercise-video-frame";
    console.log(youtubeLink);
    exerciseVideoFrame.src = youtubeLink;
    exerciseVideoFrame.referrerpolicy = "strict-origin-when-cross-origin";
    
    return exerciseVideoFrame;
}

function createExerciseProfile(exerciseInfo) {
    var exerciseProfile = document.createElement("div");
    exerciseProfile.id = "exercise-profile";
    
    var headline = document.createElement("h2");
    headline.textContent = "운동 프로필";
    exerciseProfile.appendChild(headline);

    var exerciseProfileTable = document.createElement("table");
    exerciseProfileTable.id = "exercise-profile-table";
    
    for (var key in exerciseInfo) {
        var tr = document.createElement("tr");
        
        var keyTd = document.createElement("td");
        keyTd.textContent = key;
        tr.appendChild(keyTd);

        var valueTd = document.createElement("td");
        valueTd.textContent = exerciseInfo[key];
        tr.appendChild(valueTd);

        exerciseProfileTable.appendChild(tr);
    }
        
    exerciseProfile.appendChild(exerciseProfileTable);
    return exerciseProfile;
}

function createDivForSentence(id, title, sentence) {
    var div = document.createElement("div");
    div.id = id;

    var headline = document.createElement("h2");
    headline.textContent = title;
    div.appendChild(headline);

    var paragraph = document.createElement("p");
    paragraph.textContent = sentence;
    div.appendChild(paragraph);

    return div;
}

function createDivForSentences(id, title, sentences, listStyle) {
    var div = document.createElement("div");
    div.id = id;

    var headline = document.createElement("h2");
    headline.textContent = title;
    div.appendChild(headline);
    
    for (let i = 0; i < sentences.length; i++) {
        var paragraph = document.createElement("p");
        if (listStyle === "num")
            paragraph.textContent = (i + 1) + ". " + sentences[i];
        else 
            paragraph.textContent = sentences[i];
        div.appendChild(paragraph);
    }
    return div;
}
function createExerciseIntroduction(introduction) {
    return createDivForSentence("exercise-introduction", "운동 소개", introduction);
}

function createExerciseTips(tips) {
    return createDivForSentences("exercise-tips", "운동 팁", tips, );
}

function createExerciseProcedure(procedure) {
    return createDivForSentences("exercise-procedure", "운동 절차", procedure, "num");
}