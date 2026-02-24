let data2 = [];
let data3 = [];

// 二術合成
fetch("data/二術合成.json")
  .then(res => res.json())
  .then(data => {
    data2 = data;   // ← 保持
    document.getElementById("status2").textContent =
      "二術合成件数: " + data.length;
      })
  .catch(error => {
    document.getElementById("status").textContent =
      "二術合成.JSON読み込み失敗: " + error;
  });

// 三術合成
fetch("data/三術合成.json")
  .then(res => res.json())
  .then(data => {
    data3 = data;   // ← 保持
    document.getElementById("status3").textContent =
      "三術合成件数: " + data.length;
      })
  .catch(error => {
    document.getElementById("status").textContent =
      "三術合成.JSON読み込み失敗: " + error;
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
