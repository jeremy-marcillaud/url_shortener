import { randomUUID } from 'crypto';

export class LinkDomain {
  constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly hashValue: string,
  ) {}

  static create({ hash, url }: { hash: string; url: string }): LinkDomain {
    return new LinkDomain(randomUUID(), url, hash);
  }
}
