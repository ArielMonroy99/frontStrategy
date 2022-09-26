import { Component } from '@angular/core';
import { ItemService } from './item.service';
import { OrderItem } from './OrderItem';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'strategy';
  cart : OrderItem[] = [];
  items: any[] = [];
  quantity :number = 0;
  actualCart : OrderItem[] = [];
  total : number = 0;
  method: string = "PAYPAL";
  constructor(private itemService: ItemService) {
    this.itemService.getItems().subscribe((data: any) => {
      console.log(data);
    });
  }
  ngOnInit(){
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
    this.getTotal();
    alert(this.total)
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
}
