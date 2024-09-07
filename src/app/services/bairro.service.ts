import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bairro } from '../adicionar-bairro/adicionar-bairro.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BairroService {
  private getBairroNome =
    `${environment.apiLocalUrl}/bairros/bairro`;
  private criarBairro =
    `${environment.apiLocalUrl}/bairros`;
  private getAllBairros =
    `${environment.apiLocalUrl}/bairros`;
  private putBairro =
    `${environment.apiLocalUrl}/bairros/bairro`;
  private deleteBairro =
    `${environment.apiLocalUrl}/bairros/bairro`;

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
    return this.http.get<Bairro[]>(this.getAllBairros); 
  }
  atualizarBairro(id: number, bairro: Bairro): Observable<Bairro> {
    const url = `${this.putBairro}/${id}`; 
    return this.http.put<Bairro>(url, bairro);
  }

  deletarBairro(bairroId: number): Observable<void> {
    const url = `${this.deleteBairro}/${bairroId}`; 
    return this.http.delete<void>(url);
  }
}
