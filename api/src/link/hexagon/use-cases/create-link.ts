import type { HashGeneratorPort } from '../ports/hash-generator.port';
import type { LinkRepositoryPort } from '../ports/link-repository.port';
import { LinkDomain } from '../models/domain/link-domain';
import { UrlSafetyCheckerPort } from '../ports/url-safety-checker.port';

export class UrlNotSafeError extends Error {
  constructor(url: string) {
    super(`Url not safe for url: ${url}`);
    this.name = 'UrlNotSafeError';
  }
}

export class CreateLink {
  constructor(
    private readonly hashGenerator: HashGeneratorPort,
    private readonly linkRepository: LinkRepositoryPort,
    private readonly urlSafetyCheckerPort: UrlSafetyCheckerPort,
  ) {}

  public async execute({
    url,
  }: {
    url: string;
  }): Promise<{ id: string; hash: string }> {
    const isSafeUrl = await this.urlSafetyCheckerPort.isSafeUrl({ url });

    if (!isSafeUrl) {
      throw new UrlNotSafeError(url);
    }

    const existing = await this.linkRepository.findByUrl(url);

    if (existing) {
      return {
        id: existing.id,
        hash: existing.hashValue,
      };
    }

    const hash = this.hashGenerator.generate();
    const link = LinkDomain.create({ hash, url });

    await this.linkRepository.save({ link });

    return {
      id: link.id,
      hash: link.hashValue,
    };
  }
}
