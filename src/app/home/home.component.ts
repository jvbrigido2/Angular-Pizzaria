import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BairroService } from '../services/bairro.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nomeBairro : string = "";
  bairro: any;
  constructor(private bairroService: BairroService){}
  errorMessage: string = "";
  
  buscarBairro(): void {
    this.bairroService.getBairro(this.nomeBairro)
      .subscribe(
        bairro => {
          this.bairro = bairro;
        },
        error => {
          console.log('Erro ao buscar bairro:', error);
          this.bairro = null;
          this.errorMessage = "Bairro nao foi encontrado";
        }
      );
  }
}
