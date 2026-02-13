import { Injectable } from '@nestjs/common';
import { UniqueIdGeneratorPort } from 'src/link/hexagon/ports/unique-id-generator.port';

@Injectable()
export class SnowflakeIdGenerator implements UniqueIdGeneratorPort {
  private sequence = 0n;
  private lastTimestamp = 0n;

  generate(): bigint {
    let timestamp = BigInt(Date.now());

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & 0xfffn;
      if (this.sequence === 0n) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = BigInt(Date.now());
        }
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    return (timestamp << 12n) | this.sequence;
  }
}
