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
        .#outImage{
          width:100px;
          height:100px;
        }
      </style>
      <div id="[[id]]" class="ad clearfix">
        <a href="#/home/ad/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <img id="outImage" src="" alt="Image de l'annonce">
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
      img: {
        type: String,
      },
    }
  }


  ready(){
    super.ready();
    var self=this;
    var image = new Image();
    image.src =this.img;

    image.onload = function(){
      var maxWidth = 400,
          maxHeight = 300,
          imageWidth = image.width,
          imageHeight = image.height;


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
}

// Associate the new class with an element name
customElements.define('ad-list-item', AdListItem);
