import { ensureElement } from "../utils/utils";
import { Component } from "./base/Components";

export interface ICard {
    title: string;
    description?: string;
    image: string;
    category?: string;
    price: number;
    index?: string;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _category?: HTMLElement;
    protected _price: HTMLElement;

    constructor(protected blockName: string, container: HTMLElement, actions: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);

        if(actions?.onClick) {
            container.addEventListener('click', actions.onClick)
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this._title.textContent);
    }

    set category(value: string) {
        this.setText(this._category, value)
    }

    set price(value: number) {
        if(value) {
            this.setText(this._price, `${String(value)} синапсов`)
        } else {
            this.setText(this._price, 'Бесценно')
        }
    }
}

export class CardPreview extends Card {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(conteiner: HTMLElement, actions?:ICardActions) {
        super('card', conteiner, actions);
        this._description = ensureElement<HTMLElement>('.card__text', conteiner);
        this._button = ensureElement<HTMLButtonElement>('.card__button', conteiner);
        
        if(actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
            conteiner.removeEventListener('click', actions.onClick);
        }
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    addBlockButton(state: boolean) {
        this.setDisable(this._button, state);
    }

    setButtonText(value: string) {
        this._button.textContent = value
    }
}

export class CardBasket extends Component<ICard> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _index: HTMLElement;

    constructor(conteiner: HTMLElement, actions?: ICardActions) {
        super(conteiner);

        this._title = ensureElement<HTMLElement>('.card__title', conteiner);
        this._price = ensureElement<HTMLElement>('.card__price', conteiner);
        this._button = ensureElement<HTMLButtonElement>('.basket__item-delete', conteiner);
        this._index = ensureElement<HTMLElement>('.basket__item-index', conteiner);

        if(actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set index(value: string) {
        this.setText(this._index, value);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: string) {
        this.setText(this._price, value);
    }

    get title(): string {
        return this._title.textContent || '';
    } 

    get peice(): string {
        return this._price.textContent || '';
    }
}