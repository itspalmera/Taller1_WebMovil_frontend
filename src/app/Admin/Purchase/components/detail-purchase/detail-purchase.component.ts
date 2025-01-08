import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-purchase',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './detail-purchase.component.html',
  styleUrl: './detail-purchase.component.css'
})
export class DetailPurchaseComponent {
  @Input() isModalOpen: boolean = false; // Recibe el estado del modal desde el componente padre
  @Input() modalData: any; // Recibe los datos de la compra desde el componente padre
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  // Método para cerrar el modal
  // Emitir el evento para cerrar el modal
  closeModal() {
    this.close.emit();
  }
}
