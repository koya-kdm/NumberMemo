<?php
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <link rel='stylesheet' href='https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.11/build/css/onsenui.css' />
    <link rel='stylesheet' href='https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.11/build/css/onsen-css-components.css' />

    <script src='https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.11/build/js/angular/angular.min.js'></script>
    <script src='https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.11/build/js/onsenui.min.js'></script>

    <title>数字メモ</title>

    <script>
      ons.bootstrap();
    </script>
  </head>
  <body onload="setDefaultInputs(); developLocalStrage();">
    <script type="text/javascript">

      var gNmlist = [];

      /*--------------------------------------
        setDefaultInputs
      ---------------------------------------*/
      function setDefaultInputs()
      {
        document.getElementById('in_subunit_oku').checked = true;
        document.getElementById('in_unit_jpy'   ).checked = true;
        document.getElementById('in_rate'       ).value   = localStorage.getItem('rate');
      }

      /*--------------------------------------
        developLocalStrage
      ---------------------------------------*/
      function developLocalStrage()
      {
        // デフォルトの登録
        if (localStorage.getItem("nmlist1") == null) {
          addDefaultNmlist();
        }

        // ストレージ取込み
        getNmlistFromLocalStrage();

        // テーブル描画
        displayNmlistTable();
      }

      /*--------------------------------------
        addDefault
      ---------------------------------------*/
      function addDefaultNmlist()
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
            "title"    : "日本国家予算",
            "value_jpy": 97000000000000,
            "value_usd": 970000000000,
            "rate"     : 100,
            "date"     : "20160730"
          }
        ];

        var str = JSON.stringify(obj);
        localStorage.setItem('nmlist1', str);

        localStorage.setItem('rate', 100);
      }

      /*--------------------------------------
        getLocalStrage
      ---------------------------------------*/
      function getNmlistFromLocalStrage()
      {
        // ゲット
        var str = localStorage.getItem("nmlist1");
        gNmlist = JSON.parse(str);

        // ソート
        gNmlist.sort(function(a, b) {
          if (a.value_jpy < b.value_jpy) return -1;
          if (a.value_jpy > b.value_jpy) return  1;
          return 0;
        });
      }

      /*--------------------------------------
        saveLocalStrage
      ---------------------------------------*/
      function saveLocalStrage()
      {
        localStorage.removeItem("nmlist1");
        var str = JSON.stringify(gNmlist);
        localStorage.setItem("nmlist1", str);

        alert("Saved!");
      }

      /*--------------------------------------
        displayNmlistTable
      ---------------------------------------*/
      function displayNmlistTable()
      {
        var table = document.getElementById('nmlist');

        // テーブルクリア
        while (table.rows.length > 0) {
          table.deleteRow(0);
        }

        for (var i = 0; i < gNmlist.length; i++)
        {
          // 行の追加
          var row = table.insertRow(-1);

          // セルの挿入
          var cell1 = row.insertCell(-1); // title
          var cell2 = row.insertCell(-1); // value_jpy
          var cell3 = row.insertCell(-1); // value_usd
          var cell4 = row.insertCell(-1); // button

          // セルの内容入力
          cell1.innerHTML = gNmlist[i].title;
          cell2.innerHTML = getShort(gNmlist[i].value_jpy) + '円';
          cell3.innerHTML = getShort(gNmlist[i].value_usd) + 'ドル';

          if (gNmlist[i].isEntered == true)
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

          if (gNmlist[i].isEntered == true)
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
        gNmlist.push(entry);

        // ソート
        gNmlist.sort(function(a, b) {
          if (a.value_jpy < b.value_jpy) return -1;
          if (a.value_jpy > b.value_jpy) return  1;
          return 0;
        });

        // まだ保存しない

        // テーブル更新
        displayNmlistTable();
      }

      /*--------------------------------------
        deleteNm
      ---------------------------------------*/
      function deleteNm(key)
      {
        //  確認
        if (false == confirm('Delete really?')) {
          return;
        }

        // 配列更新
        gNmlist.splice(key, 1);

        // ストレージ保存
        saveLocalStrage();

        // テーブル更新
        displayNmlistTable();
      }

      /*--------------------------------------
        addNm
      ---------------------------------------*/
      function addNm(key)
      {
        var newNmlist = [];
        for (var i = 0; i < gNmlist.length; i++)
        {
          if (gNmlist[i].isEntered == true)
          {
            if (i == key)
            {
              delete gNmlist[i].isEntered
              newNmlist.push(gNmlist[i]);
            }
          }
          else
          {
            newNmlist.push(gNmlist[i]);
          }
        }

        gNmlist = [];
        for (var i = 0; i < newNmlist.length; i++) {
          gNmlist.push(newNmlist[i]);
        }

        // ストレージ保存
        saveLocalStrage();

        // テーブル更新
        displayNmlistTable();
      }

      /*--------------------------------------
        saveRate
      ---------------------------------------*/
      function saveRate()
      {
        localStorage.setItem('rate', document.getElementById('in_rate').value);
        alert('Rate saved!');
      }

      /*--------------------------------------
        pr
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
        chgUnit
      ---------------------------------------*/
      function chgUnit()
      {
        var eRds = document.getElementsByName("entry[unit]");
        for (var i = 0, len = eRds.length; i < len; i++)
        {
          var eTd = document.getElementById("td_" + eRds[i].value);
          if (eRds[i].checked) {
            eTd.style.backgroundColor = "lightsteelblue";
          }
          else {
            eTd.style.backgroundColor = "transparent";
          }
        }
      }

      /*--------------------------------------
        chgSubunit
      ---------------------------------------*/
      function chgSubunit()
      {
        var eRds = document.getElementsByName("entry[subunit]");
        for (var i = 0, len = eRds.length; i < len; i++)
        {
          var eTd = document.getElementById("td_" + eRds[i].value);
          if (eRds[i].checked) {
            eTd.style.backgroundColor = "lightsteelblue";
          }
          else {
            eTd.style.backgroundColor = "transparent";
          }
        }
  	  }
    </script>

    <ons-page>

      <!-- *************************
      * タブ
      ******************************-->
      <div class="tab-bar tab-bar--top tab-bar--top-border">
        <label class="tab-bar__item tab-bar--top-border__item">
          <input type="radio" name="top-tab-bar-b" checked="checked">
          <button class="tab-bar__button tab-bar--top-border__button">
            金額
          </button>
        </label>
        <label class="tab-bar__item tab-bar--top-border__item">
          <input type="radio" name="top-tab-bar-b">
          <button class="tab-bar__button tab-bar--top-border__button" onclick="location.href='./index2.php'">
            人・もの
          </button>
        </label>
      </div>

      <br>

      <!-- *************************
      * 入力フォーム
      ******************************-->
      <style type="text/css">
        table.t_layout {
          border-collapse: collapse;
          border: none;
          width: 100%;
        }
        table.t_layout td {
          border: none;
          margin: 0 0 0 0;
          padding: 10px 10px 10px 10px;
        }
        </style>
      <table class="t_layout">
        <tr>
          <td nowrap>名称&nbsp;&nbsp;</td>
          <td>
            <input type="text" id="in_title" class="text-input--underbar" style="width:100%;" placeholder="" value="">
          </td>
        </tr>
        <tr>
          <td>金額</td>
          <td>
            <input type="number" id="in_value" class="text-input--underbar" style="width:100%;" placeholder="" value="">
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div class="button-bar" style="width:280px;margin:0px auto 10px;">
              <div class="button-bar__item">
                <input type="radio" id="in_subunit_cho" name="segment-a">
                <button class="button-bar__button">兆 (^12)</button>
              </div>
              <div class="button-bar__item">
                <input type="radio" id="in_subunit_oku" name="segment-a">
                <button class="button-bar__button">億 (^8)</button>
              </div>
              <div class="button-bar__item">
                <input type="radio" id="in_subunit_man" name="segment-a">
                <button class="button-bar__button">万 (^4)</button>
              </div>
            </div>

            <div class="button-bar" style="width:280px;margin:0px auto;">
              <div class="button-bar__item">
                <input type="radio" id="in_subunit_tri" name="segment-a">
                <button class="button-bar__button">Trillion (^12)</button>
              </div>
              <div class="button-bar__item">
                <input type="radio" id="in_subunit_bil" name="segment-a">
                <button class="button-bar__button">Billion (^9)</button>
              </div>
              <div class="button-bar__item">
                <input type="radio" id="in_subunit_mil" name="segment-a">
                <button class="button-bar__button">Million (^6)</button>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>単位</td>
          <td>
            <div class="button-bar" style="width:280px;margin:0 auto;">
              <div class="button-bar__item">
                <input type="radio" id="in_unit_jpy" name="segment-b">
                <button class="button-bar__button">JPY</button>
              </div>
              <div class="button-bar__item">
                <input type="radio" id="in_unit_usd" name="segment-b">
                <button class="button-bar__button">USD</button>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>為替</td>
          <td>
            <input type="number" id="in_rate" class="text-input--underbar" style="width:50pt;" placeholder="" onblur="saveRate()"><span style="color:#999999">円/ドル</span>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <button class="button button--outline" onclick="refer()">&nbsp;&nbsp;&nbsp;&nbsp;照会&nbsp;&nbsp;&nbsp;&nbsp;</button>
          </td>
        </tr>
      </table>

      <!-- *************************
      * 一覧
      ******************************-->
      <style type="text/css">
        table.t_list {
          border-collapse: collapse;
          border: solid #dddddd 1px;
          width: 100%;
          margin-top: 10px;
        }
        table.t_list th, td{
          border: solid #dddddd 1px;
        }
      </style>
      <table class="t_list" id="nmlist"></table>
      <br>
      <br>
      <br>
      <br>
      <br>
      <div width="100%" align="center">
        <button class="button button--outline" onclick="localStorage.clear()">すべて削除</button>
      </div>
      <br>
    </ons-page>
  </body>
</html>
