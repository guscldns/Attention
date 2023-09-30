document.addEventListener("DOMContentLoaded", function () {
    // HTML 요소들을 가져옵니다.
    const highlightedText = document.getElementById("highlightedText"); // 텍스트가 표시될 요소
    const highlightButton = document.getElementById("highlightButton"); // 하이라이트 버튼
    const speedRange = document.getElementById("speedRange"); // 하이라이트 속도 조절 슬라이더
    const speedValue = document.getElementById("speedValue"); // 하이라이트 속도 표시 요소
    
    let textToHighlight = ""; // 하이라이트할 텍스트를 저장할 변수
    let words = []; // 단어 목록을 저장할 배열
    let index = 0; // 현재 하이라이트된 단어의 인덱스
    let highlightInterval; // 하이라이트를 제어할 인터벌 변수

    // 하이라이트 버튼 클릭 이벤트 핸들러
    highlightButton.addEventListener("click", function () {
        if (!highlightInterval) { // 하이라이트 인터벌이 활성화되어 있지 않으면
            textToHighlight = highlightedText.innerText; // 텍스트를 가져와서 저장
            words = textToHighlight.split(" "); // 공백을 기준으로 단어를 나눠 배열에 저장
            index = 0; // 단어 인덱스 초기화
            highlightedText.innerHTML = ""; // 이전 하이라이트 초기화
            startHighlight(); // 하이라이트 시작 함수 호출
        } else { // 하이라이트 인터벌이 활성화 중이면
            clearInterval(highlightInterval); // 하이라이트 인터벌을 중지
            highlightInterval = null; // 인터벌 변수를 null로 설정
            highlightButton.textContent = "Start Highlight"; // 버튼 텍스트 변경
        }
    });

    // 하이라이트 속도 슬라이더 변경 이벤트 핸들러
    speedRange.addEventListener("input", function () {
        const speed = 101 - parseInt(speedRange.value); // 슬라이더 값을 역으로 계산하여 하이라이트 속도 계산
        speedValue.textContent = speed + " ms"; // 속도 값을 표시 요소에 업데이트
        clearInterval(highlightInterval); // 현재 인터벌 중지
        startHighlight(); // 하이라이트 시작 함수 호출하여 새로운 속도로 시작
    });

    // 하이라이트를 시작하는 함수
    function startHighlight() {
        const speed = 101 - parseInt(speedRange.value); // 현재 선택된 하이라이트 속도 계산
        highlightInterval = setInterval(function () {
            if (index < words.length) { // 인덱스가 단어 배열 길이보다 작을 때
                const word = words[index]; // 현재 단어 가져오기
                const span = document.createElement("span"); // 새 <span> 요소 생성
                span.style.backgroundColor = "yellow"; // 배경색을 노란색으로 설정하여 하이라이트 효과 부여
                span.textContent = word + " "; // 단어와 공백을 <span>에 추가
                highlightedText.appendChild(span); // 텍스트 요소에 <span> 추가
                index++; // 다음 단어로 이동
            } else { // 모든 단어를 하이라이트한 경우
                clearInterval(highlightInterval); // 하이라이트 인터벌 중지
                highlightInterval = null; // 인터벌 변수를 null로 설정
                highlightButton.textContent = "Start Highlight"; // 버튼 텍스트 변경
            }
        }, speed);
        highlightButton.textContent = "Stop Highlight"; // 버튼 텍스트 변경
    }
});
