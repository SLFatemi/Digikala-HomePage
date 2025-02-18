function convertEnglishToPersianNumbers(input) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.replace(/\d/g, digit => persianDigits[digit]);
}

function traverseAndConvertTextNodes(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
    while (currentNode = walker.nextNode()) {
        currentNode.nodeValue = convertEnglishToPersianNumbers(currentNode.nodeValue);
    }
}

function updatePseudoElementContent() {
    for (const sheet of document.styleSheets) {
        try {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText && rule.selectorText.includes("::after") && rule.style && rule.style.content) {
                    let contentValue = rule.style.content;
                    if ((contentValue.startsWith('"') && contentValue.endsWith('"')) ||
                        (contentValue.startsWith("'") && contentValue.endsWith("'"))) {
                        contentValue = contentValue.slice(1, -1);
                    }
                    const newContent = convertEnglishToPersianNumbers(contentValue);
                    rule.style.content = '"' + newContent + '"';
                }
            }
        } catch (e) {
            console.log("Could not access cssRules for:", sheet.href, e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    traverseAndConvertTextNodes(document.body);
    updatePseudoElementContent();
});

let headerlogoEl = document.querySelector(".header-logo")
let bodyEl = document.querySelector("body")
headerlogoEl.addEventListener('click', function () {
    bodyEl.classList.toggle("dark")
})