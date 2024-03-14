// DeepL 번역 API JS

import API_KEY from "./key.js";

// 번역 JS
// API_KEY를 import하고 tryTran 함수를 전역으로 사용하기 위해서 window.tryTran = function(text) 와 같은 구문 사용함
window.tryTran = function (text) {
  var apiKey = API_KEY;
  var url = "https://api-free.deepl.com/v2/translate";
  url += "?auth_key=" + encodeURIComponent(apiKey);
  url += "&text=" + encodeURIComponent(text);
  url += "&source_lang=EN";
  url += "&target_lang=KO";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var translatedText = data.translations[0].text;
      console.log(translatedText);
      return translatedText; // 번역된 텍스트 반환
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
