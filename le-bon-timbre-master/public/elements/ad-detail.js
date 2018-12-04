import { PolymerElement, html } from '/@polymer/polymer/polymer-element.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class AdDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        leaflet-map{
          height:300px;
          width:100%;
        }
        .ad {
          width:800px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 100px;
          padding: 20px;
          border: solid 1px black;
          min-height: 200px;
        }
        .back {
          width: 50px;
          height: 50px;
        }

        ul.specs {
          clear: both;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        ul.specs > li{
          display: inline-block;
          width: 200px;
          vertical-align: top;
        }

        ul.specs > li > span{
          font-weight: bold;
          font-size: 1.2em;
        }

        ul.specs dt {
          font-weight: bold;
        }

        h1 {
          border-bottom: 1px solid gray;
        }
        #suppress{
          float:right;
        }

        #suppress[disabled]{
          background-color: white;
          color:white;
        }

      </style>

      <div id="[[ad.id]]" class="ad clearfix">
      <div id="top">
        <a id="back" href="#/home/ads-list">
          <img class="pull-right back" alt="Retour à la liste">
        </a>
        <paper-button on-click="_suppress" disabled="[[isCreatorLogged]]" id="suppress" raised class="indigo">Supprimer mon annonce</paper-button>
      </div>
        <h1 class="name">[[ad.title]]</h1>
        <p class="description">Description de la pièce en vente : \n[[ad.description]]</p>

        <ul class="specs">
          <li>
            <dl>
              <dt>Prix</dt>
              <dd>[[ad.price]]€</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Auteur de l'annonce</dt>
              <dd>[[ad.user]]</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Pays</dt>
              <dd>[[ad.country]]</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Année</dt>
              <dd>[[ad.year]]</dd>
            </dl>
          </li>
        </ul>
        <div id="map">
          <leaflet-map longitude=[[ad.longitude]] latitude=[[ad.latitude]] zoom="14">
            <leaflet-marker longitude=[[ad.longitude]] latitude=[[ad.latitude]]>
              marker
              </leaflet-marker>
              <leaflet-circle longitude=[[ad.longitude]] latitude=[[ad.latitude]] radius="300">
              circle
              </leaflet-circle>
          </leaflet-map>
        </div>
      </div>
    `;
  }


  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      ad: {
        type: Object,
      },
      isCreatorLogged:{
        type:Boolean,
      }
    };
  }

  constructor(){
    super();
  }


  async _onIdChange() {
    try {
      const response = await fetch('http://localhost:3000/ad/'+this.id);
      this.ad = await response.json();
      this.username=readCookie("userConnected");
      if(this.ad.user==this.username)this.isCreatorLogged=false;
      else this.isCreatorLogged=true;
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  _suppress(){
    fetch('http://localhost:3000/ad/rm/'+this.id);
    document.location.href="#/home/ads-list";
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


customElements.define('ad-detail', AdDetail);
