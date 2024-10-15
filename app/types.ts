export interface GenericResponse {
  Response: string;
  Error: string;
}

export interface MovieSearchResponse extends GenericResponse {
  Search: Movie[];
  totalResults: string;
}

export interface Movie extends GenericResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface RequestParams {
  s?: string;
  type?: string;
  y?: string;
  page?: string;
  i?: string;
}
