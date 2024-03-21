{/* <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                        <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>
                      
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                        <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
                      
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                        <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
                    </div> */}

// div#category-selectors 검색
var categorySelectors = document.getElementById("category-selectors");

    
const selectedValue = [
   "전체", "전체", "전체", "전체"
];

var categorySelectorInfos = [
    {
        krName: "부위",
        name: "part",
        toggleBtnList: ["전체", "하체", "가슴", "등"],
    },
    {
        krName: "부위",
        name: "part",
        toggleBtnList: ["전체", "하체", "가슴", "등"],
    },
    {
        krName: "부위",
        name: "part",
        toggleBtnList: ["전체", "하체", "가슴", "등"],
    },
    {
        krName: "부위",
        name: "part",
        toggleBtnList: ["전체", "하체", "가슴", "등"],
    },
]

function toggleHandler(event) {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    return selectedValue;
}

    
categorySelectorInfos.forEach((categorySelectorInfo) => {
    var categorySelectorDiv = document.createElement("div");
    categorySelectorDiv.classList.add("category-selector-div");
    categorySelectors.appendChild(categorySelectorDiv);

    var categoryName = document.createElement("h3");
    categoryName.classList.add("category-name")
    categoryName.textContent = categorySelectorInfo.krName;
    categorySelectorDiv.appendChild(categoryName);
 
    categorySelectorInfo.toggleBtnList.forEach((toggleBtn) => {
        let i = 0;
        var button = document.createElement("input");
        button.classList.add("category-selector-button");
        button.id =  categorySelectorInfo.name + toggleBtn + i;
        button.type = "radio";
        button.name = categorySelectorInfo.name;
        button.value = toggleBtn;
        categorySelectorDiv.appendChild(button);

        button.addEventListener("change", toggleHandler);
        var label = document.createElement("label");
        label.classList.add("category-selector-button-label");
        label.textContent = button.value;
        label.htmlFor = button.id;
        categorySelectorDiv.appendChild(label);
        
        i++;
    });
    // categorySelectorInfo.toggleBtnList.forEach((element) => {
    //     var button = document.createElement("input");
    //     button.classList.add("category-selector-button");
    //     button.id = "radio" + i;
    //     button.type = "radio";
    //     button.name = categorySelectorInfo.name; 
    //     button.value = element;
    //     if (i === 0) {
    //         console.log("첫 번째 버튼");
    //         button.checked = true; // checked 속성 추가
    //     }
    //     console.log(button.checked);
    //     categorySelectorDiv.appendChild(button);
        
    //     var label = document.createElement("label");
    //     label.classList.add("category-selector-button-label");
    //     label.textContent = button.value;
    //     label.htmlFor = button.id;
    //     categorySelectorDiv.appendChild(label);

    //     i++;
    // })
})
