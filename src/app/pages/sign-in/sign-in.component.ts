import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../services/user.service';
import { ILoginResponse } from '../../types/login';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  isLoading: boolean = false
  passwordVisible = false;

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.handleLogin();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      '',
      { nzDuration: 3000 }
    );
  }

  handleLogin(): void {
    this.isLoading = true
    this.userService.login(
      this.validateForm.value.userName ? this.validateForm.value.userName : "",
      this.validateForm.value.password ? this.validateForm.value.password : ""
    ).subscribe({
      next: (res: ILoginResponse) => {
        this.userService.setUser(res)
        this.isLoading = false
        localStorage.setItem("token", res.token)
        this.createNotification("success", "Đăng nhập thành công")
        this.handleNavigate(res.role)
      },
      error: (error: Error) => {
        this.isLoading = false
        console.log(error);
        this.createNotification("error", "Sai tài khoản hoặc mật khẩu")
      }
    })
  }

  handleNavigate(role: string): void {
    this.isLoading = false
    if (role === 'ROLE_WAREHOUSE') {
      this.router.navigate(['/home/warehouse']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
