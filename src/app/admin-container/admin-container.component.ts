import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule, MatExpansionPanel, MatAccordion} from '@angular/material/expansion'
import { AnnouncementsComponent } from "../announcements/announcements.component";


@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, BreadcrumbComponent, RouterModule, MatExpansionModule, AnnouncementsComponent],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss'
})
export class AdminContainerComponent {
  isMobile: boolean = false;
  navlist: string[] = Array.from({length:50}, (_, i)=>{
return `Link ${i+1}`;
  });
constructor(breakpointObserver: BreakpointObserver){
  const layoutChanges = breakpointObserver.observe([
   Breakpoints.XSmall,
   Breakpoints.Small
  ]);
  
  layoutChanges.subscribe(result => {
    if(result.matches){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

});
 
}
}
