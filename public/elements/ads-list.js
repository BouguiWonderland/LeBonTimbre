import { html, PolymerElement } from '/@polymer/polymer/polymer-element.js';

import '/@polymer/paper-button/paper-button.js'
import '/@polymer/paper-input/paper-input.js'
import '/@polymer/paper-progress/paper-progress.js'
import '/@polymer/paper-styles/shadow.js'
import '/@polymer/paper-styles/typography.js'
import '/@polymer/paper-styles/color.js'

import {AdListItem} from './ad-list-item.js';


class AdsList extends PolymerElement {
  static get template() {
    return html`
    <style>

      .ads{
        width:400px;
        margin-left: auto;
        margin-right: auto;
      }
    </style>



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
      const response = await fetch('http://localhost:3000/ads');

      this.ads = await response.json();
      this.currentAds=this._getCurrentAds();
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

window.customElements.define('ads-list', AdsList);
