import { useEffect, useState } from "react";
import { homePageText } from "../constants/constants";
import { infoCards } from "../constants/constants";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const useHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModaSuccesslOpen, setIsModaSucceslOpen] = useState(false);
  const handleReviewSubmit = async ({
    name,
    email,
    gender,
    date,
    message,
    personalData,
  }) => {
    setIsLoading(true);
    try {
      const db = getFirestore();

      const docRef = await addDoc(collection(db, "reviews"), {
        name,
        email,
        gender,
        visitedTime: date,
        message,
        personalData,
      });
      if (docRef.id) {
        setIsLoading(false);
        setIsModaSucceslOpen(true);
      }
    } catch (e) {
      console.error("Error adding document:", e);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0, 
      left: 0, 
      behavior: "smooth", 
    });
  }, []);

  return {
    homePageText,
    infoCards,
    handleReviewSubmit,
    isLoading,
    isModaSuccesslOpen,
    setIsModaSucceslOpen,
  };
};
export default useHomePage;
