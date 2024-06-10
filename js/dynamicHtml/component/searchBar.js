document.addEventListener("DOMContentLoaded", () => {
	var query = "";
	var searchBar = document.getElementById("exercise-search-bar");
	var searchBtn = document.getElementById("exercise-search-btn");

	if (!searchBar) {
		console.error("Search bar element not found");
		return;
	}

	if (!searchBtn) {
		console.error("Search button element not found");
		return;
	}

	searchBar.value = query;
	console.log("Search query:", query); // 디버깅을 위한 로그

	function searchHandler() {
		query = searchBar.value;
		console.log("Search query:", query); // 디버깅을 위한 로그
		filteringHandler(query, false);
	}

	searchBtn.onclick = searchHandler;

	function handleKeyPress(event) {
		var keyCode = event.keyCode || event.which;
		if (keyCode === 13) {
			searchHandler();
		}
	}

	document.addEventListener("keydown", handleKeyPress);
});
