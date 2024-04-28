import { Routes } from '@angular/router';
import { AdicionarBairroComponent } from './adicionar-bairro/adicionar-bairro.component';
import { HomeComponent } from './home/home.component';
import { VerBairrosComponent } from './ver-bairros/ver-bairros.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adicionar-bairro', component: AdicionarBairroComponent },
  { path: 'ver-bairros', component: VerBairrosComponent }
];
