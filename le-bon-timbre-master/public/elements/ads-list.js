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

      #sortBar {
          width: 600px;
          height: 50px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;

          background: orange;
          @apply --shadow-elevation-2dp;
      }

      #sortBarContent>* {
          margin-top: 10px;
          margin-bottom: 10px;
          margin-left: 10px;
      }
      #search {
        float:left;
        height:28px;
      }



      #sorting {
        float:right;

      }

      #labsort {
        float:left;
      }

      #sort {
        float:right;
        height:28px;
        margin-left: 5px;
      }


      .ads{
        width:400px;
        margin-left: auto;
        margin-right: auto;
      }
    </style>

    <div id="sortBar">
      <div id="sortBarContent">
        <input
            type="text"
            class="form-control"
            id="search"
            placeholder="Recherche..."
            on-input="_inputChange">
        <div id="sorting">
          <label id="labsort" for="sort" >Trier par</label>
          <select
              id="sort"
              class="form-control"
              on-change='_sortingChanged'>
              <template is="dom-repeat" items="[[criteria]]">
                <option
                  value="[[item.name]]">[[item.label]]</option>
            </template>
          </select>
        </div>
      </div>
    </div>

      <div class="col-md-9">
        <div class="ads">
          <template
              id="adList" is="dom-repeat"
              items="[[ads]]" filter="_adFilter" sort="_adSorter" >
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

      ads: {
        type: Array,
      },

      filterText: {
        type: String,
      },

      loading: {
        type: Boolean,
        value: false
      },

      criterium: {
        type: String,
      },

      descendingSort: {
        type: Boolean,
      },

      currentAds: {
        type: String,
        computed: '_getCurrentAds(ads,filterText)',
      }
    }
  }

  constructor() {
    super();
    this.ads=[];
    this.criteria = [
      { name: "name", label: "Ordre alphabétique"},
      { name: "priceUp", label: "Ordre de prix croissant" },
      { name: "priceDown", label: "Ordre de prix décroissant" },
      { name: "yearUp", label: "Timbre les plus anciens" },
      { name: "yearDown", label: "Timbre les plus récents" }
    ];

    this.criterium = "title";
    this.descendingSort=false;

    this.username=readCookie("userConnected");
    if(!this.username)document.location.href="http://localhost:3000/";

    this._getData();

  }

  connectedCallback() {
    super.connectedCallback();

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
    return this.ads.filter((item) => item.title.match(new RegExp(this.filterText, 'i'))).length;
  }

  _adFilter(item) {
      return item.title.match(new RegExp(this.filterText, 'i'));
  }

  _inputChange() {
    this.filterText = this.$.search.value;
    this.$.adList.render();
  }

  _sortingChanged() {
    let value = this.$.sort.selectedOptions[0].value;
    switch(value){
      case "priceUp":this.criterium="price";
      console.log("prix croissant");
      this.descendingSort=false;
      break;
      case "priceDown":this.criterium="price";
      console.log("prix décroissant");
      this.descendingSort=true;
      break;
      case "yearUp":this.criterium="year";
      console.log("ancien");
      this.descendingSort=false;
      break;
      case "yearDown":this.criterium="year";
      this.descendingSort=true;
      console.log("récent");
      break;
      case "name": this.criterium="title";
      this.descendingSort=false;
      break;
    }
    this.$.adList.render();
  }

  _adSorter(a, b) {
    var invert = 1;
    if (this.descendingSort) invert = -1;
    if ( a[this.criterium] === b[this.criterium] ) return 0;
    if ( a[this.criterium] < b[this.criterium] ) return -1*invert;
    if ( a[this.criterium] > b[this.criterium] ) return 1*invert;
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
