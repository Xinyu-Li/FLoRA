console.log("---------------------------------Czech and Slovak study - Meta Judgements Tool");

// Meta Judgements Tool
function renderMetaJudgementsTool() {
    const displayText = getLocalizedMetaJudgementDisplayText();
    // Add custom styles for meta judgements
    let metaJudgementsStyles = `
        <style id="meta-judgements-styles">
            /* Override the default my-classification width for this tool */
            .my-horizontal-collapse-tools.my-classification#meta-judgements-collapse {
                width: 42vw;
                min-width: 500px;
                margin-right: -42vw;
            }
            /* When tool is open (in-tools class is added) */
            .my-horizontal-collapse-tools.my-classification#meta-judgements-collapse.in-tools {
                margin-right: 50px;
                width: 42vw;
            }
            #meta-judgements-collapse .meta-question-card {
                border-left: 4px solid #0d6efd;
            }
            #meta-judgements-collapse .meta-question-text {
                font-size: 1rem;
                line-height: 1.6;
                color: #333;
                white-space: normal;
                word-wrap: break-word;
                word-break: break-word;
                overflow-wrap: break-word;
            }
            #meta-judgements-collapse .meta-rating-group {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                align-items: center;
                margin-top: 12px;
            }
            #meta-judgements-collapse .meta-rating-group .rating-option {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 100px;
                height: 40px;
                padding: 0 16px;
                border: 2px solid #dee2e6;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                background-color: #fff;
                color: #495057;
                transition: all 0.2s ease;
            }
            #meta-judgements-collapse .meta-rating-group .rating-option:hover {
                border-color: #0d6efd;
                background-color: #e7f1ff;
            }
            #meta-judgements-collapse .meta-rating-group input[type="radio"] {
                display: none;
            }
            #meta-judgements-collapse .meta-rating-group input[type="radio"]:checked + .rating-option {
                background-color: #0d6efd;
                border-color: #0d6efd;
                color: #fff;
            }
            #meta-judgements-collapse .meta-rating-group input[type="radio"]:checked + .rating-option.rating-basic {
                background-color: #dc3545;
                border-color: #dc3545;
            }
            #meta-judgements-collapse .meta-rating-group input[type="radio"]:checked + .rating-option.rating-good {
                background-color: #ffc107;
                border-color: #ffc107;
                color: #333;
            }
            #meta-judgements-collapse .meta-rating-group input[type="radio"]:checked + .rating-option.rating-excellent {
                background-color: #198754;
                border-color: #198754;
            }
            #meta-judgements-collapse .instruction-box {
                background-color: #f0f7ff;
                border: 1px solid #b8daff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
            }
            #meta-judgements-collapse .instruction-box p {
                margin-bottom: 8px;
                color: #004085;
            }
            #meta-judgements-collapse .rating-scale {
                display: flex;
                gap: 20px;
                font-size: 0.9rem;
                color: #555;
            }
            #meta-judgements-collapse .rating-scale span {
                font-weight: 500;
            }
            #save-meta-judgements-btn {
                min-width: 220px;
                white-space: nowrap;
                padding: 8px 20px;
            }
            #save-meta-judgements-message {
                padding: 12px 15px;
                border-radius: 6px;
                font-weight: 500;
                text-align: center;
            }
            #save-meta-judgements-message.alert-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            #save-meta-judgements-message.alert-danger {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            #save-meta-judgements-message.alert-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
                color: #856404;
            }
        </style>
    `;
    $("head").append(metaJudgementsStyles);

    let metaJudgementsToolHtml = `<!-- Meta Judgements Tool  -->
        <div class="my-horizontal-collapse-tools my-classification" id="meta-judgements-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${displayText.panelTitle}</h3>
               <div style="height:100%;overflow-y:auto;" id="meta-judgements-content">
                   <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                        <div class="spinner-border text-primary" role="status" id="meta-judgements-spinner">
                            <span class="visually-hidden">${displayText.loading}</span>
                        </div>
                   </div>
               </div>
           </div>
        </div>`;
    $("body").append(metaJudgementsToolHtml);
}
renderMetaJudgementsTool();

let collapseMetaJudgements = document.querySelector("#meta-judgements-collapse");
// Don't add to toolList1 - this tool should work independently with essay tool
let showMetaJudgementsBtn = document.querySelector("#show-meta-judgements-btn");
let metaJudgementsContent = document.querySelector("#meta-judgements-content");
let metaJudgementsSpinner = document.querySelector("#meta-judgements-spinner");


// Meta judgement questions
const metaJudgementQuestions = {
    en: [
        {
            id: 1,
            text: "Did you clearly combine two energy types and give reasons for choosing both?"
        },
        {
            id: 2,
            text: "Did you clearly explain how both energy types match the local geography and climate?"
        },
        {
            id: 3,
            text: "Did you give a strong explanation of how the plan saves money and creates local jobs?"
        },
        {
            id: 4,
            text: "Did you clearly explain how your plan protects forests and marine environments, including specific ways risks are avoided?"
        },
        {
            id: 5,
            text: "Is your writing clear, logical, and free of grammar and spelling errors?"
        }
    ],
    ces: [
        {
            id: 1,
            text: "Jasně jsi zkombinoval/a dva typy energie a uvedl/a důvody pro jejich volbu."
        },
        {
            id: 2,
            text: "Jasně jsi vysvětlil/a, jak oba typy energie odpovídají místní geografii a klimatu."
        },
        {
            id: 3,
            text: "Podal/a jsi přesvědčivé vysvětlení, jak plán šetří peníze a vytváří pracovní místa pro místní obyvatele."
        },
        {
            id: 4,
            text: "Jasně jsi vysvětlil/a, jak tvůj plán chrání lesy a mořské prostředí, včetně konkrétních způsobů vyhnutí se rizikům."
        },
        {
            id: 5,
            text: "Tvůj text je jasný, logický a bez gramatických a pravopisných chyb."
        }
    ],
    sk: [
        {
            id: 1,
            text: "Jasne si skombinoval/a dva typy energie a uviedol/a dôvody pre ich výber."
        },
        {
            id: 2,
            text: "Jasne si vysvetlil/a, ako oba typy energie zapadajú do miestnej geografie a klímy."
        },
        {
            id: 3,
            text: "Podal/a si jasné vysvetlenie, ako tvoj plán šetrí peniaze a vytvára miestne pracovné miesta."
        },
        {
            id: 4,
            text: "Jasne si vysvetlil/a, ako tvoj plán chráni lesy a oceánsky život, vrátane konkrétnych spôsobov vyhnutia sa rizikám."
        },
        {
            id: 5,
            text: "Tvoj text je jasný, logický a bez gramatických a pravopisných chýb."
        }
    ]
};

const metaJudgementDisplayText = {
    en: {
        instructionTitle: "Read your essay carefully from start to finish.",
        instructionDescription: "Then rate your performance on each criterion below using this scale:",
        ratings: {
            1: "1 = Basic",
            2: "2 = Good",
            3: "3 = Excellent"
        }
    },
    ces: {
        instructionTitle: "Pečlivě si přečti svou esej od začátku do konce.",
        instructionDescription: "Potom ohodnoť svůj výkon podle jednotlivých kritérií níže pomocí této škály:",
        ratings: {
            1: "1 = Základní",
            2: "2 = Dobré",
            3: "3 = Výborné"
        }
    },
    sk: {
        instructionTitle: "Pozorne si prečítaj svoju esej od začiatku do konca.",
        instructionDescription: "Potom ohodnoť svoj výkon podľa jednotlivých kritérií nižšie pomocou tejto škály:",
        ratings: {
            1: "1 = Základné",
            2: "2 = Dobré",
            3: "3 = Výborné"
        }
    }
};

function getMetaJudgementDisplayText() {
    if (typeof toolsLanguage !== 'undefined' && metaJudgementDisplayText[toolsLanguage]) {
        return metaJudgementDisplayText[toolsLanguage];
    }
    return metaJudgementDisplayText.en;
}

function getMetaJudgementQuestions() {
    if (typeof toolsLanguage !== 'undefined' && metaJudgementQuestions[toolsLanguage]) {
        return metaJudgementQuestions[toolsLanguage];
    }
    return metaJudgementQuestions.en;
}

function getLocalizedMetaJudgementQuestions() {
    const languageMap = {
        en: [
            {
                id: 1,
                text: 'Did you clearly combine two energy types and give reasons for choosing both?'
            },
            {
                id: 2,
                text: 'Did you clearly explain how both energy types match the local geography and climate?'
            },
            {
                id: 3,
                text: 'Did you give a strong explanation of how the plan saves money and creates local jobs?'
            },
            {
                id: 4,
                text: 'Did you clearly explain how your plan protects forests and marine environments, including specific ways risks are avoided?'
            },
            {
                id: 5,
                text: 'Is your writing clear, logical, and free of grammar and spelling errors?'
            }
        ],
        ces: [
            {
                id: 1,
                text: 'Jasně jsi zkombinoval/a dva typy energie a uvedl/a důvody pro jejich volbu.'
            },
            {
                id: 2,
                text: 'Jasně jsi vysvětlil/a, jak oba typy energie odpovídají místní geografii a klimatu.'
            },
            {
                id: 3,
                text: 'Podal/a jsi přesvědčivé vysvětlení, jak plán šetří peníze a vytváří pracovní místa pro místní obyvatele.'
            },
            {
                id: 4,
                text: 'Jasně jsi vysvětlil/a, jak tvůj plán chrání lesy a mořské prostředí, včetně konkrétních způsobů vyhnutí se rizikům.'
            },
            {
                id: 5,
                text: 'Tvůj text je jasný, logický a bez gramatických a pravopisných chyb.'
            }
        ],
        sk: [
            {
                id: 1,
                text: 'Jasne si skombinoval/a dva typy energie a uviedol/a dôvody pre ich výber.'
            },
            {
                id: 2,
                text: 'Jasne si vysvetlil/a, ako oba typy energie zapadajú do miestnej geografie a klímy.'
            },
            {
                id: 3,
                text: 'Podal/a si jasné vysvetlenie, ako tvoj plán šetrí peniaze a vytvára miestne pracovné miesta.'
            },
            {
                id: 4,
                text: 'Jasne si vysvetlil/a, ako tvoj plán chráni lesy a oceánsky život, vrátane konkrétnych spôsobov vyhnutia sa rizikám.'
            },
            {
                id: 5,
                text: 'Tvoj text je jasný, logický a bez gramatických a pravopisných chýb.'
            }
        ]
    };

    if (typeof toolsLanguage !== 'undefined' && languageMap[toolsLanguage]) {
        return languageMap[toolsLanguage];
    }

    return languageMap.en;
}

function getLocalizedMetaJudgementDisplayText() {
    const languageMap = {
        en: {
            panelTitle: 'Essay Self-Assessment',
            loading: 'Loading...',
            ratingAriaLabel: 'Rating',
            instructionTitle: 'Read your essay carefully from start to finish.',
            instructionDescription: 'Then rate your performance on each criterion below using this scale:',
            ratings: {
                1: '1 = Basic',
                2: '2 = Good',
                3: '3 = Excellent'
            },
            submitButton: 'Submit Self-Assessment',
            submittingButton: 'Submitting...',
            rateOneQuestionWarning: 'Please rate at least one question before submitting.',
            allQuestionsWarning: function(answeredCount, questionCount) {
                return `Please answer all ${questionCount} questions before submitting. (${answeredCount}/${questionCount} answered)`;
            },
            submitSuccess: 'Self-assessment submitted successfully!',
            submitError: 'Error submitting self-assessment.',
            submitErrorRetry: 'Error submitting self-assessment. Please try again.'
        },
        ces: {
            panelTitle: 'Sebehodnocení eseje',
            loading: 'Načítání...',
            ratingAriaLabel: 'Hodnocení',
            instructionTitle: 'Pečlivě si přečti svou esej od začátku do konce.',
            instructionDescription: 'Potom ohodnoť svůj výkon podle jednotlivých kritérií níže pomocí této škály:',
            ratings: {
                1: '1 = Základní',
                2: '2 = Dobré',
                3: '3 = Výborné'
            },
            submitButton: 'Odeslat sebehodnocení',
            submittingButton: 'Odesílání...',
            rateOneQuestionWarning: 'Před odesláním ohodnoť alespoň jednu otázku.',
            allQuestionsWarning: function(answeredCount, questionCount) {
                return `Před odesláním zodpověz všech ${questionCount} otázek. (${answeredCount}/${questionCount} zodpovězeno)`;
            },
            submitSuccess: 'Sebehodnocení bylo úspěšně odesláno!',
            submitError: 'Při odesílání sebehodnocení došlo k chybě.',
            submitErrorRetry: 'Při odesílání sebehodnocení došlo k chybě. Zkuste to prosím znovu.'
        },
        sk: {
            panelTitle: 'Sebahodnotenie eseje',
            loading: 'Načítava sa...',
            ratingAriaLabel: 'Hodnotenie',
            instructionTitle: 'Pozorne si prečítaj svoju esej od začiatku do konca.',
            instructionDescription: 'Potom ohodnoť svoj výkon podľa jednotlivých kritérií nižšie pomocou tejto škály:',
            ratings: {
                1: '1 = Základné',
                2: '2 = Dobré',
                3: '3 = Výborné'
            },
            submitButton: 'Odoslať sebahodnotenie',
            submittingButton: 'Odosiela sa...',
            rateOneQuestionWarning: 'Pred odoslaním ohodnoť aspoň jednu otázku.',
            allQuestionsWarning: function(answeredCount, questionCount) {
                return `Pred odoslaním zodpovedz všetkých ${questionCount} otázok. (${answeredCount}/${questionCount} zodpovedaných)`;
            },
            submitSuccess: 'Sebahodnotenie bolo úspešne odoslané!',
            submitError: 'Pri odosielaní sebahodnotenia sa vyskytla chyba.',
            submitErrorRetry: 'Pri odosielaní sebahodnotenia sa vyskytla chyba. Skúste to prosím znova.'
        }
    };

    if (typeof toolsLanguage !== 'undefined' && languageMap[toolsLanguage]) {
        return languageMap[toolsLanguage];
    }

    return languageMap.en;
}

// Generate localStorage key for meta judgements
function getMetaJudgementsStorageKey() {
    return `metaJudgements_${userId}_${currentCourseId}`;
}

function generateMetaRatingButtons(questionId, savedRating) {
    const displayText = getLocalizedMetaJudgementDisplayText();
    let radioHtml = `<div class="meta-rating-group" role="group" aria-label="${displayText.ratingAriaLabel}">`;

    const ratings = [
        { value: '1', label: displayText.ratings[1], className: 'rating-basic' },
        { value: '2', label: displayText.ratings[2], className: 'rating-good' },
        { value: '3', label: displayText.ratings[3], className: 'rating-excellent' }
    ];

    ratings.forEach(rating => {
        const isChecked = savedRating === rating.value;
        radioHtml += `
            <input type="radio" name="meta-rating-${questionId}" id="meta-rating-${questionId}-${rating.value}" value="${rating.value}" autocomplete="off" ${isChecked ? 'checked' : ''}>
            <label class="rating-option ${rating.className}" for="meta-rating-${questionId}-${rating.value}">${rating.label}</label>
        `;
    });

    radioHtml += '</div>';
    return radioHtml;
}

function renderMetaJudgements(savedRatings) {
    const displayText = getLocalizedMetaJudgementDisplayText();
    const localizedQuestions = getLocalizedMetaJudgementQuestions();
    let contentHtml = '';

    // Instruction box
    contentHtml += `
        <div class="instruction-box">
            <p><strong>${displayText.instructionTitle}</strong></p>
            <p>${displayText.instructionDescription}</p>
            <div class="rating-scale">
                <span style="color: #dc3545;">${displayText.ratings[1]}</span>
                <span style="color: #b8860b;">${displayText.ratings[2]}</span>
                <span style="color: #198754;">${displayText.ratings[3]}</span>
            </div>
        </div>
    `;

    contentHtml += '<div class="meta-questions-container">';

    localizedQuestions.forEach((question, index) => {
        const savedRating = savedRatings ? savedRatings[question.id] : null;
        contentHtml += `
            <div class="card mb-3 meta-question-card" data-question-id="${question.id}">
                <div class="card-body">
                    <div class="meta-question-text">
                        <strong>${question.id}.</strong> ${question.text}
                    </div>
                    ${generateMetaRatingButtons(question.id, savedRating)}
                </div>
            </div>
        `;
    });

    contentHtml += '</div>';

    // Add save button and message area
    contentHtml += `
        <div class="save-meta-area" style="position: sticky; bottom: 0; background: white; padding: 15px 0; border-top: 1px solid #dee2e6; margin-top: 15px;">
            <div id="save-meta-judgements-message" style="display: none; margin-bottom: 10px;"></div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" id="save-meta-judgements-btn" style="min-width: 220px; white-space: nowrap; padding: 8px 20px;">${displayText.submitButton}</button>
            </div>
        </div>
    `;

    metaJudgementsContent.innerHTML = contentHtml;

    // Add event listeners for rating changes
    setupMetaRatingListeners();

    // Add event listener for save button
    setupMetaSaveButtonListener();
}

function setupMetaRatingListeners() {
    const radioButtons = metaJudgementsContent.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function(e) {
            const questionId = this.name.replace('meta-rating-', '');
            const ratingValue = this.value;

            // Save rating to localStorage
            saveMetaRating(questionId, ratingValue);
        });
    });
}

function setupMetaSaveButtonListener() {
    const saveBtn = document.getElementById('save-meta-judgements-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            stopEventPropagation(e);
            saveMetaJudgementsToServer();
        });
    }
}

function saveMetaRating(questionId, ratingValue) {
    const storageKey = getMetaJudgementsStorageKey();
    let storedData = localStorage.getItem(storageKey);
    if (storedData) {
        storedData = JSON.parse(storedData);
    } else {
        storedData = { ratings: {} };
    }
    storedData.ratings[questionId] = ratingValue;
    localStorage.setItem(storageKey, JSON.stringify(storedData));
}

function saveMetaJudgementsToServer() {
    const displayText = getLocalizedMetaJudgementDisplayText();
    const localizedQuestions = getLocalizedMetaJudgementQuestions();
    const questionCount = localizedQuestions.length;
    const storageKey = getMetaJudgementsStorageKey();
    const storedData = localStorage.getItem(storageKey);

    if (!storedData) {
        showMetaSaveMessage(displayText.rateOneQuestionWarning, 'warning');
        return;
    }

    const parsedData = JSON.parse(storedData);
    const ratings = parsedData.ratings || {};

    // Check if all questions are answered
    const answeredCount = Object.keys(ratings).length;
    if (answeredCount < questionCount) {
        showMetaSaveMessage(displayText.allQuestionsWarning(answeredCount, questionCount), 'warning');
        return;
    }

    // Build rating values string: 5 values (1-3)
    let ratingValuesArray = [];
    for (let i = 1; i <= questionCount; i++) {
        const rating = ratings[i];
        ratingValuesArray.push(rating || '0');
    }
    const ratingValues = ratingValuesArray.join(',');

    // Disable save button during request
    const saveBtn = document.getElementById('save-meta-judgements-btn');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = displayText.submittingButton;
    }

    $.post(apiBaseUrl + "/save-meta-judgement-rating", {
        userId: userId,
        courseId: currentCourseId,
        ratingValues: ratingValues
    }, function(data, status) {
        if (status === "success" && data.status === 200) {
            showMetaSaveMessage(displayText.submitSuccess, 'success');
        } else {
            showMetaSaveMessage(displayText.submitError, 'danger');
        }
    }).fail(function() {
        showMetaSaveMessage(displayText.submitErrorRetry, 'danger');
    }).always(function() {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = displayText.submitButton;
        }
    });
}

function showMetaSaveMessage(message, type) {
    const messageDiv = document.getElementById('save-meta-judgements-message');
    if (messageDiv) {
        messageDiv.className = `alert alert-${type} mt-2`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';

        // Hide message after 3 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}

function loadMetaJudgements() {
    const storageKey = getMetaJudgementsStorageKey();
    const storedData = localStorage.getItem(storageKey);

    // Hide spinner
    if (metaJudgementsSpinner) {
        metaJudgementsSpinner.style.display = 'none';
    }

    // Check if data exists in localStorage
    if (storedData) {
        console.log("Loading meta judgements from localStorage");
        const parsedData = JSON.parse(storedData);
        renderMetaJudgements(parsedData.ratings);
        return;
    }

    // Try to load from server
    $.get(apiBaseUrl + "/get-meta-judgement-rating", {
        courseId: currentCourseId,
        userId: userId
    }, function(data, status) {
        let ratings = {};

        if (status === "success" && data.data) {
            const ratingValuesArray = data.data.split(',');
            ratingValuesArray.forEach((value, index) => {
                const questionId = index + 1;
                if (value !== '0') {
                    ratings[questionId] = value;
                }
            });
            console.log("Loaded saved meta judgements from database");

            // Save to localStorage
            const dataToStore = {
                ratings: ratings,
                fetchedAt: new Date().toISOString()
            };
            localStorage.setItem(storageKey, JSON.stringify(dataToStore));
        }

        renderMetaJudgements(ratings);
    }).fail(function() {
        // Even if fetch fails, still show questions
        renderMetaJudgements({});
    });
}

function setupMetaJudgementsTool() {
    // Load meta judgements on page load
    loadMetaJudgements();

    collapseMetaJudgements.onclick = function(e) {
        stopEventPropagation(e);
    };

    collapseMetaJudgements.onmousewheel = function(e) {
        stopEventPropagation(e);
    };

    collapseMetaJudgements.onmousemove = function(e) {
        stopEventPropagation(e);
    };

    collapseMetaJudgements.onmouseup = function(e) {
        stopEventPropagation(e);
    };

    if (showMetaJudgementsBtn) {
        showMetaJudgementsBtn.onclick = function(e) {
            stopEventPropagation(e);

            // Close Quiz Confidence tool if it's open (mutual exclusivity)
            let quizConfidenceCollapse = document.querySelector("#quiz-confidence-collapse");
            if (quizConfidenceCollapse && quizConfidenceCollapse.classList.contains("in-tools")) {
                quizConfidenceCollapse.classList.remove("in-tools");
                quizConfidenceCollapse.classList.remove("in-tools-move-left");
                quizConfidenceCollapse.classList.remove("in-tools-move-more-left");
            }

            collapseMetaJudgements.classList.toggle("in-tools");

            // Custom essay toggle logic (don't use toolsAndEssayToggle which affects toolList1)
            if (collapseMetaJudgements.classList.contains("in-tools")) {
                // Tool is opening - shift essay more left
                if (typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools")) {
                    collapseWriteEssay.classList.replace("in-tools", "in-tools-move-more-left");
                } else if (typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools-move-left")) {
                    collapseWriteEssay.classList.replace("in-tools-move-left", "in-tools-move-more-left");
                }
            } else {
                // Tool is closing - restore essay position if no other wide tools are open
                let quizConfidenceCollapse = document.querySelector("#quiz-confidence-collapse");
                let otherWideToolOpen = quizConfidenceCollapse && quizConfidenceCollapse.classList.contains("in-tools");
                if (!otherWideToolOpen && typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools-move-more-left")) {
                    collapseWriteEssay.classList.replace("in-tools-move-more-left", "in-tools");
                }
            }
        };
    }
}

