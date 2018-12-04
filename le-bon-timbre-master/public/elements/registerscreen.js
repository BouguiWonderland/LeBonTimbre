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

            <paper-button on-click="_createAccount" disabled="[[loading]]" id="createBtn" raised class="indigo">[[createBtnText]]</paper-button>
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

    this.users = [];
    this._getData();

  }

  async _getData() {
    try {
      const response = await fetch('http://localhost:3000/users');
      console.log('fetch');
      this.users = await response.json();
      console.log(this.users);
    }
    catch (err) {
      console.log('fetch failed', err);
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

  _createAccount() {

      if (this.$.usernameInput.validate() && this.$.passInput.validate() && this.$.passConfInput.validate()
    &&  this.$.firstnameInput.validate() && this.$.nameInput.validate() && this.$.emailInput.validate()) {

      //Vérification que le pseudo n'est pas déjà utilisé
      let c=0;
      for(let i=0;i<this.users.length;i++){
        if(this.users[i].username==this.username)c++;
        if(c==1){
          this.errorMsg="Pseudo déjà pris";
          return;
        }
        c=0;
      }

      //Vérification que la confirmation du mot de passe est bonne
      if(this.password!=this.passwordConf){
        this.errorMsg="La confirmation du mot de passe n'est pas bonne !";
        return;
      }

      if(!this.email.includes("@") || !this.email.includes(".")){
        this.errorMsg="Veuillez saisir une adresse mail valide !";
        return;
      }

      let userData ={
        "username":this.username,
        "password":this.password,
        "firstname":this.firstname,
        "name":this.name,
        "email":this.email
      }


      var xhr = new XMLHttpRequest();
      var url="http://localhost:3000/users"
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log(json.email + ", " + json.password);
        }
      };
      var data = JSON.stringify(userData);
      xhr.send(data);

      this.dispatchEvent(new CustomEvent('register-btn-click', { bubbles: true, composed: true }));
      document.location.href="#/login";


    }
  }


}

window.customElements.define('register-screen', Registerscreen);
