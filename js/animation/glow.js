let animationStarted = false;

const div = document.getElementById("content1");
const divStyle = div.style;
divStyle.backgroundPosition = "center -50px";
divStyle.transition = "background 1s";

const textElement = document.getElementById("big-logo");
const textStyle = textElement.style;    
textStyle.transition = "color 1s, -webkit-text-stroke 1s"; // 글자의 transition 시간 설정

window.onload = () => {
    divStyle.backgroundPosition = "center"; // 애니메이션 시작 시 배경 이미지 위치 설정
    textStyle.color = "transparent";
    textStyle.webkitTextStroke = "1px #3ed4b3"; 
    animationStarted = true; // 애니메이션이 시작되었음을 표시
};

window.addEventListener('scroll', (event) => {
    const scrollPosition = window.scrollY;
    console.log(scrollPosition);
    const triggerPosition1 = 0; // 예: 스크롤이 200px 아래로 내려갔을 때 애니메이션 실행
    const triggerPosition2 = 600;
    if (scrollPosition >= triggerPosition1 && !animationStarted) { 
        textStyle.color = "transparent";
        textStyle.webkitTextStroke = "1px #3ed4b3"; 
        divStyle.backgroundPosition = "center"; // 애니메이션 시작 시 배경 이미지 위치 설정
        
        animationStarted = true; // 애니메이션이 시작되었음을 표시
    }
    if (scrollPosition > triggerPosition2 && animationStarted) {
        textStyle.color = "#3ed4b3";
        textStyle.webkitTextStroke = "transparent"; 
        divStyle.backgroundPosition = "center -50px"; // 애니메이션 종료 시 배경 이미지 위치 설정
        animationStarted = false;
    }
});
