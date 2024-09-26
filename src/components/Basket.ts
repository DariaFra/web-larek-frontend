import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Components";
import { EventEmitter } from "./base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number; 
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        if(this._button) {
            this._button.addEventListener('click', (event) => {
                events.emit('order: open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if(items.length > 0) {
            this._list.replaceChildren(...items);
            this.setDisable(this._button, false);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.setDisable(this._button, true);
        }
    }

    set total(total: number) {
        this.setText(this._total, `${total} синапсов`)
    }
}