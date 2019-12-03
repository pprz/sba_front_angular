import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExchangesComponent } from './manage-exchanges.component';

describe('ManageExchangesComponent', () => {
  let component: ManageExchangesComponent;
  let fixture: ComponentFixture<ManageExchangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExchangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
