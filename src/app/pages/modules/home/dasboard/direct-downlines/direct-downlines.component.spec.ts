import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDownlinesComponent } from './direct-downlines.component';

describe('DirectDownlinesComponent', () => {
  let component: DirectDownlinesComponent;
  let fixture: ComponentFixture<DirectDownlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectDownlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDownlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
