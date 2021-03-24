import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewsService } from 'src/app/services/news.service';
import { News, NewsDocument } from 'src/app/Models/news.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private http: HttpClient, public newsService: NewsService, private _sanitizer: DomSanitizer, public dialog: MatDialog) { }
  public Editor = ClassicEditor;
  public news: News[];
  ngOnInit() {
    this.newsService.getNews().subscribe((news) => {
      this.news = news;
    }, (error) => {
      console.log(error);
    })
  }
  file: any;

  onSelectFile($event, file) {
    this.file = file;
  }
  loadDocuments(news: News) {
  }
  loadImages(news: News) {

  }
  remove(id: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: `Ви дійсно бажаєте видалити новину?`
    });
    console.log(id);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newsService.removeNews(id).then((response) => {
          this.newsService.getNews().subscribe((news) => {
            this.news = news;
          })
        })
      }
    });

  }

  AddModelData(modelData: any, file: any): Observable<any> {
    let urlPath = '/news';
    const mData = JSON.stringify(modelData);
    const formData = new FormData();
    formData.append('data', mData);
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.post(urlPath, formData, { reportProgress: true });
  }
}
