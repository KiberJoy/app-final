import { Component, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { ViewMode, ViewModeService } from 'src/app/services/view-mode.service';
import { AbstractComponent } from '../abstract/abstract.component';

const MOBILE_TEXT = 'Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion.'
const DESKTOP_TEXT = 'Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion. Therefore, responsive design, programming languages and specific frameworks are the must-have skillsets to look for when assessing your front-end developers.'

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
})
export class FirstComponent extends AbstractComponent implements OnInit {

  public _firstBlockText = DESKTOP_TEXT;

  constructor(private viewModeService: ViewModeService) {
    super();
  }

  ngOnInit(): void {
    this.viewModeService.getViewMode()
    .pipe(
      filter(viewMode => !!viewMode),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(viewMode => {
      this._firstBlockText = viewMode === ViewMode.MOBILE ? MOBILE_TEXT : DESKTOP_TEXT;
    })
  }

  public scroll() {
    const block = document.getElementById('app-fourth');
    block!.scrollIntoView({behavior: 'smooth'});
  }
}
