import { Module } from '@nestjs/common';
import { LanguageController } from './controllers/language.controller';

@Module({ controllers: [LanguageController] })
export class CommonModule {}
