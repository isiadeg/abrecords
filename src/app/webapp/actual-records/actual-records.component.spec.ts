import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualRecordsComponent } from './actual-records.component';

describe('ActualRecordsComponent', () => {
  let component: ActualRecordsComponent;
  let fixture: ComponentFixture<ActualRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
