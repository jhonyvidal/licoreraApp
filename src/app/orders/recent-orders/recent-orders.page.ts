import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersData } from 'src/shared/domain/response/OrdersData';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.page.html',
  styleUrls: ['./recent-orders.page.scss'],
})
export class RecentOrdersPage implements OnInit {

  orders: OrdersData[] = [];

  constructor(private location: Location) { }

  ngOnInit() {
    this.orders.push({
      date: 'hola',
      address: 'string',
      products: 6,
      total: 100,
      status: 'Completado'
    },
    {
      date: 'hola',
      address: 'string',
      products: 6,
      total: 100,
      status: 'Cancelado'
    },
    {
      date: 'hola',
      address: 'string',
      products: 6,
      total: 100,
      status: 'Rechazado'
    },
    )
  }

  goBack(): void {
    this.location.back();
  }

}
