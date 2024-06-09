import { Component, inject } from '@angular/core';
import { Product } from '../../../types/Product';
import { ProductService } from '../../service/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  products: Product[] = [];
  productService = inject(ProductService);

  //ngOn Init
  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}
