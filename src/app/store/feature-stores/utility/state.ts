import { StatusEnum, OnboardingStepEnum } from 'src/app/model/enums';
import { IProduct, ITitles, IGender, IBanks, IAccountType } from 'src/app/model/interfaces';



export interface UtilityState {
    products: IProduct[];
    loadProductsStatus: StatusEnum;
    titles: ITitles[];
    genders: IGender[];
    loadPersonalDetailsDropDownStatus: StatusEnum;
    banks: IBanks[];
    accountTypes: IAccountType[];
}

export const initialUtilityState: UtilityState = {
    products: [],
    loadProductsStatus: StatusEnum.InitialLoad,
    titles: [],
    genders: [],
    loadPersonalDetailsDropDownStatus: StatusEnum.InitialLoad,
    banks: [],
    accountTypes: []
};
