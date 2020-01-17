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
import {EventDetailResolver} from './resolver/event-detail.resolver';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {EventListResolver} from './resolver/event-list.resolver';
import {EventSearchResolver} from './resolver/event-search.resolver';
import {CategoryListResolver} from './resolver/category-list.resolver';
import {LocationListResolver} from './resolver/location-list.resolver';
import {LocationSearchResolver} from './resolver/location-search.resolver';
import {CategorySearchResolver} from './resolver/category-search.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
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
      event: EventDetailResolver,
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      events: EventListResolver,
      locations: LocationListResolver,
      categories: CategoryListResolver,
    }
  },
  {
    path: 'home/:searchString',
    component: HomeComponent,
    resolve: {
      events: EventSearchResolver,
      locations: LocationSearchResolver,
      categories: CategorySearchResolver,
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
  // Bis hier!!!!!!!!!!
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
