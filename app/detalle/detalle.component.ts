import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AjaxService } from '../ajax.service';
import { Output,EventEmitter } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  constructor(private route: ActivatedRoute,public ajax:AjaxService, public firestore:FirestoreService) {}
  @Output() lanzaPeticionEvent = new EventEmitter<string>();
    id:any;

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      this.buscarMonedaID();
    }

    buscarMonedaID() {
      this.ajax.peticionAJAXBuscarID(this.id);
      this.lanzaPeticionEvent.emit("Petición en curso");
    }

    seguirMoneda() {
      
    }
}
