/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * LIT App toolbar and drawer menu.
 */

// tslint:disable:no-new-decorators
import '@material/mwc-icon';
import './global_settings';
import '../elements/spinner';

import {MobxLitElement} from '@adobe/lit-mobx';
import {observable} from 'mobx';
import {customElement, html} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';

import {app} from '../core/lit_app';
import {StatusService} from '../services/services';

import {styles} from './app_statusbar.css';
import {styles as sharedStyles} from '../lib/shared_styles.css';

/**
 * The bottom status bar of the LIT app.
 */
@customElement('lit-app-statusbar')
export class StatusbarComponent extends MobxLitElement {
  static get styles() {
    return [sharedStyles, styles];
  }

  private readonly statusService = app.getService(StatusService);
  @observable private renderFullMessages = false;

  render() {
    const progressClass = classMap({
      'progress-line': this.statusService.isLoading,
      'no-progress-line': !this.statusService.isLoading
    });

    // clang-format off
    return html`
      <div id="at-bottom">
        <div class="toolbar">
          <div class="text-line">
            <div class="status-info">
              ${this.statusService.hasMessage ? this.renderMessages() : null}
            </div>
            <div class="signature">
              <div>Made with <img src="static/favicon.png" class="emoji"> by the LIT team</div>
              <div title="Send feedback" id="feedback">
                <a href="https://github.com/PAIR-code/lit/issues/new" target="_blank">
                  <mwc-icon class="icon-button">
                    feedback
                  </mwc-icon>
                </a>
              </div>
            </div>
          </div>
          <div class=${progressClass}></div>
        </div>
      </div>
      ${this.renderFullMessages ? this.renderPopup() : null}
    `;
    // clang-format on
  }

  renderMessages() {
    return html`
      ${this.statusService.hasError ? this.renderError() : this.renderLoading()}
    `;
  }

  renderPopup() {
    const close = () => {
      this.renderFullMessages = false;
    };
    // clang-format off
    return html`
      <div class='modal-container'>
        <div class="model-overlay" @click=${() => {close();}}></div>
        <div class='modal'>
          <div class='error-messages-holder'>
            <div class='error-message-header'>Error Details</div>
            ${this.statusService.errorFullMessages.map(
                message => html`<pre class="full-message">${message}</pre>`)}
          </div>
          <div class='close-button-holder'>
            <button class='hairline-button' @click=${() => {close();}}>
              Close
            </button>
          </div>
        </div>
      </div>`;
    // clang-format on
  }

  renderError() {
    const onGetErrorDetailsClick = () => {
      this.renderFullMessages = true;
    };
    const onClearErrorsClick = () => {
      this.statusService.clearErrors();
    };
    return html`
     <div class="error" @click=${onGetErrorDetailsClick}>
        ${this.statusService.errorMessage}
      </div>
      <mwc-icon class="icon-button error" @click=${
        onGetErrorDetailsClick}>
        info
      </mwc-icon>
      <mwc-icon class="icon-button error" @click=${
        onClearErrorsClick}>
        clear
      </mwc-icon>
    `;
  }

  renderLoading() {
    return html`
      <div>${this.statusService.loadingMessage}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-app-statusbar': StatusbarComponent;
  }
}
