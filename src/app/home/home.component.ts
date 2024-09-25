import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BairroService } from '../services/bairro.service';
import { Bairro } from '../model/bairro-model';
import * as stringSimilarity from 'string-similarity';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  nomeBairro : string = "";
  bairro: any;
  errorMessage: string = "";
  bairros: Bairro [] = [];
  bairrosFiltrados: Bairro [] = [];
  sugestao: string | null = null; // Define a sugestão como null inicialmente

  constructor(private bairroService: BairroService){}

  ngOnInit(): void {
    this.bairroService.listarBairros().subscribe(
      (bairros) => {
        this.bairros = bairros;
        this.bairrosFiltrados = bairros;
      },
      (error) => {
        this.errorMessage = "Erro ao carregar os bairros.";
      }
    );
  }

  filtrarBairros(): void {
    this.bairrosFiltrados = this.bairros.filter((bairro) =>
      bairro.name.toLowerCase().includes(this.nomeBairro.toLowerCase())
    );
  }

  buscarBairro(): void {
    const bairroEncontrado = this.bairros.find(b => 
      b.name.toLowerCase() === this.nomeBairro.toLowerCase()
    );

    if (bairroEncontrado) {
      this.bairro = bairroEncontrado;
      this.errorMessage = ""; // Limpa a mensagem de erro
      this.sugestao = null; // Limpa a sugestão
    } else {
      this.bairro = null;
      this.sugerirBairro(this.nomeBairro); // Chama o método para sugerir um bairro similar
    }
  }

  sugerirBairro(nome: string): void {
    const melhoresCorrespondencias = stringSimilarity.findBestMatch(
      nome.toLowerCase(),
      this.bairros.map(b => b.name.toLowerCase())
    );
    const melhorResultado = melhoresCorrespondencias.bestMatch;

    if (melhorResultado.rating >= 0.5) {
      this.sugestao = this.bairros.find(
        b => b.name.toLowerCase() === melhorResultado.target
      )?.name || null;
      this.errorMessage = ""; // Limpa a mensagem de erro
    } else {
      this.sugestao = null; // Nenhuma sugestão válida encontrada
      this.errorMessage = "Bairro não foi encontrado.";
    }
  }

  aplicarSugestao(sugestao: string): void {
    this.nomeBairro = sugestao;
    this.buscarBairro();
  }
}
