# MyBookcase
## 팀명
---
🕓 개발 기간 : 2024년 2월 26일 ~ 2024년 3월 3일 (7일)  
👨‍👩‍👧‍👦 개발 인원 : 최소진(P.O), 최수민(S.M), 정예진, 이동천, 안종성


## MyBookList 담당 : 정예진

### 진행 과정과 진행 flow
* 국립중앙도서관의 ISBN api와 사서추천 api를 사용하여 진행.
* 상세 페이지에서 관심목록에 등록( 하트 버튼 )하면 해당 도서의 ISBN 정보를 localStorage에 저장
* My서재 페이지에서 localStorage에 저장된 데이터를 페이지가 로드 될때마다 받아온다.
* ISBN 정보를 api에 ISBN 요청 변수를 이용하여 해당 ISBN의 책 정보(저자, 책 제목 등)을 받는다.
* 구매완료와 읽음의 효과를 다르게 적용하여 사용자의 시각적 인지를 돕는다.

<figure style="display: flex; flex-direction: column; align-items: center;">
  <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/a20effcb-70bf-4f3c-98b6-3c16449f69c4" width="40%" alt="책 상세 페이지(관심등록 후)">
</figure>

<figure>
  <figcaption>책 상세 페이지(관심등록 후)</figcaption>
</figure>

<figure style="display: flex; flex-direction: column; align-items: center;">
  <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/a20effcb-70bf-4f3c-98b6-3c16449f69c4" width="40%" alt="책 상세 페이지(관심등록 후)">
  <figcaption>책 상세 페이지(관심등록 후)</figcaption>
</figure>
