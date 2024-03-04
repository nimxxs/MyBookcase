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
* 삭제시에는 삭제를 윈하는 대상 ISBN을 이용하여 해당 localStorage 정보 삭제

### 📷 이미지 자료 
| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/a20effcb-70bf-4f3c-98b6-3c16449f69c4" height="300"> | <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/da410dbe-a5d0-4ffc-b359-e0628c353ce8" height="300">|
|--------|--------|
| 책 상세 페이지(관심등록 후) | localStorage에 데이터 저장 상황|

| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/1a828473-a784-4d21-91ab-5b1d8966cca4" height="300"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/e2e6c67d-51b4-4a0e-9fe0-7108f605b5a6" height="300">|
|--------|--------|
| MY 서재 페이지 출력결과 | ISBN 정보를 이용하여 찾은 정보|

| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/b73acc43-79be-4e16-afe8-746b61a6fcf2" width="300"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/fe0cfb65-5acd-4427-84a3-5e9589f33b0d" width="300"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/e81edc99-7830-4321-b3db-419823c472c1" width="300">|
|--------|--------|--------|
| 구매 완료 |읽음|구매완료 및 읽음|

| <img src="https://github.com/nimxxs/MyBookcase/assets/112992178/abf8cf38-4bac-4b60-a67f-c13d58b52ab0" height="300" width="400"> | <img src = "https://github.com/nimxxs/MyBookcase/assets/112992178/0df88f01-3a94-4a93-b2ac-457cda3657e1" height="300" width="400">|
|--------|--------|
| 책 삭제 후 다른 책이 없을 경우 (MY서재) | 데이터 삭제 시 localStorage updateData와 삭제 대상 ISBN 출력|








