import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapsComponent } from './pages/maps/maps.component';
import { CompaniesComponent } from './pages/companies/companies.component';

const routes: Routes = [
  { path: '', component: LayoutComponent ,children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'companies', component: CompaniesComponent },
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
