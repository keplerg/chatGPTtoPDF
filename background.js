chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addPrintCSS
  });
});

async function addPrintCSS() {
    const customStyles = `
    @media print {
        .text-message *:not(.katex *) {
            font-size: .75rem !important;
            color: #000 !important;
        }
        .text-message .katex-display {
            font-size: inherit;
        }
        .user-message-bubble-color {
            print-color-adjust: exact !important;
            background-color: #eee !important;
            margin-bottom: 2em;
        }
        :not(.katex) code:not(.katex *), :not(.katex) span:not(.katex *) {
            white-space: pre-wrap !important;
            overflow-wrap: break-word !important;
        }
        :not(.katex) .overflow-auto:not(.katex *), :not(.katex *) .overflow-auto {
            overflow: visible !important;
        }
        :not(.katex) .h-full:not(.katex *), :not(.katex *) .h-full {
            height: auto !important;
        }
        :not(.katex) #text:not(.katex *), :not(.katex *) #text {
            white-space: pre-wrap !important;
        }
        a[data-skip-to-content], #thread-bottom-container, #stage-slideover-sidebar {
            display: none;
        }
        * {
            scrollbar-width: none;
        }
        header#page-header {
            display: none;
        }
        button.cursor-pointer {
            display: none;
        }
        div.pointer-events-none {
            display: none;
        }
        div.draggable:has(~ main#main) {
            display: none;
        }
        div {
            --thread-content-max-width: 100% important;
            --thread-content-margin: 0 important;
        }
    }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
    window.print();
}

