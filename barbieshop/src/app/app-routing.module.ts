import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerComponent } from './common/edit-customer/edit-customer.component';
import { CustomerComponent } from './page/customer/customer.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProductComponent } from './page/product/product.component'
import { EditProductComponent } from './common/edit-product/edit-product.component';
import { BillComponent } from './page/bill/bill.component';
import { AddBillComponent } from './common/add-bill/add-bill.component';
import { BillViewerComponent } from './page/bill-viewer/bill-viewer.component';
import { EditOrderComponent } from './common/edit-order/edit-order.component';
import { OrderComponent } from './page/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'bill',
    component: BillComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent,
  },
  {
    path: 'edit-order/:id',
    component: EditOrderComponent,
  },
  {
    path: 'add-product',
    component:  EditProductComponent,
  },
  {
    path: 'add-bill',
    component:  AddBillComponent,
  },
  {
    path: 'bill/viewer/:id',
    component:  BillViewerComponent,
  },
    {
    path: '**',
    component:  DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
