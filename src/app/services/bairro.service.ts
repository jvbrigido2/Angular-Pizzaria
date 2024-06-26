import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bairro } from '../adicionar-bairro/adicionar-bairro.component';

@Injectable({
  providedIn: 'root',
})
export class BairroService {
  private getBairroNome =
    'https://app-pizzaria-estrela-2.azurewebsites.net/api/Bairro/nome';
  private criarBairro =
    'https://app-pizzaria-estrela-2.azurewebsites.net/api/Bairro/criar-bairro';
  private getAllBairros =
    'https://app-pizzaria-estrela-2.azurewebsites.net/api/Bairro/todos';
  private putBairro =
    'https://app-pizzaria-estrela-2.azurewebsites.net/api/Bairro/atualizar';
  private deleteBairro =
    'https://app-pizzaria-estrela-2.azurewebsites.net/api/Bairro/deletar';

  constructor(private http: HttpClient) {}

  getBairro(nomeBairro: string): Observable<any> {
    const nomeBairroFormatado = nomeBairro.trim().toLowerCase();

    const nomeBairroParam = nomeBairroFormatado.replace(/ /g, '%20');

    return this.http.get<any>(`${this.getBairroNome}?name=${nomeBairroParam}`);
  }

  adicionarBairro(bairro: Bairro): Observable<any> {
    bairro.name = bairro.name.trim().toLowerCase();
    return this.http.post<any>(this.criarBairro, bairro);
  }

  listarBairros(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(this.getAllBairros); // Retorna todos os bairros
  }
  atualizarBairro(id: number, bairro: Bairro): Observable<Bairro> {
    // Espera um ID e dados do bairro
    const url = `${this.putBairro}/${id}`; // Constrói a URL para a atualização
    return this.http.put<Bairro>(url, bairro); // Faz uma requisição PUT com o bairro atualizado
  }

  deletarBairro(bairroId: number): Observable<void> {
    const url = `${this.deleteBairro}/${bairroId}`; // URL para deletar pelo ID
    return this.http.delete<void>(url); // Retorna uma chamada de exclusão
  }
}
