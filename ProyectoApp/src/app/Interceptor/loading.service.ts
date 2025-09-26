import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../Services/loader.service';

@Injectable()
export class LoadingService implements HttpInterceptor {

  private totalRequests = 0;

  // Inyeccion de dependencias
  private loadingService = inject(LoaderService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log('caught')
    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );

  }
}
