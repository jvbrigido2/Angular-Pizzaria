import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdicionarBairroComponent } from './adicionar-bairro/adicionar-bairro.component';
import { HomeComponent } from './home/home.component';
import { VerBairrosComponent } from './ver-bairros/ver-bairros.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdicionarBairroComponent, VerBairrosComponent, RouterLink, HomeComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PizzariaFront';

}
