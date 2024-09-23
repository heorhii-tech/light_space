import { homePageText } from "../constants/constants";
import { infoCards } from "../constants/constants";

const useHomaPage = () => {
  const handleReviewSubmit = (data) => {
    console.log(data);
  };
  return { homePageText, infoCards, handleReviewSubmit };
};
export default useHomaPage;
