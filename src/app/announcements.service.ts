import { Injectable, OnInit, AfterViewInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AnnouncementsComponent } from './announcements/announcements.component';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService implements AfterViewInit{
 
  constructor() { }
  ngAfterViewInit(){
    
  }
}
