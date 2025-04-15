import React from "react";
import styles from "./FilterBar.module.css";
import {
  FaMobileAlt,
  FaGlobe,
  FaGift,
  FaHourglassEnd,
  FaBolt,
  FaGamepad,
} from "react-icons/fa";
import { FilterType } from "../../type/types";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters = [
  { icon: <FaMobileAlt />, label: "모바일 앱", value: FilterType.MOBILE },
  { icon: <FaGlobe />, label: "웹 서비스", value: FilterType.WEB },
  { icon: <FaGift />, label: "보상 있음", value: FilterType.REWARD },
  { icon: <FaBolt />, label: "테스트 진행중", value: FilterType.IN_PROGRESS },
  {
    icon: <FaHourglassEnd />,
    label: "테스트 종료",
    value: FilterType.COMPLETED,
  },
  { icon: <FaGamepad />, label: "수정중", value: FilterType.MODIFYING },
];
const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === FilterType.ALL ? styles.active : ""
          }`}
          onClick={() => onFilterChange(FilterType.ALL)}
        >
          전체
        </button>

        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`${styles.filterBtn} ${
              activeFilter === filter.value ? styles.active : ""
            }`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
