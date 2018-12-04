import { html, PolymerElement } from '/@polymer/polymer/polymer-element.js';

import '/@polymer/paper-button/paper-button.js'
import '/@polymer/paper-input/paper-input.js'
import '/@polymer/paper-progress/paper-progress.js'
import '/@polymer/paper-styles/shadow.js'
import '/@polymer/paper-styles/typography.js'
import '/@polymer/paper-styles/color.js'

/**
 * `paper-loginscreen`
 * Material login screen, built using Polymer
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class Registerscreen extends PolymerElement {
  static get template() {
    return html`
    <style>
      #loginForm {
          width: 450px;
          height: 600px;
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

      h1 {
          @apply --paper-font-display1;
          margin: 0;
          @apply --login-title;
      }

      h2 {
          @apply --paper-font-title;
          margin: 0;
          @apply --login-subtitle;
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

    <p align="center">
    <div id="loginForm">
        <paper-progress disabled="[[!loading]]" indeterminate></paper-progress>
        <div id="loginFormContent">
            <h1>[[title]]</h1>
            <div id="errorMsg">[[errorMsg]]</div>
            <paper-input id="usernameInput" value="{{username}}" disabled="[[loading]]" type="text" label="[[usernameInputLabel]]" required
                error-message="[[InputErrMsg]]"></paper-input>
            <paper-input id="passInput" value="{{password}}" disabled="[[loading]]" type="password" label="[[passwordInputLabel]]" required
                error-message="[[InputErrMsg]]"></paper-input>
            <paper-input id="passConfInput" value="{{passwordConf}}" disabled="[[loading]]" type="password" label="[[passConfInputLabel]]" required
                error-message="[[InputErrMsg]]"></paper-input>
            <paper-input id="firstnameInput" value="{{firstname}}" disabled="[[loading]]" type="text" label="[[firstnameInputLabel]]" required
                error-message="[[InputErrMsg]]"></paper-input>
            <paper-input id="nameInput" value="{{name}}" disabled="[[loading]]" type="text" label="[[nameInputLabel]]" required
                error-message="[[InputErrMsg]]"></paper-input>
            <paper-input id="emailInput" value="{{email}}" disabled="[[loading]]" type="text" label="[[emailInputLabel]]" required
                error-message="[[InputErrMsg]]"></paper-input>

            <paper-button on-click="_submit" disabled="[[loading]]" id="createBtn" raised class="indigo">[[createBtnText]]</paper-button>
            <slot name=""></slot>
        </div>
    </div>
    </p>

  `;
  }
  static get properties() {
    return {
      /**
      * Title of the loginscreen
      */
      title: String,

      /**
      * Subtitle of the loginscreen
      */

      /**
      * Error message to show (example : "Invalid username")
      */
      errorMsg: String,

      /**
      * Content of the username field
      */
      username: {
        type: String,
        notify: true
      },

      /**
      * Content of the password field
      */
      password: {
        type: String,
        notify: true
      },

      /**
      * When true, all fields are disabled and the progress bar is visible
      */
      loading: {
        type: Boolean,
        value: false
      },

      /**
      * Placeholder of the username field
      */
      usernameInputLabel: {
        type: String,
        value: "Pseudo"
      },


      InputErrMsg: {
        type: String,
        value: "Veuillez remplir ce champ"
      },

      /**
      * Placeholder of the password field
      */
      passwordInputLabel: {
        type: String,
        value: "Mot de passe"
      },

      passConfInputLabel: {
        type: String,
        value: "Confirmez votre mot de passe"
      },

      firstnameInputLabel: {
        type: String,
        value: "Prénom"
      },

      nameInputLabel: {
        type: String,
        value: "Nom"
      },

      emailInputLabel: {
        type: String,
        value: "Adresse mail"
      },



      /**
      * create button label
      */
      createBtnText: {
        type: String,
        value: "Inscription"
      }

    }
  }

  constructor() {
    super();
  }

  async _submit() {
    if (this.$.usernameInput.validate() && this.$.passInput.validate() && this.$.passConfInput.validate()
      &&  this.$.firstnameInput.validate() && this.$.nameInput.validate() && this.$.emailInput.validate()) {

      if(this.password!=this.passwordConf){
        this.errorMsg="La confirmation du mot de passe n'est pas bonne !";
        return;
      }

      if(!this.email.includes("@") || !this.email.includes(".")){
        this.errorMsg="Veuillez saisir une adresse mail valide !";
        return;
      }

      try {

        let userData ={
          "username":this.username,
          "password":this.password,
          "firstname":this.firstname,
          "name":this.name,
          "email":this.email
        }

        let request={
           method:'POST',
           headers: {'Accept': 'application/json,text/plain',
                      'Content-Type': 'application/json'
                    },
           body: JSON.stringify(userData)
        }

        const response = await fetch('http://localhost:3000/submit/registration/',request);
        let isOk = await response.text();
        if(isOk=="true"){
          this.dispatchEvent(new CustomEvent('register-btn-click', { bubbles: true, composed: true }));
          document.location.href="#/login";
        }
        else{
          this.errorMsg="Pseudo déjà pris";
        }
      }
      catch (err) {
        console.log('fetch failed', err);
      }
  }
}

  ready() {
    super.ready();
    var self = this;
    this.$.loginForm.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {//Enter
        self._login();
        return false;
      }
    });

  }


}

window.customElements.define('register-screen', Registerscreen);
