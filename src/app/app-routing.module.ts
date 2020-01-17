import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {EventListComponent} from './event-list/event-list.component';
import {LoginComponent} from './login/login.component';
import {EventFormComponent} from './event-form/event-form.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CommentFormComponent} from './comment-form/comment-form.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventResolver} from './resolver/event.resolver';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {path: '', redirectTo: 'event-list', pathMatch: 'full'},
  {
    path: 'event-list',
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event-form',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event-detail/:id',
    component: EventDetailComponent,
    canActivate: [AuthGuard],
    resolve: {
      event: EventResolver,
    }
  },
  // Nur zum Testen. Anschließend löschen
  {
    path: 'comment-list',
    component: CommentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'comment-form',
    component: CommentFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
