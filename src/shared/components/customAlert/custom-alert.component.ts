import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() img?: string;
  @Input() timeAlert?: string;
  @Input() type?: string;

  @Output() onDismiss = new EventEmitter<void>();
  @Output() onAccept = new EventEmitter<void>();

  dismiss() {
    this.onDismiss.emit();
  }

  accept() {
    this.onAccept.emit();
    this.dismiss();
  }
}