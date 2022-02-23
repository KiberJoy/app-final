import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { AbstractComponent } from '../components/abstract/abstract.component';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends AbstractComponent {
  private token: string = '';
  constructor(private httpService: HttpClient) {
    super();
  }

  public requestToken() {
    return this.httpService.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .pipe(
      takeUntil(this.unsubscribe$),
      take(1)
    )
    .subscribe((response: any) => {
      this.token = response.token;
    })
  }

  public getToken() {
    return this.token;
  }
}
