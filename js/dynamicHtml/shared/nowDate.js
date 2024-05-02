export function getNowDate() {
	// 루틴 제목 자동 생성을 위한 날짜 저장
	const nowDate = new Date();
	return nowDate;
}

export function getNowDateString() {
	const nowDate = getNowDate();
	const year = nowDate.getFullYear(); // 연도
	const month = nowDate.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
	const day = nowDate.getDate(); // 일

	const nowDateString = year + "-" + month + "-" + day;
	console.log(nowDateString);
	return nowDateString;
}
