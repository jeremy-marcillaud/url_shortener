import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateLinkDto } from '../dtos/request/create-link.dto';
import { CreateLinkResponseDto } from '../dtos/response/create-link-response.dto';
import { CreateLink } from 'src/link/hexagon/use-cases/create-link';

@Controller('links')
export class LinkController {
  constructor(
    private readonly createLink: CreateLink,
    private readonly configService: ConfigService,
  ) {}

  @Post('shorten')
  async create(@Body() body: CreateLinkDto): Promise<CreateLinkResponseDto> {
    const result = await this.createLink.execute({ url: body.url });
    return {
      id: result.id.toString(),
      shortUrl: `${this.configService.getOrThrow('BASE_URL')}/${result.hash}`,
    };
  }
}
