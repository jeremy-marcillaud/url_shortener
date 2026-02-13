import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import {
  LinkNotFoundError,
  ResolveLink,
} from 'src/link/hexagon/use-cases/resolve-link';

@Controller()
export class RedirectController {
  constructor(private readonly resolveLink: ResolveLink) {}

  @Get(':hash')
  async redirect(
    @Param('hash') hash: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await this.resolveLink.execute({ hash });
      res.redirect(302, result.url);
    } catch (error) {
      if (error instanceof LinkNotFoundError) {
        throw new NotFoundException('Short link not found');
      }
      throw error;
    }
  }
}
