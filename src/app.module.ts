import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.typeOrmConfig
        }),

        AuthModule
    ]
})
export class AppModule {}
