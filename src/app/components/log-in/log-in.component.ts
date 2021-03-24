import { Component, NgZone, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { LogIn } from 'src/app/Models/log-in.model';
import { AuthService } from 'src/app/services/log-in.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public LoginModel: LogIn;

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
    this.LoginModel = new LogIn();
  }
  login() {
    // this.authService.login(this.LoginModel).subscribe(
    //   (response) => {
    //     this.router.navigate(['/dashboard/users']);
    //   }, (error) => {
    //     console.log(error);
    //   });

    this.authService.SignIn(this.LoginModel.Email, this.LoginModel.Password).then((response) => {
      this.ngZone.run(() => {
        this.router.navigate(['/dashboard/teachers']);
      })
    }).catch((error) => { console.log(error) });


  }

  loginWithGoogle() {
    this.authService.GoogleAuth().then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;

      //this is what you need
      var isNewUser = result.additionalUserInfo.isNewUser;
      if (isNewUser) {
        //delete the created user
        result.user.delete();
      } else {
        // your sign in flow
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard/teachers']);
        })

        console.log('user ' + user.email + ' does exist!');
      }
    }).catch((error) => { console.log(error) });
  }
  ngOnInit() {
    // this.ngZone.run(() => {
    //   this.router.navigate(['/dashboard/users']);
    // })
  }


}
