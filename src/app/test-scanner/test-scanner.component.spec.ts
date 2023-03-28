import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScannerComponent } from './test-scanner.component';

describe('TestScannerComponent', () => {
  let component: TestScannerComponent;
  let fixture: ComponentFixture<TestScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
