import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router"
import { WebappComponent } from './webapp.component';
import { WithdrawRecordComponent } from './actual-records/withdraw-record/withdraw-record.component';
import { ActualRecordsComponent } from './actual-records/actual-records.component';
import { AppActionsComponent } from './app-actions/app-actions.component';


const approutes:Routes = [
  {
    path: '', component: WebappComponent, children: [
      {path: 'home', component: AppActionsComponent},
      {path: 'records', loadChildren: ()=> import('./actual-records/recmodule.module').then(m=>m.RecmoduleModule)},
     // {path: 'withdraw', component: WithdrawRecordComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(approutes)

  ],
  exports: [
    RouterModule
  ]
})
export class ApplicationRoutingModule { }
