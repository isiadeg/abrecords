import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalHomeComponent } from './withdrawal-home.component';

describe('WithdrawalHomeComponent', () => {
  let component: WithdrawalHomeComponent;
  let fixture: ComponentFixture<WithdrawalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
