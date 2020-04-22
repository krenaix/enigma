import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { IUser } from 'src/app/models/interfaces';
import { Store } from '@ngrx/store';
import { log_out } from 'src/app/store/feature-stores/authentication/actions';
import { loggedInUser } from 'src/app/store/feature-stores/authentication/selectors';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() page?: any;
  searchForm: FormGroup;
  searchValControl: FormControl;

  searchDropdownForm: FormGroup;
  searchDropdownControl: FormControl;
  isDashboard = true;
  user$ = this.store$.select(loggedInUser);


  constructor(private router: Router, private store$: Store<{}>) {

    this.searchValControl = new FormControl('');

    this.searchForm = new FormGroup({
      searchValControl: this.searchValControl,
    });

    this.searchDropdownControl = new FormControl('');

    this.searchDropdownForm = new FormGroup({
      searchDropdownControl: this.searchDropdownControl,
    });


  }


  ngOnInit() {


  }

  onSubmitSearch() {

  }

  onSubmitSearchDropDown() {

  }

  logOut(event$: MouseEvent) {
    this.store$.dispatch(log_out());
  }
}
