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
            bairro: string;
            uf: string;
        }>
        (`https://viacep.com.br/ws/${cep}/json/`)
    }
}
