import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  datosTop:any = "";
  datosMonedaBuscar:any = "";
  datosMonedaBuscarID:any = "";
  detallesMonedaActual:any = "";
  detalleMonedaActualPrecio:any = "";

  detallesMoneda:boolean = false;
  mostrarMoneda:boolean = false;

  constructor(private http: HttpClient) { }

  peticionAJAXTop() {
    this.http.get("https://api.coingecko.com/api/v3/search/trending").subscribe ( (datos:any) => {
        this.datosTop = datos.coins;
        console.log(datos);
    })
  }

  peticionAJAXBuscar(monedaBuscar:string) {
    console.log(monedaBuscar);
    this.http.get("https://api.coingecko.com/api/v3/search?query=" + monedaBuscar).subscribe ( (datos:any) =>
    {
      this.datosMonedaBuscar = datos.coins;
      this.mostrarMoneda = true;
      console.log(datos);
    })
  }

  peticionAJAXBuscarID(id:any) {
    this.detallesMonedaActual = [];
    this.http.get("https://api.coingecko.com/api/v3/coins/" + id).subscribe ( (datos:any) =>
    {
      this.detallesMonedaActual.push(datos);
      console.log(datos);
      console.log(this.detallesMonedaActual);
    })
  }

}