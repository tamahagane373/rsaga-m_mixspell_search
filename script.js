fetch("data/二術合成.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("status").textContent =
      "読み込み件数: " + data.length;

    // データを実際に表示したい場合
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.textContent = JSON.stringify(item);
      resultDiv.appendChild(div);
    });
  })
  .catch(error => {
    document.getElementById("status").textContent =
      "JSON読み込み失敗: " + error;
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
