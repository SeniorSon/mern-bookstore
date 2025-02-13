export interface Review {
    name: string;
    body: string;
  }
  
  export interface Book {
    _id: string;
    title: string;
    author: string;
    rating: number;
    pages: number;
    genres: string[];
    reviews: Review[];
  }