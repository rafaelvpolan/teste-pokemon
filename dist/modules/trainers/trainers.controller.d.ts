import { TrainersService } from './services/trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainers } from './entities/trainers.entity';
export declare class TrainersController {
    private readonly trainersService;
    constructor(trainersService: TrainersService);
    create(createTrainerDto: CreateTrainerDto): Promise<Trainers>;
    findAll(): Promise<Trainers[]>;
    findOne(id: string): Promise<Trainers>;
    update(id: string, updateTrainerDto: UpdateTrainerDto): Promise<Trainers>;
    remove(id: string): Promise<void>;
    findByCep(cep: string): Promise<Trainers[]>;
}
