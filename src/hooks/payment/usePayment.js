import { useEffect, useState } from "react";

export const usePayment = () => {
  const [hours, setHours] = useState(null);
  const [amount, setAmount] = useState(null);

  const calculateHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 0; // Если даты не заданы
    const millisecondsInHour = 1000 * 60 * 60; // Количество миллисекунд в часе
    const timeDifference = endDate.getTime() - startDate.getTime(); // Разница во времени в миллисекундах
    const hours = timeDifference / millisecondsInHour; // Перевод в часы
    return hours.toFixed(2);
  };
  const calculateAmount = (hours, price) => {
    if (!hours || !price) return 0;
    const amount = hours * price;
    return parseFloat(amount.toFixed(2));
  };

  return {
    calculateHours,
    setHours,
    hours,
    calculateAmount,
    setAmount,
    amount,
  };
};
