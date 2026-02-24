fetch("data/二術合成.json")
  .then(response => response.json())
  .then(data => {
    console.log("読み込み件数:", data.length);
    displayAll(data);
  })
  .catch(error => {
    console.error("JSON読み込み失敗:", error);
  });

function displayAll(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.textContent = JSON.stringify(item);
    resultDiv.appendChild(div);
  });
}
