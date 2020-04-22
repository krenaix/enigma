import { Component, OnInit, OnDestroy, forwardRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/services/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { tap, switchMap, map, startWith, catchError, switchMapTo, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { pipe, of, Subscription } from 'rxjs';
// import { UserService, AgentService } from 'src/app/services';
import { nextTick } from 'q';
// import { RoleEnum } from 'src/app/models/enums/role.enum';
// import { IUser } from 'src/app/models/interfaces';
import { StatusEnum } from 'src/app/model/enums';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/model/interfaces';
import { setSelectedProductId } from 'src/app/store/feature-stores/onboarding/actions';
import { getProducts } from 'src/app/store/feature-stores/utility/selectors';

@Component({
    selector: 'app-product-selection',
    templateUrl: './product-selection.component.html',
    styleUrls: ['./product-selection.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductSelectionComponent),
            multi: true
        }
    ]
})
export class ProductSelectionComponent implements OnInit, OnDestroy {

    products$ = this.store$.select(getProducts);

    statusEnum = StatusEnum;
    subscriptions = new Subscription();

    private onTouch: () => void;
    private onModelChange: (productId: number) => void;

    fcProductId = new FormControl('');
    constructor(private router: Router, private store$: Store<{}>, private toastsService: ToastrService) {
    }



    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


    setProduct(productId) {
        this.fcProductId.setValue(productId);
        this.store$.dispatch(setSelectedProductId({productId}));
        this.onModelChange(this.fcProductId.value);
        this.onTouch();
    }

    writeValue(obj: any): void {
        // this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {

    }

}
