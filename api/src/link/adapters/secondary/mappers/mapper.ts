export interface Mapper<TPersistence, THexagon> {
  toPersistence(hexagon: THexagon): TPersistence;
  toHexagon(persistence: TPersistence): THexagon;
}

export interface ViewMapper<TPersistence, TView> {
  toHexagon(persistence: TPersistence): TView;
}
