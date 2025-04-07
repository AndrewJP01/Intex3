export interface Movie {
    show_id: string;
    type: string;
    title: string;
    director: string;
    cast: string;
    country: string;
    release_year: number;
    rating: string;
    duration: string;
    description: string;
  
    // Category flags — these are integers (0 or 1)
    Action: number;
    Adventure: number;
    "Anime Series International TV Shows": number;
    "British TV Shows Docuseries International TV Shows": number;
    Children: number;
    Comedies: number;
    "Comedies Dramas International Movies": number;
    "Comedies International Movies": number;
    "Comedies Romantic Movies": number;
    "Crime TV Shows Docuseries": number;
    Documentaries: number;
    "Documentaries International Movies": number;
    Docuseries: number;
    Dramas: number;
    "Dramas International Movies": number;
    "Dramas Romantic Movies": number;
    "Family Movies": number;
    Fantasy: number;
    "Horror Movies": number;
    "International Movies Thrillers": number;
    "International TV Shows Romantic TV Shows TV Dramas": number;
    "Kids' TV": number;
    "Language TV Shows": number;
    Musicals: number;
    "Nature TV": number;
    "Reality TV": number;
    Spirituality: number;
    "TV Action": number;
    "TV Comedies": number;
    "TV Dramas": number;
    "Talk Shows TV Comedies": number;
    Thrillers: number;
  }
  