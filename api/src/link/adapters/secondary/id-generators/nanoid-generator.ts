import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import type { HashGeneratorPort } from 'src/link/hexagon/ports/hash-generator.port';

@Injectable()
export class NanoidGenerator implements HashGeneratorPort {
  generate(): string {
    return nanoid(8);
  }
}
