import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CepService } from './cep.service';

@Module({
  imports: [HttpModule], // IMPORTANTE: importar HttpModule
  providers: [CepService],
  exports: [CepService], // exportar para usar em outros módulos
})
export class CepModule {}