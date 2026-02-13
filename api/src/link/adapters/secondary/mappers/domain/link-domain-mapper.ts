import { Injectable } from '@nestjs/common';
import { LinkPersistence } from 'src/core/entities/link/link-persistence';
import { LinkDomain as LinkHexagon } from 'src/link/hexagon/models/domain/link-domain';
import { Mapper } from '../mapper';

@Injectable()
export class LinkDomainMapper implements Mapper<LinkPersistence, LinkHexagon> {
  toHexagon(linkPersistence: LinkPersistence): LinkHexagon {
    return new LinkHexagon(
      linkPersistence.id,
      linkPersistence.url,
      linkPersistence.hashValue,
    );
  }

  toPersistence(linkDomain: LinkHexagon): LinkPersistence {
    return {
      id: linkDomain.id,
      url: linkDomain.url,
      hashValue: linkDomain.hashValue,
    };
  }
}
