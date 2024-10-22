import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags ,ApiOperation,ApiResponse} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'User have been successfully created',
  })
  @ApiResponse({ status: 500, description: 'Internar server error' })
  
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })

  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users has been successfully retrieved.',
    type: CreateUserDto,
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 1) {
    return this.userService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' }) 
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  }) 
  @ApiResponse({ status: 404, description: 'User not found.' })

  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
