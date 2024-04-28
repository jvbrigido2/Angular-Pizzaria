import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Bairro } from '../adicionar-bairro/adicionar-bairro.component';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao.component';
import { DialogoEditarComponent } from '../dialogo-editar.component';
import { BairroService } from '../services/bairro.service';

@Component({
  selector: 'app-ver-bairros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-bairros.component.html',
  styleUrls: ['./ver-bairros.component.css'],
})
export class VerBairrosComponent implements OnInit, OnDestroy {
  bairros: Bairro[] = [];
  bairrosOriginais: Bairro[] = [];
  isLoading = false;
  error = '';
  filtroNome: string = '';
  colunaOrdenacao: string = 'name'; // Coluna padrão de ordenação
  direcaoOrdenacao: string = 'asc'; // Direção padrão de ordenação
  private subscription: Subscription | null = null;

  constructor(
    private bairroService: BairroService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAllBairros();
  }

  loadAllBairros() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.subscription = this.bairroService.listarBairros().subscribe({
      next: (bairros: Bairro[]) => {
        this.bairros = bairros;
        this.ordenarBairros(); 
        this.bairrosOriginais = [...bairros];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar bairros:', err);
        this.error =
          'Erro ao carregar bairros. Por favor, tente novamente mais tarde.';
        this.isLoading = false;
      },
    });
  }
  ordenarBairros(): void {
    this.bairros.sort((a, b) => {
      if (this.colunaOrdenacao === 'name') {
        const resultado = a.name.localeCompare(b.name);
        return this.direcaoOrdenacao === 'asc' ? resultado : -resultado;
      } else if (this.colunaOrdenacao === 'valor') {
        const resultado = a.valor - b.valor;
        return this.direcaoOrdenacao === 'asc' ? resultado : -resultado;
      }
      return 0;
    });
  }

  ordenarPor(coluna: string): void {
    if (this.colunaOrdenacao === coluna) {
      this.direcaoOrdenacao = this.direcaoOrdenacao === 'asc' ? 'desc' : 'asc';
    } else {
      this.colunaOrdenacao = coluna;
      this.direcaoOrdenacao = 'asc';
    }
    this.ordenarBairros(); // Reaplica a ordenação ao alterar a coluna ou a direção
  }

  filtrarBairros() {
    const busca = this.filtroNome.trim().toLowerCase(); // Normaliza a busca
    this.bairros = this.bairrosOriginais.filter((b) =>
      b.name.toLowerCase().includes(busca)
    ); // Filtra por nome
  }
  editarBairro(bairro: Bairro) {
    const dialogRef = this.dialog.open(DialogoEditarComponent, {
      data: bairro, // Passa o bairro para o modal
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        // Atualiza o bairro no banco de dados
        this.bairroService
          .atualizarBairro(resultado.id, resultado) // Função de serviço para atualizar
          .subscribe({
            next: () => this.loadAllBairros(), // Recarrega a lista de bairros
            error: (err) => console.error('Erro ao atualizar bairro:', err),
          });
      }
    });
  }
  deletarBairro(bairroId: number) {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent);

    dialogRef.afterClosed().subscribe((confirmacao) => {
      if (confirmacao) {
        // Deletar o bairro
        this.bairroService
          .deletarBairro(bairroId) // Função de serviço para deletar
          .subscribe({
            next: () => this.loadAllBairros(), // Recarrega a lista de bairros
            error: (err) => console.error('Erro ao deletar bairro:', err),
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
