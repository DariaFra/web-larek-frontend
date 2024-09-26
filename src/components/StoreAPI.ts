import { Api, ApiListResponse } from "./base/api";
import { IProduct, IOrderResult, IOrderForm } from "../types";

export interface IStoreApi {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderItem: (order: IOrderForm) => Promise<IOrderResult>; 
}

export class StoreApi extends Api implements IStoreApi {
    readonly cdn: string;   

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            }));
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then (
            (data: ApiListResponse<IProduct>) => 
                data.items.map((item) => ({
                    ...item,
                    image: this.cdn + item.image
                })));
    }

    orderItem(order: IOrderForm): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}