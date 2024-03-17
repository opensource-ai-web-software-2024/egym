var app = document.getElementById("app");
var screenHeight = window.innerHeight;
app.style.minHeight = screenHeight + "px";

$(document).ready(function() {
    addEmptyCardsToFillRow();
});

function addEmptyCardsToFillRow() {
    var searchResult = document.getElementById("search-result");
    var cards = searchResult.querySelectorAll(".card");
    var itemsPerRow = 4; // 한 줄에 보여질 카드 수

    var lastRowCardsCount = cards.length % itemsPerRow;
    if (lastRowCardsCount !== 0 && lastRowCardsCount < itemsPerRow) {
        var emptyCardsCount = itemsPerRow - lastRowCardsCount;
        for (var i = 0; i < emptyCardsCount; i++) {
            var emptyCard = document.createElement("div");
            emptyCard.classList.add("card", "empty-card");
            searchResult.appendChild(emptyCard);
        }
    }
}