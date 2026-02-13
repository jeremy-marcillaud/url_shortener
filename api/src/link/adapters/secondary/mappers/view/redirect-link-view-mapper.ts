import { Injectable } from '@nestjs/common';
import { LinkPersistence } from 'src/core/entities/link/link-persistence';
import { RedirectLinkViewModel } from 'src/link/hexagon/models/view/redirect-link-view-model';
import { ViewMapper } from '../mapper';

@Injectable()
export class RedirectLinkViewMapper implements ViewMapper<
  LinkPersistence,
  RedirectLinkViewModel
> {
  toHexagon(linkPersistence: LinkPersistence): RedirectLinkViewModel {
    return {
      url: linkPersistence.url,
    };
  }
}
