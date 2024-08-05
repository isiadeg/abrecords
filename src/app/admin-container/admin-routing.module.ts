import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './admin-container.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddAgentsComponent } from '../add-agents/add-agents.component';
import { LocationSettingsComponent } from '../location-settings/location-settings.component';

const routes: Routes = [
  {
    path: '', component: AdminContainerComponent, children: [
      { path: 'jj', component: AdminDashboardComponent },
      { path: 'locations/add', component: AddLocationComponent },
      {
        path: 'locations', children: [
          {
            path: ':id', children: [
              {
                path: 'agents', children: [
                  {path: 'add',  component: AddAgentsComponent}
                ]
              },
              {
                path: 'settings', component: LocationSettingsComponent
              }
            ]
          }

        ]
      }
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
