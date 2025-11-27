// cep/cep.service.ts
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ViaCepResponse } from './viacep-response.interface';

@Injectable()
export class CepService {
  private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private readonly httpService: HttpService) {}

  async findCep(cep: string): Promise<ViaCepResponse> {
    // Remover caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Validar formato do CEP
    if (cepLimpo.length !== 8) {
      throw new BadRequestException('CEP deve conter 8 dígitos');
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ViaCepResponse>(`${this.baseUrl}/${cepLimpo}/json/`)
      );

      // ViaCEP retorna { erro: true } quando CEP não existe
      if (data.erro) {
        throw new HttpException('CEP não encontrado', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Erro ao consultar CEP',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  // Validar se CEP existe
  async checkCep(cep: string): Promise<boolean> {
    try {
      await this.findCep(cep);
      return true;
    } catch {
      return false;
    }
  }
}