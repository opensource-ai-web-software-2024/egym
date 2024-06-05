export function createExerciseVideoFrame(youtubeLink) { // 비디오 프레임 만드는 함수
    // 비디오 프레임 만들기
    

    if (youtubeLink == "") {
        console.log("비디오 로딩 실패");
        var exerciseVideoFrame = document.createElement("img");
        exerciseVideoFrame.id = "exercise-video-frame";
        exerciseVideoFrame.src = "../../../img/video-fail.png";
    } else {
        var exerciseVideoFrame = document.createElement("iframe");
        exerciseVideoFrame.id = "exercise-video-frame";
        console.log("유튜브 링크 ", youtubeLink);
        exerciseVideoFrame.src = youtubeLink;
        exerciseVideoFrame.referrerpolicy = "strict-origin-when-cross-origin";
    }
    
    return exerciseVideoFrame;
}