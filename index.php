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
<script src='./sample.js'></script>


<!-- *************************
* タブバー
******************************-->
<ons-tabbar var="tab">
  <ons-tab page="tab_money.html" label="マネー" icon="ion-social-yen" active="true"></ons-tab>
  <ons-tab page="tab_thing.html" label="人・もの" icon="ion-ios-people"></ons-tab>
  <ons-tab page="tab_config.html" label="設定" icon="ion-ios-cog"></ons-tab>
</ons-tabbar>

<!-- *************************
* 「マネー」タブ
******************************-->
<ons-template id="tab_money.html">
  <ons-navigator var="nav">
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
          </div>
          <div class="button-bar" style="width:280px;margin:0px auto 10px;">
            <div class="button-bar__item">
              <input type="radio" id="in_subunit_han" name="segment-a">
              <button class="button-bar__button">百万 (^6)</button>
            </div>
            <div class="button-bar__item">
              <input type="radio" id="in_subunit_man" name="segment-a">
              <button class="button-bar__button">万 (^4)</button>
            </div>
            <div class="button-bar__item">
              <input type="radio" id="in_subunit_sen" name="segment-a">
              <button class="button-bar__button">千 (^3)</button>
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
              <button class="button-bar__button">円</button>
            </div>
            <div class="button-bar__item">
              <input type="radio" id="in_unit_usd" name="segment-b">
              <button class="button-bar__button">ドル</button>
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

    <!-- ****** オプション ******-->
    <div width="100%" align="right">
      <table class="t_switch">
        <tr>
          <td>ドル</td>
          <td>
            <label class="switch">
              <input type="checkbox" class="switch__input" id="op_toDollar" onchange="displayNmlist()">
              <div class="switch__toggle"></div>
            </label>
          </td>
          <td>&nbsp;</td>
          <td>TBM</td>
          <td>
            <label class="switch">
              <input type="checkbox" class="switch__input" id="op_toTbl" onchange="displayNmlist()">
              <div class="switch__toggle"></div>
            </label>
          </td>
        </tr>
      </table>
    </div>

    <!-- ****** 一覧 ******-->
    <table class="t_list" id="nmlist"></table>

    <br>
    <br>
    <br>
    <br>
    <br>

    <div width="100%" align="center">
      <button class="button button--outline" onclick="addSample()">サンプルデータの取込み</button>
    </div>
    <br>
    <div width="100%" align="center">
      <button class="button button--outline" onclick="deleteAll()">すべて削除</button>
    </div>

    <br>

  </ons-navigator>
</ons-template>


<!-- *************************
* 「人・もの」タブ
******************************-->
<ons-template id="tab_thing.html">
  <ons-navigator var="nav">
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
          <button class="button button--outline" onclick="refer()">　　照会　　</button>
          <button class="button button--outline" onclick="setDefaultInputs()">クリア</button>
        </td>
      </tr>
    </table>

    <!-- ****** オプション ******-->
    <div width="100%" align="right">
      <table class="t_switch">
        <tr>
          <td>TBM</td>
          <td>
            <label class="switch">
              <input type="checkbox" class="switch__input" id="op_toTbl" onchange="displayNmlist()">
              <div class="switch__toggle"></div>
            </label>
          </td>
        </tr>
      </table>
    </div>

    <!-- ****** 一覧 ******-->
    <table class="t_list" id="nmlist"></table>

    <br>
    <br>
    <br>
    <br>
    <br>

    <div width="100%" align="center">
      <button class="button button--outline" onclick="addSample()">サンプルデータの取込み</button>
    </div>
    <br>
    <div width="100%" align="center">
      <button class="button button--outline" onclick="deleteAll()">すべて削除</button>
    </div>

    <br>

  </ons-navigator>
</ons-template>



<ons-template id="detail_money.html">
  <ons-page>
    <ons-toolbar>
      <div class="left">
        <ons-back-button>戻る</ons-back-button>
      </div>
      <div class="center" id="detail_title"></div>
    </ons-toolbar>

    <br>
    <br>

    <table class="t_list" id="nmlist">
      <tr>
        <td>金額（円）</td>
        <td id="detail_value_jpy" align="right"></td>
      </tr>
      <tr>
        <td>金額（ドル）</td>
        <td id="detail_value_usd" align="right"></td>
      </tr>
      <tr>
        <td>為替</td>
        <td id="detail_rate" align="right"></td>
      </tr>
      <tr>
        <td>登録日</td>
        <td id="detail_date" align="right"></td>
      </tr>
      <tr>
        <td>更新日</td>
        <td id="detail_date" align="right"></td>
      </tr>
    </table>

    <div style="text-align: center; margin-top: 100px;">
      <ons-button modifier="light" onclick="nav.popPage()">戻る</ons-button>
      <ons-button modifier="light" onclick="nav.popPage()">更新</ons-button>
      <ons-button modifier="light" onclick="nav.popPage()">削除</ons-button>
    </div>
  </ons-page>
</ons-template>


<ons-template id="detail_thing.html">
  <ons-page>
    <ons-toolbar>
      <div class="left">
        <ons-back-button>戻る</ons-back-button>
      </div>
      <div class="center" id="detail_title"></div>
    </ons-toolbar>

    <br>
    <br>

    <table class="t_list" id="nmlist">
      <tr>
        <td>値</td>
        <td id="detail_value" align="right"></td>
      </tr>
      <tr>
        <td>登録日</td>
        <td id="detail_date" align="right"></td>
      </tr>
      <tr>
        <td>更新日</td>
        <td id="detail_date" align="right"></td>
      </tr>
    </table>

    <div style="text-align: center; margin-top: 100px;">
      <ons-button modifier="light" onclick="nav.popPage()">戻る</ons-button>
      <ons-button modifier="light" onclick="nav.popPage()">更新</ons-button>
      <ons-button modifier="light" onclick="nav.popPage()">削除</ons-button>
    </div>
  </ons-page>
</ons-template>


<!-- *************************
* 「設定」タブ
******************************-->
<ons-template id="tab_config.html">
  <ons-navigator title="Navigator" var="nav">
    <ons-page>
      <ons-toolbar>
        <div class="center">設定</div>
      </ons-toolbar>

      <ons-list>
        <ons-list-header>マネー</ons-list-header>

        <ons-list-item>
          <div style="float: left;">
              <span style="color: #666">数字メモをすべて削除</span></ons-col>
          </div>

          <div style="float: right;">
            <ons-button modifier="quiet" onclick="deleteAll_money()">実行</ons-button>
          </div>
        </ons-list-item>

        <ons-list-header>人・もの</ons-list-header>

        <ons-list-item>
          <div style="float: left;">
              <span style="color: #666">数字メモをすべて削除</span></ons-col>
          </div>

          <div style="float: right;">
            <ons-button modifier="quiet" onclick="deleteAll_thing()">実行</ons-button>
          </div>
        </ons-list-item>

      </ons-list>
    </ons-page>
  </ons-navigator>
</ons-template>
