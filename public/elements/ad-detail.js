import { PolymerElement, html } from '/@polymer/polymer/polymer-element.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';

export class AdDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
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
      </style>

      <div id="[[ad.id]]" class="ad clearfix">
        <a href="#/home/ads-list"><img class="pull-right back" alt="Retour à la liste"></a>
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
    };
  }




  async _onIdChange() {
    try {
      const response = await fetch('http://localhost:3000/ad/'+this.id);
      this.ad = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}


customElements.define('ad-detail', AdDetail);
