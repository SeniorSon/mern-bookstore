import { Review } from "./review";

export interface Book {
    _id: string;
    title: string;
    author: string;
    rating: number;
    pages: number;
    genres: string[];
    reviews: Review[];
}