type BaseMedia = {
  id: number;
  title: string;
  year: number;
  group?: string;
  genre?: string[];
  poster: string;
  background: string;
  color: string;
};

export type Movie = BaseMedia & {
  type: "movie";
  director: string;
  duration: string;
  description: string;
};

export type SeasonData = {
  id_serie: number;
  season_number: number;
  year: number;
  poster: string;
  color: string;
  background?: string;
  episodes: Array<{ number: number; progress: number }>; // progreso entre 0 y 100
};

export type Serie = BaseMedia & {
  type: "serie";
  seasons: number;
  episodes: number;
  creator: string;
  synopsis: string;
  seasons_data: SeasonData[]; // Optional for series
};

export type Media = Movie | Serie;
