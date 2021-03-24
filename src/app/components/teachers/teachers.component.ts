import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/Models/teacher.model';
import { DomSanitizer } from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private teacherService: TeacherService,private _sanitizer: DomSanitizer,private router: Router,public dialog: MatDialog,private toastr: ToastrService) { }
  teachers: Teacher[] = [];
  public Editor = ClassicEditor;
  ngOnInit() {
    this.teacherService.getTeachers().subscribe((teachers)=>{
      this.teachers = teachers;
    },
    (error)=>{

    })
  }

  edit(teacher : Teacher){
    this.router.navigate(['dashboard/teachers/edit',teacher.Id]);
  }

  delete(teacher : Teacher){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data : `Ви дійсно бажаєте видалити ${teacher.Name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.teacherService.removeTeacher(teacher.Id).then((response)=>{
          this.toastr.success("Успішно видалено");
          this.teacherService.getTeachers().subscribe((teachers)=>{
            this.teachers = teachers;
            this.teachers.forEach((teacher)=>{
              teacher.ImageUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
              + teacher.Image)
            })
          },
          (error)=>{
      
          })
        },
        (error)=>{
          console.log(error);
        })
      }
    });
  }

}
