import { Component, ElementRef, Inject, TemplateRef } from '@angular/core';
import { AnnouncementsDirective } from '../announcements.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddAgentsComponent } from '../add-agents/add-agents.component';
import { DefaultagentComponent } from '../defaultagent/defaultagent.component';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [AnnouncementsDirective, MatIconModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
hero = "<div> hidjdd </div>" as unknown as ElementRef<any> ;
locationDialogRef!: MatDialogRef<AddLocationComponent>
agentDialogRef!: MatDialogRef<AddAgentsComponent>
defaultAgentsDialogRef !: MatDialogRef<DefaultagentComponent>
  
constructor(@Inject(MatDialog) private dialog: MatDialog){

}

openlocation(){
this.locationDialogRef =  this.dialog.open(AddLocationComponent, {
  maxWidth: '410px',
  maxHeight: '80vh',
  
});

}

openAgents(){
  this.agentDialogRef = this.dialog.open(AddAgentsComponent, {
    maxWidth: '410px',
  maxHeight: '80vh',
  })
}
openDefaultAgents(){
  this.defaultAgentsDialogRef = this.dialog.open(DefaultagentComponent, {
    maxWidth: '410px',
  maxHeight: '80vh',
  })

 
}

}
