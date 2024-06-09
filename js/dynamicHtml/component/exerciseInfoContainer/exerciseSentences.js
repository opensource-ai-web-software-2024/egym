function createDivForSentence(id, title, sentence) {
    var div = document.createElement("div");
    div.id = id;

    var headline = document.createElement("h2");
    headline.textContent = title;
    div.appendChild(headline);

    var paragraph = document.createElement("p");

    let newText = "";

    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === '.') {
            newText += sentence[i] + '<br>';
        } else {
            newText += sentence[i];
        }
    }

    if (sentence == "") {
        newText = "소개 내용이 없습니다";
    }

    var paragraph = document.createElement("p");
    paragraph.innerHTML = newText;
    console.log("paragraph ", paragraph.textContent);
    div.appendChild(paragraph);

    return div;
}

function createDivForSentences(id, title, sentences, listStyle) {
    var div = document.createElement("div");
    div.id = id;

    var headline = document.createElement("h2");
    headline.textContent = title;
    div.appendChild(headline);

    let newText = [];

    var s1 = "";    

    for (let i = 0; i< sentences.length; i++) {
        if (sentences[i] === '.') {
            s1 += sentences[i];
            newText.push(s1);
            s1 = "";
        } else {
            s1 += sentences[i];
        }
    }

    for (let j=0; j<newText.length; j++){
        newText[j] = (j + 1) + '. ' + newText[j];
    }

    for (let i=0; i<newText.length; i++) {
        var paragraph = document.createElement("p");
        paragraph.textContent = newText[i];
        div.appendChild(paragraph);
    }

    return div;
}

export function createExerciseIntroduction(introduction) {
    return createDivForSentence("exercise-introduction", "운동 소개", introduction);
}

export function createExerciseTips(tips) {
    return createDivForSentences("exercise-tips", "운동 팁", tips, );
}

export function createExerciseProcedure(procedure) {
    return createDivForSentences("exercise-procedure", "운동 절차", procedure, "num");
}