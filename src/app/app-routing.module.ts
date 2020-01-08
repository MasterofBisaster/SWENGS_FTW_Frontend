import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {EventListComponent} from './event-list/event-list.component';
import {LoginComponent} from './login/login.component';
import {EventFormComponent} from './event-form/event-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'event-list', pathMatch: 'full'},
  { path: 'event-list',
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'event-form',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },

  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
