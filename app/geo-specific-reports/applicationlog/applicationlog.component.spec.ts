import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationlogComponent } from './applicationlog.component';

describe('ApplicationlogComponent', () => {
  let component: ApplicationlogComponent;
  let fixture: ComponentFixture<ApplicationlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
