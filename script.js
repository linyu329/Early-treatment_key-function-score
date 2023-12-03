const categories = [
    "grossMotor", "fineMotor", "languageSkills", "cognitiveSkills", "socialEmotionalSkills"
];
const questions = {
    grossMotor: ["能以腳趾和腳跟相接向前走兩三步", "不服東西可以單腳跳5次以上", "單腳站裡長達十秒","騎三輪車繞過障礙物"],
    fineMotor: ["會照著樣式或模仿畫十字", "能以大拇指與其他四根手指互碰（會比讚的手勢）", "譨接住彈起的球","用繩索打劫、繫鞋帶","使用剪刀剪直線"],
    languageSkills: ["會說出簡單的相反詞", "正確使用「為什麼」", "能正確說出性別","至少能唱完一整首兒歌"],
    cognitiveSkills: ["能分辨紅、黃、綠三種顏色", "能依照指示正確拿取物品（三個內）", "理解計數和時間概念，回答「有多少」和「多久」的問題","理解「相同」和「不同」的概念","玩棋盤或紙牌遊戲","可以記住故事的一部份"],
    socialEmotionalSkills: ["能自己穿襪子", "會用牙刷刷牙", "可以自己上廁所","會同情或安慰在哭的朋友","喜歡嘗試新事物","分享他喜歡或有興趣的事物","在遊戲中評價其他小朋友的行為"]
};
let scores = {
    grossMotor: [0, 0, 0, 0],
    fineMotor: [0, 0, 0, 0, 0],
    languageSkills: [0, 0, 0, 0],
    cognitiveSkills: [0, 0, 0, 0, 0, 0],
    socialEmotionalSkills: [0, 0, 0, 0, 0, 0, 0]
};
let currentCategoryIndex = 0;

function showCategory(category) {
    currentCategoryIndex = categories.indexOf(category);
    updateCategoryView(category);
}

function updateCategoryView(category) {
    document.getElementById('category-title').textContent = categoryTranslations[category];
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';
    questions[category].forEach((question, index) => {
        questionsDiv.innerHTML += `<div>${question}<br>
            <input type="range" min="0" max="100" step="20" value="${scores[category][index]}" 
            class="slider" onchange="updateScore('${category}', ${index}, this.value)">
            </div>`;
    });
    document.getElementById('category-view').style.display = 'block';
    updateNavigationButtons();
}

function updateScore(category, questionIndex, value) {
    scores[category][questionIndex] = parseInt(value);
}

function nextCategory() {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        updateCategoryView(categories[currentCategoryIndex]);
    } else {
        document.getElementById('category-view').style.display = 'none';
        displayScores();
    }
}

function previousCategory() {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        updateCategoryView(categories[currentCategoryIndex]);
    } else {
        backToMainMenu();
    }
}

function updateNavigationButtons() {
    const continueButton = document.querySelector('#category-view button:nth-child(2)');
    const submitButton = document.querySelector('#category-view button:nth-child(3)');
    if (currentCategoryIndex === categories.length - 1) {
        continueButton.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        continueButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
}

// ...之前的代码...

function displayScores() {
    categories.forEach(category => {
        const averageScore = scores[category].reduce((a, b) => a + b, 0) / scores[category].length;
        const percentage = Math.round((averageScore / 100) * 100);
        document.getElementById(`${category}-score`).innerHTML = `<div class="bar-container">
            <div class="bar" style="width:${percentage}%;">${percentage}%</div>
        </div>`;
    });
    addRestartButton();
}

function addRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.textContent = '重新填答';
    restartButton.onclick = restartAssessment;
    const mainMenu = document.getElementById('main-menu');
    mainMenu.appendChild(restartButton);
}

function restartAssessment() {
    scores = {
        grossMotor: [0, 0, 0],
        fineMotor: [0, 0, 0],
        languageSkills: [0, 0, 0],
        cognitiveSkills: [0, 0, 0],
        socialEmotionalSkills: [0, 0, 0]
    };
    document.querySelectorAll('.score-display').forEach(el => el.innerHTML = '');
    const restartButton = document.querySelector('#main-menu button:last-child');
    if (restartButton) restartButton.remove();
    backToMainMenu();
}

// ...之前的代码...


function backToMainMenu() {
    document.getElementById('category-view').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

const categoryTranslations = {
    grossMotor: "粗動作",
    fineMotor: "細動作",
    languageSkills: "語言能力",
    cognitiveSkills: "認知能力",
    socialEmotionalSkills: "社交情感能力"
};

// 初始化，顯示主菜單
backToMainMenu();
