let animationStarted = false;

async function typingAnimation(textElementId) {
    const textElement = document.getElementById(textElementId);
    const text = textElement.textContent; 
    const delay = 30;

    textElement.textContent = ''; 

    for (const char of text) {
        await wait(delay);
        textElement.textContent += char;
    }
}

function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
}

window.addEventListener('scroll', (event) => {
    const scrollPosition = window.scrollY;
    console.log(scrollPosition);
    const triggerPosition = 1056; // 예: 스크롤이 200px 아래로 내려갔을 때 애니메이션 실행

    if (scrollPosition >= triggerPosition && !animationStarted) {
        typingAnimation('commentary');
        animationStarted = true; // 애니메이션이 시작되었음을 표시
    }
    if (scrollPosition < triggerPosition && animationStarted) {
        animationStarted = false;
    }
});
