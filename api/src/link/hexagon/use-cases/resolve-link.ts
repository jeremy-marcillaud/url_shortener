import type { LinkRepositoryPort } from '../ports/link-repository.port';

export class LinkNotFoundError extends Error {
  constructor(hash: string) {
    super(`Link not found for hash: ${hash}`);
    this.name = 'LinkNotFoundError';
  }
}

export class ResolveLink {
  constructor(private readonly linkRepository: LinkRepositoryPort) {}

  public async execute({ hash }: { hash: string }): Promise<{ url: string }> {
    const link = await this.linkRepository.findByHash(hash);

    if (!link) {
      throw new LinkNotFoundError(hash);
    }

    return { url: link.url };
  }
}
