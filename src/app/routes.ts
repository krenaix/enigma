import { environment } from 'src/environments/environment';
export const Routes = {
    AUTHENTICATE: `${environment.serviceUrl}/api/auth/authenticate`,
    REGISTER: `${environment.serviceUrl}/api/auth/register`,
    PRODUCTS: `${environment.serviceUrl}/api/utility/products`,
    TITLES: `${environment.serviceUrl}/api/utility/get-titles`,
    GENDERS: `${environment.serviceUrl}/api/utility/genders`,
    CHECK_MEMBER_EXISTS: `${environment.serviceUrl}/api/onboarding/check-member-exists`,
    BANKS: `${environment.serviceUrl}/api/utility/get-banks`,
    ACCOUNT_TYPES: `${environment.serviceUrl}/api/utility/get-account-types`,
    CREATE_USER_PROFILE: `${environment.serviceUrl}/api/onboarding/member-profile`,
    FETCH_DOWNLINES_TOTALS: `${environment.serviceUrl}/api/home/get-dashboard-totals/`
};
