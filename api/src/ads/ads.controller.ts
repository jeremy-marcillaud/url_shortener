import { Controller, Get, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { AdsService, AdResponse } from './ads.service';

class GetAdQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly width: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly height: number;
}

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}
  @Get('img')
  async getAd(@Query() query: GetAdQueryDto): Promise<AdResponse> {
    return this.adsService.getAd({ width: query.width, height: query.height });
  }
}
