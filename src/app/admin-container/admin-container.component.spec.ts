import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContainerComponent } from './admin-container.component';
import { AnnouncementsDirective } from '../announcements.directive';

describe('AdminContainerComponent', () => {
  let component: AdminContainerComponent;
  let fixture: ComponentFixture<AdminContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContainerComponent, AnnouncementsDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
