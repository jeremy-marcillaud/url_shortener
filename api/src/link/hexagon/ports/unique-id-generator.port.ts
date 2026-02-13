export interface UniqueIdGeneratorPort {
  generate(): bigint;
}

export const UNIQUE_ID_GENERATOR_PORT = Symbol('UniqueIdGeneratorPort');
