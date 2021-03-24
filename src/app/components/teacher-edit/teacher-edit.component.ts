import { Component, OnInit } from '@angular/core';
import { Teacher, TeacherDetail } from 'src/app/Models/teacher.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private teacherService: TeacherService, private _sanitizer: DomSanitizer, private toastr: ToastrService, private http: HttpClient, private router: Router) { }
  public teacher: Teacher = new Teacher();
  public Editor = ClassicEditor;
  public IsCreate: boolean;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.IsCreate = false;
      this.teacher.loading = true;
      this.teacherService.getTeacher(id).subscribe((response) => {
        this.teacher = response;
      },
        (error) => {

        })
    }
    else {
      this.IsCreate = true;
      this.teacher = new Teacher();
      this.teacher.Details = [];
      var teacherDetail = new TeacherDetail();
      teacherDetail.Title = 'Освіта';
      this.teacher.Details.push(teacherDetail);
    }
  }
  onSelectFile(event, files) {
    let file = files[0];
    let teacher = this.teacher;
    var _sanitizer = this._sanitizer;
    var picReader = new FileReader();
    picReader.onload = (function (theFile) {
      return function (event) {
        let target: any = event.target;
        var picFile = target.result;
        teacher.ImageFile = file;
        teacher.Image = btoa(picFile);
        teacher.ImageUrl = _sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + teacher.Image)
      };
    })(file);
    picReader.readAsBinaryString(file);
  }

  save() {
    if (!this.teacher.Name) {
      this.toastr.warning("Введідть піб викладача");
      return;
    }
    if (!this.teacher.Details || this.teacher.Details.length == 0) {
      this.toastr.warning("Треба додати хоча б один опис");
      return;
    }
    if (!this.teacher.Image) {
      this.toastr.warning("Оберіть фото викладача");
      return;
    }
    for (let i = 0; i < this.teacher.Details.length; i++) {
      if (!this.teacher.Details[i].Title) {
        this.toastr.warning("Введіть назву опису №" + i);
        return;
      }
      if (!this.teacher.Details[i].Text) {
        this.toastr.warning("Введіть текст опису " + this.teacher.Details[i].Title);
        return;
      }
    }
    this.teacher.Details.forEach((detail, index) => {
      detail.Position = index;
    });
    if (this.IsCreate) {
      this.teacherService.createTeacher(this.teacher).then((response) => {
        this.toastr.success("Викладача додано", "Успішно");
        this.router.navigate(['dashboard/teachers']);
      }).catch(
        (error) => {
          this.toastr.error(error.Message, "Помилка");
        })
    }
    else {
      this.teacherService.updateTeacher(this.teacher).then((response) => {
        this.toastr.success("Викладача оновлено", "Успішно");
        this.router.navigate(['dashboard/teachers']);
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message, "Помилка");
        })
    }
  }

  addDetail() {
    this.teacher.Details.push(new TeacherDetail());
    this.teacher.Details.forEach((item, index) => {
      if ((index + 1) == this.teacher.Details.length) {
        item.expanded = true;
      }
      else {
        item.expanded = false;
      }
    })

  }
  removeDetail(detail: TeacherDetail) {
    this.teacher.Details = this.teacher.Details.filter((item) => { return item != detail; })
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(this.teacher.Details);
    moveItemInArray(this.teacher.Details, event.previousIndex, event.currentIndex);
  }

}
