// export const projects = [
//   {
//     id: "1",
//     title: "하루 1분 명상 앱",
//     category: "모바일 앱",
//     description:
//       "바쁜 일상 속 1분 명상을 도와주는 앱. 현재 UX 개선을 위한 피드백을 모집 중입니다. 초기 사용자 100명을 대상으로 테스트 진행 예정입니다.",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     badge: "NEW",
//     reward: "보상 제공",
//     participants: 243,
//     daysLeft: 3,
//     progress: 75,
//     testerRequirement: "iOS 사용자",
//     testerBadgeType: "required",
//   },
//   {
//     id: "2",
//     title: "AI 여행 플래너",
//     category: "웹 서비스",
//     description:
//       "예산과 취향에 맞춘 여행 계획을 생성해주는 AI 웹 서비스. 정확도 평가와 UI/UX 개선을 위한 테스터 모집 중입니다.",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     badge: "HOT",
//     reward: "최대 5만원",
//     participants: 187,
//     daysLeft: 7,
//     progress: 45,
//     testerRequirement: "여행 애호가",
//     testerBadgeType: "recommended",
//   },
//   {
//     id: "3",
//     title: "픽셀 아트 퍼즐 게임",
//     category: "게임",
//     description:
//       "새로 개발한 캐주얼 퍼즐 게임의 난이도 조절과 게임 밸런스에 대한 피드백을 받고 싶습니다. 안드로이드 버전 테스트 진행 중.",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     participants: 92,
//     daysLeft: 14,
//     progress: 30,
//     testerRequirement: "안드로이드",
//     testerBadgeType: "required",
//   },
//   {
//     id: "4",
//     title: "팀 협업 도구",
//     category: "웹 서비스",
//     description:
//       "원격 팀의 실시간 협업을 위한 웹 기반 도구. 긴급 사용성 테스트를 위한 피드백을 받고 있습니다. 데스크탑 사용자를 우선 모집 중입니다.",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     badge: "URGENT",
//     reward: "보상 제공",
//     participants: 320,
//     daysLeft: 1,
//     progress: 90,
//     testerRequirement: "데스크탑 사용자",
//     testerBadgeType: "required",
//   },
//   {
//     id: "5",
//     title: "AI 문서 요약 도구",
//     category: "AI/ML 프로젝트",
//     description:
//       "긴 문서를 AI가 분석해 핵심 내용을 요약해주는 엔터프라이즈 솔루션. 정확도 테스트와 사용성 평가를 진행합니다.",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     badge: "BEST",
//     reward: "최대 10만원",
//     participants: 512,
//     daysLeft: 1,
//     progress: 90,
//     testerRequirement: "비즈니스 사용자",
//     testerBadgeType: "required",
//   },
//   {
//     id: "6",
//     title: "헬스케어 웨어러블",
//     category: "하드웨어",
//     description:
//       "새로운 건강 모니터링 기능을 탑재한 웨어러블 디바이스. 초기 사용자 테스트 프로그램에 참여할 테스터 모집 중입니다.",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     badge: "EARLY",
//     reward: "제품 증정",
//     participants: 76,
//     daysLeft: 21,
//     progress: 25,
//     testerRequirement: "피트니스 사용자",
//     testerBadgeType: "recommended",
//   },
// ];
// const [feedbacks, setFeedbacks] = useState<Feedback[]>([
//   {
//     id: "f1",
//     user: "김테스터",
//     date: "2023-10-20",
//     rating: 4,
//     text: "매우 유용한 앱이네요. 다만 알림 소리가 조금 크다는 점을 개선하면 좋을 것 같습니다.",
//     avatar: "K",
//   },
// ]);

// const [testers, setTesters] = useState<Tester[]>([
//   {
//     id: "t1",
//     name: "김테스터",
//     joinDate: "2023-10-20",
//     rating: 4,
//     hasFeedback: true,
//     avatar: "K",
//   },
// ]);

// const relatedProjects = [
//   {
//     id: "2",
//     title: "명상 음악 플레이어",
//     category: "모바일 앱",
//     description: "명상에 최적화된 음악 플레이어 앱",
//     imageUrl: "https://example.com/media1.jpg",
//     participants: 187,
//     daysLeft: 7,
//     progress: 45,
//     reward: "3만원 상당 기프티콘",
//   },
// ];
