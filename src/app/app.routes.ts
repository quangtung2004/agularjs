import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/product/list/list.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductDetailComponent } from './pages/products/detail/detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductCreateComponent } from './pages/admin/product/create/create.component';
import { ProductEditComponent } from './pages/admin/product/edit/edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthguardService } from './service/authguard.service';
import { ListuserComponent } from './pages/admin/product/listuser/listuser.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/listuser',
        component: ListuserComponent,
      },
      {
        path: 'products/create',
        component: ProductCreateComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent,
      },
    ],
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  
];
