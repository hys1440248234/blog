import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';

@Module({
    imports: [],
    providers: [],
    controllers: [HomeController],
})

export class HomeModule {}
