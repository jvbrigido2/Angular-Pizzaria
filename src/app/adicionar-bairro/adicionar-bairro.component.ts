import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { BairroService } from '../services/bairro.service';
import { Bairro } from '../model/bairro-model';


@Component({
  selector: 'app-adicionar-bairro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adicionar-bairro.component.html',
  styleUrl: './adicionar-bairro.component.css',
})
export class AdicionarBairroComponent implements OnInit {
  bairro: Bairro = { id: '', name: '', tax: 0 };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private bairroService: BairroService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.bairroService
      .adicionarBairro(this.bairro)
      .pipe(
        catchError((error) => {
          if (error.status === 409) {
            this.successMessage = '';
            this.errorMessage = 'Bairro com esse nome já existe.';
            return throwError(error); 
          } else {
            console.error('Erro ao adicionar bairro:', error);
            return throwError(error);
          }
        })
      )
      .subscribe(() => {
        console.log('Bairro adicionado com sucesso!');
        this.errorMessage = '';
        this.successMessage = 'Bairro Criado com Sucesso!';
        this.bairro.name='';
        this.bairro.tax=0;
      });
  }
}
