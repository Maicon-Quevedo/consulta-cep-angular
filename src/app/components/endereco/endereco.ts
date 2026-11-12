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
  complemento = '';
  unidade = '';
  bairro = '';
  localidade = '';
  uf = '';
  estado = '';
  regiao = '';
  ibge = '';
  gia = '';
  ddd = '';
  siaf = '';

  buscarCep(){
    this.cepService.buscar(this.cep).subscribe(
      {
        next: (dados) => {
          this.logradouro = dados.logradouro;
          this.complemento = dados.complemento;
          this.unidade = dados.unidade;
          this.bairro = dados.bairro;
          this.localidade = dados.localidade;
          this.uf = dados.uf;
          this.estado = dados.estado;
          this.regiao = dados.regiao;
          this.ibge = dados.ibge;
          this.gia = dados.gia;
          this.ddd = dados.ddd;
          this.siaf = dados.siafi;
        }
      }
    )
  }
}