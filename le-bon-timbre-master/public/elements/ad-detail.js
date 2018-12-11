import { PolymerElement, html } from '/@polymer/polymer/polymer-element.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class AdDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        leaflet-map{
          height:400px;
          width:100%;
          border: solid 1px #4CAF50;
        }
        .ad {
          width:70%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 3%;
          padding: 20px;
          border: solid 1px black;
          min-height: 50%;
          background: #FFFFFF;
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
          width: 49%;
          vertical-align: top;
        }

        ul.specs > li > span{
          font-weight: bold;
          font-size: 1.2em;
        }

        ul.specs dt {
          font-weight: bold;
          text-decoration: underline;
          font-style: italic;
          font-size: 120%;
        }

        h1 {
          border-bottom: 3px solid #4CAF50;
          border-top: 3px solid #4CAF50;
        }
        .name {
          font-family: OldPressItalic;
          font-size:350%;
          margin-top: 20px;
        }
        #suppress{
          float:right;
        }

        #suppress[disabled]{
          background-color: white;
          color:white;
        }

        #outImage{
          width:100%;
          height:100%;
        }

      </style>

      <div id="[[ad._id]]" class="ad clearfix">
      <div id="top">
        <a id="back" href="#/home/ads-list">
          <img class="pull-right back" src="pictures/backIcon.png" alt="Retour à la liste image">
          Retour à la liste
        </a>
        <paper-button on-click="_suppress" disabled="[[isCreatorLogged]]" id="suppress" raised class="indigo">Supprimer mon annonce</paper-button>
      </div>
      <h1 class="name">[[ad.title]]</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
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
        </div>
        <div class="col-md-4">
          <img id="outImage" src=[[ad.img]] alt="Image de l'annonce">
        </div>
        </div>
        </div>
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
      _id: {
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
      const response = await fetch('http://localhost:3000/ad/'+this._id);
      this.ad = await response.json();
      this.username=readCookie("userConnected");
      if(this.ad.user==this.username)this.isCreatorLogged=false;
      else this.isCreatorLogged=true;

      var self=this;
      var image = new Image();
      image.src =this.ad.img;

      image.onload = function(){
        var maxWidth = self.$.outImage.clientWidth,
            maxHeight =self.$.ad.clientHeight/2,
            imageWidth = image.width,
            imageHeight = image.height;

        console.log(maxWidth);
        console.log(maxHeight);
        console.log(imageWidth);
        console.log(imageHeight);


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

        var type=image.src.split("/")[1].split(";")[0];
        self.$.outImage.src =canvas.toDataURL(type);
      }
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  _suppress(){
    fetch('http://localhost:3000/ad/rm/'+this._id);
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
