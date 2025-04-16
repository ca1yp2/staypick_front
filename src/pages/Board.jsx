import React, { useState } from 'react';
// Board 페이지의 스타일을 위한 CSS 파일
// 나중에 스타일 작업하면서 수정할 수 가능하니. 현재는 파일만 생성
import '../css/Board.css';

/*
  Board 컴포넌트
  - 게시판 제목, 글쓰기 버튼, 게시글 목록을 표시
  - dummy posts 데이터를 useState로 관리
*/
function Board() {
  // 임시 게시글 데이터: 나중에 서버 API 호출로 교체할 예정
  const [posts, setPosts] = useState([
    { id: 1, title: "여기정말 좋네요.", author: "서동현", date: "2025-01-15" },
    { id: 2, title: "후회없는 선택이였습니다.", author: "이소연", date: "2025-01-16" },
    { id: 3, title: "또 예약하러 올게요.", author: "오현덕", date: "2025-02-12" },
    { id: 4, title: "최저가 보장이 맘에 듭니다.", author: "박미영", date: "2025-03-20" },
    { id: 5, title: "고객센터 연락 잘되네요.", author: "김진재", date: "2025-03-22" },
    { id: 6, title: "UI가 너무 맘에듭니다.", author: "주현우", date: "2025-03-29" },
  ]);

  // "글쓰기" 버튼 클릭 시 호출되는 함수
  // 나중에 게시글 작성 페이지(예: BoardWrite.jsx)로 이동하는 로직을 추가할 수 있음
  const handleWrite = () => {
    // 현재는 alert로 간단하게 동작을 확인
    alert("글쓰기 페이지로 이동합니다.");
    // 예: react-router-dom의 useNavigate 사용
    // const navigate = useNavigate();
    // navigate('/board/write');
  };

  return (
    <div className="board">
      {/* 게시판 페이지 제목 */}
      <h1>게시판</h1>

      {/* 글쓰기 버튼 */}
      <button onClick={handleWrite} className="write-button">
        글쓰기
      </button>

      {/* 게시글 목록을 테이블로 구성 */}
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            // 각 게시글에 고유한 id로 key 설정
            <tr key={post.id}>
              {/* 번호는 배열 index에 1을 더해서 출력 */}
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
