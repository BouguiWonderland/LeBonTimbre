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
export class createpostForm extends PolymerElement {
  static get template() {
    return html`
    <style>

    .topnav {
      background-color: #333;
      overflow: hidden;
    }

/* Style the links inside the navigation bar */
    .topnav a {
      float: left;
      margin-top: auto;
      margin-bottom: auto;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

    .topnav b {
      float: right;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

/* Change the color of links on hover */
    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }

/* Add a color to the active/current link */
    .topnav a.active {
      background-color: #4CAF50;
      color: white;
    }

      #createpostForm {
          width: 450px;
          height: 800px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 25px;

          background: var(--login-form-background-color, white);
          @apply --shadow-elevation-12dp;
          @apply --login-form;
      }

      #createpostFormContent {
          padding: 20px;
      }

      #createpostFormContent>* {
          margin-top: 8px;
          margin-bottom: 8px;
      }

      #createpostBtn {
          margin-top: 30px;
          float: right;
          background-color: var(--login-btn-background-color, var(--paper-indigo-500));
          color: var(--login-btn-text-color, white);
          --paper-button-raised-keyboard-focus: {
              background-color: var(--login-btn-raised-background-color, var(--paper-pink-a200)) !important;
              color: var(--login-btn-text-color, white) !important;
          }
          ;

          @apply --login-btn;
      }

      #createpostBtn[disabled] {
          background-color: var(--login-btn-disabled-background-color, var(--paper-indigo-100));
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

    <div class="topnav">
       <a href="http://localhost:3000/homepage.html">Accueil</a>
       <a class="active" href="http://localhost:3000/add_ad.html">Créer annonce</a>
       <a href="#contact">Mon profil</a>
       <a href="#about">Aide</a>
       <b id="userdata" >[[userdata]]</a>
       <paper-button on-click="_deconnect" disabled="[[loading]]" id="createBtn" raised class="indigo">Déconnexion</paper-button>
    </div>


    <p align="center">
    <div id="createpostForm">
        <paper-progress disabled="[[!loading]]" indeterminate></paper-progress>
        <div id="createpostFormContent">
            <h1>[[title]]</h1>
            <div id="errorMsg">[[errorMsg]]</div>
            <paper-input id="titleP" value="{{titleP}}" disabled="[[loading]]" type="text" label="[[InputTitle]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="year" value="{{year}}" disabled="[[loading]]" type="text" label="[[InputYear]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="country" value="{{country}}" disabled="[[loading]]" type="text" label="[[InputCountry]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="description" value="{{description}}" disabled="[[loading]]" type="text" label="[[InputDescription]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="price" value="{{price}}" disabled="[[loading]]" type="text" label="[[InputPrice]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="imgload"  disabled="[[loading]]" type="file"  label="Ajouter image" on-value-changed="_onChange" required
                error-message="[[ErrMsg]]"></paper-input>
            <img id="outImage" alt="Image de l'annonce">
            <paper-button on-click="_create" disabled="[[loading]]" id="createpostBtn" raised class="indigo">[[createpostBtnText]]</paper-button>
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
      subtitle: String,

      /**
      * Error message to show (example : "Invalid username")
      */
      errorMsg: String,

      /**
      * Content of the username field
      */
      title: {
        type: String,
        notify: true
      },

      /**
      * Content of the password field
      */
      year: {
        type: String,
        notify: true
      },

      country: {
        type: String,
        notify: true
      },

      description: {
        type: String,
        notify: true
      },

      price: {
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
      InputTitle: {
        type: String,
        value: "Titre de l'annonce"
      },

      InputYear: {
        type: String,
        value: "Année du timbre"
      },

      InputCountry: {
        type: String,
        value: "Pays de provenance du timbre"
      },

      InputDescription: {
        type: String,
        value: "Description plus précise"
      },

      InputPrice: {
        type: String,
        value: "Prix de mise en vente"
      },

      /**
      * Error message of the username field
      */
      ErrMsg: {
        type: String,
        value: "Veuillez remplir ce champ !"
      },


      /**
      * Login button label
      */
      createpostBtnText: {
        type: String,
        value: "Poster l'annonce"
      }
    }
  }

  constructor() {
    super();

    this.ads = [];
    this._getData();
    this.username=readCookie("userConnected");
    if(!this.username)document.location.href="http://localhost:3000/";
    this.name=readCookie("Name");
    this.firstname=readCookie("userFirstname");

    this.userdata="Bienvenue "+this.firstname+" "+this.name+", alias "+this.username+" !"

  }

  async _getData() {
    try {
      const response = await fetch('http://localhost:3000/ads');
      console.log('fetch');
      this.ads = await response.json();
      console.log(this.ads);
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  ready() {
    super.ready();
    var self = this;

  }

  _create(){
    if(this.$.titleP.validate() && this.$.year.validate() && this.$.country.validate() && this.$.description.validate() && this.$.price.validate()){
      let idMax=0;

      for(let i=0;i<this.ads.length;i++){
        console.log(this.ads[i].id);
        if(this.ads[i].id>idMax)idMax=i;
      }

      if(this.ads.length>0 && idMax==0)idMax++;

      let adData ={
        "title":this.titleP,
        "year":this.year,
        "country":this.country,
        "description":this.description,
        "price":this.price,
        "user":this.username,
        "id":idMax
      }


      var xhr = new XMLHttpRequest();
      var url="http://localhost:3000/ads"
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log(json.email + ", " + json.password);
        }
      };
      var data = JSON.stringify(adData);
      xhr.send(data);

      this.dispatchEvent(new CustomEvent('register-btn-click', { bubbles: true, composed: true }));
      document.location.href="http://localhost:3000/homepage.html";
    }
  }

  _onChange (evt){
    console.log("inside");
    var tgt = evt.target||window.event.srcElement,
       files = evt.files;
       console.log(files);
    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        console.log("2");
        fr.onload = function () {
            document.getElementById("outImage").src = fr.result;
        }
        console.log("3");
        fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
    }
}

  _deconnect(){
    createCookie("userConnected","",-1);
    createCookie("userFirstame","",-1);
    createCookie("Name","",-1);
    document.location.href="http://localhost:3000/";
  }


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

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

window.customElements.define('create-post-form', createpostForm);