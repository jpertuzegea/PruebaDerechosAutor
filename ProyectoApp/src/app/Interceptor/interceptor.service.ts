
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const headers = new HttpHeaders({
    //  'Authorization': 'BEARER ' + localStorage.getItem("Token")
    //});


    let headers = new HttpHeaders();

    headers = headers
      .set('Authorization', 'BEARER ' + localStorage.getItem("Token"))
    //.set('Access-Control-Allow-Origin', 'PUT, POST, GET, DELETE, OPTIONS')
    //.set('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept')
     .set('Access-Control-Allow-Origin', '*')

 
    const requestClone = req.clone({
      headers
    });

    return next.handle(requestClone);
  }
   
}
