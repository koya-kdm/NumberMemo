<meta charset="UTF-8" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">

<link href="https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.6/build/css/onsenui.css" rel="stylesheet"/>
<link href="https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.6/build/css/onsen-css-components.css" rel="stylesheet"/>
<script src="https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.6/build/js/angular/angular.min.js"></script>
<script src="https://cdn.rawgit.com/OnsenUI/OnsenUI/1.3.6/build/js/onsenui.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<link href="./nm.css" rel="stylesheet"/>
<script src='./nm.js'></script>

<!-- *************************
* タブバー
******************************-->
<ons-tabbar var="tab">
  <ons-tab page="page1.html" label="お金" icon="ion-social-yen" active="true"></ons-tab>
  <ons-tab page="page2.html" label="人・もの" icon="ion-ios-people"></ons-tab>
  <ons-tab page="page4.html" label="設定" icon="ion-ios-cog"></ons-tab>
</ons-tabbar>

<!-- *************************
* 「お金」タブ
******************************-->
<ons-template id="page1.html">

  <!-- ****** 入力フォーム ******-->
  <table class="t_layout" style="margin-top:10px;">
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
        <button class="button button--outline" onclick="refer()">　　照会　　</button>
        <button class="button button--outline" onclick="setDefaultInputs()">クリア</button>
      </td>
    </tr>
  </table>

  <!-- ****** 一覧 ******-->
  <table class="t_list" id="nmlist"></table>

  <!-- ****** オプション ******-->
  <div width="100%" align="right">
    <table class="t_switch">
      <tr>
        <td>TBM</td>
        <td>
          <label class="switch">
            <input type="checkbox" class="switch__input">
            <div class="switch__toggle"></div>
          </label>
        </td>
      </tr>
    </table>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div width="100%" align="center">
    <button class="button button--outline" onclick="deleteAll()">すべて削除</button>
  </div>
  <br>
</ons-template>

<!-- *************************
* 「人・もの」タブ
******************************-->
<ons-template id="page2.html">

  <!-- ****** 入力フォーム ******-->
  <table class="t_layout" style="margin-top:10px;">
    <tr>
      <td nowrap>名称&nbsp;&nbsp;</td>
      <td>
        <input type="text" id="in_title" class="text-input--underbar" style="width:100%;" placeholder="" value="">
      </td>
    </tr>
    <tr>
      <td>値</td>
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
      <td colspan="2" align="center">
        <button class="button button--outline" onclick="refer2()">　　照会　　</button>
        <button class="button button--outline" onclick="setDefaultInputs2()">クリア</button>
      </td>
    </tr>
  </table>

  <!-- ****** 一覧 ******-->
  <table class="t_list" id="nmlist"></table>

  <!-- ****** オプション ******-->
  <div width="100%" align="right">
    <table class="t_switch">
      <tr>
        <td>TBM</td>
        <td>
          <label class="switch">
            <input type="checkbox" class="switch__input">
            <div class="switch__toggle"></div>
          </label>
        </td>
      </tr>
    </table>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div width="100%" align="center">
    <button class="button button--outline" onclick="deleteAll2()">すべて削除</button>
  </div>
  <br>
</ons-template>
