import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ImpuestoComponent } from './components/impuesto/impuesto.component';
import { ReporteComponent } from './components/reporte/reporte.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path:'tasks',
    component: TasksComponent
  },
  {
    path:'private-tasks',
    component: PrivateTasksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'registro',
    component: RegistroComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  
  { path: 'impuesto', component: ImpuestoComponent,canActivate:[AuthGuard] },
  { path: 'informacion', component: InformacionComponent },
  { path: 'reporte', component: ReporteComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
