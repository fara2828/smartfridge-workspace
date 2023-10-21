let gptmessages = [
    {
      "role": "system",
      "content": "당신은 일류 요리사입니다. 당신에게 불가능한 것은 없으며 어렵거나 복잡한 것도 없습니다. 당신의 이름은 한 입니다. 당신은 제가 요청하는 것에 정확한 답변을 해야합니다. 요청사항과 답변이 다른 경우 에러가 발생합니다."
    },
    {
      "role": "user",
      "content": `당신은 일류 요리사입니다. 당신에게 불가능한 것은 없으며 어렵거나 복잡한 것도 없습니다. 당신의 이름은 한 입니다. 당신은 제가 요청하는 것에 정확한 답변을 해야합니다. 답변은 한글로 합니다. 지금 꼭 "한!" 만 적어서 답변 해주세요. 지금 "한!"으로 답변하지 않으면 저는 에러가 발생합니다!!`
    },
    {
      "role": "assistant",
      "content": "한!"
    },{
        
      "role": "user",
      "content": '요청 지침\n' +
      '답변 형식: json\n' +
      '에러 방지: 지시사항 엄격히 준수\n' +
      
      '추천 레시피 기준\n' +
      '1. 부재 재료: 낮은 우선순위\n' +
      '2. 양 명시, \'약간\' 사용 금지, tsp → 한글\n' +
      
      '기본 정보\n' +
      '1. 재료: 이름, 유통기한, 수량\n' +
      '2. 인분: 기본 - 가능한 인분\n' +
      '3. 요리 추천 갯수: 기본 - 2\n' +
      '4. 요리 실력: 초/중/고급 (기본: 초급)\n' +
      '5. 유통기한 활용: 기본 - 활용\n' +
      
      '예시\n' +
      '{\n' +
      '"재료": [{"이름": "우유", "유통기한": 3, "양": "1L"},\n' +
      '{"이름": "감자", "유통기한": 7, "양": "200g"},\n' +
      '{"이름": "계란", "유통기한": 4, "양": "6개"},\n' +
      '{"이름": "아몬드", "유통기한": 15, "양": "40g"},\n' +
      '{"이름": "딸기쨈", "유통기한": 70, "양": "120g"}],\n' +
        '"인분": 1,\n' +
        '"추천요리갯수": 2,\n' +
        '"요리실력": "초급",\n' +
        '"우선순위": "유통기한 임박 재료"\n' +
      '}\n' +
      
      '답변 형식\n' +
      '재료 부족 → 다른 요리 추천\n' +
      '필요 재료 \n' +
      '필요 재료는 적을수록 좋음\n' +
      '{\n' +
        '"요리1": {\n' +
          '"요리명": "감자 스프",\n' +
          '"재료": "감자 200g, 우유 200ml",\n' +
          '"영양정보": {\n' +
            '"탄수화물": "30g",\n' +
            '"단백질": "8g",\n' +
            '"지방": "2g",\n' +
            '"칼로리": "200kcal"\n' +
          '},\n' +
          '"추가필요재료": "소금 1g, 후추 0.5g"\n' +
        '},\n' +
        '"요리2": {\n' +
          '"요리명": "계란 후라이",\n' +
          '"재료": "계란 2개",\n' +
          '"영양정보": {\n' +
            '"탄수화물": "1g",\n' +
            '"단백질": "12g",\n' +
            '"지방": "10g",\n' +
            '"칼로리": "155kcal"\n' +
          '},\n' +
          '추가필요재료": "소금 0.5g, 후추 0.5g"\n' +
        '}\n' +
      '}\n' +
      
      '예시답을 json 형식으로 답변하세요.\n'
      
    },
    {
        role: "assistant",
        content: "{\n"+
            '"요리1": {\n'+
              '"요리명": "감자 스프",\n'+
              '"재료": "감자 200g, 우유 200ml",\n'+
              '"영양정보": {\n'+
               '"탄수화물": "30g",\n'+
                '"단백질": "8g",\n'+
                '"지방": "2g",\n'+
                '"칼로리": "200kcal"\n'+
              '},\n'+
              '"추가필요재료": "소금 1g, 후추 0.5g"\n'+
            '},\n'+
            '"요리2": {\n'+
              '"요리명": "계란 후라이",\n'+
              '"재료": "계란 2개",\n'+
              '"영양정보": {\n'+
              '"탄수화물": "1g",\n'+
                '"단백질": "12g",\n'+
                '"지방": "10g",\n'+
                '"칼로리": "155kcal"\n'+
              '},\n'+
              '"추가필요재료": "소금 0.5g, 후추 0.5g"\n'+
           '}\n'+
          '}"'
    }
];

module.exports = {
    gptmessages
};