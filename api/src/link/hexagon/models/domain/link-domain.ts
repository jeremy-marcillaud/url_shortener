import { toBase62 } from '../../utils/base62';

export class LinkDomain {
  constructor(
    public readonly id: bigint,
    public readonly url: string,
    public readonly hashValue: string,
  ) {}

  static create({ id, url }: { id: bigint; url: string }): LinkDomain {
    return new LinkDomain(id, url, toBase62(id));
  }
}
