/* eslint-disable @typescript-eslint/ban-types */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	config();
	const app = await NestFactory.create(AppModule, {
		logger: ['log', 'error', 'warn']
	});
	app.enableCors();
	if (process.env.USE_CSRF == 'true') {
		app.use(cookieParser());
		app.use(csurf({ cookie: true }));
	}
	app.use((helmet as unknown as Function)() );
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT ?? 8081);
}

bootstrap();
