import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resource-bar',
  templateUrl: './resource-bar.component.html',
  styleUrls: ['./resource-bar.component.scss']
})
export class ResourceBarComponent {
  @Input() value = 0;
  @Input() maxValue = 0;
  @Input() type = 'health';
}
