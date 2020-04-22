import { IBankDetail } from './Ibank-detail';
import { IPersonalDetails } from './Ipersonal-details.interface';

export interface ICreateProfile {
    productId: number;
    bankDetails: IBankDetail;
    personalDetails: IPersonalDetails;
}
