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
  const isStartTimeCorrect = (start, end) => {
    let startTime = convertToTimeStamp(start);
    let endTime = convertToTimeStamp(end);
    return endTime < startTime ? true : false;
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

  const validateReservationTime = (startTime, endTime, disabledTimes) => {
    if (!startTime || !endTime) return null;

    if (isTimeOverlapping(startTime, endTime, disabledTimes)) {
      return "The selected time overlaps with an existing reservation.";
    }

    if (isStartTimeCorrect(startTime, endTime)) {
      return "The start time is later than the end time.";
    }

    return null;
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
    isStartTimeCorrect,
    validateReservationTime,
  };
};

export default useTimeFilters;
