import {customElement, html} from 'lit-element';
import {View} from '../../views/view';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "@vaadin/vaadin-notification";

@customElement('pass-view')
export class PassView extends View {

    //html
    render() {
        return html`
           <b>PASS</b>
         `;
    }


    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'box-border',
            'flex',
            'flex-col',
            'p-m',
            'spacing-b-s',
            'w-full',
            'h-full'
        );
    }
}
