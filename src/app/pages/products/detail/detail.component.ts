import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../../types/Product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: Product | undefined;

  quantity: number = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      console.log(param['id']);
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
    });
  }
  
  
}

