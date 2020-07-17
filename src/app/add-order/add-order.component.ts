import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  requestedURL: string;
  showError = false;
  orderSource: number;

  newOrder: {
      name: string;
      type: string;
      avatar: string;
      services: {
          name: string;
          icon: string;
          currentValue: number;
          total: number;
      }[];
  };
  constructor() { }

  ngOnInit(): void {
  }

  handleClick(): void {
    const validURL = this.isRequestedURLValid();
    if (!validURL) {
      this.showError = true;
    } else {
      // this.getUser();
      this.showError = false;
      this.orderSource = validURL;
    }
  }

  isRequestedURLValid(): number{
    switch (true) {
      case (this.requestedURL && this.requestedURL.indexOf('vk.com') !== -1):
        return 1;
      case (this.requestedURL && this.requestedURL.indexOf('twitter.com') !== -1):
        return 2;
      case (this.requestedURL && this.requestedURL.indexOf('instagram.com') !== -1):
        return 3;
    }
    return 0;
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
}
