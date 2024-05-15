import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Change here
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Change here
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}


  userdata: any;
  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });


  proceedlogin() {
    if (this.loginform.valid) {
      this.service.Getbycode(this.loginform.value).subscribe(res => {

        this.toastr.success(
          'Please Contact Admin to approve you to access the system',
          'logined successfully'
        );
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.toastr.warning('please enter a valid login');
    }
  }
}


