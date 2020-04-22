import { StatusEnum, OnboardingStepEnum } from 'src/app/model/enums';
import { IProduct, IPersonalDetails, ICreateProfile } from 'src/app/model/interfaces';



export interface OnboardingState {
    selectedProductId: number;
    onboardingStatus: StatusEnum;
    onboardingStep: OnboardingStepEnum;
    createProfileDto: ICreateProfile;
}

export const initialOnboardingState: OnboardingState = {
    selectedProductId: 0,
    onboardingStatus: StatusEnum.InitialLoad,
    onboardingStep: OnboardingStepEnum.ProductSelection,
    createProfileDto: null
};
