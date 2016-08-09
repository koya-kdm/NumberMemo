
const TAB_MONEY = 0;
const TAB_THING = 1;

var gNmlist1 = [];
var gNmlist2 = [];
/*
ons.bootstrap()
.controller('detailController', function($scope){
  var options = $scope.nav.getCurrentPage().options;
  $scope.myTitle = options.myTitle;
});
*/
ons.bootstrap();

ons.ready(function() {

  setDefaultInputs();
  loadNmlist();

  // タブが変わった後
  tab.on('postchange', function(event)
  {
    if (tab.getActiveTabIndex() == TAB_MONEY ||
        tab.getActiveTabIndex() == TAB_THING)
    {
      setDefaultInputs();
      loadNmlist();
    }
  });
});

/*--------------------------------------
  setDefaultInputs
  入力フォームのデフォルト設定
---------------------------------------*/
function setDefaultInputs()
{
  // _共通
  document.getElementById('in_title').value = "" // 名称
  document.getElementById('in_value').value = "" // 値
  document.getElementById('in_subunit_oku').checked = true; // サブ単位

  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    document.getElementById('in_unit_jpy'   ).checked = true; // 単位

    if (localStorage.getItem("rate") == null) {
      localStorage.setItem('rate', 100);
    }
    document.getElementById('in_rate').value = localStorage.getItem('rate');; // 為替
  }

  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    ;
  }
}

/*--------------------------------------
  loadNmlist
  ナンバーリストのロード
---------------------------------------*/
function loadNmlist()
{
  // サンプルの登録
  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    if (localStorage.getItem("nmlist1") == null) {
      saveSampleNmlist();
    }
  }
  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    if (localStorage.getItem("nmlist2") == null) {
      saveSampleNmlist();
    }
  }

  // ストレージからのナンバーリスト読込み
  getNmlistFromLocalStorage();

  // ナンバーリストの描画
  displayNmlist();
}

/*--------------------------------------
  getNmlistFromLocalStorage
---------------------------------------*/
function getNmlistFromLocalStorage()
{
  // ゲット
  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    var str = localStorage.getItem("nmlist1");
    gNmlist1 = JSON.parse(str);
  }
  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    var str = localStorage.getItem("nmlist2");
    gNmlist2 = JSON.parse(str);
  }

  // ソート
  sortNmlist();
}

/*--------------------------------------
  sortNmlist
  ナンバーリストのソート
---------------------------------------*/
function sortNmlist()
{
  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    gNmlist1.sort(function(a, b) {
      if (a.value_jpy < b.value_jpy) return -1;
      if (a.value_jpy > b.value_jpy) return  1;
      return 0;
    });
  }

  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    gNmlist2.sort(function(a, b) {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return  1;
      return 0;
    });
  }
}

/*--------------------------------------
  saveLocalStrage
---------------------------------------*/
function saveLocalStrage()
{
  var newNmlist = [];
  var tmpNmlist = []; // 照会だけしててまだ登録指示を受けていないもの

  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    for (var i = 0; i < gNmlist1.length; i++)
    {
      if (gNmlist1[i].isEntered == true) {
        ;
      }
      else {
        newNmlist.push(gNmlist1[i]);
      }
    }
    localStorage.removeItem("nmlist1");
    localStorage.setItem("nmlist1", JSON.stringify(newNmlist));
  }
  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    for (var i = 0; i < gNmlist2.length; i++)
    {
      if (gNmlist2[i].isEntered == true) {
        ;
      }
      else {
        newNmlist.push(gNmlist2[i]);
      }
    }
    localStorage.removeItem("nmlist2");
    localStorage.setItem("nmlist2", JSON.stringify(newNmlist));
  }

  alert("保存しました。");
}

/*--------------------------------------
  displayNmlist
---------------------------------------*/
function displayNmlist()
{
  if (tab.getActiveTabIndex() == TAB_MONEY) { displayNmlist_money(); }
  if (tab.getActiveTabIndex() == TAB_THING) { displayNmlist_thing(); }
}
function displayNmlist_money()
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
    var cell3 = row.insertCell(-1); // button

    // セルの内容入力
    /*var options = {
      animation: 'slide',
      onTransitionEnd: function() {document.getElementById('detail_title').innerHTML = 'test';}
    };*/
    var options = {
      animation : 'slide'
    };
    //cell1.innerHTML = '<a href="#" onclick="myNavigator.pushPage(\'detail.html\', ' + options + ')"> ' + gNmlist1[i].title + '</a>';
    //cell1.innerHTML = '<a href="#" onclick="nav.pushPage(\'detail.html\', {animation : \'slide\', myTitle : \'test\'})"> ' + gNmlist1[i].title + '</a>';
    //cell1.innerHTML = '<a href="#" onclick="nav.pushPage(\'detail.html\', {animation : \'slide\'})"> ' + gNmlist1[i].title + '</a>';
    //cell1.innerHTML = '<a href="#" onclick="nav.pushPage(\'detail.html\', {animation : \'slide\'});document.getElementById(\'detail_title\').innerHTML=\'test\';"> ' + gNmlist1[i].title + '</a>';
    /*
    cell1.innerHTML
    = '<a href="#" onclick="nav.pushPage(\'detail.html\', {animation : \'slide\', onTransitionEnd: function() '
    + '{'
    +    'document.getElementById(\'detail_title\').innerHTML=\'' + gNmlist1[i].title + '\';'
    +    'document.getElementById(\'detail_value_jpy\').innerHTML=\'' + gNmlist1[i].value_jpy + '\';'
    +    'document.getElementById(\'detail_value_usd\').innerHTML=\'' + gNmlist1[i].value_usd + '\';'
    +    'document.getElementById(\'detail_rate\').innerHTML=\'' + gNmlist1[i].rate      + '\';'
    + '}})"> ' + gNmlist1[i].title + '</a>';
    */
    cell1.innerHTML
    = '<a href="#" onclick="nav.pushPage(\'detail.html\', {animation : \'slide\', onTransitionEnd: function() '
    + '{'
    +    'displayDetail(' + i + ');'
    + '}})"> ' + gNmlist1[i].title + '</a>';

    if (document.getElementById('op_toDollar').checked) {
      cell2.innerHTML = getShort(gNmlist1[i].value_usd) + 'ドル';
    }
    else {
      cell2.innerHTML = getShort(gNmlist1[i].value_jpy) + '円';
    }

    if (gNmlist1[i].isEntered == true)
    {
      cell3.innerHTML = '&nbsp;<a href="#" class="ion-ios-plus-empty" style="font-size:30px;" onclick="addNm(' + i + ')"></a>&nbsp;';
    }
    else
    {
      cell3.innerHTML = '&nbsp;<a href="#" class="ion-ios-trash-outline" style="font-size:24px;" onclick="deleteNm(' + i + ')"></a>&nbsp;';
    }

    // スタイル
    cell1.style.textAlign = 'left';
    cell2.style.textAlign = 'right';
    cell3.style.textAlign = 'center';

    cell2.style.whiteSpace = 'nowrap';
    cell3.style.whiteSpace = 'nowrap';

    if (gNmlist1[i].isEntered == true)
    {
      row.style.backgroundColor = 'MistyRose';
    }
  }
}
function displayNmlist_thing()
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
      cell3.innerHTML = '&nbsp;<a href="#" class="ion-ios-plus-empty" style="font-size:30px;" onclick="addNm(' + i + ')"></a>&nbsp;';
    }
    else
    {
      cell3.innerHTML = '&nbsp;<a href="#" class="ion-ios-trash-outline" style="font-size:24px;" onclick="deleteNm(' + i + ')"></a>&nbsp;';
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


function displayDetail(i)
{
  document.getElementById('detail_title'    ).innerHTML = gNmlist1[i].title;
  document.getElementById('detail_value_jpy').innerHTML = getShort(gNmlist1[i].value_jpy) + '円';
  document.getElementById('detail_value_usd').innerHTML = getShort(gNmlist1[i].value_usd) + 'ドル';
  document.getElementById('detail_rate'     ).innerHTML = gNmlist1[i].rate + '円/ドル';
  document.getElementById('detail_date'     ).innerHTML = gNmlist1[i].date;
}


/*--------------------------------------
  getShort
---------------------------------------*/
function getShort(value)
{
  var short, unit;

  if (document.getElementById('op_toTbl').checked)
  {
    if      (value > 1000000000000) { short = value / 1000000000000; unit = ' Tri'; }
    else if (value >    1000000000) { short = value /    1000000000; unit = ' Bil'; }
    else if (value >       1000000) { short = value /       1000000; unit = ' Mil'; }
    else                            { short = value /             1; unit =    ''; }
  }
  else
  {
    if      (value > 1000000000000) { short = value / 1000000000000; unit = '兆'; }
    else if (value >     100000000) { short = value /     100000000; unit = '億'; }
    else if (value >         10000) { short = value /         10000; unit = '万'; }
    else                            { short = value /             1; unit =   ''; }
  }

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
  if (tab.getActiveTabIndex() == TAB_MONEY) { refer_money(); }
  if (tab.getActiveTabIndex() == TAB_THING) { refer_thing(); }
}
function refer_money()
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

  var value = multiplyBySubunit(document.getElementById('in_value').value);
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
function refer_thing()
{
  if (document.getElementById('in_title').value == "" ||
      document.getElementById('in_value').value == "")
  {
    alert('名称・値を入力してください。');
    return;
  }

  var entry = {
    "title"    : document.getElementById('in_title').value,
    "value"    : multiplyBySubunit(document.getElementById('in_value').value),
    "isEntered": true
  }

  // 配列更新
  gNmlist2.push(entry);

  // ソート
  sortNmlist();

  // まだ保存しない

  // テーブル更新
  displayNmlist();
}

/*--------------------------------------
  multiplyBySubunit
  サブ単位なしの裸の数字を取得する
---------------------------------------*/
function multiplyBySubunit(value)
{
  if      (document.getElementById('in_subunit_cho').checked) { return value * 1000000000000; }
  else if (document.getElementById('in_subunit_oku').checked) { return value *     100000000; }
  else if (document.getElementById('in_subunit_han').checked) { return value *       1000000; }
  else if (document.getElementById('in_subunit_man').checked) { return value *         10000; }
  else if (document.getElementById('in_subunit_sen').checked) { return value *          1000; }
  else if (document.getElementById('in_subunit_tri').checked) { return value * 1000000000000; }
  else if (document.getElementById('in_subunit_bil').checked) { return value *    1000000000; }
  else if (document.getElementById('in_subunit_mil').checked) { return value *       1000000; }
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
  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    gNmlist1.splice(key, 1);
  }
  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    gNmlist2.splice(key, 1);
  }

  // ストレージ保存
  saveLocalStrage();

  // テーブル更新
  displayNmlist();
}

/*--------------------------------------
  addNm
  ナンバーの追加
---------------------------------------*/
function addNm(key)
{
  var newNmlist = [];
  var tmpNmlist = []; // 照会だけしててまだ登録指示を受けていないもの

  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    for (var i = 0; i < gNmlist1.length; i++)
    {
      if (gNmlist1[i].isEntered == true) {
        if (i == key) {
          delete gNmlist1[i].isEntered
          newNmlist.push(gNmlist1[i]);
        }
        else {
          tmpNmlist.push(gNmlist1[i]);
        }
      }
      else {
        newNmlist.push(gNmlist1[i]);
      }
    }

    gNmlist1 = [];
    for (var i = 0; i < newNmlist.length; i++) {
      gNmlist1.push(newNmlist[i]);
    }
  }
  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    for (var i = 0; i < gNmlist2.length; i++)
    {
      if (gNmlist2[i].isEntered == true) {
        if (i == key) {
          delete gNmlist2[i].isEntered
          newNmlist.push(gNmlist2[i]);
        }
        else {
          tmpNmlist.push(gNmlist2[i]);
        }
      }
      else {
        newNmlist.push(gNmlist2[i]);
      }
    }

    gNmlist2 = [];
    for (var i = 0; i < newNmlist.length; i++) {
      gNmlist2.push(newNmlist[i]);
    }
  }

  // ストレージ保存
  saveLocalStrage();

  // 一時ナンバーリストを戻す
  for (var i = 0; i < tmpNmlist.length; i++)
  {
    // _マネー
    if (tab.getActiveTabIndex() == TAB_MONEY)
    {
      gNmlist1.push(tmpNmlist[i]);
    }
    // _人・もの
    if (tab.getActiveTabIndex() == TAB_THING)
    {
      gNmlist2.push(tmpNmlist[i]);
    }
  }

  // ソート
  sortNmlist();

  // テーブル更新
  displayNmlist();
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
  // _マネー
  if (tab.getActiveTabIndex() == TAB_MONEY)
  {
    localstorage.removeItem('nmlist1');
  }
  // _人・もの
  if (tab.getActiveTabIndex() == TAB_THING)
  {
    localstorage.removeItem('nmlist2');
  }

  // テーブル更新
  displayNmlist();
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


/*--------------------------------------
  addSampleNmlist1ToLocalStorage
  ナンバーリスト1のサンプルを登録
---------------------------------------*/
function saveSampleNmlist()
{
  if (tab.getActiveTabIndex() == TAB_MONEY) { saveSampleNmlist_money(); }
  if (tab.getActiveTabIndex() == TAB_THING) { saveSampleNmlist_thing(); }
}
function saveSampleNmlist_money()
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
function saveSampleNmlist_thing()
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
