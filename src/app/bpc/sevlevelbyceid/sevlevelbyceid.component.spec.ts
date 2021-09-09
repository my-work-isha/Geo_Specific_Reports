import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevlevelbyceidComponent } from './sevlevelbyceid.component';

describe('SevlevelbyceidComponent', () => {
  let component: SevlevelbyceidComponent;
  let fixture: ComponentFixture<SevlevelbyceidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevlevelbyceidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevlevelbyceidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
