import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AjaxService } from '../ajax.service';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cartera.component.html',
  styleUrl: './cartera.component.css'
})
export class CarteraComponent implements OnInit {
  monedaBuscar:string = "";
  @Output() lanzaPeticionEvent = new EventEmitter<string>();

  constructor(public ajax:AjaxService) {
      
  }

  ngOnInit(): void {
    this.trendingCoins();
  }

  buscarMoneda() {
    this.ajax.peticionAJAXBuscar(this.monedaBuscar);
    this.lanzaPeticionEvent.emit("Petición en curso");
  }

  trendingCoins() {
    this.ajax.peticionAJAXTop();
    this.lanzaPeticionEvent.emit("Petición en curso");
  }
  
  buscarMonedaID(id:any) {
    this.ajax.peticionAJAXBuscarID(id);
    this.lanzaPeticionEvent.emit("Petición en curso");
  }

  verID(id:any) {
    console.log(id);
  }
  

}
