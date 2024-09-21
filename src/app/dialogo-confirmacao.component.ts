import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacao',
  template: `
    <div class="container justify-center mt-3">
      <h2>Confirmação de Exclusão</h2>
      <p>Tem certeza de que deseja deletar este bairro?</p>

      <div>
        <button id="confirmar" class="btn btn-primary" (click)="confirmar()">
          Sim
        </button>
        <button id="cancelar" class="btn btn-primary" (click)="fechar()">
          Não
        </button>
      </div>
    </div>
  `,
  styleUrl: './dialogo-confirmacao.component.css',
})
export class DialogoConfirmacaoComponent {
  constructor(public dialogRef: MatDialogRef<DialogoConfirmacaoComponent>) {}

  confirmar() {
    this.dialogRef.close(true);
  }

  fechar() {
    this.dialogRef.close(false);
  }
}
