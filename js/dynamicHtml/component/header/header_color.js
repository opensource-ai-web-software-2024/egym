window.addEventListener("scroll", function() {
    var header = document.getElementById("header");
    if (window.scrollY > 600) { // 스크롤 위치가 300px을 넘으면 색상 변경
        header.style.backgroundColor = "black";
    } else {
        header.style.backgroundColor = "transparent";
    }
});