import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'social-systems';
  orders: Order[];

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    const initialData = this.localStorage.loadInitialState();
    if (initialData) {
      this.orders = initialData;
    } else {
      this.orders = [];
    }
  }

  updateState(): void {
    this.orders = this.localStorage.loadInitialState();
  }
}

export class Order {
  user: {
    name: string;
    type: string;
    avatar: string;
  };
  services: Service[];
}
class Service {
  name: string;
  icon: string;
  currentValue: number;
  total: number;
}
