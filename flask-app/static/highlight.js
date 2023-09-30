document.addEventListener("DOMContentLoaded", function () {
    const highlightedText = document.getElementById("highlightedText");
    const highlightButton = document.getElementById("highlightButton");
    const speedRange = document.getElementById("speedRange");
    const speedValue = document.getElementById("speedValue");
    
    let textToHighlight = ""; // 텍스트를 저장할 변수
    let words = []; // 단어 목록
    let index = 0; // 단어 인덱스
    let highlightInterval; // 하이라이트 인터벌

    // 버튼 클릭 이벤트 핸들러
    highlightButton.addEventListener("click", function () {
        if (!highlightInterval) {
            textToHighlight = highlightedText.innerText;
            words = textToHighlight.split(" ");
            index = 0;
            highlightedText.innerHTML = ""; // 하이라이트 초기화
            startHighlight();
        } else {
            clearInterval(highlightInterval);
            highlightInterval = null;
            highlightButton.textContent = "Start Highlight";
        }
    });

    // 슬라이더 변경 이벤트 핸들러
    speedRange.addEventListener("input", function () {
        const speed = 101 - parseInt(speedRange.value); // 슬라이더 값을 역으로 계산
        speedValue.textContent = speed + " ms";
        clearInterval(highlightInterval);
        startHighlight();
    });

    // 하이라이트 시작 함수
    function startHighlight() {
        const speed = 101- parseInt(speedRange.value);
        highlightInterval = setInterval(function () {
            if (index < words.length) {
                const word = words[index];
                const span = document.createElement("span");
                span.style.backgroundColor = "yellow";
                span.textContent = word + " ";
                highlightedText.appendChild(span);
                index++;
            } else {
                clearInterval(highlightInterval);
                highlightInterval = null;
                highlightButton.textContent = "Start Highlight";
            }
        }, speed);
        highlightButton.textContent = "Stop Highlight";
    }
});
