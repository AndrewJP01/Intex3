export interface User {
    user_id: string;
    name: string;
    phone: string;
    email: string;
    age: number;
    gender: string;
  
    // Streaming service flags (0 or 1)
    Netflix: number;
    "Amazon Prime": number;
    "Disney+": number;
    "Paramount+": number;
    Max: number;
    Hulu: number;
    "Apple TV+": number;
    Peacock: number;
  
    // Location data
    city: string;
    state: string;
    zip: number;
  }
  