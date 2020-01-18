import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {EventListComponent} from './event-list/event-list.component';
import {LoginComponent} from './login/login.component';
import {EventFormComponent} from './event-form/event-form.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CommentFormComponent} from './comment-form/comment-form.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventDetailResolver} from './resolver/event-detail.resolver';
import {RegisterComponent} from './register/register.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {HomeComponent} from './home/home.component';
import {EventListResolver} from './resolver/event-list.resolver';
import {EventSearchResolver} from './resolver/event-search.resolver';
import {CategoryListResolver} from './resolver/category-list.resolver';
import {LocationListResolver} from './resolver/location-list.resolver';
import {LocationSearchResolver} from './resolver/location-search.resolver';
import {CategorySearchResolver} from './resolver/category-search.resolver';
import {FtwUserDetailResolver} from './resolver/ftwuser-detail.resolver';
import {CategoryListComponent} from './category-list/category-list.component';
import {LocationListComponent} from './location-list/location-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'event-list',
    component: EventListComponent,
  },
  {
    path: 'event-form',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event-detail/:id',
    component: EventDetailComponent,
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
  // Bis hier
  {
    path: 'user-detail/:id',
    component: UserDetailComponent,
    resolve: {
      user: FtwUserDetailResolver,
    }
  },
  {
    path: 'category-list',
    component: CategoryListComponent,
    canActivate: [AuthGuard],
    resolve: {
      categories: CategoryListResolver,
    }
  },
  {
    path: 'location-list',
    component: LocationListComponent,
    resolve: {
      locations: LocationListResolver,
    }
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
