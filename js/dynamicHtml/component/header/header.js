// div#header 검색
var header = document.getElementById("header");

// 로고
var logo = document.createElement("h1");
logo.classList.add("logo");
logo.textContent = "Egym";
header.appendChild(logo);

// 네비게이션 바 만들기
var navBar = document.createElement("ul");
navBar.id = "nav-bar";
header.appendChild(navBar);

// 네비게이션 아이템 정보
var navItemInfos = [
    {
        href: "index.html",
        textContent: "홈",
    },
    {
        href: "introduction.html",
        textContent: "소개",
    },
    {
        href: "exercise.html",
        textContent: "운동 검색",
    },
    {
        href: "routine.html",
        textContent: "루틴 관리"
    }
]

navItemInfos.forEach((navItemInfo) => {
    // 네비게이션 아이템 만들기
    var navItem = document.createElement("li");
    navItem.classList.add("nav-item"); 
    navBar.appendChild(navItem);

    // 네비게이션 링크 만들기
    var navLink = document.createElement("a");
    navLink.classList.add("nav-link");
    navLink.href = navItemInfo.href;
    navLink.textContent = navItemInfo.textContent;
    navItem.appendChild(navLink);
});





