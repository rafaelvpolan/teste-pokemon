import { TrainersService } from '../trainers/trainers.service';
export declare class TrainersController {
    private readonly appService;
    constructor(appService: TrainersService);
    getAll(): string;
}
