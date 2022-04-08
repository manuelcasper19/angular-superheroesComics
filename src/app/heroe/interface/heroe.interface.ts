export interface Heroes {
    ok:     boolean;
    heroes: Hero[];
    msg?: string;
    err?: string;
    token?: string;
}

export interface heroesSearch {
    ok: true,
    arrayHeroes: Hero[],
    token: string
}

export interface Hero {
    id?:           string;
    superheroe?:   string;
    aniocreacion?: number;
    personajes?:   string;
    peliculas?:    string;
    uid?:          string;
    url?:          string;
    comics?:       string;
}


export interface VerHeroe {
    ok:           boolean;
    id:           string;
    superheroe:   string;
    aniocreacion: number;
    personajes:   string;
    comics:       string;
    peliculas:    string;
    fotos:        Foto[];
    token:        string;
    uid:          string;
}

export interface Foto {
    _id:        string;
    id_heroe:   string;
    public_id:  string;
    url:        string;
    secure_url: string;
    created_at: Date;
    
}

export interface Heroeeditado {
    ok:           boolean;
    msg:          string;
    id:           string;
    superheroe:   string;
    aniocreacion: string;
    personajes:   string;
    comics:       string;
    peliculas:    string;
    uid:          string;
    token:        string;
}


export interface heroeForm {
    aniocreacion:   string;
    comics:         string
    id:             string;
    peliculas:      string;
    personajes:     string;
    photo:          string;
    superheroe:     string;
    uid:            string;
}