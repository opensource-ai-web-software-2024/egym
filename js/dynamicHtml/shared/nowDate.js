export function getNowDate() {
	const nowDate = new Date();
	return nowDate;
}

export function getNowDateString() {
	const nowDate = new Date();
	const year = nowDate.getFullYear();
	const month = String(nowDate.getMonth() + 1).padStart(2, "0");
	const day = String(nowDate.getDate()).padStart(2, "0");

	const nowDateString = `${year}-${month}-${day}`;
	console.log(nowDateString);
	return nowDateString;
}

export function getUniqueNowDateString() {
	const baseDateString = getNowDateString();
	let uniqueDateString = baseDateString;
	let count = 1;

	while (localStorage.getItem(uniqueDateString)) {
		uniqueDateString = `${baseDateString} (${count})`;
		count++;
	}

	console.log(uniqueDateString);
	return uniqueDateString;
}
