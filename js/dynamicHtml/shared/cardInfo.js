// 카드 정보 (테스트용)
export class CardInfo {
	constructor(exerciseName, exerciseInfo, exerciseIntroduction, exerciseProcedure, exerciseTips, thumbnailLink, youtubeLink) {
		this.exerciseName = exerciseName;
		this.exerciseInfo = exerciseInfo; // 오브젝트
		this.exerciseIntroduction = exerciseIntroduction;
		this.exerciseProcedure = exerciseProcedure;
		this.exerciseTips = exerciseTips;
		this.thumbnailLink = thumbnailLink;
		this.youtubeLink = youtubeLink;
	}
}