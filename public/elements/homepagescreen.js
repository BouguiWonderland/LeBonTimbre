import { html, PolymerElement } from '/@polymer/polymer/polymer-element.js';

import '/@polymer/paper-button/paper-button.js'
import '/@polymer/paper-input/paper-input.js'
import '/@polymer/paper-progress/paper-progress.js'
import '/@polymer/paper-styles/shadow.js'
import '/@polymer/paper-styles/typography.js'
import '/@polymer/paper-styles/color.js'

import {createpostForm} from './create-post-form.js';
import {AdListItem} from './ad-list-item.js';


class Homepagescreen extends PolymerElement {
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

      .ads{
        width:400px;
        margin-left: auto;
        margin-right: auto;
      }
    </style>


      <div class="topnav">
         <a class="active" href="#home">Accueil</a>
         <a  href="http://localhost:3000/add_ad.html">Créer annonce</a>
         <a href="#contact">Mon profil</a>
         <a href="#about">Aide</a>
         <b id="userdata" >[[userdata]]</a>
         <paper-button on-click="_deconnect" disabled="[[loading]]" id="createBtn" raised class="indigo">Déconnexion</paper-button>
      </div>

      <div class="col-md-9">
        <div class="ads">
          <template
              id="adList" is="dom-repeat"
              items="[[ads]]">
            <ad-list-item
                id="[[item.id]]"
                name="[[item.title]]"
                description="[[item.description]]"
                price="[[item.price]]">
            </ad-list-item>
          </template>
        </div>
        <div>Nombre d'annonces postées : [[currentAds]]</div>
      </div>



  `;
  }
  static get properties() {
    return {
      /**
      * Title of the homepagescreen
      */
      title: String,

      userdata: String,

      loading: {
        type: Boolean,
        value: false
      },

      currentAds: String

    }
  }

  constructor() {
    super();
    this.ads=[];
    this.username=readCookie("userConnected");
    if(!this.username)document.location.href="http://localhost:3000/";

    this._getData();

  }

  async _getData() {
    try {
      const aresponse = await fetch('http://localhost:3000/users');
      console.log('fetch');
      this.users = await aresponse.json();

      const response = await fetch('http://localhost:3000/ads');

      this.ads = await response.json();
      this.currentAds=this._getCurrentAds();
      let a;
      let i;
      for(i=0;i<this.users.length;i++){
        if(this.users[i].username==this.username)a=i;
      }
      createCookie("userFirstname",this.users[a].firstname,1);
      createCookie("Name",this.users[a].name,1);
      this.userdata="Bienvenue "+this.users[a].firstname+" "+this.users[a].name+", alias "+this.username+" !";
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  _deconnect(){
    createCookie("userConnected","",-1);
    createCookie("userFirstame","",-1);
    createCookie("Name","",-1);
    document.location.href="http://localhost:3000/";
  }

  _getCurrentAds() {
    return this.ads.length;
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

window.customElements.define('home-page', Homepagescreen);
