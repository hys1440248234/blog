import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
    imports: [],
    providers: [],
    controllers: [AdminController],
})

export class AdminModule {}
