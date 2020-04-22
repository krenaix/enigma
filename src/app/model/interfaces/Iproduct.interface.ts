import { IProductFeature } from './Iproduct-feature.interface';

export interface IProduct {
    id: number;
    price: number;
    descriptions: string;
    productFeatures: IProductFeature[];

}
