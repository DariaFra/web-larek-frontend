//Интерфейсы модели данных

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;  
}

export interface IOrder extends IOrderForm{
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;  
}

//Интерфейс API-клиента

export interface IAppState {
    catalog: IProduct[];
    preview: string | null;
    order: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>
