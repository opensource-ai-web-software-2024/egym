import {Routine, Routines} from "../../js/dynamicHtml/shared/routine"

// 루틴을 추가/수정/삭제했을 경우 전체 루틴을 저장하는 함수
export default function backupForRoutines() {

}

// 운동 추가/수정/삭제했을 경우 특정 루틴을 저장하는 함수
export default function backupForRoutine(routine) { 
    let storedRoutines = JSON.parse(localStorage.getItem("routines")) || [];
    console.log(storedRoutines);
    storedRoutines.map(storedRoutine => {
        if (storedRoutine.exerciseName === routine.exerciseName) {
            storedRoutine = routine;
            return;
        }
    });
    storedRoutines.push(routine);
}

const routine = new Routine("플랭크", 3, 5);
backupForRoutine(routine);

// export default function backup(routines) {
//     localStorage.setItem("routines", JSON.stringify(routines));
// }

// routines: "등 운동 루틴", "월요일 운동 루틴"
// routine: "운동1", "운동2", "운동2" 


// export function load() {
//     const storedRoutines = JSON.parse(localStorage.getItem("routines"));
//     console.log("storedRoutines: ", storedRoutines);
// }
