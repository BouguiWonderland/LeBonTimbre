import { PolymerElement, html } from '/@polymer/polymer/polymer-element.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';
import '/@polymer/paper-button/paper-button.js'
import '/@polymer/paper-input/paper-input.js'
import '/@polymer/paper-progress/paper-progress.js'
import '/@polymer/paper-styles/shadow.js'
import '/@polymer/paper-styles/typography.js'
import '/@polymer/paper-styles/color.js'

export class helpAbout extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
      .container {
        width: 100%;
        height: 100%;
      }
      .col-md-5 {
        margin-top:5%;
        margin-bottom:5%;
        margin-left:1%;
        margin-right:7.2%;
        background-color:white;
        border: solid 1px #4CAF50;
        float: left;
      }
      h1 {
        font-family: OldPressItalic;
        font-size:400%;
        margin-top: 10px;
        border-bottom: 3px solid #4CAF50;
      }
      h2 {
        margin-top:4%;
        font-size:180%;
        border-bottom: 1px solid #4CAF50;
      }
      p {
        text-align: justify;
      }
      #loginForm {
          width: 100%;
          height: 100%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;

          background: var(--login-form-background-color, white);
          @apply --shadow-elevation-12dp;
          @apply --login-form;
      }

      #loginFormContent {
          padding: 20px;
      }

      #loginFormContent>* {
          margin-top: 8px;
          margin-bottom: 8px;
      }


      #registerBtn {
          margin-top: 50px;
          float: right;
          background-color: var(--login-btn-background-color, var(--paper-indigo-500));
          color: var(--register-btn-text-color, white);
          --paper-button-raised-keyboard-focus: {
              background-color: var(--login-btn-raised-background-color, var(--paper-pink-a200)) !important;
              color: var(--login-btn-text-color, white) !important;
          }
          ;

          @apply --register-btn;
      }
      paper-progress {
          width: 100%;
      }

      #errorMsg {
          margin-top: 16px;
          color: var(--login-error-label-color, var(--error-color));
          @apply --paper-font-menu;
      }
      </style>

      <div class="container">
          <div class="col-md-5">
            <h1>FAQ</h1>

            <h2>Comment créer une annonce ?</h2>
            <p>tenim si attendere diligenter, existimare vere de omni hac causa volueritis,
            sic constituetis, iudices, nec descensurum quemquam ad hanc accusationem fuisse,
            cui, utrum vellet, liceret, nec, cum descendisset, quicquam habiturum spei fuisse,
            nisi alicuius intolerabi</p>

            <h2>Comment supprimer une annonce ?</h2>
            <p>tium habitu quicquid noscere poterant vel audire latenter intromissi per posticas in regiam nuntiabant,
            id observantes conspiratione concordi, ut fingerent quaedam et c</p>

            <h2>Comment modifier une annonce ?</h2>
            <p>s et nive obrutis callibus plurimis ubi prope Rauracum ventum est ad su</p>

          </div>
          <div class="col-md-5">
            <h1>Contact</h1>
            <p align="center">
            <div id="loginForm">
                <paper-progress disabled="[[!loading]]" indeterminate></paper-progress>
                <div id="loginFormContent">
                    <h1>[[title]]</h1>
                    <div id="errorMsg">[[errorMsg]]</div>
                    <paper-input id="emailFromInput" value="{{emailFrom}}" disabled="[[loading]]" type="text" label="[[emailFromInputLabel]]" required
                        error-message="[[InputErrMsg]]"></paper-input>
                    <paper-input id="emailToInput" value="{{emailTo}}" disabled="[[loading]]" type="text" label="[[emailToInputLabel]]" required
                        error-message="[[InputErrMsg]]"></paper-input>
                    <paper-input id="textInput" value="{{text}}" disabled="[[loading]]" type="text" label="[[textInputLabel]]" required
                        error-message="[[InputErrMsg]]"></paper-input>

                    <paper-button on-click="_send" disabled="[[loading]]" id="createBtn" raised class="indigo">[[createBtnText]]</paper-button>
                    <slot name=""></slot>
                </div>
            </div>
            </p>
          </div>
      </div>

    `;
  }


  static get properties() {
    return {
      title: String,
      errorMsg: String,
      createBtnText: {
        type: String,
        value: "Send"
      },
      emailFromInputLabel: {
        type: String,
        value: "Email from"
      },
      emailToInputLabel: {
        type: String,
        value: "Email to"
      },
      textInputLabel: {
        type: String,
        value: "Write your text here"
      },
      loading: {
        type: Boolean,
        value: false
      },
    };
  }

  async _send() {
    var link = "mailto:"+this.emailTo
             + "?cc=myCCaddress@example.com"
             + "&subject=" + escape("This is my subject")
             + "&body=" + this.text
    ;

    window.location.href = link;
  }

  constructor(){
    super();
  }

}

customElements.define('help-about', helpAbout);
