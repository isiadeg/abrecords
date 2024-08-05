import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultagentComponent } from './defaultagent.component';

describe('DefaultagentComponent', () => {
  let component: DefaultagentComponent;
  let fixture: ComponentFixture<DefaultagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultagentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
