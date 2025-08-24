type BaseMedia = {
  id: number;
  title: string;
  group?: string;
  poster: string;
  background: string;
  color: string;
};

export type Movie = BaseMedia & {
  type: "movie";
  genre?: string; // Optional for movies
  director: string;
  year: number;
  duration: string;
  description: string;
};
export type SeasonSerie = {
  id_serie: number;
  season_number: number;
  year: number;
  poster: string;
  color: string;
  background?: string;
  episodes: number;
};

export type Serie = BaseMedia & {
  type: "serie";
  genre?: string;
  seasons: number;
  episodes: number;
  creator: string;
  synopsis: string;
  seasons_data: SeasonSerie[]; // Optional for series
};

export type Media = Movie | Serie;
