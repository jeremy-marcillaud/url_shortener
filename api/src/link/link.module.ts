import { Module } from '@nestjs/common';
import { LinkController } from './adapters/primary/controllers/link.controller';
import { RedirectController } from './adapters/primary/controllers/redirect.controller';
import { CreateLink } from './hexagon/use-cases/create-link';
import { ResolveLink } from './hexagon/use-cases/resolve-link';
import { HASH_GENERATOR_PORT } from './hexagon/ports/hash-generator.port';
import type { HashGeneratorPort } from './hexagon/ports/hash-generator.port';
import { LINK_REPOSITORY_PORT } from './hexagon/ports/link-repository.port';
import type { LinkRepositoryPort } from './hexagon/ports/link-repository.port';
import { NanoidGenerator } from './adapters/secondary/id-generators/nanoid-generator';
import { SqlLinkRepository } from './adapters/secondary/repositories/sql-link.repository';
import { LinkDomainMapper } from './adapters/secondary/mappers/domain/link-domain-mapper';
import { RedirectLinkViewMapper } from './adapters/secondary/mappers/view/redirect-link-view-mapper';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LinkController, RedirectController],
  providers: [
    LinkDomainMapper,
    RedirectLinkViewMapper,
    {
      provide: HASH_GENERATOR_PORT,
      useClass: NanoidGenerator,
    },
    {
      provide: LINK_REPOSITORY_PORT,
      useClass: SqlLinkRepository,
    },
    {
      provide: CreateLink,
      useFactory: (
        hashGenerator: HashGeneratorPort,
        linkRepository: LinkRepositoryPort,
      ) => new CreateLink(hashGenerator, linkRepository),
      inject: [HASH_GENERATOR_PORT, LINK_REPOSITORY_PORT],
    },
    {
      provide: ResolveLink,
      useFactory: (linkRepository: LinkRepositoryPort) =>
        new ResolveLink(linkRepository),
      inject: [LINK_REPOSITORY_PORT],
    },
  ],
})
export class LinkModule {}
