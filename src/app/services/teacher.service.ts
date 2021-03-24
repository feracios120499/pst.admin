import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { BaseService } from '../providers/base.service';
import { LogIn } from '../Models/log-in.model';
import { TokenResponse } from '../Models/token.model';
import { User } from '../Models/user.model';
import { Teacher } from '../Models/teacher.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage'
import { base64ToFile } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService {

  constructor(private http: HttpClient, private db: AngularFireDatabase, private storage: AngularFireStorage,) {
    super();
  }
  getTeachers(): Observable<Teacher[]> {
    return this.db.list<Teacher>('teachers/').snapshotChanges().pipe(map(item => item.map(teacherMap => {
      var teacher = teacherMap.payload.val();
      teacher.Id = teacherMap.key;
      return teacher;
    })
    ));
  }
  getTeacher(id: any): Observable<Teacher> {
    return this.db.object<Teacher>('teachers/' + id).snapshotChanges().pipe(map(item => {
      var teacher = item.payload.val();
      teacher.Id = item.payload.key;
      return teacher;
    }))
  }
  createTeacher(teacher: Teacher): Promise<any> {
    return new Promise(resolve => {
      teacher.ImageUrl = '';
      var teacherId = this.db.list('/teachers').push(teacher).key;

      teacher.Id = teacherId;
      const filePath = `teachers/${teacher.Id}.png`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, teacher.ImageFile);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((response) => {
            teacher.Image = response;
            this.db.object('teachers/' + teacher.Id).update(teacher);
            resolve();
          });
        })
      )
        .subscribe()
    })
  }
  updateTeacher(teacher: Teacher): Promise<any> {
    return new Promise(resolve => {
      teacher.ImageUrl = '';
      if (teacher.ImageFile != null) {
        const filePath = `teachers/${teacher.Id}.png`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, teacher.ImageFile);
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((response) => {
              teacher.Image = response;
              this.db.object('teachers/' + teacher.Id).update(teacher);
              resolve();
            });
          })
        )
          .subscribe()
      }
      else {
        this.db.object('teachers/' + teacher.Id).update(teacher);
        resolve();
      }
    });

  }
  removeTeacher(id: any): Promise<any> {
    return new Promise(resolve => {
      const filePath = `teachers/${id}.png`;
      const fileRef = this.storage.ref(filePath);
      fileRef.delete().subscribe(() => {
        this.db.object('teachers/' + id).remove().then(() => {
          resolve();
        });

      });
    })


  }
}
