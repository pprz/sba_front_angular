import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSectorsComponent } from './compare-sectors.component';

describe('CompareSectorsComponent', () => {
  let component: CompareSectorsComponent;
  let fixture: ComponentFixture<CompareSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
