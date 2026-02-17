export interface UrlSafetyCheckerPort {
  isSafeUrl({ url }: { url: string }): Promise<boolean>;
}

export const URL_SAFETY_CHECKER_PORT = Symbol('UrlSafetyCheckerPort');
