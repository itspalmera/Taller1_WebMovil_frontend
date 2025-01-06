import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/GetAllProduct/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})

export class SearchBarComponent {
  @Input() pageNumber: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() searchCompleted = new EventEmitter<string>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPreviousPage(): void {
    this.previousPage.emit();
  }

  onNextPage(): void {
    this.nextPage.emit();
  }
}
