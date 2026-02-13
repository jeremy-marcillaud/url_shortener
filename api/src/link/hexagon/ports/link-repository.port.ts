import type { LinkDomain } from '../models/domain/link-domain';

import { RedirectLinkViewModel } from '../models/view/redirect-link-view-model';

export interface LinkRepositoryPort {
  findByUrl(url: string): Promise<LinkDomain | null>;
  findByHash(hash: string): Promise<RedirectLinkViewModel | null>;
  save({ link }: { link: LinkDomain }): Promise<void>;
}

export const LINK_REPOSITORY_PORT = Symbol('LinkRepositoryPort');
