export interface RawMovie {
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
    category: string;  // From your backend — sometimes genre info
  
    // All other weird backend keys like "Action", "Adventure", etc.
    [key: string]: any; 
  }
  