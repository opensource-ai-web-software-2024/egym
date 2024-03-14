function tryTran(text) {
  var apiKey = "e978c78d-dba4-4149-a8bf-7c8e3b5d015f:fx";
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
