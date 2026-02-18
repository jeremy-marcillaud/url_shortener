import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateLinkDto } from '../dtos/request/create-link.dto';
import { CreateLinkResponseDto } from '../dtos/response/create-link-response.dto';
import {
  CreateLink,
  UrlNotSafeError,
} from 'src/link/hexagon/use-cases/create-link';

@Controller('links')
export class LinkController {
  constructor(
    private readonly createLink: CreateLink,
    private readonly configService: ConfigService,
  ) {}

  @Post('shorten')
  async create(@Body() body: CreateLinkDto): Promise<CreateLinkResponseDto> {
    try {
      const result = await this.createLink.execute({ url: body.url });
      return {
        id: result.id,
        shortUrl: `${this.configService.getOrThrow('BASE_URL')}/${result.hash}`,
      };
    } catch (error) {
      if (error instanceof UrlNotSafeError) {
        throw new UnprocessableEntityException(
          'URL rejected for security reasons',
        );
      }
      throw error;
    }
  }
}
