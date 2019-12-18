import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIPOComponent } from './manage-ipo.component';

describe('ManageIPOComponent', () => {
  let component: ManageIPOComponent;
  let fixture: ComponentFixture<ManageIPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
