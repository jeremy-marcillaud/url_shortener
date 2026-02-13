import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { LinkDomain } from 'src/link/hexagon/models/domain/link-domain';
import { LinkRepositoryPort } from 'src/link/hexagon/ports/link-repository.port';
import * as schema from '../../../../core/entities/index';
import { LinkDomainMapper } from '../mappers/domain/link-domain-mapper';
import { eq } from 'drizzle-orm';
import { RedirectLinkViewMapper } from '../mappers/view/redirect-link-view-mapper';
import { RedirectLinkViewModel } from 'src/link/hexagon/models/view/redirect-link-view-model';

@Injectable()
export class SqlLinkRepository implements LinkRepositoryPort {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly linkDomainMapper: LinkDomainMapper,
    private readonly redirectLinkViewMapper: RedirectLinkViewMapper,
  ) {}

  public async findByUrl(url: string): Promise<LinkDomain | null> {
    const row = await this.database.query.links.findFirst({
      where: eq(schema.links.url, url),
    });

    if (!row) return null;

    return this.linkDomainMapper.toHexagon({
      id: row.id,
      url: row.url,
      hashValue: row.hashValue,
    });
  }

  public async findByHash(hash: string): Promise<RedirectLinkViewModel | null> {
    const row = await this.database.query.links.findFirst({
      where: eq(schema.links.hashValue, hash),
    });

    if (!row) return null;

    return this.redirectLinkViewMapper.toHexagon({
      id: row.id,
      url: row.url,
      hashValue: row.hashValue,
    });
  }

  public async save({ link }: { link: LinkDomain }): Promise<void> {
    const linkDomainToPersistence = this.linkDomainMapper.toPersistence(link);

    await this.database.insert(schema.links).values({
      id: linkDomainToPersistence.id,
      url: linkDomainToPersistence.url,
      hashValue: linkDomainToPersistence.hashValue,
    });
  }
}
