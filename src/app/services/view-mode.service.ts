import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ViewMode {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  private viewMode$: BehaviorSubject<ViewMode | null> = new BehaviorSubject<ViewMode | null>(null);
  constructor() {
  }

  public setViewMode(screenWidth: number) {
    if(screenWidth >= 1024  ) {
      this.viewMode$.next(ViewMode.DESKTOP)
    } else if(screenWidth >= 768) {
      this.viewMode$.next(ViewMode.TABLET)
    } else {
      this.viewMode$.next(ViewMode.MOBILE)
    }
  }

  public getViewMode() {
    return this.viewMode$.asObservable();
  }
}
