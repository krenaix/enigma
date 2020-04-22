import { Component, OnInit, HostListener, AfterContentInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/feature-stores/authentication/selectors';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { loadProducts, loadPersonalDetailsDropDowns } from 'src/app/store/feature-stores/utility/actions';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})


export class LeftNavComponent implements OnInit, AfterViewInit, OnDestroy {

  lastScrollPosition = 0;

  isScrolling = false;
  subscriptions: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute, private store$: Store<{}>) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(fromEvent(document, 'scroll').pipe(
      tap(ev => {
        // console.log(ev);
        const g = ev as any;
        const st = g.target.scrollingElement.scrollTop;
        if (st > this.lastScrollPosition) {
          // console.log('scrolling down %s', st);
          this.isScrolling = true;
        } else {
          if (g.target.scrollingElement.scrollTop === 0) {
            this.isScrolling = false;
          }
        }
        this.lastScrollPosition = st;
      })
    ).subscribe());
  }
  ngAfterViewInit() {
  }

  submit() {
  }
}
