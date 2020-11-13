export interface Genre {
  id: number
  name: string
}

export interface GenreResult {
  genres: Genre[]
}

export interface GenreNormalized {
  [id: string]: Genre
}
