import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTimeComponent } from './submit-time.component';

describe('SubmitTimeComponent', () => {
  let component: SubmitTimeComponent;
  let fixture: ComponentFixture<SubmitTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
