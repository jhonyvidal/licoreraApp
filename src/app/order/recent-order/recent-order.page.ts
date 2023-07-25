import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.page.html',
  styleUrls: ['./recent-order.page.scss'],
})
export class RecentOrderPage implements OnInit {

  status: string = 'Completado';

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
