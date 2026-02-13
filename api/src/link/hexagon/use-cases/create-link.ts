import type { UniqueIdGeneratorPort } from '../ports/unique-id-generator.port';
import type { LinkRepositoryPort } from '../ports/link-repository.port';
import { LinkDomain } from '../models/domain/link-domain';

export class CreateLink {
  constructor(
    private readonly uniqueIdGenerator: UniqueIdGeneratorPort,
    private readonly linkRepository: LinkRepositoryPort,
  ) {}

  public async execute({
    url,
  }: {
    url: string;
  }): Promise<{ id: bigint; hash: string }> {
    const existing = await this.linkRepository.findByUrl(url);

    if (existing) {
      return {
        id: existing.id,
        hash: existing.hashValue,
      };
    }

    const id = this.uniqueIdGenerator.generate();
    const link = LinkDomain.create({ id, url });

    await this.linkRepository.save({ link });

    return {
      id,
      hash: link.hashValue,
    };
  }
}
