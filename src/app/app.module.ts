import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { DateComponent } from './date/date.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { FtwWordFormComponent } from './ftw-word-form/ftw-word-form.component';
import { FtwWordListComponent } from './ftw-word-list/ftw-word-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';


import {MenuModule} from 'primeng/menu';
import {MediainputComponent} from './mediainput/mediainput.component';
import {FileUploadModule} from 'ng2-file-upload';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    LoginComponent,
    DateComponent,
    EventListComponent,
    EventFormComponent,
    EventDetailComponent,
    LocationListComponent,
    LocationFormComponent,
    CommentFormComponent,
    CommentListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    FtwWordFormComponent,
    FtwWordListComponent,
    MediainputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    MenuModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
