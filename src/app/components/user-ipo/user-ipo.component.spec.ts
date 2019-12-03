import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIpoComponent } from './user-ipo.component';

describe('UserIpoComponent', () => {
  let component: UserIpoComponent;
  let fixture: ComponentFixture<UserIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
