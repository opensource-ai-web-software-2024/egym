export async function tryTran(text) {
  var translatedText = "";
  var apiKey = "ab77aea2-0999-4b88-966e-c077b1789279:fx";
  var url = "https://api-free.deepl.com/v2/translate";
  url += "?auth_key=" + encodeURIComponent(apiKey);
  url += "&text=" + encodeURIComponent(text);
  url += "&source_lang=EN";
  url += "&target_lang=KO";
  console.log(url);
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      translatedText = data.translations[0].text;
      console.log("translatedText: " + translatedText);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    return translatedText;
}
