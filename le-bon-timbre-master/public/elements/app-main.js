
import { PolymerElement, html } from '/@polymer/polymer/polymer-element.js';

import '/@polymer/polymer/lib/elements/dom-if.js';
import '/@polymer/app-route/app-route.js';
import '/@polymer/app-route/app-location.js';

import '/@granite-elements/granite-bootstrap/granite-bootstrap.js';

import './app-inside.js';
import './loginscreen.js';
import './registerscreen.js';

export class AppMain extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>

      <app-location route="{{route}}" use-hash-as-path></app-location>

      <app-route route="[[route]]" pattern="/login" active="{{logScreenActive}}"></app-route>
      <app-route route="[[route]]" pattern="/register" active="{{regScreenActive}}"></app-route>
      <app-route route="[[route]]" pattern="/home" active="{{homeActive}}"></app-route>

      <template is="dom-if" if="{{logScreenActive}}">
        <paper-loginscreen title="LeBonTimbre - Connexion"></paper-loginscreen>
      </template>

      <template is="dom-if" if="{{regScreenActive}}">
        <register-screen title="LeBonTimbre - Inscription"></register-screen>
      </template>

      <template is="dom-if" if="{{homeActive}}" restamp>
        <app-inside></app-inside>
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
      logScreenActive: {
        type: Boolean,
      },
      adId: {
        type: String,
        value:"0"
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
}


customElements.define('app-main', AppMain);
