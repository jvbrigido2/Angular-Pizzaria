import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  private apiUrl = 'https://localhost:7088/api/Bairro';

  constructor(private http: HttpClient) { }

  getBairro(nomeBairro: string): Observable<any> {
     
     const nomeBairroFormatado = nomeBairro.trim().toLowerCase();

     const nomeBairroParam = nomeBairroFormatado.replace(/ /g, '%20');

    return this.http.get<any>(`${this.apiUrl}?nomeBairro=${nomeBairro}`);
  }
}