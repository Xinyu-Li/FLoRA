console.log("---------------------------------Czech and Slovak study");

// Quiz Confidence Tool
function renderQuizConfidenceTool() {
    const displayText = getLocalizedQuizConfidenceText();
    // Add custom styles for confidence rating
    let quizConfidenceStyles = `
        <style id="quiz-confidence-styles">
            /* Override the default my-classification width for this tool */
            .my-horizontal-collapse-tools.my-classification#quiz-confidence-collapse {
                width: 42vw;
                min-width: 500px;
                margin-right: -42vw;
            }
            /* When tool is open (in-tools class is added) */
            .my-horizontal-collapse-tools.my-classification#quiz-confidence-collapse.in-tools {
                margin-right: 50px;
                width: 42vw;
            }
            #quiz-confidence-collapse .quiz-question-card .question-summary div,
            #quiz-confidence-collapse .quiz-question-card .response-summary div {
                white-space: normal;
                word-wrap: break-word;
                word-break: break-word;
                overflow-wrap: break-word;
            }
            #quiz-confidence-collapse .confidence-rating {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e9ecef;
                white-space: normal;
                word-wrap: break-word;
                word-break: break-word;
                overflow-wrap: break-word;
            }
            #quiz-confidence-collapse .confidence-rating-group {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                align-items: center;
            }
            #quiz-confidence-collapse .confidence-rating-group .rating-label {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 42px;
                height: 36px;
                padding: 0 12px;
                border: 2px solid #dee2e6;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                background-color: #fff;
                color: #495057;
                transition: all 0.2s ease;
            }
            #quiz-confidence-collapse .confidence-rating-group .rating-label:hover {
                border-color: #0d6efd;
                background-color: #e7f1ff;
            }
            #quiz-confidence-collapse .confidence-rating-group input[type="radio"] {
                display: none;
            }
            #quiz-confidence-collapse .confidence-rating-group input[type="radio"]:checked + .rating-label {
                background-color: #0d6efd;
                border-color: #0d6efd;
                color: #fff;
            }
            #quiz-confidence-collapse .confidence-rating-group input[type="radio"][value="unselected"]:checked + .rating-label {
                background-color: #6c757d;
                border-color: #6c757d;
                color: #fff;
            }
            #quiz-confidence-collapse .confidence-rating-group .rating-label.unselected-label {
                min-width: 90px;
                border-color: #adb5bd;
            }
            #save-confidence-ratings-btn {
                min-width: 200px;
                white-space: nowrap;
            }
            #save-confidence-message {
                padding: 12px 15px;
                border-radius: 6px;
                font-weight: 500;
                text-align: center;
            }
            #save-confidence-message.alert-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            #save-confidence-message.alert-danger {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            #save-confidence-message.alert-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
                color: #856404;
            }
        </style>
    `;
    $("head").append(quizConfidenceStyles);

    let quizConfidenceToolHtml = `<!-- Quiz Confidence Tool  -->
        <div class="my-horizontal-collapse-tools my-classification" id="quiz-confidence-collapse">
           <div class="card card-body" style="height:100%;">
               <h3 class="mb-2">${displayText.panelTitle}</h3>
               <div style="height:100%;overflow-y:auto;" id="quiz-confidence-content">
                   <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                        <div class="spinner-border text-primary" role="status" id="quiz-confidence-spinner">
                            <span class="visually-hidden">${displayText.loading}</span>
                        </div>
                   </div>
               </div>
           </div>
        </div>`;
    $("body").append(quizConfidenceToolHtml);
}
renderQuizConfidenceTool();

let collapseQuizConfidence = document.querySelector("#quiz-confidence-collapse");
// Don't add to toolList1 - this tool should work independently with essay tool
let showQuizConfidenceBtn = document.querySelector("#show-quiz-confidence-btn");
let quizConfidenceContent = document.querySelector("#quiz-confidence-content");
let quizConfidenceSpinner = document.querySelector("#quiz-confidence-spinner");


// Generate localStorage key for quiz responses
function getQuizConfidenceStorageKey() {
    return `quizConfidence_${userId}_${currentCourseId}`;
}

function formatQuestionText(questionText) {
    if (!questionText) return getLocalizedQuizConfidenceText().notAvailable;

    // Split by first colon to separate question from options
    const colonIndex = questionText.indexOf(':');
    if (colonIndex === -1) {
        // No colon found, return as is
        return escapeHTML(questionText);
    }

    const questionPart = questionText.substring(0, colonIndex).trim();
    const optionsPart = questionText.substring(colonIndex + 1).trim();

    // Split options by semicolon
    const options = optionsPart.split(';').map(opt => opt.trim()).filter(opt => opt.length > 0);

    if (options.length === 0) {
        return escapeHTML(questionText);
    }

    // Build formatted HTML
    let formattedHtml = '<div class="question-text-main">' + escapeHTML(questionPart) + '</div>';
    formattedHtml += '<div class="question-options-list" style="margin-top: 8px;">';

    const letters = 'abcdefghijklmnopqrstuvwxyz';
    options.forEach((option, index) => {
        const letter = letters[index] || (index + 1).toString();
        formattedHtml += `<div class="question-option-item" style="margin-left: 15px; margin-bottom: 4px;">
            <span style="font-weight: 500;">${letter}.</span> ${escapeHTML(option)}
        </div>`;
    });

    formattedHtml += '</div>';
    return formattedHtml;
}

const quizConfidenceDisplayText = {
    en: {
        prompt: 'How confident are you that your answer to this question is correct, on a scale from 0 (not sure at all) to 10 (absolutely sure)?',
        unselected: 'Unselected'
    },
    sk: {
        prompt: 'Ako veľmi si si istý/á, že tvoja odpoveď na túto otázku je správna, na škále od 0 (vôbec si nie som istý/á) do 10 (som si úplne istý/á)?',
        unselected: 'Nevybrané'
    },
    ces: {
        prompt: 'Jak moc jsi si jistý/á, že tvoje odpověď na tuto otázku je správná, na škále od 0 (vůbec si nejsem jistý/á) do 10 (jsem si úplně jistý/á)?',
        unselected: 'Nevybráno'
    }
};

function getQuizConfidenceDisplayText() {
    if (typeof toolsLanguage !== 'undefined' && quizConfidenceDisplayText[toolsLanguage]) {
        return quizConfidenceDisplayText[toolsLanguage];
    }
    return quizConfidenceDisplayText.en;
}

function getLocalizedQuizConfidenceText() {
    const languageMap = {
        en: {
            panelTitle: 'Quiz Review & Confidence Rating',
            loading: 'Loading...',
            prompt: 'How confident are you that your answer to this question is correct, on a scale from 0 (not sure at all) to 10 (absolutely sure)?',
            confidenceRatingAriaLabel: 'Confidence rating',
            unselected: 'Unselected',
            notAvailable: 'N/A',
            noResponsesFound: 'No quiz responses found.',
            questionCardTitle: function(questionSlot) {
                return `Question ${questionSlot}`;
            },
            questionLabel: 'Question:',
            yourAnswerLabel: 'Your Answer:',
            saveButton: 'Save Confidence Ratings',
            savingButton: 'Saving...',
            noDataToSave: 'No data to save.',
            saveSuccess: 'Confidence ratings saved successfully!',
            saveError: 'Error saving confidence ratings.',
            saveErrorRetry: 'Error saving confidence ratings. Please try again.',
            loadError: 'Error loading quiz data.',
            loadErrorRetry: 'Error loading quiz data. Please try again.'
        },
        ces: {
            panelTitle: 'Kontrola kvízu a hodnocení jistoty',
            loading: 'Načítání...',
            prompt: 'Jak moc jsi si jistý/á, že tvoje odpověď na tuto otázku je správná, na škále od 0 (vůbec si nejsem jistý/á) do 10 (jsem si úplně jistý/á)?',
            confidenceRatingAriaLabel: 'Hodnocení jistoty',
            unselected: 'Nevybráno',
            notAvailable: 'Není k dispozici',
            noResponsesFound: 'Nebyly nalezeny žádné odpovědi v kvízu.',
            questionCardTitle: function(questionSlot) {
                return `Otázka ${questionSlot}`;
            },
            questionLabel: 'Otázka:',
            yourAnswerLabel: 'Tvoje odpověď:',
            saveButton: 'Uložit hodnocení jistoty',
            savingButton: 'Ukládání...',
            noDataToSave: 'Nejsou k dispozici žádná data k uložení.',
            saveSuccess: 'Hodnocení jistoty bylo úspěšně uloženo!',
            saveError: 'Při ukládání hodnocení jistoty došlo k chybě.',
            saveErrorRetry: 'Při ukládání hodnocení jistoty došlo k chybě. Zkuste to prosím znovu.',
            loadError: 'Při načítání dat kvízu došlo k chybě.',
            loadErrorRetry: 'Při načítání dat kvízu došlo k chybě. Zkuste to prosím znovu.'
        },
        sk: {
            panelTitle: 'Kontrola kvízu a hodnotenie istoty',
            loading: 'Načítava sa...',
            prompt: 'Ako veľmi si si istý/á, že tvoja odpoveď na túto otázku je správna, na škále od 0 (vôbec si nie som istý/á) do 10 (som si úplne istý/á)?',
            confidenceRatingAriaLabel: 'Hodnotenie istoty',
            unselected: 'Nevybrané',
            notAvailable: 'Nie je k dispozícii',
            noResponsesFound: 'Nenašli sa žiadne odpovede v kvíze.',
            questionCardTitle: function(questionSlot) {
                return `Otázka ${questionSlot}`;
            },
            questionLabel: 'Otázka:',
            yourAnswerLabel: 'Tvoja odpoveď:',
            saveButton: 'Uložiť hodnotenia istoty',
            savingButton: 'Ukladá sa...',
            noDataToSave: 'Nie sú k dispozícii žiadne údaje na uloženie.',
            saveSuccess: 'Hodnotenia istoty boli úspešne uložené!',
            saveError: 'Pri ukladaní hodnotení istoty sa vyskytla chyba.',
            saveErrorRetry: 'Pri ukladaní hodnotení istoty sa vyskytla chyba. Skúste to prosím znova.',
            loadError: 'Pri načítavaní údajov kvízu sa vyskytla chyba.',
            loadErrorRetry: 'Pri načítavaní údajov kvízu sa vyskytla chyba. Skúste to prosím znova.'
        }
    };

    if (typeof toolsLanguage !== 'undefined' && languageMap[toolsLanguage]) {
        return languageMap[toolsLanguage];
    }

    return languageMap.en;
}

function generateConfidenceRadioButtons(questionSlot, savedConfidence) {
    const displayText = getLocalizedQuizConfidenceText();
    let radioHtml = '<div class="confidence-rating mt-3 mb-3">';
    radioHtml += `<p class="mb-3" style="font-style: italic; font-size: 0.9em; color: #495057;">${displayText.prompt}</p>`;
    radioHtml += `<div class="confidence-rating-group" role="group" aria-label="${displayText.confidenceRatingAriaLabel}">`;

    // Unselected option
    const isUnselected = !savedConfidence || savedConfidence === 'unselected';
    radioHtml += `
        <input type="radio" name="confidence-${questionSlot}" id="confidence-${questionSlot}-unselected" value="unselected" autocomplete="off" ${isUnselected ? 'checked' : ''}>
        <label class="rating-label unselected-label" for="confidence-${questionSlot}-unselected">${displayText.unselected}</label>
    `;

    // 0-10 options
    for (let i = 0; i <= 10; i++) {
        const isChecked = savedConfidence === String(i);
        radioHtml += `
            <input type="radio" name="confidence-${questionSlot}" id="confidence-${questionSlot}-${i}" value="${i}" autocomplete="off" ${isChecked ? 'checked' : ''}>
            <label class="rating-label" for="confidence-${questionSlot}-${i}">${i}</label>
        `;
    }

    radioHtml += '</div></div>';
    return radioHtml;
}

function renderQuizQuestions(quizResponses, confidenceRatings) {
    const displayText = getLocalizedQuizConfidenceText();
    if (!quizResponses || quizResponses.length === 0) {
        quizConfidenceContent.innerHTML = `<div class="alert alert-info">${displayText.noResponsesFound}</div>`;
        return;
    }

    let contentHtml = '<div class="quiz-questions-container">';

    quizResponses.forEach((response, index) => {
        const savedConfidence = confidenceRatings ? confidenceRatings[response.questionSlot] : null;
        contentHtml += `
            <div class="card mb-3 quiz-question-card" data-slot="${response.questionSlot}">
                <div class="card-header">
                    <strong>${displayText.questionCardTitle(response.questionSlot)}</strong>
                </div>
                <div class="card-body">
                    <div class="question-summary mb-2">
                        <strong>${displayText.questionLabel}</strong>
                        <div style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px;">
                            ${formatQuestionText(response.questionSummary)}
                        </div>
                    </div>
                    <div class="response-summary mb-2">
                        <strong>${displayText.yourAnswerLabel}</strong>
                        <div style="background-color: #e7f3ff; padding: 10px; border-radius: 5px; margin-top: 5px;">
                            ${escapeHTML(response.responseSummary || displayText.notAvailable)}
                        </div>
                    </div>
                    ${generateConfidenceRadioButtons(response.questionSlot, savedConfidence)}
                </div>
            </div>
        `;
    });

    contentHtml += '</div>';

    // Add save button and message area
    contentHtml += `
        <div class="save-confidence-area" style="position: sticky; bottom: 0; background: white; padding: 15px 0; border-top: 1px solid #dee2e6; margin-top: 15px;">
            <div id="save-confidence-message" style="display: none; margin-bottom: 10px;"></div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" id="save-confidence-ratings-btn" style="min-width: 220px; white-space: nowrap; padding: 8px 20px;">${displayText.saveButton}</button>
            </div>
        </div>
    `;

    quizConfidenceContent.innerHTML = contentHtml;

    // Add event listeners for confidence rating changes
    setupConfidenceRatingListeners();

    // Add event listener for save button
    setupSaveButtonListener();
}

function setupConfidenceRatingListeners() {
    const radioButtons = quizConfidenceContent.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function(e) {
            const questionSlot = this.name.replace('confidence-', '');
            const confidenceValue = this.value;

            // Save confidence rating to localStorage
            saveConfidenceRating(questionSlot, confidenceValue);
        });
    });
}

function setupSaveButtonListener() {
    const saveBtn = document.getElementById('save-confidence-ratings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            stopEventPropagation(e);
            saveConfidenceRatingsToServer();
        });
    }
}

function saveConfidenceRatingsToServer() {
    const displayText = getLocalizedQuizConfidenceText();
    const storageKey = getQuizConfidenceStorageKey();
    const storedData = localStorage.getItem(storageKey);

    if (!storedData) {
        showSaveMessage(displayText.noDataToSave, 'warning');
        return;
    }

    const parsedData = JSON.parse(storedData);
    const quizResponses = parsedData.quizResponses || [];
    const confidenceRatings = parsedData.confidenceRatings || {};

    // Build rating values string: 15 values, 0 means unrated, 1-10 means rating
    // We use question slots from 1 to 15
    let ratingValuesArray = [];
    for (let i = 1; i <= 15; i++) {
        const rating = confidenceRatings[i];
        if (rating && rating !== 'unselected') {
            ratingValuesArray.push(rating);
        } else {
            ratingValuesArray.push('0'); // 0 means unrated
        }
    }
    const ratingValues = ratingValuesArray.join(',');

    // Get quiz name
    const quizName = typeof quizConfidenceQuizName !== 'undefined' ? quizConfidenceQuizName : "Activity 1: How much do you know about renewable energy?";

    // Disable save button during request
    const saveBtn = document.getElementById('save-confidence-ratings-btn');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = displayText.savingButton;
    }

    $.post(apiBaseUrl + "/save-quiz-confidence-rating", {
        userId: userId,
        courseId: currentCourseId,
        quizName: quizName,
        ratingValues: ratingValues
    }, function(data, status) {
        if (status === "success" && data.status === 200) {
            showSaveMessage(displayText.saveSuccess, 'success');
        } else {
            showSaveMessage(displayText.saveError, 'danger');
        }
    }).fail(function() {
        showSaveMessage(displayText.saveErrorRetry, 'danger');
    }).always(function() {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = displayText.saveButton;
        }
    });
}

function showSaveMessage(message, type) {
    const messageDiv = document.getElementById('save-confidence-message');
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

function saveConfidenceRating(questionSlot, confidenceValue) {
    const storageKey = getQuizConfidenceStorageKey();
    let storedData = localStorage.getItem(storageKey);
    if (!storedData) {
        return;
    }
    storedData = JSON.parse(storedData);
    storedData.confidenceRatings[questionSlot] = confidenceValue;
    localStorage.setItem(storageKey, JSON.stringify(storedData));
}

function loadQuizResponses() {
    const displayText = getLocalizedQuizConfidenceText();
    const storageKey = getQuizConfidenceStorageKey();
    const storedData = localStorage.getItem(storageKey);

    // If localStorage has data, render it first to avoid blank screen
    if (storedData) {
        console.log("Loading quiz responses from localStorage");
        const parsedData = JSON.parse(storedData);
        renderQuizQuestions(parsedData.quizResponses, parsedData.confidenceRatings);
    }

    // Always fetch from server to get latest data
    if (!storedData && quizConfidenceSpinner) {
        quizConfidenceSpinner.style.display = 'block';
    }

    // Default quiz name - this can be configured per study
    const quizName = typeof quizConfidenceQuizName !== 'undefined' ? quizConfidenceQuizName : "Activity 1: How much do you know about renewable energy?";

    console.log("Fetching quiz responses from server");
    $.get(apiBaseUrl + "/get-quiz-responses", { // 此处是从post-test 中获取的
        quizName: quizName,
        courseId: currentCourseId,
        userId: userId
    }, function(data, status) {
        if (status === "success") {
            const quizResponses = data.data;
            console.log("Fetched quiz responses from server successfully", quizResponses);
            // Also fetch saved confidence ratings from database
            $.get(apiBaseUrl + "/get-quiz-confidence-rating", {
                quizName: quizName,
                courseId: currentCourseId,
                userId: userId
            }, function(ratingData, ratingStatus) {
                if (quizConfidenceSpinner) {
                    quizConfidenceSpinner.style.display = 'none';
                }

                let confidenceRatings = {};

                // Parse saved rating values if exists
                if (ratingStatus === "success" && ratingData.data) {
                    const ratingValuesArray = ratingData.data.split(',');
                    ratingValuesArray.forEach((value, index) => {
                        const questionSlot = index + 1;
                        if (value !== '0') {
                            confidenceRatings[questionSlot] = value;
                        }
                    });
                    console.log("Loaded saved confidence ratings from database");
                }

                // Save to localStorage
                const dataToStore = {
                    quizResponses: quizResponses,
                    confidenceRatings: confidenceRatings,
                    fetchedAt: new Date().toISOString()
                };
                localStorage.setItem(storageKey, JSON.stringify(dataToStore));

                renderQuizQuestions(quizResponses, confidenceRatings);
            }).fail(function() {
                // Even if rating fetch fails, still show quiz questions
                if (quizConfidenceSpinner) {
                    quizConfidenceSpinner.style.display = 'none';
                }

                const dataToStore = {
                    quizResponses: quizResponses,
                    confidenceRatings: {},
                    fetchedAt: new Date().toISOString()
                };
                localStorage.setItem(storageKey, JSON.stringify(dataToStore));

                renderQuizQuestions(quizResponses, {});
            });
        } else {
            if (quizConfidenceSpinner) {
                quizConfidenceSpinner.style.display = 'none';
            }
            quizConfidenceContent.innerHTML = `<div class="alert alert-danger">${displayText.loadError}</div>`;
        }
    }).fail(function() {
        if (quizConfidenceSpinner) {
            quizConfidenceSpinner.style.display = 'none';
        }
        quizConfidenceContent.innerHTML = `<div class="alert alert-danger">${displayText.loadErrorRetry}</div>`;
    });

}

function loadEssayContent() {
    const essayStorageKey = "czech_slovak_essay_" + userId + "_" + currentCourseId;
    const storedEssay = localStorage.getItem(essayStorageKey);

    if (storedEssay) {
        console.log("Loading essay content from localStorage");
        applyEssayContent(storedEssay);
    } else {
        $.get(apiBaseUrl + "/get-czech-slovak-essay/" + userId, {}, function (data, status) {
            if (status === "success" && data.data) {
                console.log("Fetched essay content from server successfully");
                localStorage.setItem(essayStorageKey, data.data);
                applyEssayContent(data.data);
            }
        });
    }
}

function applyEssayContent(htmlContent) {
    let el = document.querySelector("#essay-result");

    if (el) {
        el.innerHTML = htmlContent; // trusted server content
        return;
    }
    // #essay-result may not exist yet; wait for it to appear
    let attempts = 0;
    const interval = setInterval(function () {
        el = document.querySelector("#essay-result");
        if (el) {
            el.innerHTML = htmlContent; // trusted server content
            clearInterval(interval);
        } else if (++attempts >= 20) { // give up after ~10s
            console.warn("#essay-result element not found after waiting");
            clearInterval(interval);
        }
    }, 500);
}

function setupQuizConfidenceTool() {
    // Load quiz responses and essay content on page load
    loadQuizResponses();
    loadEssayContent();

    collapseQuizConfidence.onclick = function(e) {
        stopEventPropagation(e);
    };

    collapseQuizConfidence.onmousewheel = function(e) {
        stopEventPropagation(e);
    };

    collapseQuizConfidence.onmousemove = function(e) {
        stopEventPropagation(e);
    };

    collapseQuizConfidence.onmouseup = function(e) {
        stopEventPropagation(e);
    };

    if (showQuizConfidenceBtn) {
        showQuizConfidenceBtn.onclick = function(e) {
            stopEventPropagation(e);

            // Close Meta Judgements tool if it's open (mutual exclusivity)
            let metaJudgementsCollapse = document.querySelector("#meta-judgements-collapse");
            if (metaJudgementsCollapse && metaJudgementsCollapse.classList.contains("in-tools")) {
                metaJudgementsCollapse.classList.remove("in-tools");
                metaJudgementsCollapse.classList.remove("in-tools-move-left");
                metaJudgementsCollapse.classList.remove("in-tools-move-more-left");
            }

            collapseQuizConfidence.classList.toggle("in-tools");

            // Custom essay toggle logic (don't use toolsAndEssayToggle which affects toolList1)
            if (collapseQuizConfidence.classList.contains("in-tools")) {
                // Tool is opening - shift essay more left
                if (typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools")) {
                    collapseWriteEssay.classList.replace("in-tools", "in-tools-move-more-left");
                } else if (typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools-move-left")) {
                    collapseWriteEssay.classList.replace("in-tools-move-left", "in-tools-move-more-left");
                }
            } else {
                // Tool is closing - restore essay position if no other wide tools are open
                let metaJudgementsCollapse = document.querySelector("#meta-judgements-collapse");
                let otherWideToolOpen = metaJudgementsCollapse && metaJudgementsCollapse.classList.contains("in-tools");
                if (!otherWideToolOpen && typeof collapseWriteEssay !== 'undefined' && collapseWriteEssay.classList.contains("in-tools-move-more-left")) {
                    collapseWriteEssay.classList.replace("in-tools-move-more-left", "in-tools");
                }
            }
        };
    }
}

