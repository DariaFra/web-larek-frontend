import { IOrderForm } from "../types";
import { Form } from "./common/Form";
import { IEvents } from "./base/events";


interface IOrderActions {
    onClick: (event: MouseEvent) => void;
}

export class Order extends Form<IOrderForm> {
    protected _cardPayment: HTMLButtonElement;
    protected _cashPayment: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: IOrderActions) {
        super(container, events);

        this._cashPayment = this.container.elements.namedItem('cash') as HTMLButtonElement;
        this._cardPayment = this.container.elements.namedItem('card') as HTMLButtonElement;

        if(actions?.onClick) {
            this._cashPayment.addEventListener('click', (evt)=> {
                actions.onClick(evt);
                events.emit('order.payment: change', {
                    field: 'payment',
                    value: 'cash'
                });
            });
            this._cardPayment.addEventListener('click', (evt) => {
                actions.onClick(evt);
                events.emit('order.payment: change', {
                    field: 'payment',
                    value: 'card'
                });
            });
        }
    }
    
    set payment(value: string) {
        if(value === 'cash') {
            this._cashPayment.classList.add('button_alt-active');
            this._cardPayment.classList.remove('button_alt-active');
        }
        if(value === 'card') {
            this._cardPayment.classList.add('button_alt-active');
            this._cashPayment.classList.remove('button_alt-active');
        }
        if(value === '') {
            this._cardPayment.classList.remove('button_alt-active');
            this._cashPayment.classList.remove('button_alt-active');
        }
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    } 
}

export class ClientContacts extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events)   
    }
     set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}
