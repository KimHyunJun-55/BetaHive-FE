import React from "react";
import {
  FaAward,
  FaBolt,
  FaChartPie,
  FaComment,
  FaGamepad,
  FaGift,
  FaGlobe,
  FaHourglassEnd,
  FaMobileAlt,
  FaPlusCircle,
  FaRobot,
  FaStar,
  FaTasks,
  FaThLarge,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { MenuItem } from "../../types";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  // Context에서 테마 정보 가져오기
  // const { currentTheme, changeTheme } = useTheme();
  const categories: MenuItem[] = [
    { icon: <FaThLarge />, label: "전체 프로젝트", active: true },
    { icon: <FaMobileAlt />, label: "모바일 앱" },
    { icon: <FaGlobe />, label: "웹 서비스" },
    { icon: <FaGamepad />, label: "게임" },
    { icon: <FaRobot />, label: "AI/ML 프로젝트" },
  ];

  const filters: MenuItem[] = [
    { icon: <FaGift />, label: "보상 있는 프로젝트" },
    { icon: <FaBolt />, label: "긴급 테스트" },
    { icon: <FaUsers />, label: "인기 프로젝트" },
    { icon: <FaHourglassEnd />, label: "마감 임박" },
  ];

  const activities: MenuItem[] = [
    { icon: <FaTasks />, label: "참여 중인 프로젝트" },
    { icon: <FaComment />, label: "제출한 피드백" },
    { icon: <FaAward />, label: "받은 보상" },
    { icon: <FaStar />, label: "북마크" },
  ];

  const management: MenuItem[] = [
    { icon: <FaPlusCircle />, label: "새 프로젝트 등록" },
    { icon: <FaChartPie />, label: "프로젝트 분석" },
    { icon: <FaUserFriends />, label: "테스터 관리" },
  ];

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item, index) => (
      <li key={index}>
        <a href="#" className={item.active ? styles.active : ""}>
          {item.icon}
          {item.label}
        </a>
      </li>
    ));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h3>카테고리</h3>
        <ul className={styles.sidebarMenu}>{renderMenuItems(categories)}</ul>
      </div>

      <div className={styles.sidebarSection}>
        <h3>필터</h3>
        <ul className={styles.sidebarMenu}>{renderMenuItems(filters)}</ul>
      </div>

      <div className={styles.sidebarSection}>
        <h3>내 활동</h3>
        <ul className={styles.sidebarMenu}>{renderMenuItems(activities)}</ul>
      </div>

      <div className={styles.sidebarSection}>
        <h3>프로젝트 관리</h3>
        <ul className={styles.sidebarMenu}>{renderMenuItems(management)}</ul>
      </div>
    </aside>
  );
};

export default Sidebar;
