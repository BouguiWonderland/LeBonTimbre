import { html, PolymerElement } from '/@polymer/polymer/polymer-element.js';

import '/@polymer/paper-button/paper-button.js'
import '/@polymer/paper-input/paper-input.js'
import '/@polymer/paper-progress/paper-progress.js'
import '/@polymer/paper-styles/shadow.js'
import '/@polymer/paper-styles/typography.js'
import '/@polymer/paper-styles/color.js'

export class Mapwindow extends PolymerElement {
  static get template() {
    return html`
    <style>
      #map { /* use the same name as <div id=""> */
        width: 100%; /* important! if you need full width display */
        height: 100px;
        margin: 0;
        border-radius: 5px;

      }
    </style>
    <div id="map"></div>
  `;
  }

  static get properties() {
    return {
      /**
      * Title of the homepagescreen
      */

    }
  }

  constructor() {
    super();
    this._mapping();

  }

  _mapping(){

    let macarte = L.map('map').setView([48.360942, -4.566718], 12);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
  }



}

window.onload = function(){
				// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé

			};


window.customElements.define('map-window', Mapwindow);
