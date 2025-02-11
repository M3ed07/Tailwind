import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ErrorTemplateComponent } from './shared/components/ErrorHandler/error-template/error-template.component';

const routes: Routes = [
  { path: '', component: LayoutComponent ,children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'attendance', component: AttendanceComponent },
  ]},
  { path: 'error', component: ErrorTemplateComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
