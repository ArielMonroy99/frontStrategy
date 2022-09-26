import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { ShopComponent } from './shop/shop.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  {path: 'orders',component: OrdersComponent }
  ,{path: '',redirectTo: '/shop',pathMatch: 'full'}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
