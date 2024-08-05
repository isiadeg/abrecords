import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { LoginComponent } from './login/login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';

//import { ActualrecordsComponent } from './actualrecords/actualrecords.component';


export const routes: Routes = [ 
    {path:"home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: 'admin-register', component: AdminRegisterComponent},
    {path: 'admin', loadChildren: ()=> import('./admin-container/admin.module').then(m=>m.AdminModule)},
    {path: "app", loadChildren: () => import('./webapp/webapp.module').then(m=>m.WebappModule)},
    {path: "", redirectTo: "/home", pathMatch: 'full' },
    {path: "**", component: NotFoundComponentComponent}
];
