import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Document2, DocumentModel } from '../Models/document.model';
import { BaseService } from '../providers/base.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends BaseService {

  constructor(private http: HttpClient, private storage: AngularFireStorage, private db: AngularFireDatabase) {
    super();
  }
  getDocuments(subject: string): Observable<Document2[]> {
    return this.db.list<Document2>('documents/', ref => ref.orderByChild('Subject').equalTo(subject)).snapshotChanges().pipe(map((items => {
      const result: Document2[] = items.map(p => {
        const value = p.payload.val();
        return {
          Id: p.key,
          FileName: value.FileName,
          Subject: value.Subject,
          Position: value.Position,
          Description: value.Description
        };
      });
      return result.sort(function (a, b) {
        return a.Position - b.Position;
      });
    })));
  }
  getBackalavrs(): Observable<DocumentModel[]> {
    return from(this.storage.storage.ref('backalavr').listAll()).pipe((map(item => {
      console.log(item.items);
      return item.items.map(p => {
        const document = new DocumentModel();
        document.FileName = p.name;
        document.FullPath = p.fullPath;
        document.Reference = p;
        return document;
      });
    })));



    // await this.asyncForEach(list.items, async function (item: firebase.storage.Reference) {
    //   var meta = await item.getMetadata();
    //   var document = new DocumentModel();
    //   document.FileName = meta.name;
    //   document.FileSize = meta.size;
    //   document.FullPath = meta.fullPath;
    //   result.push(document);
    // });
    // return result;
  }
  getMagistr(): Observable<DocumentModel[]> {
    return from(this.storage.storage.ref('magistr').listAll()).pipe((map(item => {
      console.log(item.items);
      return item.items.map(p => {
        const document = new DocumentModel();
        document.FileName = p.name;
        document.FullPath = p.fullPath;
        document.Reference = p;
        return document;
      });
    })));
  }
  // removeDocument(id: any): Promise<any> {
  //   return this.storage.storage.ref(id).delete();
  // }
  addDocument(file, path, description): Promise<any> {
    return new Promise(resolve => {
      // this.storage.upload(`${path}/${file.name}`, file);
      // // return .then((test) => {
      // //   console.log(test);
      // //   resolve();
      // // });
      const filePath = `${path}/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((response) => {
            this.db.list<any>('documents/').query.once('value').then((documents) => {
              const items = Object.keys(documents.val()).map(p => documents.val()[p]);
              const values = items.filter(p => p.Subject === path).map(p => p.Position);
              let position = 0;
              if (values.length !== 0) {
                position = Math.max.apply(null, values);
              }
              const document: any = {};
              document.FileUrl = response;
              document.FileName = file.name;
              document.Description = description;
              document.Subject = path;
              document.Date = new Date();
              document.Position = position + 1;
              this.db.list('documents/').push(document);
              resolve();
            });
          });
        })).subscribe();

    });

  }

  private async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  updateDocument(document: Document2) {
    this.db.list('documents/').update(document.Id, document);
  }

  removeDocument(document: Document2) {
    return new Promise(resolve => {
      this.storage.storage.ref(`${document.Subject}/${document.FileName}`).delete().then(() => {
        this.db.object(`documents/${document.Id}`).remove().then(() => resolve());
      });
    });
  }
}
