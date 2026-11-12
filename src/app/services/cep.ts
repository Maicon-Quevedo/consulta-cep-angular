import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Service()
export class CepService {
    private http = inject(HttpClient);

    buscar(cep: string){
        return this.http.get<{
            cep: string;
            logradouro: string;
            complemento: string;
            unidade: string;
            bairro: string;
            localidade: string;
            uf: string;
            estado: string;
            regiao: string;
            ibge: string;
            gia: string;
            ddd: string;
            siafi: string;
        }>
        (`https://viacep.com.br/ws/${cep}/json/`)
    }
}
