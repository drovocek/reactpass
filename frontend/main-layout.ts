import {customElement, html} from 'lit-element';
import {Layout} from './views/view';
import '@vaadin/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';

import {views} from './routes';
import {uiStore} from "Frontend/stores/app-store";

@customElement('main-layout')
export class MainLayout extends Layout {
    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'h-full', 'w-full');
    }

    render() {
        return html`
           <vaadin-app-layout class="h-full w-full">
             <header slot="navbar" class="w-full flex items-center px-m">
                 <vaadin-drawer-toggle></vaadin-drawer-toggle>
                 <h1 class="text-l m-m">Vaadin CRM</h1>
                 <a href="/logout" class="ms-auto" style=${uiStore.offline ? "display: none;" : ""}>Log out</a>
            </header>
        
             <div slot="drawer">
               <div class="flex flex-col h-full m-l spacing-b-s">
                 ${views.map((view) => html` 
                    <a href="${view.path}"> ${view.title} </a> `)}
               </div>
             </div>
             <div class="h-full">
               <slot><!-- The router puts views here --></slot>
             </div>
           </vaadin-app-layout>
         `;
    }
}