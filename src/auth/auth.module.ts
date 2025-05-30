import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService,
        // Register the AuthGuard as a global guard
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard
        }
    ],
})
export class AuthModule {}
