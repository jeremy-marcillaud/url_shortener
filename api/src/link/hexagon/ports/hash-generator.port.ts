export interface HashGeneratorPort {
  generate(): string;
}

export const HASH_GENERATOR_PORT = Symbol('HashGeneratorPort');
