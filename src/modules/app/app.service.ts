import { Injectable } from '@nestjs/common';

/**
 * Serviço principal da aplicação
 * Contém métodos gerais e de boas-vindas
 */
@Injectable()
export class AppService {
  /**
   * Retorna uma mensagem de boas-vindas em HTML
   * @returns Mensagem HTML de boas-vindas
   */
  getHello(): string {
    return '<h1>Hello World!</h1>';
  }
}