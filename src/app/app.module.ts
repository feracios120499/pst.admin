import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './providers/interceptor.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Admin } from './layouts/admin.layout/admin.layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UsersComponent } from './components/users/users.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { NewsComponent } from './components/news/news.component';
import { ToastrModule } from 'ngx-toastr';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { DialogSelectRolesComponent } from './components/dialog-select-roles/dialog-select-roles.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NewsCreateComponent } from './components/news-create/news-create.component';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsEditComponent } from './components/documents-edit/documents-edit.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FeedbackComponent } from './feedback/feedback.component';
import { StarRatingModule } from 'angular-star-rating';
import { RatingModule } from 'ng-starrating';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    Admin,
    LoginLayoutComponent,
    SidenavComponent,
    UsersComponent,
    TeachersComponent,
    NewsComponent,
    DialogConfirmComponent,
    DialogSelectRolesComponent,
    NewsCreateComponent,
    TeacherEditComponent,
    DocumentsComponent,
    DocumentsEditComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    RatingModule,
    FormsModule,
    FlexLayoutModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    DialogConfirmComponent,
    DialogSelectRolesComponent
  ],
  entryComponents:[
    DialogConfirmComponent,
    DialogSelectRolesComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
