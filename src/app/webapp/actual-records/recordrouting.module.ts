import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawRecordComponent } from './withdraw-record/withdraw-record.component';
import {Routes, RouterModule, Router} from '@angular/router';
import { ActualRecordsComponent } from './actual-records.component';
import { WithdrawalHomeComponent } from '../../withdrawal-home/withdrawal-home.component';

const routes: Routes = [
  {
    path: '', component: ActualRecordsComponent, children:[
      {
        path: "withdrawal/:type", component: WithdrawRecordComponent
      },
       { path: "withdrawal", component: WithdrawalHomeComponent

        
      },
     
      
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class RecordroutingModule { }
