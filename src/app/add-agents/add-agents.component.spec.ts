import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentsComponent } from './add-agents.component';

describe('AddAgentsComponent', () => {
  let component: AddAgentsComponent;
  let fixture: ComponentFixture<AddAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
