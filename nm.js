ons.bootstrap();

ons.ready(function() {

  setDefaultInputs();
  loadNmlist();

  // タブが変わる前
  //tab.on('prechange', function(event) {
  //  $('#page').text(event.tabItem.label);
  //  modal.show();
  //});
  // タブが変わった後
  tab.on('postchange', function(event) {
    //var page = event.tabItem.label;
    //$('.content').text(page + ' Page Contents');

    if (event.tabItem.label == "お金")
    {
      setDefaultInputs();
      loadNmlist();
    }
    else if (event.tabItem.label == "人・もの")
    {
      setDefaultInputs2();
      loadNmlist2();
    }

    //setTimeout('fadeout()', 500);
  });
});

var gNmlist1 = [];
var gNmlist2 = [];

/*--------------------------------------
  setDefaultInputs
  入力フォームのデフォルト設定
---------------------------------------*/
function setDefaultInputs()
{
  document.getElementById('in_title').value = "" // 名称
  document.getElementById('in_value').value = "" // 金額
  document.getElementById('in_subunit_oku').checked = true; // サブ単位
  document.getElementById('in_unit_jpy'   ).checked = true; // 単位

  if (localStorage.getItem("rate") == null) {
    localStorage.setItem('rate', 100);
  }
  document.getElementById('in_rate').value = localStorage.getItem('rate');; // 為替
}
function setDefaultInputs2()
{
  document.getElementById('in_title').value = "" // 名称
  document.getElementById('in_value').value = "" // 値
  document.getElementById('in_subunit_oku').checked = true; // サブ単位
}

/*--------------------------------------
  loadNmlist
  ナンバーリストのロード
---------------------------------------*/
function loadNmlist()
{
  // サンプルの登録
  if (localStorage.getItem("nmlist1") == null) {
    addSampleNmlistToLocalStorage();
  }

  // ストレージからのナンバーリスト読込み
  getNmlistFromLocalStorage();

  // ナンバーリストの描画
  displayNmlist();
}
function loadNmlist2()
{
  // サンプルの登録
  if (localStorage.getItem("nmlist2") == null) {
    addSampleNmlistToLocalStorage2();
  }

  // ストレージからのナンバーリスト読込み
  getNmlistFromLocalStorage2();

  // ナンバーリストの描画
  displayNmlist2();
}

/*--------------------------------------
  addSampleNmlistToLocalStorage
  ナンバーリストのサンプルを登録
---------------------------------------*/
function addSampleNmlistToLocalStorage()
{
  var obj =
  [
    {
      "title"    : "日本GDP",
      "value_jpy": 441200000000000,
      "value_usd": 4412000000000,
      "rate"     : 100,
      "date"     : "20160730"
    },
    {
      "title"    : "米国GDP",
      "value_jpy": 1855800000000000,
      "value_usd": 18558000000000,
      "rate"     : 100,
      "date"     : "20160730"
    },
    {
      "title"    : "中国GDP",
      "value_jpy": 1138300000000000,
      "value_usd": 11383000000000,
      "rate"     : 100,
      "date"     : "20160730"
    },
    {
      "title"    : "世界GDP",
      "value_jpy": 7200000000000000,
      "value_usd": 72000000000000,
      "rate"     : 100,
      "date"     : "20160730"
    },
    {
      "title"    : "日本国家予算（一般会計予算）",
      "value_jpy": 97000000000000,
      "value_usd": 970000000000,
      "rate"     : 100,
      "date"     : "20160730"
    }
  ];

  var str = JSON.stringify(obj);
  localStorage.setItem('nmlist1', str);
}
function addSampleNmlistToLocalStorage2()
{
  var obj =
  [
    {
      "title"    : "日本の人口",
      "value"    : 126600000,
      "date"     : "20160730"
    },
    {
      "title"    : "日本の労働力人口",
      "value"    : 65480000,
      "date"     : "20160730"
    },
    {
      "title"    : "世界の人口",
      "value"    : 7200000000,
      "date"     : "20160730"
    },
    {
      "title"    : "中国の人口",
      "value"    : 1376000000,
      "date"     : "20160730"
    },
    {
      "title"    : "インドの人口",
      "value"    : 1311000000,
      "date"     : "20160730"
    },
    {
      "title"    : "米国の人口",
      "value"    : 320000000,
      "date"     : "20160730"
    }
  ];

  var str = JSON.stringify(obj);
  localStorage.setItem('nmlist2', str);
}

/*--------------------------------------
  getNmlistFromLocalStorage
---------------------------------------*/
function getNmlistFromLocalStorage()
{
  // ゲット
  var str = localStorage.getItem("nmlist1");
  gNmlist1 = JSON.parse(str);

  // ソート
  sortNmlist();
}
function getNmlistFromLocalStorage2()
{
  // ゲット
  var str = localStorage.getItem("nmlist2");
  gNmlist2 = JSON.parse(str);

  // ソート
  sortNmlist2();
}

/*--------------------------------------
  sortNmlist
  ナンバーリストのソート
---------------------------------------*/
function sortNmlist()
{
  gNmlist1.sort(function(a, b) {
    if (a.value_jpy < b.value_jpy) return -1;
    if (a.value_jpy > b.value_jpy) return  1;
    return 0;
  });
}
function sortNmlist2()
{
  gNmlist2.sort(function(a, b) {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return  1;
    return 0;
  });
}

/*--------------------------------------
  saveLocalStrage
---------------------------------------*/
function saveLocalStrage()
{
  localStorage.removeItem("nmlist1");
  var str = JSON.stringify(gNmlist1);
  localStorage.setItem("nmlist1", str);

  alert("保存しました。");
}
function saveLocalStrage2()
{
  localStorage.removeItem("nmlist2");
  var str = JSON.stringify(gNmlist2);
  localStorage.setItem("nmlist2", str);

  alert("保存しました。");
}

/*--------------------------------------
  displayNmlist
---------------------------------------*/
function displayNmlist()
{
  var table = document.getElementById('nmlist');

  // テーブルクリア
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }

  for (var i = 0; i < gNmlist1.length; i++)
  {
    // 行の追加
    var row = table.insertRow(-1);

    // セルの挿入
    var cell1 = row.insertCell(-1); // title
    var cell2 = row.insertCell(-1); // value_jpy
    var cell3 = row.insertCell(-1); // value_usd
    var cell4 = row.insertCell(-1); // button

    // セルの内容入力
    cell1.innerHTML = gNmlist1[i].title;
    cell2.innerHTML = getShort(gNmlist1[i].value_jpy) + '円';
    cell3.innerHTML = getShort(gNmlist1[i].value_usd) + 'ドル';

    if (gNmlist1[i].isEntered == true)
    {
      cell4.innerHTML = '<button class="button--quiet" onclick="addNm(' + i + ')" >登録</button>';
    }
    else
    {
      cell4.innerHTML = '<button class="button--quiet" onclick="deleteNm(' + i + ')" >削除</button>';
    }

    // スタイル
    cell1.style.textAlign = 'left';
    cell2.style.textAlign = 'right';
    cell3.style.textAlign = 'right';
    cell4.style.textAlign = 'center';

    cell2.style.whiteSpace = 'nowrap';
    cell3.style.whiteSpace = 'nowrap';

    if (gNmlist1[i].isEntered == true)
    {
      row.style.backgroundColor = 'MistyRose';
    }
  }
}
function displayNmlist2()
{
  var table = document.getElementById('nmlist');

  // テーブルクリア
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }

  for (var i = 0; i < gNmlist2.length; i++)
  {
    // 行の追加
    var row = table.insertRow(-1);

    // セルの挿入
    var cell1 = row.insertCell(-1); // title
    var cell2 = row.insertCell(-1); // value
    var cell3 = row.insertCell(-1); // button

    // セルの内容入力
    cell1.innerHTML = gNmlist2[i].title;
    cell2.innerHTML = getShort(gNmlist2[i].value);

    if (gNmlist2[i].isEntered == true)
    {
      cell3.innerHTML = '<button class="button--quiet" onclick="addNm2(' + i + ')" >登録</button>';
    }
    else
    {
      cell3.innerHTML = '<button class="button--quiet" onclick="deleteNm2(' + i + ')" >削除</button>';
    }

    // スタイル
    cell1.style.textAlign = 'left';
    cell2.style.textAlign = 'right';
    cell3.style.textAlign = 'center';

    cell2.style.whiteSpace = 'nowrap';

    if (gNmlist2[i].isEntered == true)
    {
      row.style.backgroundColor = 'MistyRose';
    }
  }
}

/*--------------------------------------
  getShort
---------------------------------------*/
function getShort(value)
{
  var short, unit;
  if      (value > 1000000000000) { short = value / 1000000000000; unit = '兆'; }
  else if (value >     100000000) { short = value /     100000000; unit = '億'; }
  else if (value >         10000) { short = value /         10000; unit = '万'; }
  else                            { short = value /             1; unit =   ''; }

  var pow = Math.pow(10 , 1);
  short = Math.round(short * pow ) / pow;

  if      (short >= 10000) { pow = Math.pow(10 , -3); }
  else if (short >=  1000) { pow = Math.pow(10 , -2); }
  else if (short >=   100) { pow = Math.pow(10 , -1); }
  else if (short >=    10) { pow = Math.pow(10 ,  0); }
  else if (short >=     1) { pow = Math.pow(10 ,  1); }

  short = Math.round(short * pow ) / pow;

  return short + unit;
}

/*--------------------------------------
  refer
---------------------------------------*/
function refer()
{
  if (document.getElementById('in_title').value == "" ||
      document.getElementById('in_value').value == "" ||
      document.getElementById('in_rate').value  == "")
  {
    alert('名称・金額・為替をすべて入力してください。');
    return;
  }

  var entry = {
    "title"    : document.getElementById('in_title').value,
    "value_jpy": 0,
    "value_usd": 0,
    "rate"     : document.getElementById('in_rate').value,
    "isEntered": true
  }

  var inValue = document.getElementById('in_value').value;
  var value;
  if      (document.getElementById('in_subunit_cho').checked) { value = inValue * 1000000000000; }
  else if (document.getElementById('in_subunit_oku').checked) { value = inValue *     100000000; }
  else if (document.getElementById('in_subunit_man').checked) { value = inValue *         10000; }
  else if (document.getElementById('in_subunit_tri').checked) { value = inValue * 1000000000000; }
  else if (document.getElementById('in_subunit_bil').checked) { value = inValue *    1000000000; }
  else if (document.getElementById('in_subunit_mil').checked) { value = inValue *       1000000; }

  if (document.getElementById('in_unit_jpy').checked)
  {
    entry.value_jpy = value;
    entry.value_usd = value / entry.rate;
  }
  else if (document.getElementById('in_unit_usd').checked)
  {
    entry.value_jpy = value * entry.rate;
    entry.value_usd = value;
  }

  // 配列更新
  gNmlist1.push(entry);

  // ソート
  sortNmlist();

  // まだ保存しない

  // テーブル更新
  displayNmlist();
}
function refer2()
{
  if (document.getElementById('in_title').value == "" ||
      document.getElementById('in_value').value == "")
  {
    alert('名称・値を入力してください。');
    return;
  }

  var entry = {
    "title"    : document.getElementById('in_title').value,
    "value"    : 0,
    "isEntered": true
  }

  var inValue = document.getElementById('in_value').value;
  var value;
  if      (document.getElementById('in_subunit_cho').checked) { value = inValue * 1000000000000; }
  else if (document.getElementById('in_subunit_oku').checked) { value = inValue *     100000000; }
  else if (document.getElementById('in_subunit_man').checked) { value = inValue *         10000; }
  else if (document.getElementById('in_subunit_tri').checked) { value = inValue * 1000000000000; }
  else if (document.getElementById('in_subunit_bil').checked) { value = inValue *    1000000000; }
  else if (document.getElementById('in_subunit_mil').checked) { value = inValue *       1000000; }
  entry.value = value;

  // 配列更新
  gNmlist2.push(entry);

  // ソート
  sortNmlist2();

  // まだ保存しない

  // テーブル更新
  displayNmlist2();
}

/*--------------------------------------
  deleteNm
  ナンバーの削除
---------------------------------------*/
function deleteNm(key)
{
  //  確認
  if (false == confirm('本当に削除しますか？')) {
    return;
  }

  // 配列更新
  gNmlist1.splice(key, 1);

  // ストレージ保存
  saveLocalStrage();

  // テーブル更新
  displayNmlist();
}
function deleteNm2(key)
{
  //  確認
  if (false == confirm('本当に削除しますか？')) {
    return;
  }

  // 配列更新
  gNmlist2.splice(key, 1);

  // ストレージ保存
  saveLocalStrage2();

  // テーブル更新
  displayNmlist2();
}

/*--------------------------------------
  addNm
  ナンバーの追加
---------------------------------------*/
function addNm(key)
{
  var newNmlist = [];
  for (var i = 0; i < gNmlist1.length; i++)
  {
    if (gNmlist1[i].isEntered == true)
    {
      if (i == key)
      {
        delete gNmlist1[i].isEntered
        newNmlist.push(gNmlist1[i]);
      }
    }
    else
    {
      newNmlist.push(gNmlist1[i]);
    }
  }

  gNmlist1 = [];
  for (var i = 0; i < newNmlist.length; i++) {
    gNmlist1.push(newNmlist[i]);
  }

  // ストレージ保存
  saveLocalStrage();

  // テーブル更新
  displayNmlist();
}
function addNm2(key)
{
  var newNmlist = [];
  for (var i = 0; i < gNmlist2.length; i++)
  {
    if (gNmlist2[i].isEntered == true)
    {
      if (i == key)
      {
        delete gNmlist2[i].isEntered
        newNmlist.push(gNmlist2[i]);
      }
    }
    else
    {
      newNmlist.push(gNmlist2[i]);
    }
  }

  gNmlist2 = [];
  for (var i = 0; i < newNmlist.length; i++) {
    gNmlist2.push(newNmlist[i]);
  }

  // ストレージ保存
  saveLocalStrage2();

  // テーブル更新
  displayNmlist2();
}

/*--------------------------------------
  saveRate
  為替の保存
---------------------------------------*/
function saveRate()
{
  localStorage.setItem('rate', document.getElementById('in_rate').value);
  alert('為替を保存しました。');
}

/*--------------------------------------
  deleteAll
  ナンバーリストすべての削除
---------------------------------------*/
function deleteAll()
{
  //  確認
  if (false == confirm('本当に削除しますか？')) {
    return;
  }

  // 削除
  localstorage.removeItem('nmlist1');

  // テーブル更新
  displayNmlist();
}
function deleteAll2()
{
  //  確認
  if (false == confirm('本当に削除しますか？')) {
    return;
  }

  // 削除
  localstorage.removeItem('nmlist2');

  // テーブル更新
  displayNmlist2();
}

/*--------------------------------------
  pr
  デバッグ用
---------------------------------------*/
function pr(obj)
{
  var properties = "";
  for (var prop in obj) {
    properties += prop + "=" + obj[prop] + "\n";
  }
  alert(properties);
}
