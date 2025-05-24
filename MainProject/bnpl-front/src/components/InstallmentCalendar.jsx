// src/components/InstallmentCalendar.jsx
import React,{useState, useCallback} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { parseISO } from "date-fns";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const InstallmentCalendar = ({ installments }) => {
  const events = installments.map((inst) => ({
    title: `${inst.amount_due} - ${inst.status}`,
    start: parseISO(inst.due_date),
    end: parseISO(inst.due_date),
    allDay: true,
  }));
 const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substring(0, 10).replace(/-/g, "-")
  ); 
   const handleCalendarNavigate = (date) => {
    const formattedDate = date.toISOString().substring(0, 10).replace(/-/g, "-");
    setTodayDate(formattedDate);
  };

    const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event.title.includes('Paid') && {
        style: {
          backgroundColor: '#22c55e',
        },   
      }),
      ...(event.title.includes('Pending') && {
        style: {
          backgroundColor: '#ca8b04',
        },
    }),
    ...(event.title.includes('Late') && {
        style: {
          backgroundColor: 'red',
        },
    }),
  }),

    []
  )

  return (
    <div style={{ height: 400 }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        views={["month"]}
        date={todayDate}
        style={{ backgroundColor: "white" }}
        onNavigate={handleCalendarNavigate}
        eventPropGetter={eventPropGetter}

      />
    </div>
  );
};

export default InstallmentCalendar;
