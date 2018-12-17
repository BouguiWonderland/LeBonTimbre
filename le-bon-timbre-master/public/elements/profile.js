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
class Profile extends PolymerElement {
  static get template() {
    return html`
    <style>
      #Form {
          width: 450px;
          height: 600px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;

          background: var(--login-form-background-color, white);
          @apply --shadow-elevation-12dp;
          @apply --login-form;
      }

      #FormContent {
          padding: 20px;
      }

      #FormContent>* {
          margin-top: 8px;
          margin-bottom: 8px;
      }


      #validBtn {
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
          font-family: OldPressItalic;
          @apply --login-title;
          font-size: 350%
      }

      h2 {
          @apply --paper-font-title;
          margin: 0;
          font-size: 100%
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
    <div id="Form">
        <paper-progress disabled="[[!loading]]" indeterminate></paper-progress>
        <div id="FormContent">
            <h1>[[username]]</h1>
            <div id="errorMsg">[[errorMsg]]</div>
            <h2>Modifiez les champs que vous voulez changer et validez !</h2>
            <paper-input id="passInput" value="{{password}}" disabled="[[loading]]" type="password" label="[[passwordInputLabel]]"></paper-input>
            <paper-input id="passConfInput" value="{{passwordConf}}" disabled="[[loading]]" type="password" label="[[passConfInputLabel]]"></paper-input>
            <paper-input id="firstnameInput" value="{{firstname}}" disabled="[[loading]]" type="text" label="[[firstnameInputLabel]]"></paper-input>
            <paper-input id="nameInput" value="{{name}}" disabled="[[loading]]" type="text" label="[[nameInputLabel]]"></paper-input>
            <paper-input id="emailInput" value="{{email}}" disabled="[[loading]]" type="text" label="[[emailInputLabel]]"></paper-input>

            <paper-button on-click="_submit" disabled="[[loading]]" id="Btn" raised class="indigo">Valider</paper-button>
            <slot name=""></slot>
        </div>
    </div>
    </p>

  `;
  }
  static get properties() {
    return {

      errorMsg: String,

      /**
      * Content of the username field
      */
      username: {
        type: String,
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
    this.username=readCookie("userConnected");
  }

  async _submit() {
    let newPass="";
    let newFirstname="";
    let newName="";
    let newEmail="";

    if (this.$.passInput.validate() && this.$.passConfInput.validate()){
      if(this.password!=this.passwordConf){
        this.errorMsg="La confirmation du mot de passe n'est pas bonne !";
      }
      else{
        newPass=this.password;
      }

    }
    if(this.$.firstnameInput.validate()){
      newFirstname=this.firstname;
    }

    if(this.$.nameInput.validate()){
      newName=this.name;
    }
    if(this.$.emailInput.validate()) {
      if(!this.email.includes("@") || !this.email.includes(".")){
        this.errorMsg="Veuillez saisir une adresse mail valide !";
      }
      newEmail=this.email;
    }




      try {

        let userData ={
          "username":this.username,
          "password":newPass,
          "firstname":newFirstname,
          "name":newName,
          "email":newEmail
        }

        let request={
           method:'POST',
           headers: {'Accept': 'application/json,text/plain',
                      'Content-Type': 'application/json'
                    },
           body: JSON.stringify(userData)
        }

          fetch('http://localhost:3000/update/'+this.username,request);
          document.location.href="#/home";
        }
      catch (err) {
        console.log('fetch failed', err);
      }
  }
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}




window.customElements.define('profile-screen', Profile);
