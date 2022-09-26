import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ItemService } from '../item.service';
import { OrderService } from '../order.service';
import { OrderItem } from '../OrderItem';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  title = 'strategy';
  cart : OrderItem[] = [];
  items: any[] = [];
  quantity :number = 0;
  actualCart : OrderItem[] = [];
  total : number = 0;
  method: string = "PAYPAL";
  user: string = "";
  email: string = "";
  password: string = "";
  cardNumber: string = "";
  expiryDate: string = "";
  cvv: string = "";	
  name: string = "";
  orders: any[] = [];
  payment: any;
  constructor(private itemService: ItemService, private orderService: OrderService) {
    this.itemService.getItems().subscribe((data: any) => {
      console.log(data);
    });
  }
  ngOnInit(){
    this.orderService.getOrders().subscribe((data:any) => {
      this.orders = data.content;
    })
    this.itemService.getItems().subscribe((data: any) => {
      this.items = data.content;
      this.items.forEach((item:any) => {
        let cart : OrderItem = {
          item:item,
          quantity:0
        }
        this.cart.push(cart);
      })
    });

    this.getTotal()
  }

  addToCart(item:OrderItem){
    let cartItems : OrderItem [] = JSON.parse(localStorage.getItem('cart') || '[]')
    let newItem : boolean = true;
  
    if(cartItems.length > 0){
      cartItems.forEach((cartItem:OrderItem) => {
        if(cartItem.item.id === item.item.id){
          console.log(cartItems)
          cartItem.quantity = cartItem.quantity + item.quantity
          newItem = false;
          
        }
      })
    }else{
      cartItems.push(item)
      newItem = false
    }
    if(newItem) {cartItems.push(item)}
 
    localStorage.setItem('cart',JSON.stringify(cartItems));
    item.quantity = 0 
    Swal.fire(
      'Added to cart!',
      'Item added to cart',
      'success'
    )
    this.getTotal();
    
  }
  setItemInCart(item:OrderItem){
    let cartItems : OrderItem [] = JSON.parse(localStorage.getItem('cart') || '[]')
      cartItems.forEach((cartItem:OrderItem) => {
        if(cartItem.item.id === item.item.id){
          cartItem.quantity = cartItem.quantity = item.quantity
        }
      })
    
    localStorage.setItem('cart',JSON.stringify(cartItems));
    this.getTotal();
  }
  getActualCart(){
    this.actualCart = JSON.parse(localStorage.getItem('cart') || '[]')
  }
  getTotal(){
    this.getActualCart();
    let total = 0;
    this.actualCart.forEach((item:OrderItem) => {
      total = total + (item.item.price * item.quantity)
    })
    this.total = total;
    
  }
  removeItem(item:OrderItem){
    let cartItems : OrderItem [] = JSON.parse(localStorage.getItem('cart') || '[]')
    let index = cartItems.indexOf(item)
    cartItems.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cartItems));
  }

  sendOrder(){
    let data :any[] = [];
    if(this.method === "PAYPAL"){
      data = [
        {
          field: "email",
          value: this.email	
        },{
          field: "password",
          value: this.password
        }
      ]
    }
    if(this.method === "CREDITCARD"){
      data = [
        {
          field: "cardNumber",
          value: this.cardNumber	
        },{
          field: "dateOfExpiry",
          value: this.expiryDate
        },{
          field: "cvv",
          value: this.cvv
        },{
          field: "name",
          value: this.name
        }
      ]
    }
    let order = {
      user: this.user,
      items: this.actualCart,
      payment :{
        method: this.method,
        paymentData: data
      }
    }
    console.log(order)
    this.saveOrder(order);
  }
  saveOrder(order:any){
    this.orderService.saveOrder(order).subscribe((data:any) => {
      Swal.fire(
        'Order sent!',
          data,
        'success'
      )
    })
  }
  getPayment(id:number){
    this.orderService.getPayment(id).subscribe((data:any) => {
      console.log(data)
      this.payment = data;
    })
  }
}
