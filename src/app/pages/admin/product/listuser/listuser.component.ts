import { Component, inject } from '@angular/core';
import { User } from '../../../../../types/User';
import { ProductService } from '../../../../service/product.service';
import { AuthlistService } from '../../../../service/authlist.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css',
})
export class ListuserComponent {
  users: User[] = [];
  alluser: User[] = [];
  authlistService = inject(AuthlistService);

  filterValue: string = ''; // Ánh xạ tới textbox search

  constructor() {}

  //ngOn Init
  ngOnInit(): void {
    this.authlistService.getAllUser().subscribe({
      next: (user) => {
        this.users = user;
        this.alluser = user; // Store the products
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  filter(): void {
    // Chọn sản phẩm có tên chứa giá trị nhập vào
    const filterValueLowerCase = this.filterValue.toLowerCase();
    this.users = this.alluser.filter((p) =>
      p.email.toLowerCase().includes(filterValueLowerCase)
    );
  }
}
