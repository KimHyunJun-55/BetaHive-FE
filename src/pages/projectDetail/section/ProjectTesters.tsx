import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../ProjectDetail.module.css";

interface Tester {
  id: string;
  name: string;
  joinDate: string;
  rating: number;
  avatar: string;
}

const ProjectTesters: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [testers, setTesters] = useState<Tester[]>([]);

  // API 연동 예시 (실제 구현시)
  // useEffect(() => {
  //   fetchTesters(projectId).then(data => setTesters(data));
  // }, [projectId]);

  const filteredTesters = testers.filter((tester) =>
    tester.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.testersContent}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="테스터 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch />
      </div>

      <ul className={styles.testerList}>
        {filteredTesters.map((tester) => (
          <li key={tester.id} className={styles.testerItem}>
            <div className={styles.avatar}>{tester.avatar}</div>
            <div>
              <h4>{tester.name}</h4>
              <p>참여일: {tester.joinDate}</p>
            </div>
            <div className={styles.rating}>
              {tester.rating > 0 ? `${tester.rating}/5` : "평가 전"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTesters;
