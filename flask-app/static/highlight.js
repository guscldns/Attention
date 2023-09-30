document.addEventListener("DOMContentLoaded", function () {
    const textInputForm = document.getElementById("textInputForm");
    const highlightedText = document.getElementById("highlightedText");
    const speedRange = document.getElementById("speedRange");
    const speedValue = document.getElementById("speedValue");
    const highlightedTextContainer = document.getElementById("highlightedTextContainer");
    const stopButton = document.getElementById("stopButton");

    let words = []; // 단어 목록
    let index = 0; // 단어 인덱스
    let highlightInterval; // 하이라이트 인터벌

    // 텍스트 입력 폼 제출 이벤트 핸들러
    textInputForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!highlightInterval) {
            const text = textInputForm.querySelector("textarea[name='text']").value;
            words = text.split(" ");
            index = 0;
            highlightedText.innerHTML = ""; // 하이라이트 초기화
            startHighlight();
        }
    });

    // 슬라이더 변경 이벤트 핸들러
    speedRange.addEventListener("input", function () {
        const speed = parseInt(speedRange.value);
        speedValue.textContent = speed + " ms";
        clearInterval(highlightInterval);
        startHighlight();
    });

    // 하이라이트 시작 함수
    function startHighlight() {
        const speed = parseInt(speedRange.value);
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
            }
        }, speed);
    }

    // 중지 버튼 클릭 이벤트 핸들러
    stopButton.addEventListener("click", function () {
        clearInterval(highlightInterval);
        highlightInterval = null;
    });
});
