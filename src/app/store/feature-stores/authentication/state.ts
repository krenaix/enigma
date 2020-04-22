import { IUser } from 'src/app/model/interfaces';
import { StatusEnum } from 'src/app/model/enums';



export interface UserState {
    user: IUser;
    loginStatus: StatusEnum;
    signUpStatus: StatusEnum;
    onboardedUser: IUser;
}

export const initialUserState: UserState = {
    user: null,
    loginStatus: StatusEnum.InitialLoad,
    signUpStatus: StatusEnum.InitialLoad,
    onboardedUser: null
};
