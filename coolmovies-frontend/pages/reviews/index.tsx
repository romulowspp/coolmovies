import { NextPage } from "next";
import MovieReviews from "../../components/MoviewReviews";
import { useRouter } from "next/router";

const Reviews: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
        <MovieReviews />
        </>
    );
};

export default Reviews;