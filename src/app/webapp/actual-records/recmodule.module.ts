import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualRecordsComponent } from './actual-records.component';
import { WithdrawRecordComponent } from './withdraw-record/withdraw-record.component';
import { RecordroutingModule } from './recordrouting.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecordroutingModule,
    RouterModule
  ]
})
export class RecmoduleModule { }
