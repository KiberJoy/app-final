import { Component, HostListener } from '@angular/core';
import { TokenService } from './services/token.service';
import { ViewModeService } from './services/view-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'abz-test-app';
  constructor(private tokenService: TokenService,
    private viewModeService: ViewModeService) {}

  @HostListener('window:resize')
  public setScreenViewMode() {
    this.viewModeService.setViewMode(window.innerWidth);
  }

  ngOnInit(): void {
    this.tokenService.requestToken();
    this.setScreenViewMode();
  }
}
