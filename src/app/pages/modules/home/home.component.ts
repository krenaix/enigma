import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private store$: Store<{}>) {

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.onActivate(null);
  }
  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  submit() {
  }
}
