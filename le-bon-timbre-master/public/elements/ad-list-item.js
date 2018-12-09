// Import PolymerElement class and html helper definition
import {html,PolymerElement} from '/@polymer/polymer/polymer-element.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class AdListItem extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .ad {
          margin: 10px;
          padding: 10px;
          border: solid 2px #4CAF50;
          min-height: 5%;
          background: #FFFFFF;
          @apply --shadow-elevation-12dp;
        }
        .el-price {
          clear:both;
        }
        .el-name {
          font-family:OldPressItalic;
        }
      </style>
      <div id="[[id]]" class="ad clearfix">
        <a href="#/home/ad/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-price">Prix: [[price]]€</p>
      </div>
    `;
  }

  static get properties() {
    return {
      id: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  }
}

// Associate the new class with an element name
customElements.define('ad-list-item', AdListItem);
