export type FetchSuggestionsType = SuggestionsType[];

export interface SuggestionsType {
  symbol: string;
  domain: string;
  name: string;
  type: string;
  slug: string;
}
