import { Repository } from 'typeorm';
import { Trainers } from './entities/trainers.entity';
export declare class TrainersService {
    private userRepository;
    constructor(userRepository: Repository<Trainers>);
    findAll(): Promise<Trainers[]>;
}
