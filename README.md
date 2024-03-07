# MyBookcase
## 팀명
---
🕓 개발 기간 : 2024년 2월 26일 ~ 2024년 3월 3일 (7일)  
👨‍👩‍👧‍👦 개발 인원 : 최소진(P.O), 최수민(S.M), 정예진, 이동천, 안종성
📖 개발 목표 : 사용자가 책을 검색하고, 구매 or 관심 있는 책을 찜할 수 있다. 

<br>
<br>
<br>
<h2>🔍 search 담당 : 최수민</h2> 
---
### 진행 과정과 진행 flow
* 검색창을 모달창으로 구현함.
* 국립중앙도서관의 사서추천 api를 사용하여 진행.
* 사서추천 api가 xml만 지원 해주기에 json으로 변환.
* header.html을 search.html과 연결하기 위해 includs.js를 만들어 html끼리 연결.
* 그래서 search.js에서 전역스코프와 initSearch함수의 흐름이 중요함.
* header.html에 있는 검색창을 이용하여 검색창 구현 -> 모든 페이지에서 검색이 가능해야함. -> 연결 완료.
* 사서추천 api가 검색 기능을 지원 안하기 때문에 검색창의 value 값을 받아와 포함되어 있는 검색어를 찾음.
* pagination을 만들어 검색한 모든 책들이 나와야함.

### 📷 이미지 자료 
| <img src="https://github.com/nimxxs/MyBookcase/assets/132239456/e8427132-38c7-449f-9678-84d97ed86c33" height="200"> | <img src="https://github.com/nimxxs/MyBookcase/assets/132239456/b8041f46-2aa9-4aae-bf11-994953e963de" height="200"> |
|--------|--------|
| 메인페이지에서 검색하기 | 검색어가 없을시 alert 창 |

| <img src="https://github.com/nimxxs/MyBookcase/assets/132239456/df8910c1-1f5d-4425-ab7d-a4c1ac0bfe14" height="200"> |
|--------|--------|
| pagination |

## 📖 🧾 MyBookList 담당 : 정예진
---

### 진행 과정과 진행 flow
* 국립중앙도서관의 ISBN api와 사서추천 api를 사용하여 진행.
* 상세 페이지에서 관심목록에 등록( 하트 버튼 )하면 해당 도서의 ISBN 정보를 localStorage에 저장
* My서재 페이지에서 localStorage에 저장된 데이터를 페이지가 로드 될때마다 받아온다.
* ISBN 정보를 api에 ISBN 요청 변수를 이용하여 해당 ISBN의 책 정보(저자, 책 제목 등)을 받는다.
* 구매완료와 읽음의 효과를 다르게 적용하여 사용자의 시각적 인지를 돕는다.
* 삭제시에는 삭제를 윈하는 대상 ISBN을 이용하여 해당 localStorage 정보 삭제

### 📷 이미지 자료 
| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/a20effcb-70bf-4f3c-98b6-3c16449f69c4" height="200"> | <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/da410dbe-a5d0-4ffc-b359-e0628c353ce8" height="200">|
|--------|--------|
| 책 상세 페이지(관심등록 후) | localStorage에 데이터 저장 상황|

| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/1a828473-a784-4d21-91ab-5b1d8966cca4" height="200"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/e2e6c67d-51b4-4a0e-9fe0-7108f605b5a6" height="200">|
|--------|--------|
| MY 서재 페이지 출력결과 | ISBN 정보를 이용하여 찾은 정보|

| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/b73acc43-79be-4e16-afe8-746b61a6fcf2" width="300"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/fe0cfb65-5acd-4427-84a3-5e9589f33b0d" width="300"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/e81edc99-7830-4321-b3db-419823c472c1" width="300">|
|--------|--------|--------|
| 구매 완료 |읽음|구매완료 및 읽음|

| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/abf8cf38-4bac-4b60-a67f-c13d58b52ab0" height="150" width="300"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/0df88f01-3a94-4a93-b2ac-457cda3657e1" height="150" width="300">|
|--------|--------|
| 책 삭제 후 다른 책이 없을 경우 (MY서재) | 데이터 삭제 시 localStorage updateData와 삭제 대상 ISBN 출력|

### 아쉬운 부분
* 국립중앙도서관의 ISBN api에는 책표지가 등록되지 않은 것들이 많아 이미지를 불러오지 못해서 아쉬웠다
(대체 방법으로 책 배경 이미지를 골라 이미지가 없는 책들의 이미지를 대체했다.)
* ISBN api에서 이미지가 없는 것은 사서추천 api에서 검색하여 가져오고 싶었지만 사서추천 api는 검색이 불가했다.
* 국립도서관 ISBN api에는 null과 빈값으로 처리되어 있는 데이터가 많아 다양한 데이터 활용을 못한 것이 아쉬웠다.

### 문제해결
* api 데이터를 받아오는 과정에서 보안상의 이유로 cors에러가 발생했다.

-> Node.js 및 Express.js 설치하여 문제 해결 시도 -> 실패 후 팀원과의 회의
-> 프록시 설정 실패 -> 확장된 커뮤니티의 질문을 통해 프록시 문제 해결로 cors에러 해결  




