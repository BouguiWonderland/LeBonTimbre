import { PolymerElement, html } from 'polymer/polymer/polymer-element.js';

import 'granite-elements/granite-bootstrap/granite-bootstrap';

export class AdDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .ad {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          min-height: 150px;
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
        <a href="#/ads"><img class="pull-right back" src="/img/back.png"></a>
        <h1 class="name">[[ad.title]]</h1>
        <img class="pull-right img" src="/data/[[ad.img]]">
        <p class="description">[[ad.description]]</p>

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
    const url = `/data/ads/details/${this.id}.json`;
    try {
      const response = await fetch(url);
      this.ad = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}


customElements.define('ad-detail', AdDetail);
