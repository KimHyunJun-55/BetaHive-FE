import React, { useState } from "react";
import styles from "./FilterBar.module.css";
import {
  FaThLarge,
  FaMobileAlt,
  FaGlobe,
  FaGamepad,
  FaGift,
  FaBolt,
  FaHourglassEnd,
} from "react-icons/fa";

const FilterBar: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("전체");

  const filters = [
    { icon: <FaThLarge />, label: "전체" },
    { icon: <FaMobileAlt />, label: "모바일 앱" },
    { icon: <FaGlobe />, label: "웹 서비스" },
    { icon: <FaGamepad />, label: "게임" },
    { icon: <FaGift />, label: "보상 있음" },
    { icon: <FaBolt />, label: "긴급 테스트" },
    { icon: <FaHourglassEnd />, label: "마감 임박" },
  ];

  return (
    <div className={styles.filterContainer}>
      {/* <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>빠른 필터</h3>
        <span className={styles.filterReset} onClick={() => setActiveFilter('전체')}>
          초기화
        </span>
      </div> */}
      <div className={styles.filterBar}>
        {filters.map((filter) => (
          <button
            key={filter.label}
            className={`${styles.filterBtn} ${
              activeFilter === filter.label ? styles.active : ""
            }`}
            onClick={() => setActiveFilter(filter.label)}
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
