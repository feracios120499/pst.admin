import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { BaseService } from '../providers/base.service';
import { LogIn } from '../Models/log-in.model';
import { TokenResponse } from '../Models/token.model';
import { User } from '../Models/user.model';
import { Teacher } from '../Models/teacher.model';
import { News } from '../Models/news.model';
import { DocumentModel } from '../Models/document.model';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends BaseService {

  constructor(private http: HttpClient, private storage: AngularFireStorage) {
    super();
  }
  getBackalavrs(): Observable<DocumentModel[]> {
    return from(this.storage.storage.ref('backalavr').listAll()).pipe((map(item => {
      console.log(item.items);
      return item.items.map(p => {
        var document = new DocumentModel();
        document.FileName = p.name;
        document.FullPath = p.fullPath;
        return document;
      })
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
        var document = new DocumentModel();
        document.FileName = p.name;
        document.FullPath = p.fullPath;
        return document;
      })
    })));
  }
  removeDocument(id: any): Promise<any> {
    return this.storage.storage.ref(id).delete();
  }
  addDocument(file, path): Promise<any> {
    return new Promise(resolve => {
      return this.storage.upload(`${path}/${file.name}`, file).then(() => {
        resolve();
      });
    })

  }

  private async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
