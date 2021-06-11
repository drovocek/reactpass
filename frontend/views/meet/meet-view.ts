import {customElement, html} from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import "@vaadin/vaadin-notification";
import "@vaadin/vaadin-icons";
import Swiper from 'swiper';
import {View} from '../../views/view';
import {listViewStore} from "Frontend/views/list/list-view-store";

@customElement('meet-view')
export class MeetView extends View {

    private swiper: Swiper | undefined;

    //html
    render() {
        return html`
           <!-- Slider main container -->
            <div class="swiper-container">
              <!-- Additional required wrapper -->
              <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">Destroy</div>
                <div class="swiper-slide">New</div>
                <div class="swiper-slide">Passed</div>
                ...
              </div>
            </div>
         `;
    }

    firstUpdated() {
        this.swiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
        });
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
        this.autorun(() => {
            if (listViewStore.selectedContact) {
                this.classList.add("editing");
            } else {
                this.classList.remove("editing");
            }
        });
    }
}