import { Injectable } from '@nestjs/common';
import { UrlSafetyCheckerPort } from 'src/link/hexagon/ports/url-safety-checker.port';

@Injectable()
export class GoogleSafeBrowsingChecker implements UrlSafetyCheckerPort {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async isSafeUrl({ url }: { url: string }): Promise<boolean> {
    // TODO: call Google Safe Browsing API v4
    // https://developers.google.com/safe-browsing/v4/lookup-api
    return true;
  }
}
