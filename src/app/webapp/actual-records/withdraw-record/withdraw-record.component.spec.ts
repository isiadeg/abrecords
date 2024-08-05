import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawRecordComponent } from './withdraw-record.component';

describe('WithdrawRecordComponent', () => {
  let component: WithdrawRecordComponent;
  let fixture: ComponentFixture<WithdrawRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
