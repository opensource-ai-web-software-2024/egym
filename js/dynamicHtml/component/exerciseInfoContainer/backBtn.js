export function createBackBtn(exerciseListContainer) { // 뒤로 가기 버튼 만들기
    var backBtn = document.createElement("span"); 
    backBtn.classList.add("material-symbols-outlined");
    backBtn.classList.add("back-btn");
    backBtn.textContent = "arrow_back";
    backBtn.addEventListener('click', () => {
        exerciseListContainer.style.display = 'block';
    });
    return backBtn;
}