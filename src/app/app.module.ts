import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {LogoutComponent} from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventFormComponent} from './event-form/event-form.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {LocationListComponent} from './location-list/location-list.component';
import {LocationFormComponent} from './location-form/location-form.component';
import {CommentFormComponent} from './comment-form/comment-form.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AccordionModule} from 'primeng/accordion';
import {CalendarModule} from 'primeng/calendar';
import {PaginatorModule} from 'primeng/paginator';
import {RegisterComponent} from './register/register.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {EditorModule} from 'primeng/editor';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserFormComponent} from './user-form/user-form.component';
import {HomeComponent} from './home/home.component';
import {FileUploadModule} from 'primeng/fileupload';
import {MessageModule} from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';
import {CookieService} from 'ngx-cookie-service';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ToggleButtonModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';


export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LogoutComponent,
        LoginComponent,
        EventListComponent,
        EventFormComponent,
        EventDetailComponent,
        LocationListComponent,
        LocationFormComponent,
        CommentFormComponent,
        CommentListComponent,
        CategoryListComponent,
        CategoryFormComponent,
        RegisterComponent,
        UserDetailComponent,
        UserFormComponent,
        HomeComponent],
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
    ButtonModule,
    InputTextModule,
    MenubarModule,
    FileUploadModule,
    PasswordModule,
    CardModule,
    VirtualScrollerModule,
    AngularFontAwesomeModule,
    AccordionModule,
    RxReactiveFormsModule,
    CalendarModule,
    PaginatorModule,
    EditorModule,
    FileUploadModule,
    MessageModule,
    CheckboxModule,
    PanelModule,
    InputSwitchModule,
    ToggleButtonModule,
    ToastModule
  ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}


