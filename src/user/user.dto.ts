
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description:'The email of the user ',
    example:'john@gmail.com',
  })
  @IsEmail()

  email: string;

  @ApiProperty({
    description:'the password of the user ',
    example:'Brainstation23'
  })
  @IsString()
  @MinLength(6)

  password: string;

  @ApiProperty({
    description:'The name of the user',
    example:'john doe'
  })
  @IsString()
  @IsOptional()


  name: string;
  
  @ApiProperty({
    description:'The address of the user',
    example:'Dhaka,Bangladesh',
  })
  @IsString()

  address:string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'john doe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'the password of the user ',
    example: 'Brainstation23',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'The address of the user',
    example: 'Dhaka,Bangladesh',
  })
  @IsString()
  address?: string;
}
