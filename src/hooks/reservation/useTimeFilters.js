import { addMinutes } from "date-fns";

const useTimeFilters = (disabledTimes) => {
  const isTimeOverlapping = (newStart, newEnd) => {
    return disabledTimes.some(
      ({ start, end }) => newStart < end && newEnd > start
    );
  };

  const convertToTimeStamp = (dateStr) => {
    const date = new Date(dateStr);
    return date.getTime();
  };

  const filterTime = (time) => {
    return !isTimeOverlapping(time, addMinutes(time, 15), disabledTimes);
  };

  const isReservationPast = (endTime) => {
    const endTimeMilliseconds =
      endTime.seconds * 1000 + Math.floor(endTime.nanoseconds / 1000000);

    if (endTimeMilliseconds < new Date().getTime()) {
      return endTime;
    }
  };

  function timestampToDate(timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return date.toLocaleString();
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    filterTime,
    isTimeOverlapping,
    isReservationPast,
    timestampToDate,
    formatDate,
    formatTime,
  };
};

export default useTimeFilters;
