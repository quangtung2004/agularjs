import { ProductService } from './../../../../service/product.service';
import { Component, inject } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgFor, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  allProducts: Product[] = [];
  productService = inject(ProductService);

  filterValue: string = ''; // Ánh xạ tới textbox search

  constructor() {}

  //ngOn Init
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (products) => {
        this.products = products;
        this.allProducts = products; // Store the products
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  filter(): void {
    // Chọn sản phẩm có tên chứa giá trị nhập vào
    const filterValueLowerCase = this.filterValue.toLowerCase();
    this.products = this.allProducts.filter((p) =>
      p.title.toLowerCase().includes(filterValueLowerCase)
    );
  }
  handleDeleteProduct(id: number) {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          alert('Xóa thành công');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
