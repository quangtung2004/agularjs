import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../service/product.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class ProductCreateComponent {
  productService = inject(ProductService);
  messageService = inject(MessageService);

  createProductForm: FormGroup = new FormGroup({
    //Form controll giá trị ban đầu, validators
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    pricenew: new FormControl(0, [Validators.required, Validators.min(0)]),
    priceold: new FormControl(0, [Validators.required, Validators.min(0)]),
    starRating: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    category: new FormControl('', [Validators.required]),
    showproduct: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router) {}

  handleSubmit() {
    //call api create producl
    console.log(this.createProductForm);
    this.productService.createProduct(this.createProductForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Create Product',
          detail: 'Bạn đã thêm sản phẩm thành công',
        });
        setTimeout(() => this.router.navigate(['/admin/products/list']), 1000);
      },
      error: (error) => {
        this.messageService.add({
          key: 'error',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Có lỗi xảy ra khi thêm sản phẩm',
        });
      },
    });
  }
}
