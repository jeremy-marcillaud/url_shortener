import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AdResponse {
  id: string;
  imageUrl: string;
  link: string;
  width: number;
  height: number;
}

@Injectable()
export class AdsService {
  constructor(private readonly configService: ConfigService) {}

  async getAd({
    width,
    height,
  }: {
    width: number;
    height: number;
  }): Promise<AdResponse> {
    const apiUrl = this.configService.getOrThrow<string>('ADS_API_URL');
    const token = this.configService.getOrThrow<string>('ADS_API_TOKEN');

    const url = new URL(apiUrl);

    url.searchParams.set('width', String(width));
    url.searchParams.set('height', String(height));

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Ads API responded with status ${response.status}`);
    }

    return response.json() as Promise<AdResponse>;
  }
}
