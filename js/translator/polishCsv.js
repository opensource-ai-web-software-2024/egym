import { readCsv } from "../csvHandler/readCsv.js";
import { tryTran } from "./translator.js";
import { writeCsvByPolished } from "../csvHandler/csvHandler.js";

export async function polishCsv() {
    const result = await readCsv("exercise.csv");
    const datas = result.data; // 모든 운동 데이터
    const cuttedDatas = []; // 일부 운동 데이터

    for (let i = 0; i < 200; i++) {
        const cuttedData = [];
        for (let j = 0; j <= 6; j++) {
            cuttedData.push(datas[i][j]); 

        }
        cuttedDatas.push(cuttedData);
    }
    console.log("cuttedDatas: ", cuttedDatas);

    let translatedDatas = []; // 최종 데이터 (엑셀에 작성할 데이터)
    
    for (let i = 0; i < cuttedDatas.length; i++) { // 자른 데이터들
        const translatedData = [];
        for (let j = 0; j <= 6; j++) {
            if (j >= 0 && j <= 4) { // 유튜브 링크, 썸네일 링크 제외
                var kor_str = await tryTran(cuttedDatas[i][j]);
                translatedData.push(kor_str);    
            }
            else {
                translatedData.push(cuttedDatas[i][j]);
            }
        }
        
        translatedDatas.push(translatedData);
        console.log("translatedData ", translatedData);
    }
    console.log(translatedDatas);
    await writeCsvByPolished(translatedDatas);
}
polishCsv();