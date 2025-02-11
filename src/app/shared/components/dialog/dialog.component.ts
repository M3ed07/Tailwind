import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() mode: 'add' | 'edit' | 'details' = 'add';
  @Input() tableHeader: any[] = [];
  @Input() formData: any = {};
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  handleSave() {
    this.onSave.emit(this.formData);
    this.onClose.emit();
  }

  closeDialog() {
    this.onClose.emit();
  }
}
