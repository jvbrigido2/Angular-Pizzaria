import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bairro } from './model/bairro-model';

@Component({
  selector: 'app-dialogo-editar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container  justify-center">
      <h2>Editar Bairro</h2>
      <div>
        <label>Nome do Bairro</label>
      </div>
      <div>
        <input type="text" [(ngModel)]="bairro.name" />
      </div>
      <div>
        <label>Valor</label>
      </div>
      <div>
        <input type="number" [(ngModel)]="bairro.tax" />
      </div>
      <div>
        <button class="btn btn-primary" (click)="salvar()">Salvar</button>
        <button id="cancelar" class="btn btn-secondary" (click)="fechar()">
          Cancelar
        </button>
      </div>
    </div>
  `,
  styleUrl: './dialogo-editar.component.css',
})
export class DialogoEditarComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public bairro: Bairro // Recebe o bairro a ser editado
  ) {}

  fechar() {
    this.dialogRef.close(); // Fecha sem salvar
  }

  salvar() {
    this.dialogRef.close(this.bairro); // Fecha e retorna o bairro atualizado
  }
}
