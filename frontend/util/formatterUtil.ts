import {GridColumnElement, GridItemModel} from "@vaadin/vaadin-grid";
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";
import {AbstractModel} from "Frontend/../target/flow-frontend/form/Models";
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

const _dateTimeOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

function boolToIconRender(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) {
    if (!root.firstElementChild && model !== undefined) {
        root.innerHTML = (<UserModel>model.item).enabled ?
            '<iron-icon icon="vaadin:check-square-o"</iron-icon>' :
            '<iron-icon icon="vaadin:square-shadow"</iron-icon>';
    }
}

function dateTimeRenderer<T, U extends AbstractModel<T>>(root: HTMLElement, model: GridItemModel | undefined, field: String, options?: DateTimeFormatOptions): void {
    if (model !== undefined && !root.firstElementChild) {
        // @ts-ignore
        const param = (<T>model.item)[field];
        if (param !== null) {
            const passedDataTime = new Date(param.toString());
            root.innerHTML = passedDataTime.toLocaleDateString("ru", options);
        }
    }
}


export {dateTimeRenderer};
export {_dateTimeOptions};