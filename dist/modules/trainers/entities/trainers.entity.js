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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainers = void 0;
const typeorm_1 = require("typeorm");
const team_trainer_entity_1 = require("../../teams/entities/team-trainer.entity");
let Trainers = class Trainers {
    id;
    name;
    cep;
    street;
    neighborhood;
    city;
    state;
    teamTrainers;
    createdAt;
    updatedAt;
};
exports.Trainers = Trainers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Trainers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainers.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainers.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainers.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainers.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2 }),
    __metadata("design:type", String)
], Trainers.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_trainer_entity_1.TeamTrainer, teamTrainer => teamTrainer.trainer),
    __metadata("design:type", Array)
], Trainers.prototype, "teamTrainers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Trainers.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Trainers.prototype, "updatedAt", void 0);
exports.Trainers = Trainers = __decorate([
    (0, typeorm_1.Entity)('trainers')
], Trainers);
//# sourceMappingURL=trainers.entity.js.map