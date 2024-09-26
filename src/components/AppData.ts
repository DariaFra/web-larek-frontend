import { IAppState, IOrder, IProduct, FormErrors, IOrderForm } from "../types";
import { Model } from "./base/Model";

export const orderDefault: IOrder = {
    address: '',
    email: '',
    phone: '',
    payment: '',
    items: [],
    total: 0
}

export class AppState extends Model<IAppState> {
    catalog: IProduct[];
    order: IOrder = Object.assign({}, orderDefault)
    preview: string | null;
    formErrors: FormErrors = {};

    setCatalog(items: IProduct[]) {
        this.catalog = items;
        this.emitChanges('item: changed', {catlog: this.catalog});
    }

    setPreview(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview: changed', item);
    }

    setOrderField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;
        
        if(this.validateOrder()) {
            this.events.emit('order: ready', this.order);
        }
    }

    getOrderItems() {
        return this.catalog.filter((item) => this.order.items.includes(item.id));
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id ===c).price, 0)
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};

        if(!this.order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }
        if(!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if(!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if(!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }

        this.formErrors = errors;

        this.events.emit('formError: change', this.formErrors);

        return Object.keys(errors).length === 0;
    }

    addItemsToBasket(item: IProduct) {
        if(item.price === null){
            alert('Извените, этот товар не продается 😢')
        } else {
        this.order.items.push(item.id);
        this.emitChanges('basket: change', item)}
    }

    deleteItemsFromBasket(item: IProduct) {
        this.order.items = this.order.items.filter((OrderedItem) => OrderedItem !== item.id);
        this.emitChanges('basket: change', item);
    }

    clearBasket() {
       this.order = Object.assign({}, orderDefault, { items: []});
        this.emitChanges('basket: change') 
    }

    isItemAdded(item: IProduct) {
        if(this.order.items.includes(item.id)) {
            return true;
        } 
        return false;
    }

    isItemHasPrice(item: IProduct) {
        if(item.price) {
            return true;
        }
        return false;
    }
}