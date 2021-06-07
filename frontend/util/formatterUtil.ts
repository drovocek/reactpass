import {GridColumnElement, GridItemModel} from "@vaadin/vaadin-grid";
import UserModel from "Frontend/generated/ru/volkov/getpass/data/entity/UserModel";

const dateTimeOptions = {
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

function dateFormatRender(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) {
    if (!root.firstElementChild && model !== undefined) {
        const lastAct = new Date((<UserModel>model.item).lastActivity.toString());
        root.innerHTML = lastAct.toLocaleDateString("ru");
    }
}

function dateTimeFormatRender(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) {
    if (!root.firstElementChild && model !== undefined) {
        const lastAct = new Date((<UserModel>model.item).lastActivity.toString());
        root.innerHTML = lastAct.toLocaleDateString("ru", dateTimeOptions);
    }
}

const boolRenderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => boolToIconRender(root, column, model);
const dateRenderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => dateFormatRender(root, column, model);
const dateTimeRenderer = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => dateTimeFormatRender(root, column, model);

export {boolRenderer};
export {dateRenderer};
export {dateTimeRenderer};