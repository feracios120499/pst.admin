import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-select-roles',
  templateUrl: './dialog-select-roles.component.html',
  styleUrls: ['./dialog-select-roles.component.css']
})
export class DialogSelectRolesComponent implements OnInit {
  roles :string[] = [];
  checkedAdmin : boolean;
  checkedUsers : boolean;
  checkedTeachers : boolean;
  checkedNews : boolean;
  checkedDocuments : boolean;

  constructor(public dialogRef: MatDialogRef<DialogSelectRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit() {
  }
  changed(role :string,isChecked:boolean){
    if(isChecked){
      this.roles.push(role);
    }
    else{
      this.roles = this.roles.filter((item)=>{return item!=role});
    }
    console.log(this.roles);
      
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
