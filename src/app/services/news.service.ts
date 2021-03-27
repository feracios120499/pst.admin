import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { BaseService } from '../providers/base.service';
import { LogIn } from '../Models/log-in.model';
import { TokenResponse } from '../Models/token.model';
import { User } from '../Models/user.model';
import { Teacher } from '../Models/teacher.model';
import { CreateNews, News, NewsDocument } from '../Models/news.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends BaseService {

  constructor(private http: HttpClient, private db: AngularFireDatabase, private storage: AngularFireStorage,) {
    super();
  }
  getNews(): Observable<News[]> {
    return this.db.list<News>('news/', ref => ref.orderByChild('Date').limitToLast(10)).snapshotChanges().pipe(map((item) => item.map((news) => {
      var newsObject = news.payload.val();
      newsObject.Id = news.key;
      return newsObject;
    }).reverse()));
  }

  async createNews(createModel: CreateNews, images: any[], documents: any[]): Promise<any> {
    // return new Promise(resolve => {
    //   // var news = new News();
    //   // news.Author = createModel.Author;
    //   // news.Date = createModel.Date;
    //   // news.Rubric = createModel.Rubric;
    //   // news.Text = createModel.Text;
    //   // news.Title = createModel.Title;
    //   // var newsId = this.db.list('news/').push(news);
    //   // var newsImages = new Array<string>();
    //   // if (images != null && images.length > 0) {
    //   //   images.forEach((image) => {
    //   //     const filePath = `news/${newsId}/images/${image.name}`;
    //   //     const fileRef = this.storage.ref(filePath);
    //   //     const task = this.storage.upload(filePath, image.original);
    //   //     task.snapshotChanges().pipe(
    //   //       finalize(() => {
    //   //         fileRef.getDownloadURL().subscribe((response) => {
    //   //           newsImages.push(response);
    //   //           this.db.object('teachers/' + teacher.Id).update(teacher);
    //   //           resolve();
    //   //         });
    //   //       })
    //   //     )
    //   //       .subscribe()
    //   //   })
    //   // }

    // })
    var news = new News();
    news.Author = createModel.Author;
    news.Date = createModel.Date;
    news.Rubric = createModel.Rubric;
    news.Text = createModel.Text;
    news.Title = createModel.Title;


    var newsId = this.db.list('news/').push(news).key;
    news.Id = newsId;
    var newsImages = new Array<string>();
    newsImages = await this.uploadImages(newsId, images);

    var newsDocuments = new Array<NewsDocument>();
    newsDocuments = await this.uploadDocuments(newsId, documents);
    console.log(newsDocuments);
    news.Images = newsImages;
    news.Documents = newsDocuments;

    var image = await this.uploadImage(newsId, createModel.ImageFile);

    news.Image = image;
    return await this.db.object('news/' + newsId).update(news);

  }

  async removeNews(newsId: string) {
    const filePath = `news/${newsId}`;
    await this.deleteFolderContents(filePath);
    await this.db.object('news/' + newsId).remove();
    return;
  }

  async deleteFolderContents(path) {
    const ref = this.storage.storage.ref(path);
    var list = await ref.listAll();
    await this.asyncForEach(list.items, async (item) => {
      console.log(item['location']['path']);
      await this.storage.ref(item['location']['path']).delete();
    })
    await this.asyncForEach(list.prefixes, async (item) => {
      await this.deleteFolderContents(item['location']['path']);
    })
  }

  async deleteFile(pathToFile, fileName) {
    const ref = this.storage.storage.ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete()
  }

  async uploadImages(newsId: string, images: any): Promise<Array<string>> {
    var newsImages = new Array<string>();
    if (images != null && images.length > 0) {
      await this.asyncForEach(images, (image) => {
        return new Promise(resolve => {
          const filePath = `news/${newsId}/images/${image.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, image.original);
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((response) => {
                newsImages.push(response);
                resolve(newsImages);
              });
            })
          )
            .subscribe()
        })
      })
      return newsImages;
    }
    else {
      return newsImages;
    }
  }
  async uploadImage(newsId: string, image: any): Promise<string> {
    if (image) {
      return new Promise(resolve => {
        const filePath = `news/${newsId}/images/${image.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, image);
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((response) => {
              resolve(response);
            });
          })
        )
          .subscribe()
      })
    }
    else {
      return new Promise(resolve => resolve('https://firebasestorage.googleapis.com/v0/b/ipz-site.appspot.com/o/news%2Fnews.png?alt=media&token=f70d5d6e-3f55-4ef1-b402-4888dcdc3b52'));
    }
  }
  async uploadDocuments(newsId: string, documents: any): Promise<Array<NewsDocument>> {
    debugger;
    var newsDocuments = new Array<NewsDocument>();
    if (documents != null && documents.length > 0) {
      await this.asyncForEach(documents, (document) => {
        return new Promise(resolve => {
          const filePath = `news/${newsId}/documents/${document.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, document.original);
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((response) => {
                var firebaseDocument = new NewsDocument();
                firebaseDocument.FileName = document.name;
                firebaseDocument.FileSize = document.size;
                firebaseDocument.FileUrl = response;
                newsDocuments.push(firebaseDocument);
                resolve(newsDocuments);
              });
            })
          )
            .subscribe()
        })
      })
      return newsDocuments;
    }
    else {
      return newsDocuments;
    }
  }

  private async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
