export class Routine {
    constructor(exerciseName, set, count) {
        this.exerciseName = exerciseName;
        this.set = set; // 운동 세트
        this.count = count;
    }
}


const routineList = [
    new Routine("플랭크", 3, 5)
];