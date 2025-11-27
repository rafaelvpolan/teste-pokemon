"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trainers_service_1 = require("./services/trainers.service");
const create_trainer_dto_1 = require("./dto/create-trainer.dto");
const update_trainer_dto_1 = require("./dto/update-trainer.dto");
const trainers_entity_1 = require("./entities/trainers.entity");
let TrainersController = class TrainersController {
    trainersService;
    constructor(trainersService) {
        this.trainersService = trainersService;
    }
    create(createTrainerDto) {
        return this.trainersService.create(createTrainerDto);
    }
    findAll() {
        return this.trainersService.findAll();
    }
    findOne(id) {
        return this.trainersService.findOne(+id);
    }
    update(id, updateTrainerDto) {
        return this.trainersService.update(+id, updateTrainerDto);
    }
    remove(id) {
        return this.trainersService.remove(+id);
    }
    findByCep(cep) {
        return this.trainersService.findByCep(cep);
    }
};
exports.TrainersController = TrainersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar um novo treinador',
        description: 'Cria um novo treinador. O CEP é validado e as informações de endereço são preenchidas automaticamente via ViaCEP'
    }),
    (0, swagger_1.ApiBody)({ type: create_trainer_dto_1.CreateTrainerDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Treinador criado com sucesso',
        type: trainers_entity_1.Trainers
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'CEP inválido ou dados inválidos'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trainer_dto_1.CreateTrainerDto]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os treinadores',
        description: 'Retorna todos os treinadores cadastrados'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de treinadores retornada com sucesso',
        type: [trainers_entity_1.Trainers]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar treinador por ID',
        description: 'Retorna um treinador específico pelo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID do treinador',
        example: 1,
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treinador encontrado com sucesso',
        type: trainers_entity_1.Trainers
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treinador não encontrado'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar treinador',
        description: 'Atualiza os dados de um treinador existente'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID do treinador',
        example: 1,
        type: Number
    }),
    (0, swagger_1.ApiBody)({ type: update_trainer_dto_1.UpdateTrainerDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Treinador atualizado com sucesso',
        type: trainers_entity_1.Trainers
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treinador não encontrado'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trainer_dto_1.UpdateTrainerDto]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Deletar treinador',
        description: 'Remove um treinador. Só é possível deletar se não houver times associados'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID do treinador',
        example: 1,
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Treinador deletado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Treinador não encontrado'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Não é possível deletar. Treinador possui times associados'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('cep/:cep'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar treinadores por CEP',
        description: 'Retorna todos os treinadores que possuem o CEP especificado'
    }),
    (0, swagger_1.ApiParam)({
        name: 'cep',
        description: 'CEP a ser buscado (formato: 00000-000 ou 00000000)',
        example: '01310-100'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de treinadores com o CEP especificado',
        type: [trainers_entity_1.Trainers]
    }),
    __param(0, (0, common_1.Param)('cep')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "findByCep", null);
exports.TrainersController = TrainersController = __decorate([
    (0, swagger_1.ApiTags)('trainers'),
    (0, common_1.Controller)('trainers'),
    __metadata("design:paramtypes", [trainers_service_1.TrainersService])
], TrainersController);
//# sourceMappingURL=trainers.controller.js.map