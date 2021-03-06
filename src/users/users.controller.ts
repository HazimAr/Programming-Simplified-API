import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) { }

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		const user = await this.usersService.findOneByEmail(req.user.email);
		user.password = undefined;
		return user;
	}

	// @Post('activate')
	// async activateAccount(@Body() activateDto: ActivateAccountDto) {
	// 	if (await this.jwtService.verifyAsync(activateDto.token)) {
	// 		const res = await this.usersService.insert(await this.jwtService.decode(activateDto.token));
	// 		if (res == 'CONFLICT') throw new ConflictException({
	// 			message: 'CONFLICT'
	// 		});
	// 		if (res == 'ERROR') throw new BadRequestException({
	// 			message: 'uh oh'
	// 		});
	// 		return {
	// 			message: res
	// 		};
	// 	}
	// }
}
