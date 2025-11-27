import { TeamTrainer } from '../../teams/entities/team-trainer.entity';
export declare class Trainers {
    id: number;
    name: string;
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    teamTrainers: TeamTrainer[];
    createdAt: Date;
    updatedAt: Date;
}
