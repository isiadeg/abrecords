import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatIconModule, MatButtonModule, BreadcrumbComponent],
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.scss', '../siden.scss']
})
export class WebappComponent {
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
