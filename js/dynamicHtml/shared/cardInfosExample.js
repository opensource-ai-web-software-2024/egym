import { CardInfo } from '../shared/cardInfo.js';
import { ExerciseInfo } from '../shared/exerciseInfo.js';
import { readCsv } from '../../csvHandler/readCsv.js';



export var cardInfosExample = [
	
];

let exerciseCsv;

async function readExerciseCsv() {
	try {
		exerciseCsv = await readCsv();
	}
	catch (error) {
		console.log(error);
	}
}

await readExerciseCsv();

exerciseCsv = exerciseCsv.data;

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
				exerciseName,
				exerciseInfo,
				exerciseIntroduction,
				exerciseProcedure,
				exerciseTips,
				thumnailLink,
				youtubeLink,
			)
		);
	}
}
