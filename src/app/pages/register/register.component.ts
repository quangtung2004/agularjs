import { routes } from './../../app.routes';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],
})
export class RegisterComponent {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });
  constructor(private router: Router) {}
  handleSubmit() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Register',
          detail: 'Tạo tài khoản thành công. Vui lòng đăng nhập',
        });
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (error) => {
        this.messageService.add({
          key: 'error',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Có lỗi xảy ra khi đăng ký tài khoản',
        });
      },
    });
  }
}
