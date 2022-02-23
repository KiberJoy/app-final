import { Directive, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('inputTooltipTextBind') tooltipText!: string;
  public _tooltip!: HTMLElement | null;
  public _offset: number = 25;

  constructor(private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this._tooltip) { this.show(); }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let top, left;

    top = e.clientY + this._offset;
    left = e.clientX - this._offset;

    this.renderer.setStyle(this._tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this._tooltip, 'left', `${left}px`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this._tooltip) { this.hide(); }
  }

  public show() {
    this.createTooltip();
    this.renderer.addClass(this._tooltip, 'app-tootlip-show');
  }

  public hide() {
    this.renderer.removeClass(this._tooltip, 'app-tooltip-show');
    this.renderer.removeChild(document.body, this._tooltip);
    this._tooltip = null;
  }

  public createTooltip() {
    this._tooltip = this.renderer.createElement('div');

    this.renderer.appendChild(this._tooltip, this.renderer.createText(this.tooltipText));
    this.renderer.appendChild(document.body, this._tooltip);

    this.renderer.addClass(this._tooltip, 'app-tooltip');
  }
}
