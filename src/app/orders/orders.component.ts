import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  
 
  orders: any[] = [];
  payment: any;
  creditCard: any;
  paypal : any ;
  constructor(private itemService: ItemService, private orderService: OrderService) {
    this.itemService.getItems().subscribe((data: any) => {
      console.log(data);
      this.payment = data
      
    });
  }
  ngOnInit(){
    this.orderService.getOrders().subscribe((data:any) => {
      this.orders = data.content;
    })
    
  }

 
  getPayment(id:number){
    this.orderService.getPayment(id).subscribe((data:any) => {
      console.log(data)
      this.payment = data;
      if(this.payment.method == "CREDITCARD"){
        this.creditCard = {
          cardNumber: this.payment.paymentData[0].value,
          expiryDate: this.payment.paymentData[1].value,
          cvv: this.payment.paymentData[2].value,
          name: this.payment.paymentData[3].value
        }
        console.log(this.creditCard)
      }
      if(this.payment.method == "PAYPAL"){
       
        this.paypal = {
          email: this.payment.paymentData[0].value,
        }
        console.log(this.paypal)
      }
    })
  }
}
