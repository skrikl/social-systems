import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  @Input() order;
  data;
  constructor(private localStorage: LocalStorageService) {}
}
