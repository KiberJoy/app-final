import { Component, HostListener, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { HeaderLinksModel } from 'src/app/models/header-link.model';
import { ViewMode, ViewModeService } from 'src/app/services/view-mode.service';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends AbstractComponent implements OnInit {

  public _logoUrl: string = '/assets/logo.svg';
  public _mobileMenuUrl: string = '/assets/menu.svg';
  public _isVisible: boolean = false;
  public _isDesktopHeader!: boolean;
  public _links: HeaderLinksModel[] = [
    {name: 'About me', url: '#app-fourth' },
    {name: 'Relationships', url: '#app-fourth' },
    {name: 'Requirements', url: '#app-fourth' },
    {name: 'Users', url: '#app-fourth' },
    {name: 'Sign Up', url: '#app-fourth' },
  ]
  public _mobileLinks: HeaderLinksModel[][] = [
    [
      {name: 'About me', url: '#app-fourth' },
      {name: 'Relationships', url: '#app-fourth' },
      {name: 'Users', url: '#app-fourth' },
      {name: 'Sign up', url: '#app-fourth' },
      {name: 'Terms and Conditions', url: '#app-fourth' }
    ],
    [
      {name: 'How it works', url: '#app-fourth' },
      {name: 'Partnership', url: '#app-fourth' },
      {name: 'Help', url: '#app-fourth' },
      {name: 'Level testimonial', url: '#app-fourth' },
      {name: 'Contact us', url: '#app-fourth' }
    ],
    [
      {name: 'Articles', url: '#app-fourth' },
      {name: 'Our news', url: '#app-fourth' },
      {name: 'Testimonials', url: '#app-fourth' },
      {name: 'Licenses', url: '#app-fourth' },
      {name: 'Privacy Policy', url: '#app-fourth' }
    ],
  ]

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
      if (viewMode === ViewMode.DESKTOP) {
        this._isDesktopHeader = true
      } else if (viewMode === ViewMode.TABLET){
        this._isDesktopHeader = false;
      } else {
        this._isDesktopHeader = false;
      }
    })
  }

  public mobileMenuToggle() {
    this._isVisible = !this._isVisible;
    this._isVisible == true ? document.querySelector('body')?.classList.add('app-lock') : document.querySelector('body')?.classList.remove('app-lock');
  }

  public stop(e:any) {
    e.stopPropagation();
  }

  @HostListener("window:scroll")
  public onWindowScroll() {
    this._links.forEach(link => {
      const block = document.querySelector(link.url)?.getBoundingClientRect();
      link.active = block!.top <= 0 && block!.bottom >= 0;
    })
    this._mobileLinks.forEach(linkArray => {
      linkArray.forEach(link => {
        const block = document.querySelector(link.url)?.getBoundingClientRect();
        link.active = block!.top <= 0 && block!.bottom >= 0;
      })
    })
  }
}
