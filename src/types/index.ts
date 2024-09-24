//Интерфейсы модели данных

interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;  
}

interface IOrder extends IOrderForm{
    total: number;
    items: string[];
}

interface IOrderResult {
    id: string;
    total: number;  
}

//Интерфейс API-клиента

interface IAppState {
    catalog: IProduct[];
    preview: string | null;
    order: IOrder | null;
}

type FormErrors = Partial<Record<keyof IOrder, string>>

interface IStoreApi {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderItem: (order: IOrderForm) => Promise<IOrderResult>; 
}


//Интерфейсы отображений

interface IForm {
    valid: boolean;
    errors: string[];
}

interface IBasketView {
    items: HTMLElement[];
    total: number; 
}

interface ISuccess {
    total: number;
}

interface ICard {
    title: string;
    description?: string;
    image: string;
    category?: string;
    price: number;
    index?: string;
}

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

interface IModal {
    content: HTMLElement;
}




