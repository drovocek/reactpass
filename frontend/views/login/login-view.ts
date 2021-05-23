import { uiStore } from 'Frontend/stores/app-store';
import { customElement, html, internalProperty } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import { View } from '../view';
import {nothing} from "lit-html";

@customElement('login-view')
export class LoginView extends View {
    @internalProperty()
    private error = false;

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
    }

    render() {
        return html`
         <h1>Get Pass</h1>
            <vaadin-login-form
             no-forgot-password
             @login="${this.login}"
             .error="${this.error}"
             ?disabled="${uiStore.offline}"
            >
            </vaadin-login-form>
            ${uiStore.offline
                        ? html` <b>You are offline. Login is only available while online.</b> `
                        : nothing}
       `;
    }

    async login(e: CustomEvent) {
        try {
            await uiStore.login(e.detail.username, e.detail.password);
        } catch (e) {
            this.error = true;
        }
    }
}