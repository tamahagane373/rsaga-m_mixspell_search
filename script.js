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

function expandEffect2(value) {
  if (value === "AGI") {
    return ["水AGI", "闇AGI"];
  }
  if (value === "COM") {
    return ["光COM", "邪COM"];
  }
  if (value === "") {
    return [];
  }
  return [value];
}

function expandSpecies(value) {
  if (value === "水棲（無区別）") {
    return ["水棲（水棲表記）", "水棲（魔族表記）"];
  }
  if (value === "") {
    return [];
  }
  return [value];
}

// 条件表示用関数
function buildConditionText(type) {

  const mixspell = document.getElementById("mixspellSelect").value;
  const bpmag = document.getElementById("bpmagSelect").value;
  const bpmagCond = document.getElementById("bpmagcondSelect").value;
  const powmag = document.getElementById("powmagSelect").value;
  const powmagCond = document.getElementById("powmagcondSelect").value;
  const effect2Raw = document.getElementById("effect2Select").value;
  const effect3 = document.getElementById("effect3Select").value;
  const speciesRaw = document.getElementById("speciesSelect").value;

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
  if (type === 2 && effect2Raw !== "") {
    const expanded = expandEffect2(effect2Raw);
    conditions.push("追加効果 = " + expanded.join(" または "));
  }

  // 追加効果（三術）
  if (type === 3 && effect3 !== "") {
    conditions.push("追加効果 = " + effect3);
  }

  // 種族特攻
  if (speciesRaw !== "") {
    const expandedSpecies = expandSpecies(speciesRaw);
    conditions.push("種族特攻 = " + expandedSpecies.join(" または "));
  }

  if (conditions.length === 0) {
    return "検索条件：指定なし（全件対象）";
  }

  return "検索条件（" + (type === 2 ? "二術合成" : "三術合成") + "）：<br>"
         + conditions.join("<br>");
}

function filterData(data, type) {

  const mixspell = document.getElementById("mixspellSelect").value;
  const bpmag = document.getElementById("bpmagSelect").value;
  const bpmagCond = document.getElementById("bpmagcondSelect").value;
  const powmag = document.getElementById("powmagSelect").value;
  const powmagCond = document.getElementById("powmagcondSelect").value;
  const effect2Raw = document.getElementById("effect2Select").value;
  const effect3 = document.getElementById("effect3Select").value;
  const speciesRaw = document.getElementById("speciesSelect").value;

  const effect2List = expandEffect2(effect2Raw);
  const speciesList = expandSpecies(speciesRaw);

  return data.filter(item => {

    // 合成結果
    if (mixspell !== "" && item.合成結果 !== mixspell) {
      return false;
    }

    // BP倍率
    if (bpmag !== "") {
      const value = Number(item.BP補正);
      const target = Number(bpmag);

      if (bpmagCond === "以上" && value < target) return false;
      if (bpmagCond === "以下" && value > target) return false;
    }

    // 威力倍率
    if (powmag !== "") {
      const value = Number(item.威力補正);
      const target = Number(powmag);

      if (powmagCond === "以上" && value < target) return false;
      if (powmagCond === "以下" && value > target) return false;
    }

    // 追加効果（二術）
    if (type === 2 && effect2List.length > 0) {
      if (!effect2List.includes(item.追加効果)) {
        return false;
      }
    }

    // 追加効果（三術）
    if (type === 3 && effect3 !== "") {
      if (item.追加効果 !== effect3) {
        return false;
      }
    }

    // 種族特攻
    if (speciesList.length > 0) {
      if (!speciesList.includes(item.種族特攻)) {
        return false;
      }
    }

    return true; // すべて通過 → AND成立
  });
}

function displayAll(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.textContent = JSON.stringify(item);
    resultDiv.appendChild(div);
  });
}

// 二術検索
document.getElementById("setConditionBtn2")
  .addEventListener("click", () => {

    const filtered = filterData(data2, 2);

    document.getElementById("result").innerHTML =
      buildConditionText(2) +
      "<hr>検索結果件数: " + filtered.length + "<br><br>";

    displayAll(filtered);
  });


// 三術検索
document.getElementById("setConditionBtn3")
  .addEventListener("click", () => {

    const filtered = filterData(data3, 3);

    document.getElementById("result").innerHTML =
      buildConditionText(3) +
      "<hr>検索結果件数: " + filtered.length + "<br><br>";

    displayAll(filtered);
  });


