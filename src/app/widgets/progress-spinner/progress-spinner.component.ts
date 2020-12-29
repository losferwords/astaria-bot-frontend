import { Component, Input, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayPanelComponent } from './overlay-panel.component';

@Component({
  selector: 'app-progress-spinner',
  template: ''
})
export class ProgressSpinnerComponent {
  pagePortal: ComponentPortal<any>;
  overlayRef: OverlayRef;
  loadingState = false;

  @Input()
  set isLoading(value: boolean) {
    if (value) {
      this.overlayRef.attach(this.pagePortal);
    } else {
      this.overlayRef.detach();
    }
    this.loadingState = value;
  }
  get isLoading(): boolean {
    return this.loadingState;
  }

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
    this.overlayRef = this.overlay.create({hasBackdrop: true, backdropClass: ['cdk-overlay-dark-backdrop', 'cdk-overlay-backdrop-showing']});
    this.pagePortal = new ComponentPortal(OverlayPanelComponent, this.viewContainerRef);
  }
}
