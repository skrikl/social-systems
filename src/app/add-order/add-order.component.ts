import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  requestedURL: string;
  showError = false;
  newOrder: any;
  @ViewChild('close') close;
  @Output() ordersChanged = new EventEmitter();
  constructor(private usersService: UsersService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  handleClick(): void {
    if (this.newOrder) {
      this.addOrder();
      this.ordersChanged.emit();
      this.resetForm();
      this.closeModal();
      return;
    }
    const product = this.validateURL();
    if (product.error) {
      this.showError = true;
    } else {
      this.showError = false;
      // Get user info
      this.usersService.getUserInfo()
      .subscribe (response => {
        const user = response.results[0];
        console.log('getUserInfo response', user);
        this.newOrder = {
          user: {
            name: `${user.name.first} ${user.name.last }`,
            type: this.getProductType(product),
            avatar: user.picture.thumbnail
          },
          vendorLogo: product.vendorLogo,
          services: product.post ? [
            {
              name: 'Лайки',
              icon: '../assets/icons/like.svg',
              currentValue: 0,
              total: 0
            },
            {
              name: 'Репосты',
              icon: '../assets/icons/repost.svg',
              currentValue: 0,
              total: 0
            }
          ] : [
            {
              name: 'Подписчики',
              icon: '../assets/icons/subscribe.svg',
              currentValue: 0,
              total: 0
            }
          ]
        };
        console.log('newOrder ', this.newOrder);
        // Parse user data
        // Pass user object to template
        // Display
      });
    }
  }

  handleCancel(): void {
    this.resetForm();
  }

  getProductType(product): string {
    return `${product.post ? 'Пост' : 'Аккаунт'} ${product.vendor}`;
  }

  closeModal() {
    this.close.nativeElement.click();
  }

  validateURL(): {vendor: string; vendorLogo: string, post: boolean; error: boolean} {
    switch (true) {
      case (this.requestedURL && this.requestedURL.indexOf('vk.com') !== -1):
        return {
          vendor: 'Вконтакте',
          vendorLogo: '../assets/icons/vk.svg',
          post: this.requestedURL.indexOf('post') !== -1 ? true : false,
          error: false
        };
      case (this.requestedURL && this.requestedURL.indexOf('twitter.com') !== -1):
        return {
          vendor: 'Твиттер',
          vendorLogo: '../assets/icons/twitter.svg',
          post: this.requestedURL.indexOf('post') !== -1 ? true : false,
          error: false
        };
      case (this.requestedURL && this.requestedURL.indexOf('instagram.com') !== -1):
        return {
          vendor: 'Инстаграм',
          vendorLogo: '../assets/icons/instagram.svg',
          post: this.requestedURL.indexOf('post') !== -1 ? true : false,
          error: false
        };
    }
    return {
      vendor: '',
      vendorLogo: '',
      post: false,
      error: true
    };
  }

  getSocialIcon(sourceCode): string {
    switch (sourceCode) {
      case 1:
        return '../assets/icons/vk.svg';
      case 2:
        return '../assets/icons/twitter.svg';
      case 3:
        return '../assets/icons/instagram.svg';
    }
  }

  addOrder(): void {
    let state = this.localStorage.loadInitialState();
    if (!state) {
      state = [];
    }
    state.push(this.newOrder);
    this.localStorage.setItem('orders', state);
  }

  resetForm(): void {
    this.requestedURL = '';
    delete this.newOrder;
  }
}
