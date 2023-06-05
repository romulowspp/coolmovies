import User from "./user.interface";

export default interface MovieReviewInput {
    title?: string;
    body?: string;
    rating?: number;
    movieId?: string;
    userReviewerId?: string;
}
