import { filteringHandler } from './card.js';
 
var query = "";

var searchBar = document.getElementById("search-bar");
searchBar.value = query;
console.log(searchBar.value);

function searchHandler() {
    query = searchBar.value;
    filteringHandler(query); 
}

var searchBtn = document.getElementById("search-btn");
searchBtn.onclick = searchHandler;
console.log(searchBtn);
// 이벤트 핸들러 함수
function handleKeyPress(event) {
    // 눌린 키의 코드 확인
    var keyCode = event.keyCode || event.which;
    
    // enter keycode: 13
    if (keyCode === 13) {
        searchHandler();
    }
}

// 키다운 이벤트 리스너 등록
document.addEventListener("keydown", handleKeyPress);