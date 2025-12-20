import React from 'react';
import './Calendar.css';

interface CalendarProps {
  month: string;
  currentDay: number;
  onDayClick?: (day: number) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ month, currentDay, onDayClick }) => {
  // Generate calendar days for June 2024 (simplified)
  const daysInMonth = 30;
  const startDay = 6; // June 1, 2024 is a Saturday
  const weeks = [];

  let dayCounter = 1;

  for (let week = 0; week < 6; week++) {
    const days = [];
    for (let day = 0; day < 7; day++) {
      if ((week === 0 && day < startDay) || dayCounter > daysInMonth) {
        days.push(null);
      } else {
        days.push(dayCounter);
        dayCounter++;
      }
    }
    weeks.push(days);
    if (dayCounter > daysInMonth) break;
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="calendar__header">
        <h3 className="calendar__month">{month}</h3>
      </div>
      <div className="calendar__weekdays">
        {weekDays.map((day, index) => (
          <div key={index} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar__grid">
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`calendar__day ${day === currentDay ? 'calendar__day--current' : ''
                  } ${!day ? 'calendar__day--empty' : ''}`}
                onClick={() => day && onDayClick?.(day)}
                style={{ cursor: day ? 'pointer' : 'default' }}
              >
                {day}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
