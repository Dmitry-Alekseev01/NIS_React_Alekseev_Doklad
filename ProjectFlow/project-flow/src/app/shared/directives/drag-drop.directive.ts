import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[appDraggable]', standalone: true })
export class DraggableDirective {
  @Input() dragData: any;
  private isDragging = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.renderer.addClass(this.el.nativeElement, 'dragging');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.removeClass(this.el.nativeElement, 'dragging');
    }
  }
}