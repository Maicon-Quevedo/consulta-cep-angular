import { Component, inject } from '@angular/core';
import { CepService } from '../../services/cep';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-endereco',
  styleUrl: './endereco.css',
  templateUrl: './endereco.html',
})
export class Endereco {
  private cepService = inject(CepService);

  cep = '';
  logradouro = '';
  bairro = '';
  uf = '';

  buscarCep(){
    this.cepService.buscar(this.cep).subscribe(
      {
        next: (dados) => {
          this.logradouro = dados.logradouro;
          this.bairro = dados.bairro;
          this.uf = dados.uf;
        }
      }
    )
  }
}