import User from "./user.interface";

export default interface MovieReview {
    id?: string;
    title?: string;
    body?: string;
    rating?: number;
    movieId?: string;
    userByUserReviewerId?: User;
}
