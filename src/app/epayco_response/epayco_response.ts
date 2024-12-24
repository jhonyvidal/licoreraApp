import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'epayco-response',
  templateUrl: './epayco_response.html',
  styleUrls: ['./epayco_response.scss'],
})
export class EpaycoResponse implements OnInit {
  ngOnInit() {
    setTimeout(function () {
      // Redirige automáticamente a la aplicación
      window.location.href = "tresjotas://home";
    }, 1000);
  }
}
