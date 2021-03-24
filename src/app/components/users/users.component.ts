import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { User } from 'src/app/Models/user.model';
import { DialogSelectRolesComponent } from '../dialog-select-roles/dialog-select-roles.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users : User[] = [];
  confirmedUsers : User[] = [];
  constructor(private toastr: ToastrService,public dialog: MatDialog,private usersService :UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((users)=>{
        this.users=users.filter((user)=>{ return !user.IsConfirmed});
        this.confirmedUsers = users.filter((user)=>{ return user.IsConfirmed});
    },
    (error)=>{

    })
  }
  confirmUser(user :User) {
    const dialogRef = this.dialog.open(DialogSelectRolesComponent, {
      width: '450px',
      data : user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        user.loading = true;
        this.usersService.confirmUser(user.Id,result).subscribe(
          ()=>{
            user.loading = false;
          },
          (error)=>{
            user.loading = false;
            this.toastr.error(error.error.MessageDetail,error.error.Message);
          });
      }
    });
  };
  cancelUser(user :User){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data : `Ви дійсно бажаєте відхилити реєстрацію ${user.Name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('yes');
      }
    });
  };

}



