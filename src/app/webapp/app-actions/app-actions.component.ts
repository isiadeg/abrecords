import { Component } from '@angular/core';
import { ActionCardDirective } from '../../action-card.directive';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-actions',
  standalone: true,
  imports: [ActionCardDirective, MatIconModule, RouterLink],
  host:{
    '[className]': "'host-wrapper'"
  }
  ,
  templateUrl: './app-actions.component.html',
  styleUrl: './app-actions.component.scss'
})
export class AppActionsComponent {

}
