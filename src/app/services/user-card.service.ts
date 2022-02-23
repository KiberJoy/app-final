import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {

  private resetUsersSubject$: Subject<void> = new Subject<void>();

  constructor(
    private httpService: HttpClient,
    private tokenService: TokenService
  ) { }

  public getUsers(params: HttpParams) {
    return this.httpService.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?${params}`)
  }

  public createUser(formData: any) {
    const token = this.tokenService.getToken();
    const form = new FormData();
    const data: any = {
      name: formData.firstName,
      email: formData.email,
      phone: '+' + formData.phoneNumber,
      position_id: formData.position.id,
      photo: formData.photo,
    }
    for(const key in data) {
      form.append(key, data[key])
    }
    return this.httpService
    .post('https://frontend-test-assignment-api.abz.agency/api/v1/users',
    form,
    {
      headers: {
        token: token,
      }
    })
  }

  public getResetUsersObservable() {
    return this.resetUsersSubject$.asObservable();
  }

  public resetUsers() {
    this.resetUsersSubject$.next();
  }
}
