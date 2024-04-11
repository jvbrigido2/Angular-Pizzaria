import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BairroService } from './services/bairro.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PizzariaFront';
  nomeBairro : string = "";
  bairro: any;
  constructor(private bairroService: BairroService){}
  
  buscarBairro(): void {
    this.bairroService.getBairro(this.nomeBairro)
      .subscribe(
        bairro => {
          this.bairro = bairro;
        },
        error => {
          console.log('Erro ao buscar bairro:', error);
        }
      );
  }
}
