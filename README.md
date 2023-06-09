## 서울시 도서관 이용시간 안내

서울시 도서관 이용시간을 안내해주는 웹 사이트입니다.

✔ **웹 사이트 소개**

- 서울시 도서관 이용시간을 안내해주는 웹 사이트입니다.
- 검색 엔진 최적화(SEO) 구현을 위해 제작되었습니다.
- PC와 모바일 모두에서 이용할 수 있는 반응형 웹 페이지입니다.
- 배포 Page : https://seoul-library-info-project.vercel.app/

✔ **개요**

- 개발 인원 : 1인 (개인 프로젝트)
- 개발 기간 : 2023.04.
- 개발 목적 : Next.js로 검색 엔진 최적화 구현

✔ **사용 기술**

| 기술         | 사용한 이유                                                                            |
| ------------ | -------------------------------------------------------------------------------------- |
| TypeScript   | JavaScript와 달리, 타입을 지정하여 에러를 사전에 방지할 수 있기 때문에 사용하였습니다. |
| Next.js      | SSR을 이용하여 검색엔진 최적화를 구현하기 위해 사용하였습니다.                         |
| Tailwind CSS | 기존의 CSS보다 효율적이고 반응형 디자인이 간편하다는 장점이 있어 사용하였습니다.       |

✔ **기능**

- **구 선택 후 리스트 클릭**
  - 리스트를 클릭하면 도서관 운영시간 정보에 대해 확인할 수 있습니다.
  - [pages/index.tsx](https://github.com/kjindev/LibraryProject/blob/main/pages/index.tsx)에 해당 코드가 작성되어 있습니다.

✔ **검색엔진 최적화**

- Next.js의 getServerSideProps를 사용하여 API 데이터를 서버에서 미리 렌더링하였습니다. html 문서에 데이터를 미리 렌더링하여 SEO에 유리합니다.
- Next.js의 Head 태그를 이용하여 meta 태그를 삽입하였습니다. og 태그를 이용하여 SNS에 링크가 공유될 때 미리보기가 표시될 수 있도록 하였습니다.
