import type { HashGeneratorPort } from '../ports/hash-generator.port';
import type { LinkRepositoryPort } from '../ports/link-repository.port';
import { LinkDomain } from '../models/domain/link-domain';

export class CreateLink {
  constructor(
    private readonly hashGenerator: HashGeneratorPort,
    private readonly linkRepository: LinkRepositoryPort,
  ) {}

  public async execute({
    url,
  }: {
    url: string;
  }): Promise<{ id: string; hash: string }> {
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
