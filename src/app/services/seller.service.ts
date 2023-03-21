import { Router } from '@angular/router';
import { SignUp, Login } from './../data-type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data, {observe: 'response'}).subscribe((result) => {
      console.warn(result)
      if(result) {
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  }

  reloadSeller() {
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login) {
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe: 'response'}).subscribe((result: any) => {
      console.warn(result)
      if(result && result.body && result.body.length){
        console.warn("User logged in")
      }
      else {
        console.warn("Login failed")
      }
    })
  }
}
