import { Routes } from '@angular/router';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { CarteraComponent } from './cartera/cartera.component';
import { DetalleComponent } from './detalle/detalle.component';

export const routes: Routes = [
    {path: '',redirectTo: 'cuerpo',pathMatch: 'full'},
    {path: 'cuerpo',component:CuerpoComponent},
    {path: 'cartera',component: CarteraComponent},
    {path: 'detalle/:id',component: DetalleComponent},
];
