import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PositionModel } from 'src/app/models/position.model';


interface GetPositionsResponse {
  readonly success: boolean;
  readonly message?: string;
  readonly positions: PositionModel[];
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpService: HttpClient) { }

  public getPositions(): Observable<GetPositionsResponse> {
    return this.httpService.get<GetPositionsResponse>('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
    .pipe(catchError(error => {
      console.error(error.message);
      return of({
        ...error, positions: []
      })
    }))
  }
}
