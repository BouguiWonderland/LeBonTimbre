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

      #outImage{
        width:100px;
        margin-left: auto;
        margin-right: auto;
        height:100px;
        float: right;
      }
    </style>

    <p align="center">
    <div id="createpostForm">
        <paper-progress disabled="[[!loading]]" indeterminate></paper-progress>
        <div id="createpostFormContent">
            <h1>[[title]]</h1>
            <img id="outImage" src="" alt="Image de l'annonce">
            <div id="errorMsg">[[errorMsg]]</div>
            <paper-input id="titleP" value="{{titleP}}" disabled="[[loading]]" type="text" label="[[InputTitle]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="year" value="{{year}}" disabled="[[loading]]" type="number" label="[[InputYear]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="country" value="{{country}}" disabled="[[loading]]" type="text" label="[[InputCountry]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="description" value="{{description}}" disabled="[[loading]]" type="text" label="[[InputDescription]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="price" value="{{price}}" disabled="[[loading]]" type="number" label="[[InputPrice]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="longitude" value="{{longitude}}" disabled="[[loading]]" type="number" label="[[InputLongitude]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <paper-input id="latitude" value="{{latitude}}" disabled="[[loading]]" type="number" label="[[InputLatitude]]" required
                error-message="[[ErrMsg]]"></paper-input>
            <input id="imgload"  disabled="[[loading]]" type="file" accept="image/*"  label="Ajouter image" required
                error-message="[[ErrMsg]]"></input>

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
        type: Number,
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
        type: Number,
        notify: true
      },

      latitude: {
        type: String,
        notify: true
      },

      longitude: {
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
        value: "Prix de mise en vente (en euros)"
      },

      InputLatitude: {
        type: String,
        value: "Position GPS : Latitude"
      },

      InputLongitude: {
        type: String,
        value: "Position GPS : Longitude"
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
    this.username=readCookie("userConnected");
    if(!this.username)document.location.href="http://localhost:3000/";
    this.name=readCookie("Name");
    this.firstname=readCookie("userFirstname");

    this.userdata="Bienvenue "+this.firstname+" "+this.name+", alias "+this.username+" !"




  }

  ready() {
    super.ready();
    var self = this;

    this.$.imgload.addEventListener("change", function(){
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        var image = new Image();
        image.src = event.target.result;
        image.onload = function(){
          //

          var maxWidth = 1024,
              maxHeight = 1024,
              imageWidth = image.width,
              imageHeight = image.height;


          if (imageWidth > imageHeight) {
            if (imageWidth > maxWidth) {
              imageHeight *= maxWidth / imageWidth;
              imageWidth = maxWidth;
            }
          }
          else {
            if (imageHeight > maxHeight) {
              imageWidth *= maxHeight / imageHeight;
              imageHeight = maxHeight;
            }
          }

          var canvas = document.createElement('canvas');
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          image.width = imageWidth;
          image.height = imageHeight;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

          self.$.outImage.src =canvas.toDataURL(file.type);
        }
      }
        if(file){
          reader.readAsDataURL(file);
        }else{
        }
      });


  }

  _create(){
    if(this.$.titleP.validate() && this.$.year.validate() && this.$.country.validate() && this.$.description.validate() && this.$.price.validate()){

      let adData ={
        "title":this.titleP,
        "year":this.year,
        "country":this.country,
        "description":this.description,
        "price":this.price,
        "user":this.username,
        "latitude":this.latitude,
        "longitude":this.longitude,
        "img":this.$.outImage.src
      }

      let request={
         method:'POST',
         headers: {'Accept': 'application/json,text/plain',
                    'Content-Type': 'application/json'
                  },
         body: JSON.stringify(user)
      }

      try {
        fetch('http://localhost:3000/ads',request);
        this.dispatchEvent(new CustomEvent('register-btn-click', { bubbles: true, composed: true }));
        document.location.href="#/home/ads-list";
      }
        catch (err) {
          console.log('fetch failed', err);
          this.errorMsg = "Serveur injoignable, rééssayez svp"
        }


    }
  }

  readURL(){
    var file = this.$.imgload.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      this.$.outImage.src = "url(" + reader.result + ")";
    }
    if(file){
      reader.readAsDataURL(file);
    }else{
    }
  }

  _onChanged(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=image/*]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
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

window.customElements.define('create-ad-form', createpostForm);
