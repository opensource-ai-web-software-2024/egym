import { CardInfo } from '../shared/cardInfo.js';
import { ExerciseInfo } from '../shared/exerciseInfo.js';
import { readCsv } from '../../csvHandler/readCsv.js';



export var cardInfosExample = [
	
];

let exerciseCsv;
async function readExerciseCsv() {
	try {
		exerciseCsv = await readCsv();
		console.log(exerciseCsv);
	}
	catch (error) {
		console.log(error);
	}
}

readExerciseCsv();

if (exerciseCsv.length != 0) {
	for (let i = 0; i < exerciseCsv.length; i++) {
		var exerciseName = exerciseCsv[i][0];
		var exerciseInfo = JSON.parse(exerciseCsv[i][1]);
		var exerciseIntroduction = exerciseCsv[i][2];
		var exerciseProcedure = exerciseCsv[i][3];
		var exerciseTips = exerciseCsv[i][4];
		var thumnailLink = exerciseCsv[i][5];
		var youtubeLink = exerciseCsv[i][6];
		JSON.parse(exerciseCsv[i][1]);
		cardInfosExample.push(
			new CardInfo(
				exerciseCsv[i][0],
				
				exerciseCsv[i][2],
				exerciseCsv[i][3],
				exerciseCsv[i][4],
				exerciseCsv[i][5],
				exerciseCsv[i][6],
			)
		);
	}
}
