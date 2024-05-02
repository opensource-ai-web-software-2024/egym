export function createExerciseCategoryClassification(cardInfo) { // 카테고리 정보 만드는 함수
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
