import { CreateLink } from './create-link';
import type { UniqueIdGeneratorPort } from '../ports/unique-id-generator.port';
import type { LinkRepositoryPort } from '../ports/link-repository.port';
import { LinkDomain } from '../models/domain/link-domain';

describe('CreateLink', () => {
  const idGenerator: UniqueIdGeneratorPort = {
    generate: () => 12345n,
  };

  it('should create a new link and return its id and hash', async () => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    const repository: LinkRepositoryPort = {
      findByUrl: jest.fn().mockResolvedValue(null),
      findByHash: jest.fn().mockResolvedValue(null),
      save: saveMock,
    };
    const useCase = new CreateLink(idGenerator, repository);

    const result = await useCase.execute({ url: 'https://example.com' });

    expect(result.id).toBe(12345n);
    expect(result.hash).toBeDefined();
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  it('should return existing link if url already exists', async () => {
    const existing = LinkDomain.create({ id: 99n, url: 'https://example.com' });
    const saveMock = jest.fn();
    const repository: LinkRepositoryPort = {
      findByUrl: jest.fn().mockResolvedValue(existing),
      findByHash: jest.fn(),
      save: saveMock,
    };
    const useCase = new CreateLink(idGenerator, repository);

    const result = await useCase.execute({ url: 'https://example.com' });

    const expectedHash = existing.hashValue;
    expect(result.id).toBe(99n);
    expect(result.hash).toBe(expectedHash);
    expect(saveMock).not.toHaveBeenCalled();
  });
});
