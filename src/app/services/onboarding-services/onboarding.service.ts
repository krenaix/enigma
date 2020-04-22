import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import { ICreateProfile, IUser } from 'src/app/model/interfaces';


@Injectable({
    providedIn: 'root'
})
export class OnboardingService {

    constructor(private httpClient: HttpClient) {
    }

    checkMemberExists(memberIdNumber: number) {
        return this.httpClient.get<boolean>(`${Routes.CHECK_MEMBER_EXISTS}`, {
            params: {
                memberIdNumber: memberIdNumber.toString()
            }
        });
    }

    createUserProfile(createProfile: ICreateProfile, userId: number, referrerUserId: number) {
        // return this.httpClient.put<IUser>(`${Routes.CREATE_USER_PROFILE}`, null,{
        //     params: {
        //         userId: userId.toString()
        //     }
        // });

        return this.httpClient.put<IUser>(`${Routes.CREATE_USER_PROFILE}`, createProfile, {
            params: {
                userId: userId.toString(),
                referrerUserId: referrerUserId.toString()
            }
        });
    }
}
