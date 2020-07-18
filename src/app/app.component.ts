import { Component, OnInit } from '@angular/core';
// import { data } from '../assets/data/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'social-systems';
  data = [
    {
      user: {
        name: 'Андрей Иванович',
        type: 'Пост Инстаграм',
        avatar: '../assets/img/avatar1.jpg'
      },
      services: [
        {
          name: 'Лайки',
          icon: '../assets/icons/like.svg',
          currentValue: 10000,
          total: 20000
        },
        {
          name: 'Репосты',
          icon: '../assets/icons/repost.svg',
          currentValue: 10000,
          total: 15000
        }
      ]
    },
    {
      user: {
        name: 'Дмитрий Головаев',
        type: 'Аккаунт Инстаграм',
        avatar: '../assets/img/avatar2.jpg'
      },
      services: [
        {
          name: 'Подписчики',
          icon: '../assets/icons/subscribe.svg',
          currentValue: 0,
          total: 20000
        }
      ]
    }
  ];
  ngOnInit(): void {
    console.log('Initial data', this.data);
  }
}
