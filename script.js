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

// 条件表示用関数
function buildConditionText(type) {

  const mixspell = document.getElementById("mixspellSelect").value;
  const bpmag = document.getElementById("bpmagSelect").value;
  const bpmagCond = document.getElementById("bpmagcondSelect").value;
  const powmag = document.getElementById("powmagSelect").value;
  const powmagCond = document.getElementById("powmagcondSelect").value;
  const effect2 = document.getElementById("effect2Select").value;
  const effect3 = document.getElementById("effect3Select").value;
  const species = document.getElementById("speciesSelect").value;

  let conditions = [];

  // 合成結果
  if (mixspell !== "") {
    conditions.push("合成結果 = " + mixspell);
  }

  // BP倍率
  if (bpmag !== "") {
    conditions.push("BP倍率 " + bpmag + " " + bpmagCond);
  }

  // 威力倍率
  if (powmag !== "") {
    conditions.push("威力倍率 " + powmag + " " + powmagCond);
  }

  // 追加効果（二術）
  if (type === 2 && effect2 !== "") {
    conditions.push("追加効果 = " + effect2);
  }

  // 追加効果（三術）
  if (type === 3 && effect3 !== "") {
    conditions.push("追加効果 = " + effect3);
  }

  // 種族特攻
  if (species !== "") {
    conditions.push("種族特攻 = " + species);
  }

  if (conditions.length === 0) {
    return "検索条件：指定なし（全件対象）";
  }

  return "検索条件（" + (type === 2 ? "二術合成" : "三術合成") + "）：<br>"
         + conditions.join("<br>");
}


// 二術ボタン
document.getElementById("setConditionBtn2")
  .addEventListener("click", () => {
    document.getElementById("result").innerHTML =
      buildConditionText(2);
  });


// 三術ボタン
document.getElementById("setConditionBtn3")
  .addEventListener("click", () => {
    document.getElementById("result").innerHTML =
      buildConditionText(3);
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
