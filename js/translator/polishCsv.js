// import { readCsv } from "../csvHandler/readCsv.js";
// import { tryTran } from "./translator.js";
// import { writeCsvByPolished } from "../csvHandler/csvHandler.js";

// export async function polishCsv() {
//     const result = await readCsv("exercise.csv");
//     const datas = result.data;
//     console.log(datas);
//     const cuttedDatas = [];
//     // datas.forEach((data) => {
//     //     const cuttedData = [];
//     //     for (let i = 0; i <= 6; i++) {
//     //         if (i >= 0 && i <= 4) {
//     //             cuttedData.push(data[i]);    
//     //         }
//     //         else {
//     //             cuttedData.push(data[i]);
//     //         }
            
//     //     }
//     //     cuttedDatas.push(cuttedData);
//     // })

//     // 테스트
//     var kor_str;
//     const cuttedData = [];
//     for (let i = 0; i <= 6; i++) {
//         if (i >= 0 && i <= 4) {
//             kor_str = await tryTran(datas[0][i]);   
//             console.log("kor_str: " + kor_str);
//             cuttedData.push(kor_str);    
//         }
//         else {
//             cuttedData.push(datas[0][i]);
//         }
//     }
//     cuttedDatas.push(cuttedData);   
//     console.log(cuttedDatas);
//     await writeCsvByPolished(cuttedDatas);
//     // tryTran(cuttedDatas[0][2]);
// }

// polishCsv();