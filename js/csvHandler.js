function writeCsv(cardInfos) {
  const csvFilePath = "exercise.csv";
  // CSV 데이터 준비
  const data = [];

  // 컬럼 삽입
  data.push(
    [
      "운동명",
      "운동 정보",
      "운동 소개",
      "운동 절차",
      "운동 팁",
      "썸네일 링크",
      "유튜브 링크",
    ]
  );

  // 카드 정보를 CSV 데이터에 추가
  cardInfos.forEach(cardInfo => {
    const row = [
      cardInfo.exerciseName,
      cardInfo.exerciseInfo,
      cardInfo.exerciseIntroduction,
      cardInfo.exerciseProcedure,
      cardInfo.exerciseTip,
      cardInfo.thumbnailLink,
      cardInfo.youtubeLink,
    ];
    data.push(row);
  });

  // Papa Parse로 CSV 파일 작성
  const csv = Papa.unparse(data);

  // CSV 파일 다운로드
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, csvFilePath);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", csvFilePath);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
