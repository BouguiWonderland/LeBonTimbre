
import { PolymerElement, html } from '/@polymer/polymer/polymer-element.js';

import '/@polymer/polymer/lib/elements/dom-if.js';
import '/@polymer/app-route/app-route.js';
import '/@polymer/app-route/app-location.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';

import './create-ad-form.js';
import './ads-list.js';
import './ad-detail.js';


export class AppInside extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap">
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
      </style>

      <app-location route="{{route}}" use-hash-as-path></app-location>

      <div class="topnav">
         <a id="accueilBtn"  href="#/home/ads-list">Accueil</a>
         <a id="createBtn" href="#/home/create-ad">Créer annonce</a>
         <a id="profileBtn"href="#/home/profile">Mon profil</a>
         <a id="aboutBtn" href="#/home/about">Aide</a>
         <b id="userdata" >[[userdata]]</a>
         <paper-button on-click="_deconnect" disabled="[[loading]]" id="createAdBtn" raised class="indigo">Déconnexion</paper-button>
      </div>

      <app-route route="[[route]]" pattern="/home/ads-list" active="{{homeActive}}"></app-route>
      <app-route route="[[route]]" pattern="/home/create-ad" active="{{createAdActive}}"></app-route>
      <app-route route="[[route]]" pattern="/home/ad/:id" data="{{adId}}" active="{{adActive}}"></app-route>


      <template is="dom-if" if="{{homeActive}}">
        <ads-list title="LeBonTimbre - Accueil" isVisible="{{homeActive}}"></ads-list>
      </template>

      <template is="dom-if" if="{{createAdActive}}">
        <create-ad-form title="Créer annonce"></create-ad-form>
      </template>

      <template is="dom-if" if="{{adActive}}">
        <ad-detail id="[[adId.id]]"></ad-detail>
      </template>
    `;
  }


  static get properties() {
    return {
      adListActive: {
        type: Boolean,
      },
      adIdActive: {
        type: Boolean,
      },
      adId: {
        tpe: String,
      },
      route: {
        type: Object,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.route.path) {
      this.route = { ... this.route, path: '/login' }
    }
  }

  constructor() {
    super();
    this.username=readCookie("userConnected");
    if(!this.username)document.location.href="http://localhost:3000/";

    this._getData();

  }

  async _getData() {
    try {
      const aresponse = await fetch('http://localhost:3000/user/'+this.username);
      console.log('fetch');
      this.user = await aresponse.json();


      createCookie("userFirstname",this.user.firstname,1);
      createCookie("Name",this.user.name,1);
      this.userdata="Bienvenue "+this.user.firstname+" "+this.user.name+", alias "+this.username+" !";
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


customElements.define('app-inside', AppInside);
