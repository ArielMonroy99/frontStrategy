import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/Config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = Config.url;
  constructor(private http:HttpClient) { }

  saveOrder(order:any){
    return this.http.post(this.url + "/api/order",order , {responseType: 'text'});
  }
  getOrders(){
    return this.http.get(this.url + "/api/order");
  }

  getOrder(id:number){
    return this.http.get(this.url + "/api/order/" + id);
  }
  getPayment(id:number){
    console.log(this.url + "/api/order/"+id+"/payment")
    return this.http.get(this.url + "/api/order/"+id+"/payment");
  }
}
