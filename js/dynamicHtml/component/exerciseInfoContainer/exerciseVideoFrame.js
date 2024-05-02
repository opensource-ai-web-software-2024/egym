export function createExerciseVideoFrame(youtubeLink) { // 비디오 프레임 만드는 함수
    // 비디오 프레임 만들기
    var exerciseVideoFrame = document.createElement("iframe");
    exerciseVideoFrame.id = "exercise-video-frame";
    console.log(youtubeLink);
    exerciseVideoFrame.src = youtubeLink;
    exerciseVideoFrame.referrerpolicy = "strict-origin-when-cross-origin";
    
    return exerciseVideoFrame;
}