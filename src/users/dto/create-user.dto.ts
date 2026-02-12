import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ type: String, description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ type: String, description: 'Full name' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
