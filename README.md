
# 💧 똑똑한냉장고 (똑냉)

## **프로젝트 개요**


1. **요 약:**
    - 식재료 관리 및 유통기한 임박재료 레시피 추천 모바일 App
    
2. **기 간:** 2023.07 ~ 현재
3. **인 원:** 1인 개인 프로젝트



## Tech Stack
- Back-end:
  <div>
     <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  </div>  
- DB:
  <div>        <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white"/>
  </div>
- Front-end:
  <div>
    <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=white">
  </div>
- Others:
  <div>
   <img src="https://img.shields.io/badge/Kakao Login API-yellow?style=flat-square&logoColor=white" />
   <img src="https://img.shields.io/badge/Chat GPT API-Green?style=flat-square&logoColor=white" />
  </div>  


## 전체 기능

1. **회원가입**
    - 카카오 로그인 (카카오로그인 API)
    
2. **냉장고 채우기**
    - 등록
        - 구분
        - 상품등록
            - 구매일
            - 유통기한
            - 분류
            - 구매장소
            - 메모
            - 사진
            - 바코드스캔 (식약처 API)
        - 상품리스트
    - 조회
    
3. **냉장고 레시피**
    - 필터
        - 재료구분자
            - 재료구분
                - 냉장
                - 냉동
                - 실온
            - 재료선택
                - 유통기한 임박순
        - 레시피구분자
            - 레시피 난이도
            - 요리 인분
        - 몇인분
    - 레시피 보여주기 (Chat-GPT API)
        - 레시피 저장하기
