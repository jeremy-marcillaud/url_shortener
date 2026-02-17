import { CreateLink, UrlNotSafeError } from './create-link';
import type { HashGeneratorPort } from '../ports/hash-generator.port';
import type { LinkRepositoryPort } from '../ports/link-repository.port';
import type { UrlSafetyCheckerPort } from '../ports/url-safety-checker.port';
import { LinkDomain } from '../models/domain/link-domain';

describe('CreateLink', () => {
  const hashGenerator: HashGeneratorPort = {
    generate: () => 'kA9b2xLq',
  };

  const safeUrlChecker: UrlSafetyCheckerPort = {
    isSafeUrl: jest.fn().mockResolvedValue(true),
  };

  it('should create a new link and return its id and hash', async () => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    const repository: LinkRepositoryPort = {
      findByUrl: jest.fn().mockResolvedValue(null),
      findByHash: jest.fn().mockResolvedValue(null),
      save: saveMock,
    };
    const useCase = new CreateLink(hashGenerator, repository, safeUrlChecker);

    const result = await useCase.execute({ url: 'https://example.com' });

    expect(result.id).toBeDefined();
    expect(result.hash).toBe('kA9b2xLq');
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  it('should return existing link if url already exists', async () => {
    const existing = LinkDomain.create({
      hash: 'xY3mNpQr',
      url: 'https://example.com',
    });
    const saveMock = jest.fn();
    const repository: LinkRepositoryPort = {
      findByUrl: jest.fn().mockResolvedValue(existing),
      findByHash: jest.fn(),
      save: saveMock,
    };
    const useCase = new CreateLink(hashGenerator, repository, safeUrlChecker);

    const result = await useCase.execute({ url: 'https://example.com' });

    expect(result.id).toBe(existing.id);
    expect(result.hash).toBe('xY3mNpQr');
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('should throw UrlNotSafeError if url is unsafe', async () => {
    const unsafeUrlChecker: UrlSafetyCheckerPort = {
      isSafeUrl: jest.fn().mockResolvedValue(false),
    };
    const saveMock = jest.fn();
    const repository: LinkRepositoryPort = {
      findByUrl: jest.fn(),
      findByHash: jest.fn(),
      save: saveMock,
    };
    const useCase = new CreateLink(hashGenerator, repository, unsafeUrlChecker);

    await expect(
      useCase.execute({ url: 'https://malicious.com' }),
    ).rejects.toThrow(UrlNotSafeError);
    expect(saveMock).not.toHaveBeenCalled();
  });
});
