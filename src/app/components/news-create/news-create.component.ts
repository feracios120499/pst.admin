import { Component, OnInit } from '@angular/core';
import { CreateNews, News } from 'src/app/Models/news.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer, private toastr: ToastrService, private http: HttpClient, private router: Router, private location: Location, private newsService: NewsService) { }
  public new: CreateNews = new CreateNews();
  public images: any;
  public documents: any;
  public Editor = ClassicEditor;
  ngOnInit() {
  }
  onSelectFile($event, files) {
    this.images = [];
    let images = this.images;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      //Only pics
      if (!file.type.match('image')) continue;

      var picReader = new FileReader();
      picReader.onload = (function (theFile) {
        return function (event) {
          let target: any = event.target;
          var picFile = target.result;
          images.push({ src: picFile, name: theFile.name, original: theFile });
        };
      })(file);
      //Read the image
      picReader.readAsDataURL(file);
    }
  }
  onSelectImage($event, images) {
    var image = images[0];
    var new1 = this.new;
    var _sanitizer = this._sanitizer;
    var picReader = new FileReader();
    picReader.onload = (function (theFile) {
      return function (event) {
        let target: any = event.target;
        var picFile = target.result;
        new1.ImageFile = image;
        new1.Image = btoa(picFile);
        new1.ImageUrl = _sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + new1.Image)
      };
    })(image);
    picReader.readAsBinaryString(image);
  }
  onSelectDocuments($event, files) {
    this.documents = [];
    let documents = this.documents;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      this.documents.push({ name: file.name, original: file, size: file.size });
    }
  }

  remove(image) {
    this.images = this.images.filter(function (el) { return el != image; });
  }
  removeDoc(doc) {
    this.documents = this.documents.filter(function (el) { return el != doc; });
  }

  addNew() {

    // console.log(this.new);
    // if (!this.new.Author) {
    //   this.toastr.warning("", "Веддіть автора");
    //   return;
    // }
    // if (!this.new.ImageUrl) {
    //   this.toastr.warning("", "Оберіть зоображення новини");
    //   return;
    // }
    // if (!this.new.Rubric) {
    //   this.toastr.warning("", "Введіть рубрику");
    //   return;
    // }
    // if (!this.new.Text) {
    //   this.toastr.warning("", "Введіть текст новини");
    //   return;
    // }
    // if (!this.new.Title) {
    //   this.toastr.warning("", "Введіть заголовок новини");
    //   return;
    // }
    this.newsService.createNews(this.new, this.images, this.documents).then((response) => {
       this.toastr.success("Новину додано", "Успішно");
       this.router.navigate(['dashboard/news']);
      console.log(response);
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message, "Помилка");
      })
  }
  AddModelData(modelData: any, images: any, documents: any): Observable<any> {
    let urlPath = '/news';
    const mData = JSON.stringify(modelData);
    const formData = new FormData();
    formData.append('data', mData);
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        let file = images[i].original;
        formData.append('images' + i, file, file.name);
      }
    }
    if (documents && documents.length > 0) {
      for (let i = 0; i < documents.length; i++) {
        let file = documents[i].original;
        formData.append('document' + i, file, file.name);
      }
    }
    return this.http.post(urlPath, formData);
  }
}
