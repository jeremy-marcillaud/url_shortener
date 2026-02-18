import { Expose } from 'class-transformer';

export class CreateLinkResponseDto {
  @Expose()
  id: string;

  @Expose()
  shortUrl: string;
}
