import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { Admin } from './layouts/admin.layout/admin.layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { UsersComponent } from './components/users/users.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { NewsComponent } from './components/news/news.component';
import { NewsCreateComponent } from './components/news-create/news-create.component';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsEditComponent } from './components/documents-edit/documents-edit.component';


const loginRoutes: Routes = [
  { path: 'login', component: LogInComponent}
];
const dashboardRoutes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'teachers', component: TeachersComponent},
  { path: 'teachers/edit/:id', component: TeacherEditComponent},
  { path: 'teachers/create', component: TeacherEditComponent},
  { path: 'news', component: NewsComponent},
  {path: 'news/create',component:NewsCreateComponent},
  {path:'documents',component:DocumentsComponent},
  {path:'documents/edit/:id',component:DocumentsEditComponent},
  {path:'documents/create',component:DocumentsEditComponent}
];

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start/login' },
  { path: 'start', component: LoginLayoutComponent, children: loginRoutes },
  { path: 'dashboard' ,component: Admin , children : dashboardRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }