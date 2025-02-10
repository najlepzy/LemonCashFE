import React from "react";
import { TASK_MANAGER_TEXT } from "@utils/constants";
import { DateFilterProps } from "@interface/tasks/interfaces";

const DateFilter: React.FC<DateFilterProps> = ({
  filterDate,
  setFilterDate,
}) => {
  return (
    <div className="date-filter">
      <label htmlFor="date-input" className="date-filter-label">
        {TASK_MANAGER_TEXT.DATE_LABEL}:
      </label>
      <input
        id="date-input"
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="date-input"
      />
    </div>
  );
};

export default DateFilter;