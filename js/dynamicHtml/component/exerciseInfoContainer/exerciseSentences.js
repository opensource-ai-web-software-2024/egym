function createDivForSentence(id, title, sentence) {
    var div = document.createElement("div");
    div.id = id;

    var headline = document.createElement("h2");
    headline.textContent = title;
    div.appendChild(headline);

    var paragraph = document.createElement("p");
    if (sentence == "") {
        paragraph.textContent = "소개 내용이 없습니다";
    } else {
        paragraph.textContent = sentence;
    }
    div.appendChild(paragraph);

    return div;
}

function createDivForSentences(id, title, sentences, listStyle) {
    var div = document.createElement("div");
    div.id = id;

    var headline = document.createElement("h2");
    headline.textContent = title;
    div.appendChild(headline);

    console.log("문장: ", sentences)
    
    // for (let i = 0; i < sentences.length; i++) {
    //     var paragraph = document.createElement("p");
    //     if (listStyle === "num")
    //         paragraph.textContent = (i + 1) + ". " + sentences[i];
    //     else 
    //         paragraph.textContent = sentences[i];
    //     div.appendChild(paragraph);
    // }

    let newText = "";

    for (let i = 0; i < sentences.length; i++) {
        if (sentences[i] === ',' || sentences[i] === '.') {
            newText += sentences[i] + '<br>';
        } else {
            newText += sentences[i];
        }
    }
    
    console.log("newtext ",newText);

    var paragraph = document.createElement("p");
    paragraph.innerHTML = newText;
    console.log("paragraph ", paragraph.textContent);
    div.appendChild(paragraph);

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