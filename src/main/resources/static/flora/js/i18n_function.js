

const lang = {
    ar: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[شروط بدء المهمة]]
طالب يعمل على كتابة مقال.
فيما يلي تعليمات المهمة:
موضوع المهمة: إستراتيجية للطاقة المتجددة لمجتمع الساحل الشمالي.
تم تعيينك كخبير في مجال الطاقة لتقديم المشورة لمجتمع ساحلي شمالي يقع بالقرب من الجبال ويواجه فصول شتاء قارسة ومثلجة. يعتمد هذا المجتمع حاليًا بشكل كبير على الوقود الأحفوري المستورد، وهو مكلف، ومضر بالبيئة، وغير موثوق به خلال العواصف الشتوية الشديدة. تسعى المدينة إلى إيجاد حل يضمن إمدادات طاقة مستقرة على مدار العام، ويقلل التكاليف بمرور الوقت، ويخلق فرص عمل محلية في أفضل الأحوال. تشهد المنطقة رياحًا بحرية ثابتة قبالة سواحلها، وتقع بالقرب من موارد غابات مهمة تُدار بشكل مستدام. ومع ذلك، فإن الحفاظ على التنوع البيولوجي البحري المحلي والنظم البيئية للغابات أولوية مجتمعية.
مهمتك:
اكتب مقترحًا قصيرًا (خطة قصيرة) يشمل إستراتيجية متوازنة لنوعين من الطاقة المتجددة يمكن أن نستخدمهما معًا. برّر توصيتك (أذكر الأسباب) بوضوح من خلال مناقشة ما يلي:
اشرح كيف يساعد كل نوع من الطاقة المتجددة البلدة حسب المكان والطقس واحتياجاتها من الكهرباء.
اشرح إذا كان هذا النوع من الطاقة مناسب من الناحية المالية، وكيف يمكن أن يوفر وظائف جديدة للسكان.
التأثيرات البيئية المحتملة وكيف تُخفِّف إستراتيجيتك من المخاطر على الغابات والحياة البحرية.
هذه المهمة محددة بوقت قدره 45 دقيقة.

فيما يلي معايير التقييم المُقدمة للطالب:

يُستخدم هذا المعيار لتقييم مقالك.

يتألف المقال من 200 إلى 300 كلمة.
يُمنع النسخ المباشر من القراءة أو من مصادر أخرى - يجب كتابة المقال بأسلوبك الخاص.

النقاط أدناه هي معايير التقييم الكاملة:

١. حدد مصادر الطاقة المُختارة:
ممتاز (3): يجمع بوضوح بين نوعين من الطاقة ويُقدم أسبابًا لكليهما.
جيد (2): يذكر نوعين من الطاقة مع شرح مُختصر.
أساسي (1): نوع واحد فقط من الطاقة، أو حل غير واضح؛ شرح مُختصر أو بدون شرح.

٢. استخدام التفاصيل الجغرافية والمناخية:
ممتاز (3): يشرح بوضوح كيف يتناسب كلا نوعي الطاقة مع الجغرافيا والمناخ المحلي.
جيد (2): يُقدم بعض التفاصيل حول الجغرافيا/المناخ المحلي، دون ربطه باختيار الطاقة.
أساسي (1): استخدام مُختصر أو لا يوجد تفاصيل للبيئة المحلية؛ خيارات الطاقة لا تتناسب مع السيناريو.

٣. الفوائد الاقتصادية والوظيفية:
ممتاز (3): شرح مُفصل يوضّح كيف تساعد الخطة في توفير المال وخلق  فرص عمل محلية جديدة.

جيد (2): ذكر الناحية المالية أو الوظائف ولكنه لم يقدم سوى تفاصيل قليلة.

أساسي (1): لم يذكر الناحية المالية أو الوظائف، أو قدّم معلومات غير صحيحة.

4. حماية البيئة:

ممتاز (3): شرح بوضوح كيف تحمي خطته الغابات والبحار؛ ووضّح طرقًا محددة لتجنب المخاطر.

جيد (2): ذكر الأثر البيئي ولكنه لم يقدم سوى تفاصيل قليلة عن الحماية.

أساسي (1): ذكر البيئة بشكل ضئيل أو لم يذكرها على الإطلاق، أو تجاهل المخاطر على الطبيعة.

5. جودة الكتابة:

ممتاز (3): الكتابة واضحة، وخالية من الأخطاء النحوية أو الإملائية. تسلسل الأفكار منطقي ومترابط.

جيد (2): يوجد بعض الأخطاء النحوية أو الإملائية تجعل الأفكار أقل وضوحًا. المعنى غير واضح أحيانًا.

أساسي (1): يوجد أخطاء نحوية أو إملائية متكررة؛ يصعب فهم الأفكار أوجمل غير مترابطة.

[[نهاية الشروط للمهمة]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    بالنسبة لهذه التغذية الراجعة، يرجى اتباع إطار التغذية الراجعة الفعّالة. يجب أن تكون متمحورة حول المتعلّم وأن تتضمن ثلاثة مكونات رئيسية:
١. أن تستند على شروط التعلّم المذكورة أعلاه، وأن تشمل تضمين كل من نقاط القوة والضعف في أداء الطالب لتوجيه عملية التعلم.
٢. التركيز على الأثر اللاحق من خلال تقديم تعليقات تحتوي على معلومات قابلة للتنفيذ تساعد الطالب على تحقيق نواتج التعلّم للمهمة. يجب أن يأتي هذا من النصائح المذكورة أعلاه.
٣. دعم الطالب ليشعر بالتحكّم في تعلّمه، والاهتمام باحتياجاته الاجتماعية والعاطفية والتحفيزية، وتشجيعه على أن يكون منفتحًا على التعليقات التقييمية.

انتبه إلى القيود التالية:
يرجى بذل قصارى جهدك لتجنّب إعطاء أي تعليمات تفصيلية عمّا يجب تضمينه في المقال!
يرجى التأكد من أن مخرجاتك تحتوي فقط على نص التغذية الراجعة!
وأخيرًا، يجب ألا تتجاوز التغذية الراجعة 100 كلمة!
[[نهاية مهمتك]]`,
        "gpt-scaffold-prompt-template-groupC": `[[شروط بدء المهمة]]
طالب يعمل على كتابة مقال.
فيما يلي تعليمات المهمة:
موضوع المهمة: إستراتيجية للطاقة المتجددة لمجتمع الساحل الشمالي.
تم تعيينك كخبير في مجال الطاقة لتقديم المشورة لمجتمع ساحلي شمالي يقع بالقرب من الجبال ويواجه فصول شتاء قارسة ومثلجة. يعتمد هذا المجتمع حاليًا بشكل كبير على الوقود الأحفوري المستورد، وهو مكلف، ومضر بالبيئة، وغير موثوق به خلال العواصف الشتوية الشديدة. تسعى المدينة إلى إيجاد حل يضمن إمدادات طاقة مستقرة على مدار العام، ويقلل التكاليف بمرور الوقت، ويخلق فرص عمل محلية في أفضل الأحوال. تشهد المنطقة رياحًا بحرية ثابتة قبالة سواحلها، وتقع بالقرب من موارد غابات مهمة تُدار بشكل مستدام. ومع ذلك، فإن الحفاظ على التنوع البيولوجي البحري المحلي والنظم البيئية للغابات أولوية مجتمعية.
مهمتك:
اكتب مقترحًا قصيرًا (خطة قصيرة) يشمل إستراتيجية متوازنة لنوعين من الطاقة المتجددة يمكن أن نستخدمهما معًا. برّر توصيتك (أذكر الأسباب) بوضوح من خلال مناقشة ما يلي:
اشرح كيف يساعد كل نوع من الطاقة المتجددة البلدة حسب المكان والطقس واحتياجاتها من الكهرباء.
اشرح إذا كان هذا النوع من الطاقة مناسب من الناحية المالية، وكيف يمكن أن يوفر وظائف جديدة للسكان.
التأثيرات البيئية المحتملة وكيف تُخفِّف إستراتيجيتك من المخاطر على الغابات والحياة البحرية.
هذه المهمة محددة بوقت قدره 45 دقيقة.

فيما يلي معايير التقييم المُقدمة للطالب:

يُستخدم هذا المعيار لتقييم مقالك.

يتألف المقال من 200 إلى 300 كلمة.
يُمنع النسخ المباشر من القراءة أو من مصادر أخرى - يجب كتابة المقال بأسلوبك الخاص.

النقاط أدناه هي معايير التقييم الكاملة:

١. حدد مصادر الطاقة المُختارة:
ممتاز (3): يجمع بوضوح بين نوعين من الطاقة ويُقدم أسبابًا لكليهما.
جيد (2): يذكر نوعين من الطاقة مع شرح مُختصر.
أساسي (1): نوع واحد فقط من الطاقة، أو حل غير واضح؛ شرح مُختصر أو بدون شرح.

٢. استخدام التفاصيل الجغرافية والمناخية:
ممتاز (3): يشرح بوضوح كيف يتناسب كلا نوعي الطاقة مع الجغرافيا والمناخ المحلي.
جيد (2): يُقدم بعض التفاصيل حول الجغرافيا/المناخ المحلي، دون ربطه باختيار الطاقة.
أساسي (1): استخدام مُختصر أو لا يوجد تفاصيل للبيئة المحلية؛ خيارات الطاقة لا تتناسب مع السيناريو.

٣. الفوائد الاقتصادية والوظيفية:
ممتاز (3): شرح مُفصل يوضّح كيف تساعد الخطة في توفير المال وخلق  فرص عمل محلية جديدة.

جيد (2): ذكر الناحية المالية أو الوظائف ولكنه لم يقدم سوى تفاصيل قليلة.

أساسي (1): لم يذكر الناحية المالية أو الوظائف، أو قدّم معلومات غير صحيحة.

4. حماية البيئة:

ممتاز (3): شرح بوضوح كيف تحمي خطته الغابات والبحار؛ ووضّح طرقًا محددة لتجنب المخاطر.

جيد (2): ذكر الأثر البيئي ولكنه لم يقدم سوى تفاصيل قليلة عن الحماية.

أساسي (1): ذكر البيئة بشكل ضئيل أو لم يذكرها على الإطلاق، أو تجاهل المخاطر على الطبيعة.

5. جودة الكتابة:

ممتاز (3): الكتابة واضحة، وخالية من الأخطاء النحوية أو الإملائية. تسلسل الأفكار منطقي ومترابط.

جيد (2): يوجد بعض الأخطاء النحوية أو الإملائية تجعل الأفكار أقل وضوحًا. المعنى غير واضح أحيانًا.

أساسي (1): يوجد أخطاء نحوية أو إملائية متكررة؛ يصعب فهم الأفكار أوجمل غير مترابطة.

[[نهاية الشروط للمهمة]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        بالنسبة لهذه التغذية الراجعة، يرجى اتباع إطار التغذية الراجعة الفعّالة. يجب أن تكون متمحورة حول المتعلّم وأن تتضمن ثلاثة مكونات رئيسية:
١. أن تستند على شروط التعلّم المذكورة أعلاه، وأن تشمل تضمين كل من نقاط القوة والضعف في أداء الطالب لتوجيه عملية التعلم.
٢. التركيز على الأثر اللاحق من خلال تقديم تعليقات تحتوي على معلومات قابلة للتنفيذ تساعد الطالب على تحقيق نواتج التعلّم للمهمة. يجب أن يأتي هذا من النصائح المذكورة أعلاه.
٣. دعم الطالب ليشعر بالتحكّم في تعلّمه، والاهتمام باحتياجاته الاجتماعية والعاطفية والتحفيزية، وتشجيعه على أن يكون منفتحًا على التعليقات التقييمية.

انتبه إلى القيود التالية:
يرجى بذل قصارى جهدك لتجنّب إعطاء أي تعليمات تفصيلية عمّا يجب تضمينه في المقال!
يرجى التأكد من أن مخرجاتك تحتوي فقط على نص التغذية الراجعة!
وأخيرًا، يجب ألا تتجاوز التغذية الراجعة 100 كلمة!
[[نهاية مهمتك]]`,
        "annotation-notes-title": "لوحة الملاحظات",
        "annotation-notes-delete-confirm-message": "هل أنت متأكد من الحذف؟",
        "annotation-write-note-placeholder": "أكتب ملاحظات هنا...",
        "annotation-tag-placeholder": "أدخل علامات (تسميات) جديدة واضغط على Enter...",
        "annotation-note-save-btn-text": "حفظ",
        "annotation-note-cancel-btn-text": "إلغاء",
        "annotation-search-btn-text": "بحث",
        "annotation-search-panel-input-placeholder": "أدخل الكلمات الرئيسية للبحث...",
        "scaffolding-title": "لوحة التعليمات",
        "scaffolding-create-checklist-btn-text": "إنشاء قائمة المهام",
        "scaffolding-edit-checklist-btn-text": "يحرر (تعديل)",
        "scaffolding-unread-message-text": "رسالة غير مقروءة",
        "scaffolding-chat-open-text": "الدردشة متاحة",
        "gpt-scaffolding-title": "لوحة التعليمات",
        "planner-title": "أداة التخطيط",
        "planner-learning-strategy-select-label-text": "1. يرجى وضع خطة لاستراتيجية التعلم الخاصة بك:",
        "planner-learning-strategy-select-option1-text": "اختر استراتيجية",
        "planner-learning-strategy-select-customise-option-text": "استخدم استراتيجيتك الخاصة",
        "planner-add-more-customise-strategy-btn-text": "أضف المزيد من الإستراتيجيات",
        "planner-customise-option-hint-textarea-placeholder": "يرجى توضيح سبب تصميم هذه الخطة (الاستراتيجية)؟",
        "planner-next-btn-text": "التالي",
        "planner-time-unit-minute": "الدقائق",
        "planner-display-plan-title": "خطة التعلم الخاصة بي",
        "planner-display-overall-strategy-label": "الاستراتيجية الشاملة:",
        "planner-display-time-allocation-label": "تخصيص الوقت:",
        "planner-display-writing-strategy-label": "استراتيجية الكتابة:",
        "planner-display-reading-strategy-label": "استراتيجية القراءة:",
        "planner-customise-plan-reason-placeholder": "(اختياري)",
        "essay-title": "أداة كتابة المقال",
        "essay-save-btn-text": "حفظ المقال",
        "essay-writing-placeholder": "أكتب مقال هنا...",
        "essay-show-word-count-btn-text": "إظهار عدد الكلمات",
        "essay-save-toast-text": "تم حفظ مقالتك!",
        "dictionary-title": "أداة القاموس",
        "dictionary-send-btn-text": "ارسال",
        "dictionary-panel-input-placeholder": "الرجاء إدخال كلمة استعلام (البحث)...",
        "checklist-title": "أداة قائمة المهام",
        "checklist-basic-panel-title": "أساسي",
        "checklist-academic-panel-title": "أكاديمي",
        "checklist-originality-panel-title": "أصالة النص (أن تبتكر أفكار جديدة في مقالتك)",
        "checklist-integration-panel-title": "التكامل والتفصيل (التوضيح والتنظيم)",
        "checklist-analyse-btn-text": "تحليل",
        "chatgpt-title": "أداة الدردشة (تشات جي بي تي)",
        "chatgpt-send-btn-text": "ارسال",
        "chatgpt-panel-input-placeholder": "أطرح سؤال...",
        "chatteacher-title": "أداة اسأل المعلم",
        "chatteacher-panel-input-placeholder": "طرح سؤال...",
        "chatteacher-connect-server-status-text": " حالة الاتصال بالخادم",
        "chatteacher-teacher-online-status-text": "حالة المعلم على الانترنت",
        "chatteacher-send-btn-text": "ارسال",
        "chatgpt-role-description": "أنت مساعد جيد، يرجى الإجابة على الأسئلة استنادًا إلى النص المقدم.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `حتى هذه المرحلة من جلسة التعلّم، حرص الطلاب الذين أدّوا بشكل جيد في هذه المهمة على التأكد من وعيهم بالوقت المحدد للمهمة من خلال استخدام أداة المؤقّت المتاحة. يبدو أن هذا لا ينطبق على هذا الطالب. هل يمكنك تزويد الطالب بملاحظات على شكل فقرات (لا تستخدموا النقاط والقوائم المرقمة) توضّح له كيف يمكنه تحسين مراقبته للوقت من خلال استخدام أداة المؤقّت المتاحة، حيث إن أداة الوقت في شريط الأدوات تحمل رمز الساعة. وفي الوقت نفسه، يرجى أن تأخذ بعين الاعتبار بشكل شامل جميع شروط التعلّم الخاصة بهذا الطالب.`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `حتى هذه المرحلة من جلسة التعلّم، حرص الطلاب الذين أدّوا بشكل جيد في هذه المهمة على الرجوع إلى متطلبات المهمة ومعيار التقييم لتقييم مقالاتهم ومتابعة ما إذا كانت كتابتهم متوافقة مع متطلبات المهمة ومعيار التقييم أو لا. ويبدو أن هذا ليس هو الحال مع هذا الطالب. هل يمكنك تزويد الطالب بتغذية راجعة على شكل فقرة (من دون استخدام النقاط أو القوائم المرقمة) توضّح له أهمية مراجعة تعليمات المهمة ومعيار التقييم لتقييم مقاله ومتابعة مدى اتساق كتابته مع متطلبات المهمة ومعيار التقييم، مع محاولة قدر الإمكان تجنّب إعطاء أي تعليمات تفصيلية حول ما يجب تضمينه في المقال. وفي الوقت نفسه، يرجى أن تأخذ بعين الاعتبار بشكل شامل جميع شروط التعلّم الخاصة بهذا الطالب.`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `لدينا طالب واحد يعمل حاليًا على هذه المهمة التعليمية. كان الطلاب الآخرون الذين أدوا جيدًا في هذه المهمة يتحققون باستمرار من تعليمات المهمة والمعايير حتى الدقيقة الرابعة عشرة من جلسة التعلم.  لم ينطبق هذا الأمر على هذا الطالب. لذلك، مع الأخذ بعين الاعتبار جميع المعلومات المقدمة أعلاه (بما في ذلك متطلبات المهمة، والمعايير، ومواد القراءة)، ونظرًا لظروف التعلم الخاصة بالطالب المذكورة أعلاه، يُرجى تقديم تعليقات للطالب بأسلوب فقرات حول كيفية التحقق من تعليمات المهمة والمعايير (آلية التقييم) بانتظام حتى نهاية جلسة الكتابة.`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `حتى هذه المرحلة من جلسة التعلّم، تأكّد الطلاب الذين أدّوا بشكل جيد في هذه المهمة من فهمهم الواضح لمتطلبات المهمة ومعيار التقييم. ويبدو أن هذا ليس هو الحال مع هذا الطالب. هل يمكنك تزويد الطالب بتغذية راجعة (ملاحظات) على شكل فقرة (من دون استخدام النقاط أو القوائم المرقمة) توضّح له كيف يمكنه تحسين فهمه لتعليمات المهمة ومعيار التقييم، بما يدعم وعيه الذاتي لمتطلبات ومعايير كتابة المقال، مع المحاولة قدر الإمكان تجنّب إعطاء أي تعليمات تفصيلية عمّا يجب تضمينه في المقال. وفي الوقت نفسه، يرجى أن تأخذ بعين الاعتبار بشكل شامل جميع شروط التعلّم الخاصة بهذا الطالب.`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `حتى هذه المرحلة من جلسة التعلم، حرص الطلاب الذين أدوا أداءً جيدًا في هذه المهمة على معرفة الحد الزمني للمهمة من خلال استخدام أداة التوقيت المُخصصة، وفي الوقت نفسه، فهموا بوضوح متطلبات المهمة ومعايير التقييم. يبدو أن هذا لا ينطبق على هذا الطالب. هل يمكنك تزويد الطالب بتغذية راجعة (ملاحظات) على شكل فقرة (من دون استخدام النقاط أو القوائم المرقمة) تجمع بين النصائح في كل هذه الجوانب، حول كيفية تحسين مراقبته للوقت باستخدام أداة المؤقّت المتاحة، حيث إن زر الوقت في شريط الأدوات يحمل رمز الساعة، وكذلك حول كيفية تحسين فهمه لتعليمات المهمة ومعيار التقييم، بما يدعم وعيه الذاتي وموائمة كتابته للمقال مع متطلبات المهمة ومعيار التقييم، مع محاولة قدر الإمكان تجنّب إعطاء أي تعليمات تفصيلية عمّا يجب تضمينه في المقال. وفي الوقت نفسه، يرجى أن تأخذ بعين الاعتبار بشكل شامل جميع شروط التعلّم الخاصة بهذا الطالب.`,
        "gpt-scaffold-need-check-srl-prompt-OR2": `لدينا طالب واحد يعمل حاليًا على هذه المهمة التعليمية. بدأ الطلاب الآخرون الذين أدوا جيدًا في هذه المهمة بالفعل في تضمين بعض المعلومات من نصوص القراءة في مقالاتهم حتى الدقيقة الحادية والعشرين من جلسة التعلم. لم ينطبق هذا الأمر على هذا الطالب. لذا، مع الأخذ في الاعتبار جميع المعلومات المقدمة أعلاه (بما في ذلك متطلبات المهمة والمعايير ومحتوى القراءة)، ونظرًا لظروف التعلم الخاصة بالطالب المذكورة أعلاه، يُرجى تقديم تعليقات للطالب بأسلوب فقرات حول كيفية تضمين المعلومات من نصوص القراءة في مسودة مقاله، بالاستناد إلى متطلبات المهمة.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `حتى هذه المرحلة من جلسة التعلّم، تأكّد الطلاب الذين أدّوا بشكل جيد في هذه المهمة من شرح الأفكار بكلماتهم الخاصة استنادًا إلى محتوى القراءة. ويبدو أن هذا ليس هو الحال مع هذا الطالب. هل يمكنك تزويد الطالب بتغذية راجعة على شكل فقرة (من دون استخدام النقاط أو القوائم المرقمة) توضّح أهمية شرح الأفكار بكلماته الخاصة مع إظهار الفهم لمحتويات القراءة. يجب أن تدرك أنك لا تستطيع إعطاء تعليمات تفصيلية حول كيفية كتابة المقال. وفي الوقت نفسه، يرجى أن تأخذ بعين الاعتبار بشكل شامل جميع شروط التعلّم الخاصة بهذا الطالب.`,
        "gpt-scaffold-user-take-pre-study-prompt": "هذا الطالب قد شارك في الدراسة السابقة، لذلك لديه/لديها مستوى معيّن من المعرفة بالمهمة.",
        "gpt-scaffold-isdimu-prompt-0": "هذا الطالب يمتلك فهمًا كبيراً للعديد من الاستراتيجيات أو التقنيات التي يمكن تطبيقها لتسهيل التعلم.",
        "gpt-scaffold-isdimu-prompt-16": "هذا الطالب يمتلك فهمًا منخفضًا عن الاستراتيجيات أو التقنيات التي يمكن تطبيقها لتسهيل التعلم.",
        "gpt-scaffold-isdimu-prompt-32": "يبدو أن هذا الطالب يمتلك بعض الفهم عن الاستراتيجيات أو التقنيات التي يمكن تطبيقها لتسهيل التعلم.",
        "gpt-scaffold-pretest-grades-prompt-0": "هذا الطالب لديه مستوى عالٍ من المعرفة حول الطاقة المتجددة.",
        "gpt-scaffold-pretest-grades-prompt-5": "هذا الطالب لديه مستوى منخفض من المعرفة حول الطاقة المتجددة.",
        "gpt-scaffold-pretest-grades-prompt-10": "هذا الطالب لديه مستوى متوسط من المعرفة حول الطاقة المتجددة.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "هذا الطالب يفهم كيف يتعلّم بشكل أفضل ويمكنه اختيار استراتيجيات جيدة للتعلّم.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "هذا الطالب غير مدرك لأدوات أو استراتيجيات التعلّم الأنسب له. ",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "هذا الطالب لديه بعض الفهم لطرق التعلّم الفعاّله ويمكنه ذكر بعض الاستراتيجيات التي تساعده.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "هذا الطالب يخطط ويتابع ويعدّل طريقة تعلّمه ليحصل على نتائج أفضل.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "هذا الطالب لا يخطط مسبقًا ولا يتابع تعلّمه أثناء العمل.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "هذا الطالب يُولي بعض الاهتمام بالتخطيط ومراجعة تعلّمه أثناء أداء المهام.",
        "gpt-scaffold-test-mai-name": "النشاط 3: استبيان الوعي ما وراء المعرفي",
        "gpt-scaffold-test-isdimu-name": "النشاط ٣: المعرفة في تكتيكات التعلم",
        "gpt-scaffold-pretest-name": "النشاط ٢: اختبار المعرفة - الذكاء الاصطناعي في التعليم",
        "gpt-scaffold-check-take-previous-study-name": "النشاط ١: عن نفسك",
        "gpt-scaffold-planner-select-prompt-1": "هذا الطالب وضع خطة وهي [القراءة أولًا ثم الكتابة] لهذه المهمة.",
        "gpt-scaffold-planner-select-prompt-2": "هذا الطالب وضع خطة وهي [القراءة والكتابة في نفس الوقت] لهذه المهمة.",
        "gpt-scaffold-planner-select-prompt-3": "هذا الطالب وضع خطة وهي [الكتابة بشكل مكثف والقراءة بانتقائية] لهذه المهمة.",
        "gpt-scaffold-planner-select-prompt-4": "هذا الطالب قام بتصميم خطته الخاصة لهذه المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "هذا الطالب لم يضع خططًا واضحة لكيفية إنجاز المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "هذا الطالب قد وضع خططًا واضحة لكيفية إنجاز المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "هذا الطالب غير مدرك للوقت المتبقي لإكمال المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "هذا الطالب على علم بالوقت المتبقي لإكمال المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "هذا الطالب غير مدرك للأدوات المتاحة في البيئة (النظام) التي قد تساعده على إكمال المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "هذا الطالب مدرك للأدوات المتاحة في البيئة التي قد تساعده على إكمال المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "هذا الطالب غير مدرك لمحتوى القراءة المتاح في البيئة (النظام) التي قد تساعده في إنجاز المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "هذا الطالب مدرك لمحتوى القراءة المتاح في البيئة (النظام) التي قد تساعده في إنجاز المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "هذا الطالب غير مدرك لمعيار التقييم.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "هذا الطالب مدرك لمعيار التقييم.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "هذا الطالب غير مدرك لتعليمات المهمة.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "هذا الطالب مدرك لتعليمات المهمة.",
        "gpt-scaffold-role-description": "أنت مساعد جيد، يرجى تقديم الاقتراحات استنادًا إلى النص المعطى.",
        "planner-customise-step2-instruction": "من فضلك، قم بوصف بالتفصيل الاستراتيجية التعليمية التي تخطط لأعتمادها وكيف ستخصص وقتك. يمكنك أيضًا توضيح اسباب أختيار الاستراتيجية وتخصيص وقت لها.",
        "planner-reading-strategy-1": "اقرأ المحتوى صفحة صفحة.",
        "planner-reading-strategy-2": "تصفح سريع ثم قراءة بتفصيل.",
        "planner-reading-strategy-3": "استخدم أداة التمييز لتحديد المحتوى الرئيسي.",
        "planner-reading-strategy-4": "دوّن ملاحظاتك باستخدام أداة الملاحظات أثناء القراءة.",
        "planner-reading-strategy-5": "قراءة موجهة بالأسئلة مع التركيز على محتوى معيّن.",
        "planner-reading-strategy-6": "اقرأ بشكل انتقائي وتجاهل المحتوى غير المهم.",
        "planner-reading-strategy-instruction": "ما مهارات القراءة التي تخطط لاستخدامها؟ (اختيار متعدد)",
        "planner-writing-strategy-1": "أكتب النقاط الأساسية للمقال أولًا ثم أضيف التفاصيل.",
        "planner-writing-strategy-2": "أستخدم ملاحظاتي وما قمت بتمييزه (بتحديده) عندما أكتب المقال.",
        "planner-writing-strategy-3": "أراجع التعليمات ومعايير التقييم لأكتب بالطريقة المطلوبة.",
        "planner-writing-strategy-4": "أنسخ وألصق الجمل الأساسية ثم أعيد صياغتها بوضوح.",
        "planner-writing-strategy-5": "أستخدم طرق وأساليب الكتابة التي تعلمتها.",
        "planner-writing-strategy-instruction": "ما مهارات الكتابة التي تخطط لاستخدامها؟ (اختيار متعدد)",
        "planner-main-strategy-1": "اقرأ أولًا ثم اكتب",
        "planner-main-strategy-1-instruction": "كم من الوقت تخطط أن تقضيه في القراءة والكتابة على التوالي؟",
        "planner-main-strategy-1-task-1": "1.2 الوقت الذي سيتم قضاؤه في القراءة.",
        "planner-main-strategy-1-task-2": "2.2 الوقت الذي سيتم قضاؤه في الكتابة.",
        "planner-main-strategy-2": "القراءة والكتابة في نفس الوقت",
        "planner-main-strategy-2-instruction": "كم من الوقت تخطط أن تقضيه في كل موضوع؟",
        "planner-main-strategy-2-task-1": "1.2 اقرأ/اكتب عن اختيار مصادر الطاقة.",
        "planner-main-strategy-2-task-2": "2.2 اقرأ/اكتب عن التكاليف والفوائد.",
        "planner-main-strategy-2-task-3": "3.2 اقرأ/اكتب عن الآثار البيئية.",
        "planner-main-strategy-3": "اكتب بشكل مكثف، واقرأ بشكل انتقائي",
        "planner-main-strategy-3-instruction": "كم من الوقت تخطط أن تقضيه في المراحل المختلفة للكتابة؟",
        "planner-main-strategy-3-task-1": "1.2 أضع خطة لأقسام المقال. ",
        "planner-main-strategy-3-task-2": "2.2 اكتب المسودة (النسخة) الأولى.",
        "planner-main-strategy-3-task-3": "3.2 اقرأ معلومات إضافية مرتبطة بالمقال.",
        "planner-main-strategy-3-task-4": "4.2 أراجع وأحسّن المقال.",
        "planner-customise-plan-title": "خطة التخصيص",
        "planner-select-main-strategy-hint": "الرجاء تحديد استراتيجية واحدة للمتابعة!!!",
        "planner-allocate-time-hint": "الرجاء تخصيص وقت لجميع المهام ويجب أن يكون الوقت الإجمالي خلال (ضمن) 45 دقيقة!!!",
        "planner-select-reading-writing-strategy-hint": "الرجاء اختيار المهارات التي تنوي استخدامها!!!",
        "planner-save-plan-hint": "الرجاء ملء أسماء جميع الاستراتيجيات والوقت المناسب لها!!!",
        "rule-based-scaffold-title-1": "من المهم أن نفهم عن ماذا تتحدث / تتعلق المهمة.",
        "rule-based-scaffold-title-1-task-1": "(أ) استخدم القائمة للحصول على نظرة عامة وتصفح النص",
        "rule-based-scaffold-title-1-task-2": "(ب) تحقق من معايير تقييم المقال",
        "rule-based-scaffold-title-1-task-3": "(ج) تحقق من أهداف التعلم والتعليمات",
        "rule-based-scaffold-title-2": "من المهم قراءة المعلومات حول مواضيع المحتوى ( نصوص القراءه)",
        "rule-based-scaffold-title-2-task-1": "(أ) دوّن المعلومات المهمة",
        "rule-based-scaffold-title-2-task-2": "(ب) اختر ما ستقرأ",
        "rule-based-scaffold-title-2-task-3": "(ج) تحقق من الوقت المتبقي",
        "rule-based-scaffold-title-3": "من المهم قراءة المعلومات المتعلقه المحتوى ومراجعة قراءتك.",
        "rule-based-scaffold-title-3-task-1": "(أ) راجع التعليقات التوضيحية للتحقق من التعلم حتى الآن",
        "rule-based-scaffold-title-3-task-2": "(ب) راجع أهداف التعلم والتعليمات",
        "rule-based-scaffold-title-3-task-3": "(ج) تحقق من المقال لتحديد ما يجب قراءته بعد ذلك",
        "rule-based-scaffold-title-4": "من المهم كتابة مقال جيد.",
        "rule-based-scaffold-title-4-task-1": "(أ) تحقق من الوقت المتبقي",
        "rule-based-scaffold-title-4-task-2": "(ب) تحقق من معايير (آليه تقييم) المقال",
        "rule-based-scaffold-title-4-task-3": "(ج) صياغة المقالة من خلال نقل التعلم إلى النقاط الرئيسية",
        "rule-based-scaffold-title-5": "من المهم كتابة المعلومات المتعلقه المحتوى (نصوص القراءه) والتحقق من كتابتك.",
        "rule-based-scaffold-title-5-task-1": "(أ)تحقق من معايير تقييم المقال",
        "rule-based-scaffold-title-5-task-2": "(ب) عدَل مقالتك",
        "rule-based-scaffold-title-5-task-3": "(ج) تحقق من أهداف التعلم والتعليمات",
        "annotation-label-1": "دوّن ملاحظة",
        "annotation-label-2": "مهم",
        "annotation-label-3": "مفيد",
        "annotation-label-4": "مفهوم",
        "annotation-label-5": "غير واضح",
        "product-visual-title": "تصوّر المنتج",
        "product-visual-close-btn": "إغلاق",
        "process-visual-title": "تصوّر العملية",
        "process-visual-set-goal-label": "أهدافك المحددة",
        "process-visual-close-btn": "إغلاق",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "(زر التحكم + زر الإدخال) Ctrl + Enter",
        "annotation-toolbar-btn-hint": "لوحة التعليقات التوضيحية",
        "annotation-search-toolbar-btn-hint": "أداة البحث عن التعليقات",
        "gpt-scaffold-toolbar-btn-hint": "أداة التعليمات",
        "essay-writing-toolbar-btn-hint": "أداة الكتابة",
        "planner-toolbar-btn-hint": "أداة التخطيط",
        "multi-agents-single-window-toolbar-btn-hint": "مساعد الدردشة",
        "timer-toolbar-btn-hint": "المؤقت",
        "like-response-text": "هل أعجبك هذا الرد؟",
        "annotation-tool-data-label": "أداة التعليقات التوضيحية",
        "search-annotation-tool-data-label": "أداة البحث في التعليقات ",
        "gpt-scaffold-tool-data-label": "أداة التعليمات",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "أداة الكتابة",
        "math-tool-data-label": "",
        "planner-tool-data-label": "أداة التخطيط",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "أداة المساعدة (Chatbot)",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "أداة المؤقت",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": `
روبوت المحادثة هذا متاح لك الآن. لا يمكنك استخدامه لكتابة مقالك.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "أدخل نصًا لبدء المحادثة",
        "chat-reminder-message-title": `رسالة تذكير
`,
        "scaffolding-message-title": "ملاحظات حول أدائك الحالي:",
        "scaffold-chat-reminder": "مرحبًا، لقد انشغلت بالدردشة لفترة. دعنا نعد إلى المهمة الرئيسية",
    },
    ces: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Začátek podmínek úkolu]]

Student pracuje na psaní eseje.

Následuje instrukce k úkolu:

Téma úkolu: Plán využití obnovitelné energie pro severní pobřežní komunitu

Byl/a jsi najat/a jako energetický expert/ka, abys pomohl/a severní pobřežní komunitě, která se nachází poblíž hor a čelí drsným, zasněženým zimám. Tato komunita je momentálně silně závislá na fosilních palivech, která dováží z jiných míst, což je drahé, škodlivé pro životní prostředí a během silných zimních bouří také nespolehlivé. 

Město hledá řešení, které zajistí stabilní celoroční dodávky energie, dlouhodobě sníží náklady a ideálně vytvoří pracovní místa pro místní obyvatele. V oblasti jsou stálé, mořské větry a nachází se blízko rozsáhlých lesních zdrojů, které jsou spravovány udržitelně. Zároveň je však pro komunitu prioritou chránit místní mořský život a lesy.

Tvůj úkol:

Napiš krátký plán, ve kterém doporučíš vyváženou strategii obnovitelné energie kombinující dva typy udržitelných zdrojů energie. Své doporučení jasně zdůvodni tím, že uvedeš:

Jak každý obnovitelný zdroj energie zapadá do místních podmínek, klimatických výzev a energetických potřeb komunity.
Jaký má tento plán finanční aspekty a ekonomické výhody, včetně tvorby pracovních míst.
Jaké jsou možné dopady na životní prostředí a jak tvá strategie snižuje rizika pro lesy a mořský život.

Tento úkol je časově omezen na 45 minut.

Následují kritéria hodnocení, které jsou poskytnutá studentovi:

Tato kritéria hodnocení slouží k posouzení eseje.

Esej musí obsahovat 200 až 300 slov. 
NESMÍŠ opisovat přímo z textu a ani z jiných zdrojů – esej musí být napsaná tvými vlastními slovy.

Níže uvedená tabulka obsahuje kompletní kritéria hodnocení: 

1. Uvedení zvolených zdrojů energie:
    Výborné (3): Jasně kombinuje dva typy energie a zdůvodní jejich výběr.
    Dobré (2): Zmiňuje dva typy energie, ale jejich výběr není dostatečně zdůvodněn.
    Základní (1): Uvádí pouze jeden typ energie, nebo je řešení nejasné; nezdůvodní nebo podá nedostatečné zdůvodnění pro výběr energií.

2. Využití geografických a klimatických údajů:
    Výborné (3): Jasně vysvětluje, jak oba typy energie odpovídají místní geografii a klimatu.
    Dobré (2): Uvádí některé detaily o místní geografii/klimatu, ale nepropojuje je s volbou typu energie.
   Základní (1): Malé nebo žádné využití místních údajů; volba energie neodpovídá situaci.

3. Ekonomické a pracovní přínosy:
     Výborné (3): Jasně vysvětluje, jak plán šetří peníze a vytváří pracovní místa pro místní obyvatele.
     Dobré (2): Zmiňuje peníze nebo pracovní místa, ale s malým množstvím detailů.
     Základní (1): Nezmiňuje peníze a ani pracovní místa, nebo uvádí nesprávné informace.

4. Ochrana životního prostředí:
     Výborné (3): Jasně vysvětluje, jak plán chrání lesy a mořské prostředí, uvádí konkrétní způsoby vyhnutí se rizikům.
     Dobré (2): Zmiňuje dopad na životní prostředí, ale s malým množstvím informací o ochraně.
     Základní (1): Malá nebo žádná zmínka o životním prostředí nebo nezmiňuje rizika pro přírodu.

5. Kvalita psaného projevu:
     Výborné (3): Text je srozumitelný, bez gramatických nebo pravopisných chyb. Myšlenky na sebe logicky navazují.
     Dobré (2): Občasné gramatické nebo pravopisné chyby ztěžují porozumění. Význam je místy nejasný.
     Základní (1): Časté gramatické nebo pravopisné chyby; myšlenky jsou těžko srozumitelné nebo nejsou ucelené.

[[Konec tvého úkolu]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Při poskytování zpětné vazby se prosím řiďte účinným rámcem pro zpětnou vazbu. Je zaměřena na studenta a měla by zahrnovat tři hlavní složky:

(1) Na základě výše uvedených podmínek učení využijte silné i slabé stránky výkonu studenta k poskytnutí vhodných doporučení.
(2) Zaměřte se na následný dopad tím, že poskytnete komentáře s praktickými informacemi, které studentovi pomohou dosáhnout výborných učebních výstupů pro daný úkol. To by mělo vycházet z výše uvedených rad.
(3) Podporujte studenta v pocitu kontroly nad učebním procesem, věnujte pozornost jejich sociálním, emočním a motivačním potřebám a povzbuzujte ho k otevřenosti vůči hodnoticí zpětné vazbě.

Dodržujte následující omezení:

Není vám dovoleno psát eseje, přepisovat věty, shrnovat obsah ani poskytovat hotové odpovědi. Pokud vás student požádá, abyste tyto úkoly provedl (např. napsal esej), vysvělete mu, že musí převzít kontrolu nad svým procesem učení. Můžete odpovídat na otázky týkající se zadání a kritérií hodnocení uvedených níže, ale musíte se vyvarovat psaní odpovědí, které by bylo možné přímo vložit do studentovy eseje. Pokud se domníváte, že otázka není relevantní pro úkol, jednoduše odmítněte odpovědět a nechte uživatele vysvětlit, proč je otázka relevantní pro úkol.

Vaše odpověď by měla mít méně než 100 slov.

[[KONEC VAŠEHO ÚKOLU]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Začátek podmínek úkolu]]

Student pracuje na psaní eseje.

Následuje instrukce k úkolu:

Téma úkolu: Plán využití obnovitelné energie pro severní pobřežní komunitu

Byl/a jsi najat/a jako energetický expert/ka, abys pomohl/a severní pobřežní komunitě, která se nachází poblíž hor a čelí drsným, zasněženým zimám. Tato komunita je momentálně silně závislá na fosilních palivech, která dováží z jiných míst, což je drahé, škodlivé pro životní prostředí a během silných zimních bouří také nespolehlivé. 

Město hledá řešení, které zajistí stabilní celoroční dodávky energie, dlouhodobě sníží náklady a ideálně vytvoří pracovní místa pro místní obyvatele. V oblasti jsou stálé, mořské větry a nachází se blízko rozsáhlých lesních zdrojů, které jsou spravovány udržitelně. Zároveň je však pro komunitu prioritou chránit místní mořský život a lesy.

Tvůj úkol:

Napiš krátký plán, ve kterém doporučíš vyváženou strategii obnovitelné energie kombinující dva typy udržitelných zdrojů energie. Své doporučení jasně zdůvodni tím, že uvedeš:

Jak každý obnovitelný zdroj energie zapadá do místních podmínek, klimatických výzev a energetických potřeb komunity.
Jaký má tento plán finanční aspekty a ekonomické výhody, včetně tvorby pracovních míst.
Jaké jsou možné dopady na životní prostředí a jak tvá strategie snižuje rizika pro lesy a mořský život.

Tento úkol je časově omezen na 45 minut.

Následují kritéria hodnocení, které jsou poskytnutá studentovi:

Tato kritéria hodnocení slouží k posouzení eseje.

Esej musí obsahovat 200 až 300 slov. 
NESMÍŠ opisovat přímo z textu a ani z jiných zdrojů – esej musí být napsaná tvými vlastními slovy.

Níže uvedená tabulka obsahuje kompletní kritéria hodnocení: 

1. Uvedení zvolených zdrojů energie:
    Výborné (3): Jasně kombinuje dva typy energie a zdůvodní jejich výběr.
    Dobré (2): Zmiňuje dva typy energie, ale jejich výběr není dostatečně zdůvodněn.
    Základní (1): Uvádí pouze jeden typ energie, nebo je řešení nejasné; nezdůvodní nebo podá nedostatečné zdůvodnění pro výběr energií.

2. Využití geografických a klimatických údajů:
    Výborné (3): Jasně vysvětluje, jak oba typy energie odpovídají místní geografii a klimatu.
    Dobré (2): Uvádí některé detaily o místní geografii/klimatu, ale nepropojuje je s volbou typu energie.
   Základní (1): Malé nebo žádné využití místních údajů; volba energie neodpovídá situaci.

3. Ekonomické a pracovní přínosy:
     Výborné (3): Jasně vysvětluje, jak plán šetří peníze a vytváří pracovní místa pro místní obyvatele.
     Dobré (2): Zmiňuje peníze nebo pracovní místa, ale s malým množstvím detailů.
     Základní (1): Nezmiňuje peníze a ani pracovní místa, nebo uvádí nesprávné informace.

4. Ochrana životního prostředí:
     Výborné (3): Jasně vysvětluje, jak plán chrání lesy a mořské prostředí, uvádí konkrétní způsoby vyhnutí se rizikům.
     Dobré (2): Zmiňuje dopad na životní prostředí, ale s malým množstvím informací o ochraně.
     Základní (1): Malá nebo žádná zmínka o životním prostředí nebo nezmiňuje rizika pro přírodu.

5. Kvalita psaného projevu:
     Výborné (3): Text je srozumitelný, bez gramatických nebo pravopisných chyb. Myšlenky na sebe logicky navazují.
     Dobré (2): Občasné gramatické nebo pravopisné chyby ztěžují porozumění. Význam je místy nejasný.
     Základní (1): Časté gramatické nebo pravopisné chyby; myšlenky jsou těžko srozumitelné nebo nejsou ucelené.

[[Konec tvého úkolu]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Při poskytování zpětné vazby se prosím řiďte účinným rámcem pro zpětnou vazbu. Je zaměřena na studenta a měla by zahrnovat tři hlavní složky:

(1) Na základě výše uvedených podmínek učení využijte silné i slabé stránky výkonu studenta k poskytnutí vhodných doporučení.
(2) Zaměřte se na následný dopad tím, že poskytnete komentáře s praktickými informacemi, které studentovi pomohou dosáhnout výborných učebních výstupů pro daný úkol. To by mělo vycházet z výše uvedených rad.
(3) Podporujte studenta v pocitu kontroly nad učebním procesem, věnujte pozornost jejich sociálním, emočním a motivačním potřebám a povzbuzujte ho k otevřenosti vůči hodnoticí zpětné vazbě.

Dodržujte následující omezení:

Není vám dovoleno psát eseje, přepisovat věty, shrnovat obsah ani poskytovat hotové odpovědi. Pokud vás student požádá, abyste tyto úkoly provedl (např. napsal esej), vysvělete mu, že musí převzít kontrolu nad svým procesem učení. Můžete odpovídat na otázky týkající se zadání a kritérií hodnocení uvedených níže, ale musíte se vyvarovat psaní odpovědí, které by bylo možné přímo vložit do studentovy eseje. Pokud se domníváte, že otázka není relevantní pro úkol, jednoduše odmítněte odpovědět a nechte uživatele vysvětlit, proč je otázka relevantní pro úkol.

Vaše odpověď by měla mít méně než 100 slov.

[[KONEC VAŠEHO ÚKOLU]]`,
        "annotation-notes-title": "Panel poznámek",
        "annotation-notes-delete-confirm-message": "Chcete smazat?",
        "annotation-write-note-placeholder": "Zapište poznámky sem…",
        "annotation-tag-placeholder": "Zadejte nový štítek a stiskněte Enter…",
        "annotation-note-save-btn-text": "Uložit",
        "annotation-note-cancel-btn-text": "Zrušit",
        "annotation-search-btn-text": "Hledat",
        "annotation-search-panel-input-placeholder": "Zadejte klíčová slova…",
        "scaffolding-title": "Panel instrukcí",
        "scaffolding-create-checklist-btn-text": "Vytvořit kontrolní seznam",
        "scaffolding-edit-checklist-btn-text": "Upravit",
        "scaffolding-unread-message-text": "Nepřečtená zpráva",
        "scaffolding-chat-open-text": "Chat otevřen",
        "gpt-scaffolding-title": "Panel instrukcí",
        "planner-title": "Nástroj plánování",
        "planner-learning-strategy-select-label-text": "1. Prosím, vytvoř si plán pro psaní eseje:",
        "planner-learning-strategy-select-option1-text": "Vyberte strategii",
        "planner-learning-strategy-select-customise-option-text": "Použij vlastní strategii",
        "planner-add-more-customise-strategy-btn-text": "Přidat strategii",
        "planner-customise-option-hint-textarea-placeholder": "Vysvětlete, proč jste tento plán navrhli",
        "planner-next-btn-text": "Další",
        "planner-time-unit-minute": "minut",
        "planner-display-plan-title": "Můj studijní plán",
        "planner-display-overall-strategy-label": "Celková strategie:",
        "planner-display-time-allocation-label": "Rozvržení času:",
        "planner-display-writing-strategy-label": "Strategie psaní:",
        "planner-display-reading-strategy-label": "Strategie čtení:",
        "planner-customise-plan-reason-placeholder": "(Nepovinné)",
        "essay-title": "Nástroj pro psaní esejí",
        "essay-save-btn-text": "Uložit esej",
        "essay-writing-placeholder": "Pište esej sem…",
        "essay-show-word-count-btn-text": "Počet slov",
        "essay-save-toast-text": "Vaše esej byla uložena!",
        "dictionary-title": "Slovník",
        "dictionary-send-btn-text": "Odeslat",
        "dictionary-panel-input-placeholder": "Zadejte hledané slovo…",
        "checklist-title": "Kontrolní seznam",
        "checklist-basic-panel-title": "Základní",
        "checklist-academic-panel-title": "Akademické",
        "checklist-originality-panel-title": "Originalita",
        "checklist-integration-panel-title": "Integrace a rozpracování",
        "checklist-analyse-btn-text": "Analyzovat",
        "chatgpt-title": "AI asistent",
        "chatgpt-send-btn-text": "Odeslat",
        "chatgpt-panel-input-placeholder": "Zeptejte se…",
        "chatteacher-title": "Zeptejte se učitele",
        "chatteacher-panel-input-placeholder": "Zeptejte se…",
        "chatteacher-connect-server-status-text": "Stav serveru",
        "chatteacher-teacher-online-status-text": "Učitel online",
        "chatteacher-send-btn-text": "Odeslat",
        "chatgpt-role-description": "Jste užitečný asistent, odpovídejte na základě poskytnutého textu.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Až do tohoto bodu výukové lekce studenti, kteří si v tomto úkolu vedli dobře, dbali na to, aby si pomocí poskytnutého časovače byli vědomi časového limitu pro daný úkol. V případě tohoto studenta se zdá, že tomu tak není. Mohl byste prosím poskytnout studentovi zpětnou vazbu ve formě odstavce (nepoužívejte odrážky a číslované seznamy) o tom, jak zlepšit sledování časového limitu pomocí časovače, který se nachází na panelu nástrojů ve formě tlačítka s ikonou hodin. Zároveň prosím komplexně zvažte všechny následující podmínky učení tohoto studenta:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Až do tohoto bodu výukové lekce studenti, kteří si v tomto úkolu vedli dobře, dbali na to, aby se průběžně vraceli k zadání úkolu a ke kritériím hodnocení, aby zhodnotili svůj návrh eseje a ověřili, zda jejich psaní odpovídá požadavkům úkolu a kritériím hodnocení. V případě tohoto studenta se zdá, že tomu tak není. Mohl byste prosím poskytnout studentovi zpětnou vazbu ve formě odstavce (nepoužívejte odrážky a číslované seznamy) ohledně použití informací z pokynů a kritérií hodnocení, přičemž se budete snažit VYHÝBAT poskytování podrobných instrukcí ohledně toho, co by esej měla obsahovat. Zároveň prosím komplexně zvažte všechny následující podmínky učení tohoto studenta:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "Do 14. minuty ostatní studenti opakovaně kontrolovali instrukci a rubriku; vy ne. Poradťe, jak to činit po zbytek sezení.",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Až do tohoto bodu výukové lekce si studenti, kteří si v tomto úkolu vedli dobře, ověřili, že plně rozumí zadání a kritériím hodnocení. V případě tohoto studenta se zdá, že tomu tak není. Mohl byste prosím poskytnout studentovi zpětnou vazbu ve formě odstavce (nepoužívejte odrážky a číslované seznamy) o tom, jak zlepšit porozumění zadání a kritériím hodnocení, a podpořit tak studentovo sebeuvědomění ohledně souladu eseje se zadáním úkolu a kritérii hodnocení, zatímco se budete snažit VYHÝBAT poskytování podrobných instrukcí ohledně toho, co by esej měla obsahovat. Zároveň prosím komplexně zvažte všechny následující podmínky učení tohoto studenta:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Až do tohoto bodu výukové lekce studenti, kteří si v tomto úkolu vedli dobře, dbali na to, aby si pomocí poskytnutého časovače byli vědomi časového limitu pro daný úkol a zároveň jasně rozuměli zadání a kritériím hodnocení. V případě tohoto studenta se zdá, že tomu tak není. Mohl byste prosím poskytnout studentovi zpětnou vazbu ve formě odstavce (nepoužívejte odrážky a číslované seznamy), která kombinuje rady ve všech těchto oblastech, jak zlepšit sledování časových omezení pomocí časovače, který je zobrazen jako tlačítko s ikonou hodin na panelu nástrojů, a jak zlepšit své porozumění pokynům a kritériím hodnocení a podpořit tak studentovo sebeuvědomění ohledně souladu eseje se zadáním úkolu a kritérii hodnocení, zatímco se budete snažit VYHÝBAT poskytování podrobných instrukcí ohledně toho, co by esej měla obsahovat. Zároveň prosím komplexně zvažte všechny následující podmínky učení u tohoto studenta:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "Do 21. minuty ostatní začlenili informace z četby do eseje; vy ne. Poradťe, jak je začlenit podle požadavků.",
        "gpt-scaffold-need-check-srl-prompt-OT2": `Až do tohoto bodu výukové lekce studenti, kteří si v tomto úkolu vedli dobře, dbali na to, aby vysvětlovali myšlenky vlastními slovy na základě přečteného materiálu. V případě tohoto studenta se zdá, že tomu tak není. Mohl byste prosím poskytnout studentovi zpětnou vazbu ve formě odstavce (nepoužívejte odrážky a číslované seznamy) o tom, jak je důležité vysvětlovat myšlenky svými slovy, a zároveň tím prokázat porozumění přečtenému materiálu. Zároveň prosím komplexně zvažte všechny následující podmínky učení u tohoto studenta:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Tento student se účastnil předchozí studie, takže už má určitou úroveň znalostí úkolu.",
        "gpt-scaffold-isdimu-prompt-0": "Tento student má vysoké metakognitivní uvědomění.",
        "gpt-scaffold-isdimu-prompt-16": "Tento student má nízké metakognitivní uvědomění.",
        "gpt-scaffold-isdimu-prompt-32": "Tento student má částečné metakognitivní uvědomění.",
        "gpt-scaffold-pretest-grades-prompt-0": "Tento student má vysokou úroveň znalostí o obnovitelné energii.",
        "gpt-scaffold-pretest-grades-prompt-5": "Tento student má nízkou úroveň znalostí o obnovitelné energii.",
        "gpt-scaffold-pretest-grades-prompt-10": "Tento student má střední úroveň znalostí o obnovitelné energii.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Tento student rozumí tomu, jak se nejlépe učí, a dokáže si vybrat vhodné strategie učení.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Tento student si není jistý, co mu pomáhá při učení a jaké strategie jsou pro něj nejvhodnější.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Tento student má určité znalosti o strategiích efektivního učení a dokáže vyjmenovat několik strategií, které mu pomáhají.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Tento student plánuje, monitoruje a reguluje své učení, aby dosáhl lepších výsledků.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Tento student neplánuje dopředu ani nesleduje své učení během práce.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Tento student věnuje částečnou pozornost plánování a kontrole svého učení během úkolu.",
        "gpt-scaffold-test-mai-name": "Aktivita 3: Dotazník metakognitivního uvědomění",
        "gpt-scaffold-test-isdimu-name": "Aktivita 3: ISDIMU",
        "gpt-scaffold-pretest-name": "Aktivita 2: Znalosti o obnovitelné energii",
        "gpt-scaffold-check-take-previous-study-name": "Aktivita 1: O vás",
        "gpt-scaffold-planner-select-prompt-1": "Tento student přišel s plánem [Nejprve přečti, potom začni psát] pro tento úkol.",
        "gpt-scaffold-planner-select-prompt-2": "Tento student přišel s plánem, [Čtení a psaní zároveň] pro tento úkol.",
        "gpt-scaffold-planner-select-prompt-3": "Tento student přišel s plánem [Piš intenzivně, čti selektivně] pro tento úkol.",
        "gpt-scaffold-planner-select-prompt-4": "Student plánuje [vytvořit vlastní plán].",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Tento student nevytvořil jasný plán, jak bude úkol řešit.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Tento student vytvořil jasný plán, jak bude úkol řešit.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Tento student si není vědom času, který mu zbývá k dokončení úkolu.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Tento student si je vědom času, který mu zbývá k dokončení úkolu.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Tento student si není vědom nástrojů, které má k dispozici a které by mu mohly pomoci dokončit úkol.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Tento student si je vědom nástrojů, které má k dispozici a které by mu mohly pomoci dokončit úkol.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Tento student si není vědom dostupných materiálů určených ke čtení, které by mu mohly pomoci s úkolem.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Tento student si je vědom dostupných materiálů určených ke čtení, které by mu mohly pomoci s úkolem.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Tento student si není vědom kritérií hodnocení.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Tento student si je vědom kritérií hodnocení.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Tento student si není vědom zadání úkolu.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Tento student si je vědom zadání úkolu.",
        "gpt-scaffold-role-description": "Jste užitečný asistent, navrhujte na základě textu.",
        "planner-customise-step2-instruction": "Podrobně popiš svůj plán pro psaní eseje, kterou plánuješ použít, a jak si rozdělíš čas. Můžeš také uvést důvody, proč jsi zvolil/a právě tuto strategii a toto rozdělení času.",
        "planner-reading-strategy-1": "Budu materiál číst stránku po stránce",
        "planner-reading-strategy-2": "Nejdříve si materiál rychle prohlédnu a poté si ho detailně přečtu",
        "planner-reading-strategy-3": "Použiji zvýrazňovač k označení klíčového obsahu",
        "planner-reading-strategy-4": "Při čtení materiálu si budu průběžně psát poznámky",
        "planner-reading-strategy-5": "Budu číst na základě otázek, s důrazem na určitý obsah",
        "planner-reading-strategy-6": "Budu číst selektivně a přeskakovat nedůležitý obsah",
        "planner-reading-strategy-instruction": "Jaké čtenářské dovednosti plánuješ použít (možnost výběru více odpovědí)?",
        "planner-writing-strategy-1": "Nejdříve si vytvořím osnovu eseje a poté doplním detaily.",
        "planner-writing-strategy-2": "Při psaní eseje budu používat své poznámky a zvýrazněné části textu.",
        "planner-writing-strategy-3": "Znovu si projdu zadání a hodnoticí kritéria, abych psal/a podle požadavků.",
        "planner-writing-strategy-4": "Zkopíruji si klíčové věty a poté je přepíšu vlastními slovy.",
        "planner-writing-strategy-5": "Využiji osnovu a způsoby psaní eseje, které jsem se naučil/a.",
        "planner-writing-strategy-instruction": "Jaké dovednosti plánuješ při psaní použít (možnost výběru více odpovědí)?",
        "planner-main-strategy-1": "Nejprve přečti, potom začni psát",
        "planner-main-strategy-1-instruction": "Kolik času plánuješ věnovat čtení a psaní?",
        "planner-main-strategy-1-task-1": "2.1 Čas věnovaný čtení",
        "planner-main-strategy-1-task-2": "2.2 Čas věnovaný psaní",
        "planner-main-strategy-2": "Čtení a psaní zároveň",
        "planner-main-strategy-2-instruction": "Kolik času plánuješ věnovat každému tématu?",
        "planner-main-strategy-2-task-1": "2.1 Čtení/psaní o výběru energie",
        "planner-main-strategy-2-task-2": "2.2 Čtení/psaní o nákladech a ekonomických přínosech",
        "planner-main-strategy-2-task-3": "2.3 Čtení/psaní o dopadech na životní prostředí",
        "planner-main-strategy-3": "Piš intenzivně, čti selektivně",
        "planner-main-strategy-3-instruction": "Kolik času plánuješ věnovat jednotlivým fázím psaní?",
        "planner-main-strategy-3-task-1": "2.1 Plánování struktury eseje:",
        "planner-main-strategy-3-task-2": "2.2 Psaní první verze eseje:",
        "planner-main-strategy-3-task-3": "2.3 Čtení doplňujících informací relevantních k eseji:",
        "planner-main-strategy-3-task-4": "2.4 Kontrola a vylepšení eseje:",
        "planner-customise-plan-title": "Vlastní plán",
        "planner-select-main-strategy-hint": "Vyberte strategii pro pokračování!",
        "planner-allocate-time-hint": "Rozdělte čas na všechny úkoly a nepřekročte limit!",
        "planner-select-reading-writing-strategy-hint": "Vyberte dovednosti, které použijete!",
        "planner-save-plan-hint": "Vyplňte názvy strategií a správné časy!",
        "rule-based-scaffold-title-1": "Je důležité porozumět úkolu.",
        "rule-based-scaffold-title-1-task-1": "(a) Prohlédněte si nabídku a rychle text projděte",
        "rule-based-scaffold-title-1-task-2": "(b) Zkontrolujte rubriku eseje",
        "rule-based-scaffold-title-1-task-3": "(c) Zkontrolujte cíle učení a instrukce",
        "rule-based-scaffold-title-2": "Je důležité číst informace o tématech.",
        "rule-based-scaffold-title-2-task-1": "(a) Zaznamenejte důležité informace",
        "rule-based-scaffold-title-2-task-2": "(b) Vyberte, co číst",
        "rule-based-scaffold-title-2-task-3": "(c) Zkontrolujte zbývající čas",
        "rule-based-scaffold-title-3": "Je důležité revidovat relevantní informace.",
        "rule-based-scaffold-title-3-task-1": "(a) Projděte anotace",
        "rule-based-scaffold-title-3-task-2": "(b) Projděte cíle a instrukce",
        "rule-based-scaffold-title-3-task-3": "(c) Zkontrolujte esej, abyste určili další četbu",
        "rule-based-scaffold-title-4": "Je důležité napsat dobrou esej.",
        "rule-based-scaffold-title-4-task-1": "(a) Zkontrolujte zbývající čas",
        "rule-based-scaffold-title-4-task-2": "(b) Zkontrolujte rubriku",
        "rule-based-scaffold-title-4-task-3": "(c) Vytvořte návrh eseje s hlavními body",
        "rule-based-scaffold-title-5": "Je důležité kontrolovat své psaní.",
        "rule-based-scaffold-title-5-task-1": "(a) Zkontrolujte rubriku",
        "rule-based-scaffold-title-5-task-2": "(b) Upravte svou esej",
        "rule-based-scaffold-title-5-task-3": "(c) Zkontrolujte cíle a instrukce",
        "annotation-label-1": "Poznámky",
        "annotation-label-2": "Důležité",
        "annotation-label-3": "Užitečné",
        "annotation-label-4": "Koncept",
        "annotation-label-5": "Matoucí",
        "product-visual-title": "Vizualizace produktu",
        "product-visual-close-btn": "Zavřít",
        "process-visual-title": "Vizualizace procesu",
        "process-visual-set-goal-label": "Vaše cíle",
        "process-visual-close-btn": "Zavřít",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Panel s poznámkami",
        "annotation-search-toolbar-btn-hint": "Hledat poznámky",
        "gpt-scaffold-toolbar-btn-hint": "Nástroj instrukcí",
        "essay-writing-toolbar-btn-hint": "Nástroj psaní",
        "planner-toolbar-btn-hint": "Nástroj plánování",
        "multi-agents-single-window-toolbar-btn-hint": "Chat asistent",
        "timer-toolbar-btn-hint": "Časovač",
        "like-response-text": "Líbí se ti tato odpověď?",
        "annotation-tool-data-label": "Nástroj poznámek",
        "search-annotation-tool-data-label": "Hledat poznámky",
        "gpt-scaffold-tool-data-label": "Nástroj instrukcí",
        "process-visual-tool-data-label": "Nástroj procesu",
        "essay-product-visual-tool-data-label": "Nástroj produktu eseje",
        "collaborate-writing-tool-data-label": "Společné psaní",
        "essay-writing-tool-data-label": "Nástroj psaní",
        "math-tool-data-label": "Matematický nástroj",
        "planner-tool-data-label": "Nástroj plánování",
        "checklist-tool-data-label": "Nástroj analýzy psaní",
        "multi-agents-single-window-tool-data-label": "Chatbot",
        "dictionary-tool-data-label": "Slovník",
        "timer-tool-data-label": "Časovač",
        "questionnaire-tool-data-label": "Dotazník",
        "chat-reminder-message": `
Tento chatbot ti je nyní k dispozici. Chatbota nemůžeš použít k napsání své eseje.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Zadej text pro zahájení chatu",
        "chat-reminder-message-title": "Připomínka",
        "scaffolding-message-title": "Zpětná vazba k vašemu aktuálnímu pokroku:",
        "scaffold-chat-reminder": "Ahoj, už si chvíli povídáme. Vraťme se zpět k hlavnímu úkolu!",
    },
    dan: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Start af opgavebeskrivelse]]

En studerende arbejder på en opgave, hvor de skal skrive en stil.

Opgaven lyder som følger:

Opgavens emne: Strategi for vedvarende energi til et kystsamfund i nord

Du er blevet ansat som energiekspert for at hjælpe et kystsamfund i norden, der ligger tæt på bjergene og har barske, snefyldte vintre. Dette samfund er i øjeblikket stærkt afhængigt af brændsel fra andre steder, hvilket er dyrt, dårligt for miljøet og upålideligt under voldsomme vinterstorme. 

Byen søger en løsning, der sikrer en stabil energiforsyning året rundt, sparer penge på sigt og ideelt set skaber lokale arbejdspladser. Området er udsat for konstante havvinde (dvs. vind fra havet) og ligger tæt på store skovressourcer, der forvaltes ansvarligt. Det er dog en prioritet for samfundet at bevare det lokale havmiljø og skovmiljø

Din opgave:

Skriv et kort forslag, hvor du anbefaler en afbalanceret strategi for vedvarende energi, der kombinerer to typer vedvarende energi. Begrund din anbefaling klart ved at diskutere:

Hvordan hver vedvarende energikilde passer til den lokale geografi, klimaudfordringer og energibehov.
Finansiel gennemførlighed og forventede økonomiske fordele, herunder jobskabelse.
Potentielle miljøpåvirkninger, og hvordan din strategi mindsker risici for skove og havets dyreliv.

Denne opgave er tidsbegrænset til 45 minutter. 

Følgende er vurderingskriterierne, der gives til den studerende:

Disse vurderingskriterier bruges til at evaluere din opgave. 

Opgaven består af 200 til 300 ord. 
Du må IKKE kopiere direkte fra læsestoffet eller andre kilder – opgaven skal skrives med dine egne ord.


Nedenstående matrix er den komplette vurderinskriterier: 


1. Angiv de valgte energikilder:
   Fremragende (3): Kombinerer tydeligt to energityper og giver begrundelser for begge.
   God (2): Nævner to energityper, men giver kun en kort forklaring.
   Grundlæggende (1): Kun én energitype eller uklar løsning; kun kort eller ingen forklaring.

2. Brug af geografiske og klimatiske detaljer:
   Fremragende (3): Forklarer tydeligt, hvordan begge energityper passer til den lokale geografi og det lokale klima.
    God (2): Giver nogle detaljer om lokal geografi/klima, men uden forbindelse til energivalget.
  Grundlæggende (1): Begrænset eller ingen brug af lokale detaljer; energivalg passer ikke til scenariet.

3. Økonomiske fordele og jobfordele:
  Fremragende (3): God forklaring af, hvordan planen sparer penge og skaber lokale job.
  God (2): Nævner penge eller job, men giver få detaljer.
    Grundlæggende (1): Nævner ikke penge eller arbejdspladser eller giver forkerte oplysninger.

4. Miljøbeskyttelse:
   Fremragende (3): Forklarer tydeligt, hvordan din plan beskytter skove og havmiljøet; giver konkrete eksempler på, hvordan risici undgås.
   God (2): Nævner miljøpåvirkningen, men giver få detaljer om beskyttelsen.
   Grundlæggende (1): Nævner kun i ringe grad eller slet ikke miljøet eller ignorerer risici for naturen.

5. Skrivestil:
   Fremragende (3): Skrivestilen er klar og uden grammatik- eller stavefejl. Idéerne flyder logisk.
   God (2): Nogle grammatik- eller stavefejl gør idéerne mindre klare. Betydningen er undertiden uklar.
   Grundlæggende (1): Hyppige grammatik- eller stavefejl; idéerne er svære at følge eller ikke sammenhængende.

[[Afslutning af opgavebeskrivelse]]

[[Begynd på din opgave]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Følg den effektive feedbackramme for denne feedback. Den er elevcentreret og bør omfatte tre hovedkomponenter:

1. Baseret på de ovenfor anførte læringsbetingelser skal både styrker og svagheder i elevens præstationer bruges til at informere undervisningen.
2. Fokuser på den efterfølgende effekt ved at give kommentarer med handlingsrettede oplysninger, der kan hjælpe eleven med at opnå læringsmålene for opgaven. Dette bør komme fra de ovenfor anførte råd.
3. Hjælp eleven med at føle, at han/hun har kontrol over sin læring, vær opmærksom på hans/hendes sociale, følelsesmæssige og motivationsmæssige behov, og opmuntr ham/hende til at være åben over for evaluerende kommentarer.

Vær opmærksom på følgende begrænsninger:

UNDGÅ så vidt muligt at give NOGEN SOM HELST detaljerede instruktioner om, hvad der skal medtages i essayet!

Sørg for, at du kun sender feedbackteksten!

Endelig må feedbacken IKKE overstige 100 ord!

[[Slut på din opgave]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Start af opgavebeskrivelse]]

En studerende arbejder på en opgave, hvor de skal skrive en stil.

Opgaven lyder som følger:

Opgavens emne: Strategi for vedvarende energi til et kystsamfund i nord

Du er blevet ansat som energiekspert for at hjælpe et kystsamfund i norden, der ligger tæt på bjergene og har barske, snefyldte vintre. Dette samfund er i øjeblikket stærkt afhængigt af brændsel fra andre steder, hvilket er dyrt, dårligt for miljøet og upålideligt under voldsomme vinterstorme. 

Byen søger en løsning, der sikrer en stabil energiforsyning året rundt, sparer penge på sigt og ideelt set skaber lokale arbejdspladser. Området er udsat for konstante havvinde (dvs. vind fra havet) og ligger tæt på store skovressourcer, der forvaltes ansvarligt. Det er dog en prioritet for samfundet at bevare det lokale havmiljø og skovmiljø

Din opgave:

Skriv et kort forslag, hvor du anbefaler en afbalanceret strategi for vedvarende energi, der kombinerer to typer vedvarende energi. Begrund din anbefaling klart ved at diskutere:

Hvordan hver vedvarende energikilde passer til den lokale geografi, klimaudfordringer og energibehov.
Finansiel gennemførlighed og forventede økonomiske fordele, herunder jobskabelse.
Potentielle miljøpåvirkninger, og hvordan din strategi mindsker risici for skove og havets dyreliv.

Denne opgave er tidsbegrænset til 45 minutter. 

Følgende er vurderingskriterierne, der gives til den studerende:

Disse vurderingskriterier bruges til at evaluere din opgave. 

Opgaven består af 200 til 300 ord. 
Du må IKKE kopiere direkte fra læsestoffet eller andre kilder – opgaven skal skrives med dine egne ord.


Nedenstående matrix er den komplette vurderinskriterier: 


1. Angiv de valgte energikilder:
   Fremragende (3): Kombinerer tydeligt to energityper og giver begrundelser for begge.
   God (2): Nævner to energityper, men giver kun en kort forklaring.
   Grundlæggende (1): Kun én energitype eller uklar løsning; kun kort eller ingen forklaring.

2. Brug af geografiske og klimatiske detaljer:
   Fremragende (3): Forklarer tydeligt, hvordan begge energityper passer til den lokale geografi og det lokale klima.
    God (2): Giver nogle detaljer om lokal geografi/klima, men uden forbindelse til energivalget.
  Grundlæggende (1): Begrænset eller ingen brug af lokale detaljer; energivalg passer ikke til scenariet.

3. Økonomiske fordele og jobfordele:
  Fremragende (3): God forklaring af, hvordan planen sparer penge og skaber lokale job.
  God (2): Nævner penge eller job, men giver få detaljer.
    Grundlæggende (1): Nævner ikke penge eller arbejdspladser eller giver forkerte oplysninger.

4. Miljøbeskyttelse:
   Fremragende (3): Forklarer tydeligt, hvordan din plan beskytter skove og havmiljøet; giver konkrete eksempler på, hvordan risici undgås.
   God (2): Nævner miljøpåvirkningen, men giver få detaljer om beskyttelsen.
   Grundlæggende (1): Nævner kun i ringe grad eller slet ikke miljøet eller ignorerer risici for naturen.

5. Skrivestil:
   Fremragende (3): Skrivestilen er klar og uden grammatik- eller stavefejl. Idéerne flyder logisk.
   God (2): Nogle grammatik- eller stavefejl gør idéerne mindre klare. Betydningen er undertiden uklar.
   Grundlæggende (1): Hyppige grammatik- eller stavefejl; idéerne er svære at følge eller ikke sammenhængende.

[[Afslutning af opgavebeskrivelse]]

[[Begynd på din opgave]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Følg den effektive feedbackramme for denne feedback. Den er elevcentreret og bør omfatte tre hovedkomponenter:

1. Baseret på de ovenfor anførte læringsbetingelser skal både styrker og svagheder i elevens præstationer bruges til at informere undervisningen.
2. Fokuser på den efterfølgende effekt ved at give kommentarer med handlingsrettede oplysninger, der kan hjælpe eleven med at opnå læringsmålene for opgaven. Dette bør komme fra de ovenfor anførte råd.
3. Hjælp eleven med at føle, at han/hun har kontrol over sin læring, vær opmærksom på hans/hendes sociale, følelsesmæssige og motivationsmæssige behov, og opmuntr ham/hende til at være åben over for evaluerende kommentarer.

Vær opmærksom på følgende begrænsninger:

UNDGÅ så vidt muligt at give NOGEN SOM HELST detaljerede instruktioner om, hvad der skal medtages i essayet!

Sørg for, at du kun sender feedbackteksten!

Endelig må feedbacken IKKE overstige 100 ord!

[[Slut på din opgave]]`,
        "annotation-notes-title": "Notatpanel",
        "annotation-notes-delete-confirm-message": "Vil du slette?",
        "annotation-write-note-placeholder": "Skriv noter her…",
        "annotation-tag-placeholder": "Indtast nye tags og tryk Enter…",
        "annotation-note-save-btn-text": "Gem",
        "annotation-note-cancel-btn-text": "Annullér",
        "annotation-search-btn-text": "Søg",
        "annotation-search-panel-input-placeholder": "Indtast søgeord…",
        "scaffolding-title": "Instruktionspanel",
        "scaffolding-create-checklist-btn-text": "Opret tjekliste",
        "scaffolding-edit-checklist-btn-text": "Redigér",
        "scaffolding-unread-message-text": "Ulæst besked",
        "scaffolding-chat-open-text": "Chat åben",
        "gpt-scaffolding-title": "Instruktionspanel",
        "planner-title": "Planlægningsværktøj",
        "planner-learning-strategy-select-label-text": "1. Vælg din læringsstrategi:",
        "planner-learning-strategy-select-option1-text": "Vælg en strategi",
        "planner-learning-strategy-select-customise-option-text": "Brug din egen strategi",
        "planner-add-more-customise-strategy-btn-text": "Tilføj flere strategier",
        "planner-customise-option-hint-textarea-placeholder": "Forklar hvorfor du har designet denne plan",
        "planner-next-btn-text": "Næste",
        "planner-time-unit-minute": "minutter",
        "planner-display-plan-title": "Min læringsplan",
        "planner-display-overall-strategy-label": "Overordnet strategi:",
        "planner-display-time-allocation-label": "Tidsfordeling:",
        "planner-display-writing-strategy-label": "Skrivestrategi:",
        "planner-display-reading-strategy-label": "Læsestrategi:",
        "planner-customise-plan-reason-placeholder": "(Valgfrit)",
        "essay-title": "Essay-værktøj",
        "essay-save-btn-text": "Gem essay",
        "essay-writing-placeholder": "Skriv essay her…",
        "essay-show-word-count-btn-text": "Ordtælling",
        "essay-save-toast-text": "Dit essay er gemt!",
        "dictionary-title": "Ordbog",
        "dictionary-send-btn-text": "Send",
        "dictionary-panel-input-placeholder": "Indtast et ord…",
        "checklist-title": "Tjekliste-værktøj",
        "checklist-basic-panel-title": "Basalt",
        "checklist-academic-panel-title": "Akademisk",
        "checklist-originality-panel-title": "Originalitet",
        "checklist-integration-panel-title": "Integration og uddybning",
        "checklist-analyse-btn-text": "Analysér",
        "chatgpt-title": "AI-assistent",
        "chatgpt-send-btn-text": "Send",
        "chatgpt-panel-input-placeholder": "Stil et spørgsmål…",
        "chatteacher-title": "Spørg lærer",
        "chatteacher-panel-input-placeholder": "Stil et spørgsmål…",
        "chatteacher-connect-server-status-text": "Serverstatus",
        "chatteacher-teacher-online-status-text": "Lærer online-status",
        "chatteacher-send-btn-text": "Send",
        "chatgpt-role-description": "Du er en hjælpsom assistent. Besvar spørgsmål ud fra den givne tekst.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Indtil dette punkt i læringssessionen har de studerende, der har klaret sig godt i denne opgave, sørget for at være opmærksomme på tidsbegrænsningen for opgaven ved hjælp af det medfølgende timer-værktøj. Dette synes ikke at være tilfældet med denne studerende. Kan du give eleven feedback i afsnitform (brug ikke punktopstillinger og nummererede lister) om, hvordan han/hun kan forbedre sin overvågning af tidsbegrænsninger ved hjælp af det medfølgende timer-værktøj, hvor tidsknappen i værktøjslinjen har et ur-symbol. I mellemtiden bedes du nøje overveje alle følgende læringsbetingelser for denne elev:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Indtil dette punkt i læringssessionen har de studerende, der har klaret sig godt i denne opgave, sørget for at henvise tilbage til opgavens krav og vurderingskriterierne for at evaluere deres essayudkast og kontrollere, om deres skrivning er i overensstemmelse med opgavens krav og vurderingskriterier. Dette synes ikke at være tilfældet med denne studerende. Kan du give eleven feedback i afsnitform (brug ikke punktopstillinger og nummererede lister) om, hvordan han/hun kan bruge oplysningerne fra opgavens instruktioner og vurderingskriterier til at evaluere sit essayudkast og overvåge, om det er i overensstemmelse med opgavens krav og vurderingskriterier, samtidig med at du gør dit bedste for at UNDGÅ at give detaljerede instruktioner om, hvad essayet skal indeholde. I mellemtiden bedes du nøje overveje alle følgende læringsbetingelser for denne elev:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "Ved det 14. minut har andre succesfulde studerende løbende tjekket opgave og rubrik; du har ikke. Skriv et afsnit med råd om at kontrollere opgaveinstruktion og rubrik jævnligt resten af sessionen.",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Indtil dette punkt i læringssessionen har de studerende, der har klaret sig godt i denne opgave, sørget for at forstå vurderingskriterier og opgavebeskrivelsen tydeligt. Dette synes ikke at være tilfældet med denne studerende. Kan du give eleven feedback i afsnitform (brug ikke punktopstillinger og nummererede lister) om, hvordan han/hun kan forbedre sin forståelse af opgavens instruktioner og bedømmelseskriterierne, og dermed støtte elevens selvbevidsthed om at tilpasse essayet til opgavens krav og bedømmelseskriterierne, samtidig med at du gør dit bedste for at UNDGÅ at give detaljerede instruktioner om, hvad essayet skal indeholde. I mellemtiden bedes du nøje overveje alle følgende læringsbetingelser for denne elev:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Indtil dette punkt i læringssessionen har de studerende, der har klaret sig godt i denne opgave, sørget for at være opmærksomme på tidsbegrænsningen eller opgaven ved hjælp af det medfølgende timer-værktøj, og samtidig har de klart forstået opgavens krav og vurderingskriterierne. Dette synes ikke at være tilfældet med denne studerende. Kan du give eleven feedback i afsnitform (brug ikke punktopstillinger og nummererede lister), der kombinerer rådgivning om alle disse områder, om hvordan man kan forbedre overvågningen af tidsbegrænsninger ved hjælp af det medfølgende timer-værktøj, hvor tidsknappen i værktøjslinjen har et ur-symbol, og om, hvordan de kan forbedre deres forståelse af opgavens instruktioner og vurderingskriterier, så de bliver mere bevidste om at tilpasse deres essay til opgavens krav og vurderingskriterier, samtidig med at du gør dit bedste for at UNDGÅ at give detaljerede instruktioner om, hvad essayet skal indeholde. Samtidigt bedes du tage alle følgende læringsbetingelser for denne studerende i betragtning:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": `Indtil det 21. minut har andre studerende allerede brugt materiale fra læsningen i deres essays. Skriv et afsnit med feedback om, hvordan du kan inddrage oplysninger fra læsematerialet i overensstemmelse med opgavekravene.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `Indtil dette punkt i undervisningen har de elever, der har klaret sig godt i denne opgave, sørget for at forklare idéerne med deres egne ord på baggrund af læsematerialet. Dette synes ikke at være tilfældet med denne elev. Kan du give eleven feedback i afsnitform (brug ikke punktopstillinger og nummererede lister) om vigtigheden af at forklare idéerne med egne ord og samtidig demonstrere forståelse af læsematerialet. Du skal være opmærksom på, at du ikke kan give detaljerede instruktioner om, hvordan den studerende skal skrive essayet. I mellemtiden bedes du nøje overveje alle følgende læringsbetingelser for denne studerende:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Denne studerende har deltaget i den tidligere undersøgelse, så han/hun har et vist niveau af viden om opgaven.",
        "gpt-scaffold-isdimu-prompt-0": "Denne studerende har et godt metakognitivt niveau.",
        "gpt-scaffold-isdimu-prompt-16": "Denne studerende har lav metakognitiv forståelse.",
        "gpt-scaffold-isdimu-prompt-32": "Denne studerende har en vis metakognitiv forståelse.",
        "gpt-scaffold-pretest-grades-prompt-0": "Denne elev har et højt niveau af viden om vedvarende energi.",
        "gpt-scaffold-pretest-grades-prompt-5": "Denne elev har et lavt niveau af viden om vedvarende energi.",
        "gpt-scaffold-pretest-grades-prompt-10": "Denne elev har et middel niveau af viden om vedvarende energi.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Denne elev forstår, hvordan han/hun lærer bedst, og kan vælge gode teknikker for læring.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Denne elev er ikke klar over, hvad der hjælper dem med at lære, eller hvilke teknikker der fungerer bedst for dem.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Denne elev har en vis forståelse for, hvordan man lærer effektivt, og kan nævne et par teknikker, der hjælper.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Denne elev planlægger, overvåger og justerer sin læring for at opnå bedre resultater.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Denne elev planlægger ikke på forhånd og holder ikke styr på sin læring, mens han/hun arbejder.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Denne elev lægger en vis vægt på at planlægge og kontrollere sin læring under opgaverne.",
        "gpt-scaffold-test-mai-name": "Aktivitet 3: Refleksion over din læring",
        "gpt-scaffold-test-isdimu-name": "Aktivitet 3: ISDIMU",
        "gpt-scaffold-pretest-name": "Aktivitet 2: Hvor meget ved du om vedvarende energi?",
        "gpt-scaffold-check-take-previous-study-name": "Aktivitet 1: Om dig selv",
        "gpt-scaffold-planner-select-prompt-1": "Denne elev har lavet en plan om at [læse først og derefter skrive] for denne opgave.",
        "gpt-scaffold-planner-select-prompt-2": "Denne elev har lavet en plan om at [læse og skrive samtidigt] for denne opgave.",
        "gpt-scaffold-planner-select-prompt-3": "Denne elev har lavet en plan om at [skrive intensivt og læse selektivt] for denne opgave.",
        "gpt-scaffold-planner-select-prompt-4": "Denne studerende har valgt at [designe sin egen plan].",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Denne elev har ikke lavet konkrete planer for, hvordan han/hun vil løse opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Denne elev har lavet konkrete planer for, hvordan han/hun vil løse opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Denne elev er ikke opmærksom på den tid, der er tilbage til at fuldføre opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Denne elev er opmærksom på den tid, der er tilbage til at fuldføre opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Denne elev er ikke opmærksom på de værktøjer, der er tilgængelige i miljøet, og som kan hjælpe dem med at fuldføre opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Denne elev er opmærksom på de værktøjer, der er tilgængelige i miljøet, og som kan hjælpe dem med at fuldføre opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Denne elev er ikke opmærksom på det læsestof, der er tilgængeligt i miljøet, og som kan hjælpe dem med opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Denne elev er klar over, hvilke læsematerialer der er tilgængelige i miljøet, som kan hjælpe dem med opgaven.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Denne elev er ikke klar over vurderingskriterierne",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Denne elev er klar over vurderingskriterierne",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Denne elev er ikke klar over opgavens instruktioner.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Denne elev er bekendt med opgavens instruktioner.",
        "gpt-scaffold-role-description": "Du er en hjælpsom assistent. Giv forslag baseret på teksten.",
        "planner-customise-step2-instruction": "Beskriv detaljeret den strategi og tidsfordeling, du vil bruge, og begrund valgene.",
        "planner-reading-strategy-1": "Læs materialet side for side.",
        "planner-reading-strategy-2": "Gennemse hurtigt og læs derefter detaljeret.",
        "planner-reading-strategy-3": "Brug fremhævningsværktøjet til at markere vigtigt indhold.",
        "planner-reading-strategy-4": "Skriv min forståelse ned i noter, mens jeg læser.",
        "planner-reading-strategy-5": "Spørgsmålsstyret læsning med fokus på bestemt indhold.",
        "planner-reading-strategy-6": "Læs selektivt og spring irrelevant indhold over.",
        "planner-reading-strategy-instruction": "Hvilke læsefærdigheder planlægger du at bruge (flere valgmuligheder)?",
        "planner-writing-strategy-1": "Udarbejd først et udkast til en essaystruktur og udfyld derefter med detaljer.",
        "planner-writing-strategy-2": "Brug mine noter og fremhævninger, når jeg skriver essayet.",
        "planner-writing-strategy-3": "Gennemgå instruktioner og vurderingskriterierne for at sikre, at skrivningen er i overensstemmelse hermed",
        "planner-writing-strategy-4": "Kopier og indsæt vigtige sætninger, og omskriv dem derefter flydende",
        "planner-writing-strategy-5": "Brug den skrivestruktur og de mønstre, jeg har lært at skrive med",
        "planner-writing-strategy-instruction": "Hvilke skrivefærdigheder planlægger du at bruge (flere valgmuligheder)?",
        "planner-main-strategy-1": "Læs først, skriv derefter ",
        "planner-main-strategy-1-instruction": "Hvor meget tid planlægger du at bruge på henholdsvis læsning og skrivning?",
        "planner-main-strategy-1-task-1": "2.1 Tid vil blive brugt på læsning ",
        "planner-main-strategy-1-task-2": "2.2 Tid vil blive brugt på skrivning ",
        "planner-main-strategy-2": "Læs og skriv samtidigt ",
        "planner-main-strategy-2-instruction": "Hvor meget tid planlægger du at bruge på hvert emne?",
        "planner-main-strategy-2-task-1": "2.1 Læse/skrive om valg af energi",
        "planner-main-strategy-2-task-2": "2.2 Læse/skrive om omkostninger og fordele",
        "planner-main-strategy-2-task-3": "2.3 Læse/skrive om miljøpåvirkninge",
        "planner-main-strategy-3": "Skriv intensivt, læs selektivt",
        "planner-main-strategy-3-instruction": "Hvor meget tid planlægger du at bruge på de forskellige faser af skrivningen?",
        "planner-main-strategy-3-task-1": "2.1 Planlæg essayets struktur:",
        "planner-main-strategy-3-task-2": "2.2 Skriv det første udkast:",
        "planner-main-strategy-3-task-3": "2.3 Læs yderligere information, der er relevant for essayet:",
        "planner-main-strategy-3-task-4": "2.4 Gennemgå og forbedre essayet:",
        "planner-customise-plan-title": "Tilpasset plan",
        "planner-select-main-strategy-hint": "Vælg en strategi for at fortsætte!",
        "planner-allocate-time-hint": "Fordel tid til alle opgaver; den samlede tid skal være inden for grænsen!",
        "planner-select-reading-writing-strategy-hint": "Vælg de færdigheder, du vil bruge!",
        "planner-save-plan-hint": "Udfyld alle strateginavne og korrekt tid!",
        "rule-based-scaffold-title-1": "Det er vigtigt at forstå opgaven.",
        "rule-based-scaffold-title-1-task-1": "(a) Brug menuen for et overblik og skim teksten",
        "rule-based-scaffold-title-1-task-2": "(b) Tjek essay-rubrikken",
        "rule-based-scaffold-title-1-task-3": "(c) Tjek læringsmål og instruktioner",
        "rule-based-scaffold-title-2": "Det er vigtigt at læse information om emnerne.",
        "rule-based-scaffold-title-2-task-1": "(a) Notér vigtig information",
        "rule-based-scaffold-title-2-task-2": "(b) Vælg hvad du vil læse",
        "rule-based-scaffold-title-2-task-3": "(c) Hold øje med den resterende tid",
        "rule-based-scaffold-title-3": "Det er vigtigt at gennemgå relevant information.",
        "rule-based-scaffold-title-3-task-1": "(a) Gennemgå annotationer",
        "rule-based-scaffold-title-3-task-2": "(b) Gennemgå mål og instruktioner",
        "rule-based-scaffold-title-3-task-3": "(c) Tjek essay for at bestemme næste læsning",
        "rule-based-scaffold-title-4": "Det er vigtigt at skrive et godt essay.",
        "rule-based-scaffold-title-4-task-1": "(a) Tjek den resterende tid",
        "rule-based-scaffold-title-4-task-2": "(b) Tjek essay-rubrikken",
        "rule-based-scaffold-title-4-task-3": "(c) Udkast essay ved at overføre hovedpointer",
        "rule-based-scaffold-title-5": "Det er vigtigt at kontrollere din skrivning.",
        "rule-based-scaffold-title-5-task-1": "(a) Tjek essay-rubrikken",
        "rule-based-scaffold-title-5-task-2": "(b) Redigér dit essay",
        "rule-based-scaffold-title-5-task-3": "(c) Tjek læringsmål og instruktioner",
        "annotation-label-1": "Notat",
        "annotation-label-2": "vigtigt",
        "annotation-label-3": "nyttigt",
        "annotation-label-4": "koncept",
        "annotation-label-5": "forvirrende",
        "product-visual-title": "Produktvisualisering",
        "product-visual-close-btn": "Luk",
        "process-visual-title": "Procesvisualisering",
        "process-visual-set-goal-label": "Dine mål",
        "process-visual-close-btn": "Luk",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Anmærkningsværktøj",
        "annotation-search-toolbar-btn-hint": "Søgeværktøj til noter",
        "gpt-scaffold-toolbar-btn-hint": "Instruktionsværktøj",
        "essay-writing-toolbar-btn-hint": "Skriveværktøj",
        "planner-toolbar-btn-hint": "Planlægningsværktøj",
        "multi-agents-single-window-toolbar-btn-hint": "Chat-assistent",
        "timer-toolbar-btn-hint": "Timer",
        "like-response-text": "Kan du lide dette svar?",
        "annotation-tool-data-label": "Notatværktøj",
        "search-annotation-tool-data-label": "Søg i noter",
        "gpt-scaffold-tool-data-label": "Instruktionsværktøj",
        "process-visual-tool-data-label": "Procesværktøj",
        "essay-product-visual-tool-data-label": "Essay-produktværktøj",
        "collaborate-writing-tool-data-label": "Samarbejdsskrivning",
        "essay-writing-tool-data-label": "Skriveværktøj",
        "math-tool-data-label": "Matematikværktøj",
        "planner-tool-data-label": "Planlægningsværktøj",
        "checklist-tool-data-label": "Skriveanalyseværktøj",
        "multi-agents-single-window-tool-data-label": "Chatbot-værktøj",
        "dictionary-tool-data-label": "Ordbog",
        "timer-tool-data-label": "Timer",
        "questionnaire-tool-data-label": "Spørgeskema",
        "chat-reminder-message": `Denne chatbot er nu tilgængelig for dig. Du må ikke bruge chatbotten til at skrive dit essay for dig.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Indtast tekst for at starte chat",
        "chat-reminder-message-title": "Påmindelse",
        "scaffolding-message-title": "Feedback på din nuværende fremgang:",
        "scaffold-chat-reminder": "Hej, du har været optaget af chatten i et stykke tid. Lad os vende tilbage til hovedopgaven!",
    },
    de: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Beginn der Aufgabenbedingungen]]


Die Schüler:innen arbeiten an einer Aufsatzaufgabe.

Die folgende Anweisung beschreibt die Aufgabe:

Aufgabenthema: Strategie für erneuerbare Energie für eine Gemeinde an der Nordküste

Du wurdest als Energieexpert:in engagiert, um einer nördlichen Küstengemeinde zu helfen, die in der Nähe von Bergen liegt und mit kalten, schneereichen Wintern zu kämpfen hat. Diese Gemeinde ist derzeit stark von importierten fossilen Brennstoffen abhängig, die teuer, umweltschädlich und bei schweren Winterstürmen unzuverlässig sind.

Die Stadt sucht nach einer Lösung, die eine stabile Energieversorgung über das ganze Jahr hinweg gewährleistet, langfristig Kosten senkt und im Idealfall lokale Arbeitsplätze schafft. In der Region wehen stetige Meereswinde (Offshore-Winde), und sie liegt in der Nähe bedeutender Waldressourcen, die nachhaltig bewirtschaftet werden. Der Schutz der lokalen Meereslebewesen und Wälder – insbesondere der marinen Biodiversität und der Waldökosysteme – hat für die Gemeinde höchste Priorität.

Deine Aufgabe:

Verfasse einen kurzen Vorschlag, in dem du eine ausgewogene Strategie für erneuerbare Energie empfiehlst, die zwei Arten erneuerbarer Energie kombiniert. Begründe deine Empfehlung klar und deutlich, indem du folgende Punkte erläuterst:

Wie jede ausgewählte Energiequelle zur lokalen Geografie, zu den klimatischen Herausforderungen und zum Energiebedarf passt.
Wie dein Plan finanziell funktioniert und welche wirtschaftlichen Vorteile zu erwarten sind, einschließlich der Schaffung lokaler Arbeitsplätze.
Welche Auswirkungen auf die Umwelt zu erwarten sind und wie deine Strategie Risiken für Wälder und Meereslebewesen mindert.

Diese Aufgabe ist auf 45 Minuten begrenzt.

Die folgende Bewertungsmatrix wurde den Schüler:innen zur Verfügung gestellt:

Diese Kriterien dienen zur Bewertung deines Aufsatzes.

Der Aufsatz soll 200 bis 300 Wörter umfassen. Du darfst nicht direkt aus der Lektüre oder anderen Quellen kopieren – der Aufsatz sollte in deinen eigenen Worten verfasst sein.

Bewertungskriterien

1. Angabe der ausgewählten Energiequellen
Ausgezeichnet (3) Kombiniert klar zwei Energiearten und nennt überzeugende Gründe für beide.
Gut (2) Nennt zwei Energiearten, gibt jedoch nur wenig Erklärung.
Grundlegend (1) Nur eine Energieart oder unklare Lösung; wenig oder keine Erläuterung.

2. Verwendung geografischer und klimatischer Angaben
Ausgezeichnet (3) Erklärt klar, wie beide Energiearten zur lokalen Geografie und zum Klima passen.
Gut (2) Gibt einige Details zur Geografie oder zum Klima, ohne klaren Bezug zur Energieauswahl.
Grundlegend (1) Wenig oder keine Verwendung lokaler Details; Energieauswahl passt nicht zum Szenario.

3. Angabe wirtschaftlicher und arbeitsmarktbezogener Vorteile
Ausgezeichnet (3) Überzeugende Erklärung, wie der Plan Geld spart und lokale Arbeitsplätze schafft.
Gut (2) Erwähnt Geld oder Arbeitsplätze, gibt jedoch nur wenige Details.
Grundlegend (1) Erwähnt weder Geld noch Arbeitsplätze oder liefert falsche Informationen.

4. Umweltschutz
Ausgezeichnet (3) Erklärt klar, wie der Plan Wälder und Meereslebewesen schützt, und nennt konkrete Maßnahmen zur Risikominderung.
Gut (2) Erwähnt Umweltaspekte, geht jedoch kaum auf Schutzmaßnahmen ein.
Grundlegend (1) Erwähnt Umwelt kaum oder ignoriert Risiken für Natur und Ökosysteme.

5. Qualität der schriftlichen Ausarbeitung
Ausgezeichnet (3) Der Text ist klar, frei von Grammatik- und Rechtschreibfehlern; die Ideen sind logisch aufgebaut.
Gut (2) Einige Fehler beeinträchtigen die Klarheit; Ideen teilweise unklar.
Grundlegend (1) Häufige Fehler; Ideen sind schwer nachvollziehbar oder nicht kohärent.

[[Ende der Aufgabenbedingungen]]

[[Beginn deiner Aufgabe]]

    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Für dieses Feedback befolge bitte den Rahmen für wirksames Feedback. Er ist lernendenzentriert und umfasst drei Hauptkomponenten:

1. Auf Grundlage der oben genannten Lernvoraussetzungen sollen Stärken und Schwächen der Leistung genutzt werden, um die Rückmeldung zu begründen.

2. Der Fokus liegt auf der weiteren Entwicklung, indem umsetzbare Hinweise gegeben werden, die den Lernenden bei der Zielerreichung unterstützen.

3. Unterstütze die Schüler:innen dabei, das Gefühl zu haben, die Kontrolle über ihr Lernen zu haben; soziale, emotionale und motivationale Bedürfnisse sollen berücksichtigt und eine Offenheit für Rückmeldungen gefördert werden.

Beachte die folgenden Einschränkungen:

Bitte vermeide JEDE detaillierte Vorgabe, was im Aufsatz enthalten sein muss.

Gib ausschließlich den Feedbacktext aus.

Das Feedback darf 100 Wörter nicht überschreiten.

[[Ende deiner Aufgabe]]

`,
        "gpt-scaffold-prompt-template-groupC": `[[Beginn der Aufgabenbedingungen]]


Die Schüler:innen arbeiten an einer Aufsatzaufgabe.

Die folgende Anweisung beschreibt die Aufgabe:

Aufgabenthema: Strategie für erneuerbare Energie für eine Gemeinde an der Nordküste

Du wurdest als Energieexpert:in engagiert, um einer nördlichen Küstengemeinde zu helfen, die in der Nähe von Bergen liegt und mit kalten, schneereichen Wintern zu kämpfen hat. Diese Gemeinde ist derzeit stark von importierten fossilen Brennstoffen abhängig, die teuer, umweltschädlich und bei schweren Winterstürmen unzuverlässig sind.

Die Stadt sucht nach einer Lösung, die eine stabile Energieversorgung über das ganze Jahr hinweg gewährleistet, langfristig Kosten senkt und im Idealfall lokale Arbeitsplätze schafft. In der Region wehen stetige Meereswinde (Offshore-Winde), und sie liegt in der Nähe bedeutender Waldressourcen, die nachhaltig bewirtschaftet werden. Der Schutz der lokalen Meereslebewesen und Wälder – insbesondere der marinen Biodiversität und der Waldökosysteme – hat für die Gemeinde höchste Priorität.

Deine Aufgabe:

Verfasse einen kurzen Vorschlag, in dem du eine ausgewogene Strategie für erneuerbare Energie empfiehlst, die zwei Arten erneuerbarer Energie kombiniert. Begründe deine Empfehlung klar und deutlich, indem du folgende Punkte erläuterst:

Wie jede ausgewählte Energiequelle zur lokalen Geografie, zu den klimatischen Herausforderungen und zum Energiebedarf passt.
Wie dein Plan finanziell funktioniert und welche wirtschaftlichen Vorteile zu erwarten sind, einschließlich der Schaffung lokaler Arbeitsplätze.
Welche Auswirkungen auf die Umwelt zu erwarten sind und wie deine Strategie Risiken für Wälder und Meereslebewesen mindert.

Diese Aufgabe ist auf 45 Minuten begrenzt.

Die folgende Bewertungsmatrix wurde den Schüler:innen zur Verfügung gestellt:

Diese Kriterien dienen zur Bewertung deines Aufsatzes.

Der Aufsatz soll 200 bis 300 Wörter umfassen. Du darfst nicht direkt aus der Lektüre oder anderen Quellen kopieren – der Aufsatz sollte in deinen eigenen Worten verfasst sein.

Bewertungskriterien

1. Angabe der ausgewählten Energiequellen
Ausgezeichnet (3) Kombiniert klar zwei Energiearten und nennt überzeugende Gründe für beide.
Gut (2) Nennt zwei Energiearten, gibt jedoch nur wenig Erklärung.
Grundlegend (1) Nur eine Energieart oder unklare Lösung; wenig oder keine Erläuterung.

2. Verwendung geografischer und klimatischer Angaben
Ausgezeichnet (3) Erklärt klar, wie beide Energiearten zur lokalen Geografie und zum Klima passen.
Gut (2) Gibt einige Details zur Geografie oder zum Klima, ohne klaren Bezug zur Energieauswahl.
Grundlegend (1) Wenig oder keine Verwendung lokaler Details; Energieauswahl passt nicht zum Szenario.

3. Angabe wirtschaftlicher und arbeitsmarktbezogener Vorteile
Ausgezeichnet (3) Überzeugende Erklärung, wie der Plan Geld spart und lokale Arbeitsplätze schafft.
Gut (2) Erwähnt Geld oder Arbeitsplätze, gibt jedoch nur wenige Details.
Grundlegend (1) Erwähnt weder Geld noch Arbeitsplätze oder liefert falsche Informationen.

4. Umweltschutz
Ausgezeichnet (3) Erklärt klar, wie der Plan Wälder und Meereslebewesen schützt, und nennt konkrete Maßnahmen zur Risikominderung.
Gut (2) Erwähnt Umweltaspekte, geht jedoch kaum auf Schutzmaßnahmen ein.
Grundlegend (1) Erwähnt Umwelt kaum oder ignoriert Risiken für Natur und Ökosysteme.

5. Qualität der schriftlichen Ausarbeitung
Ausgezeichnet (3) Der Text ist klar, frei von Grammatik- und Rechtschreibfehlern; die Ideen sind logisch aufgebaut.
Gut (2) Einige Fehler beeinträchtigen die Klarheit; Ideen teilweise unklar.
Grundlegend (1) Häufige Fehler; Ideen sind schwer nachvollziehbar oder nicht kohärent.

[[Ende der Aufgabenbedingungen]]

[[Beginn deiner Aufgabe]]

        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Für dieses Feedback befolge bitte den Rahmen für wirksames Feedback. Er ist lernendenzentriert und umfasst drei Hauptkomponenten:

1. Auf Grundlage der oben genannten Lernvoraussetzungen sollen Stärken und Schwächen der Leistung genutzt werden, um die Rückmeldung zu begründen.

2. Der Fokus liegt auf der weiteren Entwicklung, indem umsetzbare Hinweise gegeben werden, die den Lernenden bei der Zielerreichung unterstützen.

3. Unterstütze die Schüler:innen dabei, das Gefühl zu haben, die Kontrolle über ihr Lernen zu haben; soziale, emotionale und motivationale Bedürfnisse sollen berücksichtigt und eine Offenheit für Rückmeldungen gefördert werden.

Beachte die folgenden Einschränkungen:

Bitte vermeide JEDE detaillierte Vorgabe, was im Aufsatz enthalten sein muss.

Gib ausschließlich den Feedbacktext aus.

Das Feedback darf 100 Wörter nicht überschreiten.

[[Ende deiner Aufgabe]]

`,
        "annotation-notes-title": "Notizenbereich",
        "annotation-notes-delete-confirm-message": "Möchtest du etwas löschen?",
        "annotation-write-note-placeholder": "Schreiben Sie hier Notizen...",
        "annotation-tag-placeholder": "Geben Sie neue Tags ein und drücken Sie die Eingabetaste...",
        "annotation-note-save-btn-text": "Speichern",
        "annotation-note-cancel-btn-text": "Abbrechen",
        "annotation-search-btn-text": "Suchen",
        "annotation-search-panel-input-placeholder": "Geben Sie die zu durchsuchenden Schlüsselwörter ein...",
        "scaffolding-title": "Gerüstplatte",
        "scaffolding-create-checklist-btn-text": "Checkliste erstellen",
        "scaffolding-edit-checklist-btn-text": "Bearbeiten",
        "scaffolding-unread-message-text": "Ungelesene Nachricht",
        "scaffolding-chat-open-text": "Chat öffnen",
        "gpt-scaffolding-title": "GPT-Gerüstplatte",
        "planner-title": "Planungswerkzeug",
        "planner-learning-strategy-select-label-text": "1. Bitte erstellen Sie einen Plan für Ihre Lernstrategie:",
        "planner-learning-strategy-select-option1-text": "Wähle eine Strategie",
        "planner-learning-strategy-select-customise-option-text": "Eigene Strategie erstellen",
        "planner-add-more-customise-strategy-btn-text": "Fügen Sie weitere Strategie hinzu",
        "planner-customise-option-hint-textarea-placeholder": "Erkläre bitte, warum du diese Strategien anwendest. (freiwillig)",
        "planner-next-btn-text": "Nächste",
        "planner-time-unit-minute": "Minuten",
        "planner-display-plan-title": "Mein Lernplan",
        "planner-display-overall-strategy-label": "Gesamtstrategie:",
        "planner-display-time-allocation-label": "Zeiteinteilung:",
        "planner-display-writing-strategy-label": "Schreibstrategie:",
        "planner-display-reading-strategy-label": "Lesestrategie:",
        "planner-customise-plan-reason-placeholder": "(Optional)",
        "essay-title": "Werkzeug zum Schreiben von Essays",
        "essay-save-btn-text": "Aufsatz speichern",
        "essay-writing-placeholder": "Schreiben Sie hier einen Aufsatz...",
        "essay-show-word-count-btn-text": "Wortanzahl anzeigen",
        "essay-save-toast-text": "Dein Aufsatz wurde gespeichert!",
        "dictionary-title": "Wörterbuch-Tool",
        "dictionary-send-btn-text": "Schicken",
        "dictionary-panel-input-placeholder": "Bitte geben Sie ein Suchwort ein...",
        "checklist-title": "Checklisten-Tool",
        "checklist-basic-panel-title": "Basic",
        "checklist-academic-panel-title": "Akademisch",
        "checklist-originality-panel-title": "Originalität",
        "checklist-integration-panel-title": "Integration und Ausarbeitung",
        "checklist-analyse-btn-text": "Analysieren",
        "chatgpt-title": "Chatgpt-Tool",
        "chatgpt-send-btn-text": "Schicken",
        "chatgpt-panel-input-placeholder": "Stelle eine Frage...",
        "chatteacher-title": "Ask Teacher Tool",
        "chatteacher-panel-input-placeholder": "Stelle eine Frage...",
        "chatteacher-connect-server-status-text": "Verbindungsserverstatus",
        "chatteacher-teacher-online-status-text": "Online-Status des Lehrers",
        "chatteacher-send-btn-text": "Schicken",
        "chatgpt-role-description": "",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Bis zu diesem Punkt der Lernsitzung haben die Schüler:innen, die diese Aufgabe gut gemeistert haben, durch die Verwendung des bereitgestellten Timer-Tools sichergestellt, dass sie sich der zeitlichen Begrenzung der Aufgabe bewusst sind. Dies scheint bei diese:r Schüler:in nicht der Fall zu sein. Bitte gib diesen Schüler:innen ein Feedback im Absatzstil (verwende keine Aufzählungszeichen und nummerierte Listen), wie sie die eigene Zeitplanung mithilfe des bereitgestellten Timer-Tools verbessern können, bei dem die Zeit-Schaltfläche in der Symbolleiste ein Uhrensymbol hat. Bitte berücksichtige dabei umfassend alle folgenden Lernbedingungen diese:r Schüler:in:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Bis zu diesem Zeitpunkt der Lernphase haben Schüler:innen, die bei dieser Aufgabe gute Leistungen erbracht haben, darauf geachtet, dass sie sich auf die Aufgabenstellung und die Bewertungskriterien beziehen, um ihren Aufsatzentwurf zu bewerten und zu überprüfen, ob ihr Text mit der Aufgabenstellung und den Bewertungskriterien übereinstimmt. Dies scheint bei diese:r Schüler:in nicht der Fall zu sein. Könntest du de:r Schüler:in bitte ein Feedback im Absatzstil (verwende keine Aufzählungszeichen und nummerierte Listen) geben, wie die Informationen aus der Aufgabenstellung und die Bewertungskriterien genutzt werden kann, um den eigenen Aufsatzentwurf zu bewerten und zu überprüfen, ob der eigene Entwurf mit den Aufgabenanforderungen und den Bewertungskriterien übereinstimmt, wobei du dein Bestes tun solltest, um detaillierte Anweisungen darüber, was in den Aufsatz aufgenommen werden muss, zu VERMEIDEN. Bitte berücksichtige dabei umfassend alle folgenden Lernbedingungen diese:r Schüler:in:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Bis zu diesem Zeitpunkt der Lernphase haben Schüler:innen, die bei dieser Aufgabe gute Leistungen erbracht haben, sichergestellt, dass sie die Aufgabenstellung und die Bewertungskriterien klar verstanden haben. Dies scheint bei diese:r Schüler:in nicht der Fall zu sein. Könntest du diese:r Schüler:in bitte ein Feedback im Absatzstil geben (verwende keine Aufzählungszeichen und nummerierten Listen), wie das eigene Verständnis der Aufgabenstellungen und der Bewertungskriterien verbessert werden kann. Fördere dabei das Selbstbewusstsein de:r Schüler:in in Bezug auf die Ausrichtung des Aufsatzes an den Aufgabenstellungen und den Bewertungskriterien, während du dein Bestes tust, um detaillierte Anweisungen darüber, was in den Aufsatz aufgenommen werden muss, zu VERMEIDEN. Bitte berücksichtige dabei umfassend alle folgenden Lernbedingungen diese:r Schüler:in:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Bis zu diesem Zeitpunkt der Lernphase haben sich die Schüler:innen, die bei dieser Aufgabe gute Leistungen erbracht haben, durch die Verwendung des bereitgestellten Timer-Tools über die Zeitbegrenzung oder die Aufgabe informiert und gleichzeitig die Aufgabenanforderungen und die Bewertungskriterien klar verstanden. Dies scheint bei diese:r Schüler:in nicht der Fall zu sein. Könntest du de:r Schüler:in bitte ein Feedback im Absatzstil geben (verwende keine Aufzählungszeichen und nummerierte Listen), das Ratschläge zu all diesen Bereichen enthält, wie die Zeitüberwachung durch die Verwendung des bereitgestellten Timer-Tools verbessert werden kann. Das Timer-Tool hat eine Zeit-Schaltfläche in der Symbolleiste mit einem Uhrensymbol. Bitte gib auch Feedback wie das eigene Verständnis der Aufgabenanweisungen und der Bewertungskriterien verbessert werden kann, um das eigene Selbstbewusstsein für die Ausrichtung des Aufsatzes auf die Aufgabenanforderungen und die Bewertungskriterien zu stärken, wobei du dein Bestes tun solltest, um detaillierte Anweisungen darüber, was in den Aufsatz aufgenommen werden muss, zu VERMEIDEN. Bitte berücksichtige dabei umfassend alle folgenden Lernbedingungen diese:r Schüler:in:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "",
        "gpt-scaffold-need-check-srl-prompt-OT2": `Bis zu diesem Zeitpunkt der Lernphase haben Schüler:innen, die diese Aufgabe gut gemeistert haben, darauf geachtet, Ideen anhand des Lesematerials mit eigenen Worten zu erklären. Dies scheint bei diese:r Schüler:in nicht der Fall zu sein. Könntest du de:r Schüler:in bitte ein Feedback im Absatzstil (verwende keine Aufzählungszeichen und nummerierte Listen) geben, wie wichtig es ist, Ideen mit eigenen Worten zu erklären und dabei das Verständnis des Lesematerials zu demonstrieren. Bitte beachte, dass du keine detaillierten Anweisungen dazu geben darfst, wie die Schüler:innen den Aufsatz schreiben sollen. Berücksichtige dabei bitte alle folgenden Lernbedingungen diese:r Schüler:in:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Diese Schüler:innen haben an der Vorstudie teilgenommen, sodass sie über ein gewisses Maß an Aufgabenwissen verfügen.",
        "gpt-scaffold-isdimu-prompt-0": "",
        "gpt-scaffold-isdimu-prompt-16": "",
        "gpt-scaffold-isdimu-prompt-32": "",
        "gpt-scaffold-pretest-grades-prompt-0": "Diese Schüler:innen verfügen über ein hohes Maß an Wissen über erneuerbare Energie.",
        "gpt-scaffold-pretest-grades-prompt-5": "Diese Schüler:innen verfügen über geringe Kenntnisse über erneuerbare Energie.",
        "gpt-scaffold-pretest-grades-prompt-10": "Diese Schüler:innen verfügen über mittlere Kenntnisse über erneuerbare Energie.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Diese Schüler:innen verstehen, wie man am besten lernt, und können gute Strategien für das Lernen wählen.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Diese Schüler:innen wissen nicht genau, was beim Lernen hilft und welche Strategien am besten geeignet sind.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Diese Schüler:innen haben ein gewisses Verständnis dafür, wie man effektiv lernt, und können einige hilfreiche Strategien nennen.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Diese Schüler:innen planen, reflektieren über und passen den Lernprozess an, um bessere Ergebnisse zu erzielen.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Diese Schüler:innen planen nicht im Voraus und verfolgen den eigenen Lernfortschritt während der Arbeit nicht.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Diese Schüler:innen achten während der Durchführung der Aufgaben ein wenig auf die Planung und Überprüfung des Lernprozesses.",
        "gpt-scaffold-test-mai-name": "",
        "gpt-scaffold-test-isdimu-name": "",
        "gpt-scaffold-pretest-name": "",
        "gpt-scaffold-check-take-previous-study-name": "",
        "gpt-scaffold-planner-select-prompt-1": "Diese Schüler:innen haben für diese Aufgabe den Plan [zuerst lesen, dann schreiben] entwickelt.",
        "gpt-scaffold-planner-select-prompt-2": "Diese Schüler:innen haben sich für diese Aufgabe den Plan ausgedacht, [gleichzeitig zu lesen und zu schreiben].",
        "gpt-scaffold-planner-select-prompt-3": "Diese Schüler:innen haben sich für diese Aufgabe den Plan ausgedacht, [intensiv zu schreiben und selektiv zu lesen].",
        "gpt-scaffold-planner-select-prompt-4": "",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": `Diese Schüler:innen haben keine konkreten Pläne erstellt, wie sie die Aufgabe angehen wollen.

`,
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Diese Schüler:innen haben konkrete Pläne zur Durchführung der Aufgabe erstellt.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Diese Schüler:innen sind sich der verbleibenden Zeit zur Erledigung der Aufgabe nicht bewusst.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Diese Schüler:innen sind sich der verbleibenden Zeit zur Erledigung der Aufgabe bewusst.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Diese Schüler:innen sind sich nicht bewusst, welche Hilfsmittel in der Umgebung zur Verfügung stehen, die bei der Erledigung der Aufgabe helfen könnten.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Diese Schüler:innen sind sich der in der Umgebung verfügbaren Hilfsmittel bewusst, die bei der Erledigung der Aufgabe helfen können.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Diese Schüler:innen sind sich der verfügbaren Lesematerialien, die bei der Aufgabe helfen könnten, nicht bewusst.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Diese Schüler:innen sind sich der verfügbaren Lesematerialien bewusst, die bei der Aufgabe helfen könnten.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Diese Schüler:innen sind sich über die Bewertungskriterien nicht bewusst.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Diese Schüler:innen sind sich über die Bewertungskriterien bewusst.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Diese Schüler:innen sind sich über die Aufgabenstellung nicht bewusst.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Diese Schüler:innen sind sich über die Aufgabenstellung bewusst.",
        "gpt-scaffold-role-description": "",
        "planner-customise-step2-instruction": `Bitte beschreibe im Detail die Lernstrategie, die du anwenden möchtest, sowie deine geplante Zeiteinteilung. Du kannst auch deine Gründe für die Strategie und die entsprechende Zeitverteilung ausführen.`,
        "planner-reading-strategy-1": "Das Material Seite für Seite lesen",
        "planner-reading-strategy-2": "Schnelles Überfliegen und anschließendes detaillierteres Lesen",
        "planner-reading-strategy-3": "Das Markierungswerkzeug nutzen, um Wichtiges hervorzuheben",
        "planner-reading-strategy-4": "Meine Überlegungen während dem Lesen als Notiz aufschreiben",
        "planner-reading-strategy-5": "Fragengeleitetes Lesen mit dem Fokus auf bestimmtem Inhalt",
        "planner-reading-strategy-6": "Selektives Lesen und Überspringen von unwichtigem Inhalt",
        "planner-reading-strategy-instruction": "Welche Lesestrategien planst du anzuwenden? (Mehrfachauswahl möglich)",
        "planner-writing-strategy-1": "Erst eine Struktur für den Aufsatz entwerfen und diese anschließend mit Details ausfüllen",
        "planner-writing-strategy-2": "Meine Notizen verwenden, während ich den Aufsatz schreibe",
        "planner-writing-strategy-3": "Die Aufgabenstellung und Bewertungskriterien überprüfen, um das Geschriebene anzupassen",
        "planner-writing-strategy-4": "Kopieren und Einsetzen von ",
        "planner-writing-strategy-5": "Die Struktur und die Muster zum Schreiben verwenden, dich ich gelernt habe",
        "planner-writing-strategy-instruction": "Welche Schreibstrategien planst du, zu verwenden?",
        "planner-main-strategy-1": "Erst Lesen, dann Schreiben",
        "planner-main-strategy-1-instruction": "Wie viel Zeit planst du jeweils fürs Lesen und Schreiben ein?",
        "planner-main-strategy-1-task-1": "2.1 Zeit, die für das Lesen eingeplant wird",
        "planner-main-strategy-1-task-2": "2.2 Zeit, die für das Schreiben eingeplant wird",
        "planner-main-strategy-2": "Gleichzeitig Lesen und Schreiben",
        "planner-main-strategy-2-instruction": "Wie viel Zeit planst du für jedes Thema ein?",
        "planner-main-strategy-2-task-1": "2.1 Lesen / Schreiben über den Abschnitt Energie",
        "planner-main-strategy-2-task-2": "2.2 Lesen / Schreiben über Kosten und Vorteile",
        "planner-main-strategy-2-task-3": "2.3 Lesen / Schreiben über die Auswirkungen auf die Umwelt",
        "planner-main-strategy-3": "Intensiv Schreiben, Selektiv Lesen",
        "planner-main-strategy-3-instruction": "Wie viel Zeit planst du für die unterschiedlichen Phasen des Schreibens ein?",
        "planner-main-strategy-3-task-1": "2.1 Die Struktur des Aufsatzes planen:",
        "planner-main-strategy-3-task-2": "2.2 Die erste Fassung schreiben:",
        "planner-main-strategy-3-task-3": "2.3 Zusätzliche Informationen lesen, die relevant für den Aufsatz sind: ",
        "planner-main-strategy-3-task-4": "2.4 Überarbeitung und Verbesserung des Aufsatzes: ",
        "planner-customise-plan-title": "Anpassungsplan",
        "planner-select-main-strategy-hint": "Bitte wähle eine Strategie aus, um fortzufahren!",
        "planner-allocate-time-hint": "Bitte teile die Zeit auf alle Aufgaben auf! Die Gesamtzeit muss innerhalb der vorgegebenen Vorgaben liegen!",
        "planner-select-reading-writing-strategy-hint": "Bitte wähle die Strategien aus, die du einsetzen möchtest!",
        "planner-save-plan-hint": "Bitte gib alle Strategien und die korrekte Zeit an!",
        "rule-based-scaffold-title-1": "",
        "rule-based-scaffold-title-1-task-1": "",
        "rule-based-scaffold-title-1-task-2": "",
        "rule-based-scaffold-title-1-task-3": "",
        "rule-based-scaffold-title-2": "",
        "rule-based-scaffold-title-2-task-1": "",
        "rule-based-scaffold-title-2-task-2": "",
        "rule-based-scaffold-title-2-task-3": "",
        "rule-based-scaffold-title-3": "",
        "rule-based-scaffold-title-3-task-1": "",
        "rule-based-scaffold-title-3-task-2": "",
        "rule-based-scaffold-title-3-task-3": "",
        "rule-based-scaffold-title-4": "",
        "rule-based-scaffold-title-4-task-1": "",
        "rule-based-scaffold-title-4-task-2": "",
        "rule-based-scaffold-title-4-task-3": "",
        "rule-based-scaffold-title-5": "",
        "rule-based-scaffold-title-5-task-1": "",
        "rule-based-scaffold-title-5-task-2": "",
        "rule-based-scaffold-title-5-task-3": "",
        "annotation-label-1": "Beachte",
        "annotation-label-2": "wichtig",
        "annotation-label-3": "nützlich",
        "annotation-label-4": "Konzept",
        "annotation-label-5": "verwirrend",
        "product-visual-title": "Produktvisualisierung",
        "product-visual-close-btn": "Schließen",
        "process-visual-title": "Prozessvisualisierung",
        "process-visual-set-goal-label": "Ihre gesetzten Ziele",
        "process-visual-close-btn": "Schließen",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Strg + Eingabetaste",
        "annotation-toolbar-btn-hint": "Anmerkungsfeld",
        "annotation-search-toolbar-btn-hint": "Suchanmerkungswerkzeug",
        "gpt-scaffold-toolbar-btn-hint": "Anleitungswerkzeug",
        "essay-writing-toolbar-btn-hint": "Schreibwerkzeug",
        "planner-toolbar-btn-hint": "Planungswerkzeug",
        "multi-agents-single-window-toolbar-btn-hint": "Chat-Assistent",
        "timer-toolbar-btn-hint": "Timer",
        "like-response-text": "Gefällt dir diese Antwort?",
        "annotation-tool-data-label": "Anmerkungstool",
        "search-annotation-tool-data-label": "Notizen-Durchsuchungs-Werkzeug",
        "gpt-scaffold-tool-data-label": "Anleitungstool",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "Schreibwerkzeug",
        "math-tool-data-label": "",
        "planner-tool-data-label": "Planungswerkzeug",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "Chatbot",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "Timer-Tool",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": `
Dieser Chatbot steht dir jetzt zur Verfügung. Du kannst den Chatbot nicht zum Verfassen deines Aufsatzes verwenden.
`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Gib Text ein, um zu beginnen",
        "chat-reminder-message-title": "Erinnerungsnachricht",
        "scaffolding-message-title": "Feedback zu deinem aktuellen Fortschritt:",
        "scaffold-chat-reminder": "Hi, du bist schon eine Weile mit dem Chat beschäftigt. Lass uns zur Hauptaufgabe zurückkehren!",
    },
    en: {
        "gpt-scaffold-prompt-template-groupA": `You are a helpful assistant. You are not allowed to write essays, rewrite sentences, summarize content, or provide ready-made answers. You can answer questions regarding the task instructions and rubric provided below, but you must avoid writing something according to the task instructions and the rubric that can be directly added to the student essay. If the student asks you to do these tasks (e.g., write the essay), explain to him that they must take control of their own learning process. If you don’t think the question is task-relevant, just refuse to answer and let the user explain why it’s task-relevant.
Finally, your answer should be less than 100 words.

[[Start of task instructions and rubric]]

A student is working on an essay writing task.

The following is the task instruction:

Task topic: Renewable Energy Strategy for a Northern Coastal Community

You have been hired as an energy expert to advise a northern coastal community situated near mountains and facing harsh, snowy winters. This community currently relies heavily on imported fossil fuels, which are expensive, environmentally damaging, and unreliable during severe winter storms. The town seeks a solution that guarantees stable, year-round energy supplies, reduces costs over time, and ideally creates local employment. The area experiences steady marine winds offshore and is located near significant forest resources managed sustainably. However, preservation of local marine biodiversity and forest ecosystems is a community priority.

Your Task:

Write a short proposal recommending a balanced renewable energy strategy combining two renewable energy types. Clearly justify your recommendation by discussing:

How each renewable energy source suits local geography, climate challenges, and energy demands.
Financial feasibility and expected economic benefits, including job creation.
Potential environmental impacts and how your strategy mitigates risks to forests and marine life.

This task is time limited for 45 minutes. 

The following is the rubric provided to the student:

This rubric is used to evaluate your essay. 

The essay consists of 200 to 300 words. 
You must NOT directly copy from the reading or from other sources - the essay should be written in your own words.


The matrix below is the complete marking rubric: 

1. Indicate the chosen energy sources:
    Excellent (3): Clearly combines two energy types and gives reasons for both.
    Good (2): Mentions two energy types but little explanation.
    Basic (1): Only one energy type, or unclear solution; little or no explanation.

2. Use of Geographic & Climate Details:
    Excellent (3): Clearly explains how both energy types fit local geography and climate.
    Good (2): Gives some details about local geography/climate, but not linked to energy choice.
    Basic (1): Little or no use of local details; energy choices do not fit the scenario.

3. Economic and Job Benefits:
    Excellent (3): Strong explanation of how the plan saves money and creates local jobs.
    Good (2): Mentions money or jobs but gives little detail.
    Basic (1): Does not mention money or jobs, or gives incorrect information.

4. Environmental Protection:
    Excellent (3): Clearly explains how your plan protects forests and marine; gives specific ways risks are avoided.
    Good (2): Mentions environmental impact but little detail about protection.
    Basic (1): Little or no mention of the environment, or ignores risks to nature.

5. Writing Quality:
    Excellent (3): Writing is clear, free of grammar or spelling errors. Ideas flow logically.
    Good (2): Some grammar or spelling errors make ideas less clear. Meaning is sometimes unclear.
    Basic (1): Frequent grammar or spelling errors; ideas are hard to follow or not coherent.

[[End of task instructions and rubric]]`,
        "gpt-scaffold-prompt-template-groupB": `[[Start of Task conditions]]

A student is working on an essay writing task.

The following is the task instruction:

Task topic: Renewable Energy Strategy for a Northern Coastal Community

You have been hired as an energy expert to advise a northern coastal community situated near mountains and facing harsh, snowy winters. This community currently relies heavily on imported fossil fuels, which are expensive, environmentally damaging, and unreliable during severe winter storms. The town seeks a solution that guarantees stable, year-round energy supplies, reduces costs over time, and ideally creates local employment. The area experiences steady marine winds offshore and is located near significant forest resources managed sustainably. However, preservation of local marine biodiversity and forest ecosystems is a community priority.

Your Task:

Write a short proposal recommending a balanced renewable energy strategy combining two renewable energy types. Clearly justify your recommendation by discussing:

How each renewable energy source suits local geography, climate challenges, and energy demands.
Financial feasibility and expected economic benefits, including job creation.
Potential environmental impacts and how your strategy mitigates risks to forests and marine life.

This task is time limited for 45 minutes. 

The following is the rubric provided to the student:

This rubric is used to evaluate your essay. 

The essay consists of 200 to 300 words. 
You must NOT directly copy from the reading or from other sources - the essay should be written in your own words.


The matrix below is the complete marking rubric: 

1. Indicate the chosen energy sources:
    Excellent (3): Clearly combines two energy types and gives reasons for both.
    Good (2): Mentions two energy types but little explanation.
    Basic (1): Only one energy type, or unclear solution; little or no explanation.

2. Use of Geographic & Climate Details:
    Excellent (3): Clearly explains how both energy types fit local geography and climate.
    Good (2): Gives some details about local geography/climate, but not linked to energy choice.
    Basic (1): Little or no use of local details; energy choices do not fit the scenario.

3. Economic and Job Benefits:
    Excellent (3): Strong explanation of how the plan saves money and creates local jobs.
    Good (2): Mentions money or jobs but gives little detail.
    Basic (1): Does not mention money or jobs, or gives incorrect information.

4. Environmental Protection:
    Excellent (3): Clearly explains how your plan protects forests and marine; gives specific ways risks are avoided.
    Good (2): Mentions environmental impact but little detail about protection.
    Basic (1): Little or no mention of the environment, or ignores risks to nature.

5. Writing Quality:
    Excellent (3): Writing is clear, free of grammar or spelling errors. Ideas flow logically.
    Good (2): Some grammar or spelling errors make ideas less clear. Meaning is sometimes unclear.
    Basic (1): Frequent grammar or spelling errors; ideas are hard to follow or not coherent.

[[End of Task conditions]]

[[Start of Your Task]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    For this feedback, please follow the effective feedback framework. It is learner-centred and it should include three main components:

1. Based on the learning conditions listed above, using both strengths and weaknesses of the student’s performance to inform the instruction.
2. Focus on the subsequent impact by providing comments with actionable information to help the student achieve the learning outcomes for the task. This should come from the advice listed above.
3. Support the student to feel in control of their learning, attend to their social, emotional and motivational needs, and encourage them to be open to evaluative comments.

Take care of the following restrictions:

Please try your best to AVOID giving ANY detailed instructions of what needs to be included in the essay !

Please ensure that you only output the feedback text !

Lastly, the feedback MUST NOT exceed 100 words !

[[End of Your Task]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Start of Task conditions]]

A student is working on an essay writing task.

The following is the task instruction:

Task topic: Renewable Energy Strategy for a Northern Coastal Community

You have been hired as an energy expert to advise a northern coastal community situated near mountains and facing harsh, snowy winters. This community currently relies heavily on imported fossil fuels, which are expensive, environmentally damaging, and unreliable during severe winter storms. The town seeks a solution that guarantees stable, year-round energy supplies, reduces costs over time, and ideally creates local employment. The area experiences steady marine winds offshore and is located near significant forest resources managed sustainably. However, preservation of local marine biodiversity and forest ecosystems is a community priority.

Your Task:

Write a short proposal recommending a balanced renewable energy strategy combining two renewable energy types. Clearly justify your recommendation by discussing:

How each renewable energy source suits local geography, climate challenges, and energy demands.
Financial feasibility and expected economic benefits, including job creation.
Potential environmental impacts and how your strategy mitigates risks to forests and marine life.

This task is time limited for 45 minutes. 

The following is the rubric provided to the student:

This rubric is used to evaluate your essay. 

The essay consists of 200 to 300 words. 
You must NOT directly copy from the reading or from other sources - the essay should be written in your own words.


The matrix below is the complete marking rubric: 

1. Indicate the chosen energy sources:
    Excellent (3): Clearly combines two energy types and gives reasons for both.
    Good (2): Mentions two energy types but little explanation.
    Basic (1): Only one energy type, or unclear solution; little or no explanation.

2. Use of Geographic & Climate Details:
    Excellent (3): Clearly explains how both energy types fit local geography and climate.
    Good (2): Gives some details about local geography/climate, but not linked to energy choice.
    Basic (1): Little or no use of local details; energy choices do not fit the scenario.

3. Economic and Job Benefits:
    Excellent (3): Strong explanation of how the plan saves money and creates local jobs.
    Good (2): Mentions money or jobs but gives little detail.
    Basic (1): Does not mention money or jobs, or gives incorrect information.

4. Environmental Protection:
    Excellent (3): Clearly explains how your plan protects forests and marine; gives specific ways risks are avoided.
    Good (2): Mentions environmental impact but little detail about protection.
    Basic (1): Little or no mention of the environment, or ignores risks to nature.

5. Writing Quality:
    Excellent (3): Writing is clear, free of grammar or spelling errors. Ideas flow logically.
    Good (2): Some grammar or spelling errors make ideas less clear. Meaning is sometimes unclear.
    Basic (1): Frequent grammar or spelling errors; ideas are hard to follow or not coherent.

[[End of Task conditions]]

[[Start of Your Task]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        For this feedback, please follow the effective feedback framework. It is learner-centred and it should include three main components:

1. Based on the learning conditions listed above, using both strengths and weaknesses of the student’s performance to inform the instruction.
2. Focus on the subsequent impact by providing comments with actionable information to help the student achieve the learning outcomes for the task. This should come from the advice listed above.
3. Support the student to feel in control of their learning, attend to their social, emotional and motivational needs, and encourage them to be open to evaluative comments.

Take care of the following restrictions:

Please try your best to AVOID giving ANY detailed instructions of what needs to be included in the essay !

Please ensure that you only output the feedback text !

Lastly, the feedback MUST NOT exceed 100 words !

[[End of Your Task]]`,
        "annotation-notes-title": "Notes Panel",
        "annotation-notes-delete-confirm-message": "Do you want to delete?",
        "annotation-write-note-placeholder": "Write notes here...",
        "annotation-tag-placeholder": "Input new tags and press Enter...",
        "annotation-note-save-btn-text": "Save",
        "annotation-note-cancel-btn-text": "Cancel",
        "annotation-search-btn-text": "Search",
        "annotation-search-panel-input-placeholder": "Input keywords to search...",
        "scaffolding-title": "Instruction Panel",
        "scaffolding-create-checklist-btn-text": "Create Checklist",
        "scaffolding-edit-checklist-btn-text": "Edit",
        "scaffolding-unread-message-text": "Unread Message",
        "scaffolding-chat-open-text": "Chat Open",
        "gpt-scaffolding-title": "Instruction Panel",
        "planner-title": "Planner Tool",
        "planner-learning-strategy-select-label-text": "1. Please make a plan for your learning strategy:",
        "planner-learning-strategy-select-option1-text": "Select a strategy",
        "planner-learning-strategy-select-customise-option-text": "Use your own strategy",
        "planner-add-more-customise-strategy-btn-text": "Add More Strategy",
        "planner-customise-option-hint-textarea-placeholder": "Please explain why you design this plan?",
        "planner-next-btn-text": "Next",
        "planner-time-unit-minute": "minutes",
        "planner-display-plan-title": "My Learning Plan",
        "planner-display-overall-strategy-label": "Overall strategy:",
        "planner-display-time-allocation-label": "Time allocation:",
        "planner-display-writing-strategy-label": "Writing strategy:",
        "planner-display-reading-strategy-label": "Reading strategy:",
        "planner-customise-plan-reason-placeholder": "(Optional)",
        "essay-title": "Essay Writing Tool",
        "essay-save-btn-text": "Save Essay",
        "essay-writing-placeholder": "Write essay here...",
        "essay-show-word-count-btn-text": "Word Count",
        "essay-save-toast-text": "Your essay is saved!",
        "dictionary-title": "Dictionary Tool",
        "dictionary-send-btn-text": "Send",
        "dictionary-panel-input-placeholder": "Please input a query word...",
        "checklist-title": "Checklist Tool",
        "checklist-basic-panel-title": "Basic",
        "checklist-academic-panel-title": "Academic",
        "checklist-originality-panel-title": "Originality",
        "checklist-integration-panel-title": "Integration and Elaboration",
        "checklist-analyse-btn-text": "Analyse",
        "chatgpt-title": "AI Assistant",
        "chatgpt-send-btn-text": "Send",
        "chatgpt-panel-input-placeholder": "Ask a question...",
        "chatteacher-title": "Ask Teacher Tool",
        "chatteacher-panel-input-placeholder": "Ask a question...",
        "chatteacher-connect-server-status-text": "Connect server status",
        "chatteacher-teacher-online-status-text": "Teacher online status",
        "chatteacher-send-btn-text": "Send",
        "chatgpt-role-description": "You are a helpful assistant and please answers questions based on the provided text.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Up until this point in the learning session, students who performed well in this task made sure they are aware of the time limit for the task through usage of the provided timer tool. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on how to improve their monitoring for time constraints through usage of the provided timer tool where the time button in the toolbar has a clock symbol. Meanwhile, please comprehensively consider all the following learning conditions of this student:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Up until this point in the learning session, students who performed well in this task made sure they refer back to the task requirement and the rubric information to evaluate their essay draft and monitor if their writing is aligned with the task requirement and the rubric. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on using the information from task instruction and rubric to evaluate their essay draft and monitor their writing draft is well aligned with the task requirement and rubric, while trying your best to AVOID giving any detailed instructions of what needs to be included in the essay. Meanwhile, please comprehensively consider all the following learning conditions of this student:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `We have one student who is currently working on this learning task. Up until the 14th minute in the learning session, other students who performed well in this task have constantly checked the task instruction and rubric. This is not the case with this student. So, considering all the information provided above (including the task requirements, rubric, and reading material), and given the learning conditions of this particular student provided above, provide the student with paragraph-style (don`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Up until this point in the learning session, students who performed well in this task made sure they clearly understood the task requirement and the rubric. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on how to improve their understanding of task instructions and the rubric, supporting the student's self-awareness of aligning the essay writing with the task requirements and the rubric, while trying your best to AVOID giving any detailed instructions of what needs to be included in the essay. Meanwhile, please comprehensively consider all the following learning conditions of this student:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Up until this point in the learning session, students who performed well in this task made sure they are aware of the time limit or the task through usage of the provided timer tool, and at the meantime clearly understood the task requirement and the rubric. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style feedback (don't use the bullet points and numbered lists) that combines advice on all of these areas, on how to improve their monitoring for time constraints through usage of the provided timer tool where the time button in the toolbar has a clock symbol, and on how to improve their understanding of task instructions and the rubric, supporting the student's self-awareness of aligning the essay writing with the task requirements and the rubric, while trying your best to AVOID giving any detailed instructions of what needs to be included in the essay. Meanwhile, please comprehensively consider all the following learning conditions of this student:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": `We have one student who is currently working on this learning task. Up until the 21st minute in the learning session, other students who performed well in this task have already started including some information from the reading material in their essays. This doesn’t seem to be the case with this student. So, considering all the information provided above (including the task requirements, rubric, and reading material), and given the learning conditions of this particular student provided above, provide the student with paragraph-style (don`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `Up until this point in the learning session, students who performed well in this task made sure they explained ideas in their own words based on the reading material. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on the importance of explaining ideas in their own words while demonstrating understanding of the reading materials. You should be aware that you cannot give detailed instructions about how the student could write the essay. Meanwhile, please comprehensively consider all the following learning conditions of this student:`,
        "gpt-scaffold-user-take-pre-study-prompt": "This student has participated in the prior study so he/she has a certain level of task knowledge.",
        "gpt-scaffold-isdimu-prompt-0": "This student seems to have good understanding of Metacognitive Awareness.",
        "gpt-scaffold-isdimu-prompt-16": "This student seems to have a low level of understanding of Metacognitive Awareness.",
        "gpt-scaffold-isdimu-prompt-32": "This student seems to have some understanding of Metacognitive Awareness.",
        "gpt-scaffold-pretest-grades-prompt-0": "This student has a high level of knowledge about renewable energy.",
        "gpt-scaffold-pretest-grades-prompt-5": "This student has a low level of knowledge about renewable energy.",
        "gpt-scaffold-pretest-grades-prompt-10": "This student has a medium level of knowledge about renewable energy.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "This student understands how they learn best and can choose good strategies for learning.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "This student is not clear about what helps them learn or which strategies work best for them.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "This student has some understanding of ways to learn effectively and can name a few strategies that help.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "This student plans, monitors, and adjusts their learning to get better results.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "This student does not plan ahead or keep track of their learning as they work.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "This student pays some attention to planning and checking their learning during tasks.",
        "gpt-scaffold-test-mai-name": "Activity 3: Metacognitive Awareness Questionnaire",
        "gpt-scaffold-test-isdimu-name": "Activity 3: ISDIMU",
        "gpt-scaffold-pretest-name": "Activity 2: domain knowledge on renewable energy",
        "gpt-scaffold-check-take-previous-study-name": "Activity 1: About yourself",
        "gpt-scaffold-planner-select-prompt-1": "This student came up with the plan to [read first then write] for this task.",
        "gpt-scaffold-planner-select-prompt-2": "This student came up with the plan to [read and write simultaneously] for this task.",
        "gpt-scaffold-planner-select-prompt-3": "This student came up with the plan to [write intensively and read selectively] for this task.",
        "gpt-scaffold-planner-select-prompt-4": "This student came up with the plan to [design his own plan] for the task",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "This student has not created explicit plans for how they will go about the task.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "This student has created explicit plans for how they will go about the task.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "This student is not aware of the time left to complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "This student is aware of the time left to complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "This student is not aware of the tools available in the environment that may help them complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "This student is aware of the tools available in the environment that may help them complete the task.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "This student is not aware of the available reading materials in the environment that may help them with the task.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "This student is aware of the available reading materials in the environment that may help them with the task.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "This student is not aware of the rubric",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "This student is aware of the rubric.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "This student is not aware of the task instructions.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "This student is aware of the task instructions.",
        "gpt-scaffold-role-description": "You are a helpful assistant, please give suggestions based on the given text.",
        "planner-customise-step2-instruction": "Please describe in detail the learning strategy you plan to adopt and how you will allocate your time. You may also include the reasons for the strategy and time allocation.",
        "planner-reading-strategy-1": "Read the material page by page",
        "planner-reading-strategy-2": "Quick browsing and then detailed reading",
        "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-6": "Read selectively and skip irrelevant content",
        "planner-reading-strategy-instruction": "What reading skills do you plan to use (multiple choice)?",
        "planner-writing-strategy-1": "First draft an essay structure and then fill in with details",
        "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-3": "Review instructions and rubrics to get writing in line",
        "planner-writing-strategy-4": "Copy Paste key sentences and then rewrite them fluently",
        "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "What writing skills do you plan to use (multiple choice)?",
        "planner-main-strategy-1": "Read first then write ",
        "planner-main-strategy-1-instruction": "How much time do you plan to spend on reading and writing respectively?",
        "planner-main-strategy-1-task-1": "2.1 Time will be spent on reading ",
        "planner-main-strategy-1-task-2": "2.2 Time will be spent on writing ",
        "planner-main-strategy-2": "Read and write simultaneously ",
        "planner-main-strategy-2-instruction": "How much time do you plan to spend on each topic?",
        "planner-main-strategy-2-task-1": "2.1 Read/write about energy selection",
        "planner-main-strategy-2-task-2": "2.2 Read/write about costs and benefits",
        "planner-main-strategy-2-task-3": "2.3 Read/write about environmental impacts",
        "planner-main-strategy-3": "Write intensively, read selectively ",
        "planner-main-strategy-3-instruction": "How much time do you plan to spend on different stages of writing?",
        "planner-main-strategy-3-task-1": "2.1 Plan the structure of the essay:",
        "planner-main-strategy-3-task-2": "2.2 Write the first draft:",
        "planner-main-strategy-3-task-3": "2.3 Read additional information relevant to the essay:",
        "planner-main-strategy-3-task-4": "2.4 Review and improve the essay:",
        "planner-customise-plan-title": "Customisation Plan",
        "planner-select-main-strategy-hint": "Please select one strategy to continue!!!",
        "planner-allocate-time-hint": "Please allocate time to all tasks and total time must within required time!!!",
        "planner-select-reading-writing-strategy-hint": "Please selected skills you plan to use!!!",
        "planner-save-plan-hint": "Please fill all the strategy name and correct time!!!",
        "rule-based-scaffold-title-1": "It is important to understand what the task is about.",
        "rule-based-scaffold-title-1-task-1": "(a) Use menu to get an overview and skim text",
        "rule-based-scaffold-title-1-task-2": "(b) Check the essay rubric",
        "rule-based-scaffold-title-1-task-3": "(c) Check the learning goals and instructions",
        "rule-based-scaffold-title-2": "It is important to read information about the topics.",
        "rule-based-scaffold-title-2-task-1": "(a) Note down important information",
        "rule-based-scaffold-title-2-task-2": "(b) Select what to read",
        "rule-based-scaffold-title-2-task-3": "(c) Check the time left",
        "rule-based-scaffold-title-3": "It is important to read relevant information and review your reading.",
        "rule-based-scaffold-title-3-task-1": "(a) Review annotations to check learning so far",
        "rule-based-scaffold-title-3-task-2": "(b) Review the learning goals and instructions",
        "rule-based-scaffold-title-3-task-3": "(c) Check essay to determine what to read next",
        "rule-based-scaffold-title-4": "It is important to write a good essay.",
        "rule-based-scaffold-title-4-task-1": "(a) Check the remaining time",
        "rule-based-scaffold-title-4-task-2": "(b) Check the essay rubric",
        "rule-based-scaffold-title-4-task-3": "(c) Draft essay by transferring learning to main points",
        "rule-based-scaffold-title-5": "It is important to write relevant information and check your writing.",
        "rule-based-scaffold-title-5-task-1": "(a) Check the essay rubric",
        "rule-based-scaffold-title-5-task-2": "(b) Edit your essay",
        "rule-based-scaffold-title-5-task-3": "(c) Check the learning goals and instructions",
        "annotation-label-1": "Takenote",
        "annotation-label-2": "important",
        "annotation-label-3": "useful",
        "annotation-label-4": "concept",
        "annotation-label-5": "confusing",
        "product-visual-title": "Product Visualisation",
        "product-visual-close-btn": "Close",
        "process-visual-title": "Process Visualisation",
        "process-visual-set-goal-label": "Your set goals",
        "process-visual-close-btn": "Close",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Annotation Panel",
        "annotation-search-toolbar-btn-hint": "Annotation Search Tool",
        "gpt-scaffold-toolbar-btn-hint": "Instruction Tool",
        "essay-writing-toolbar-btn-hint": "Writing Tool",
        "planner-toolbar-btn-hint": "Planner Tool",
        "multi-agents-single-window-toolbar-btn-hint": "Chat Assistant",
        "timer-toolbar-btn-hint": "Timer",
        "like-response-text": "Do you like this response?",
        "annotation-tool-data-label": "Annotations Tool",
        "search-annotation-tool-data-label": "Search Annotations Tool",
        "gpt-scaffold-tool-data-label": "Instruction Tool",
        "process-visual-tool-data-label": "Process Tool",
        "essay-product-visual-tool-data-label": "Essay Product Tool",
        "collaborate-writing-tool-data-label": "Collaborate Writing Tool",
        "essay-writing-tool-data-label": "Writing Tool",
        "math-tool-data-label": "Math Tool",
        "planner-tool-data-label": "Planner Tool",
        "checklist-tool-data-label": "Writing Analytics Tool",
        "multi-agents-single-window-tool-data-label": "Chatbot Tool",
        "dictionary-tool-data-label": "Dictionary Tool",
        "timer-tool-data-label": "Timer Tool",
        "questionnaire-tool-data-label": "Questionnaire Tool",
        "chat-reminder-message": "This chatbot is now available for you. You cannot use the chatbot to write your essay.",
        "multi-agents-single-window-placeholder-text-multi": "Input @ to select different Chatbots to chat",
        "multi-agents-single-window-placeholder-text-single": "Input text to start chat",
        "chat-reminder-message-title": "Reminder Message",
        "scaffolding-message-title": "Feedback of your current progress:",
        "scaffold-chat-reminder": "Hi, you’ve been engaged with the chat for a while. Let’s go back to the main task!",
    },
    es: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Inicio de las condiciones de la tarea]]

Un estudiante está trabajando en una tarea de redacción de un ensayo.

Las instrucciones de la tarea son las siguientes:

Tema de la tarea: Estrategia de energía renovable para una comunidad costera del norte.

Has sido contratado como experto en energía para asesorar a una comunidad costera del norte situada cerca de las montañas y que se enfrenta a inviernos duros y nevados. Actualmente, esta comunidad depende en gran medida de los combustibles fósiles importados, que son caros, perjudiciales para el medio ambiente y poco fiables durante las fuertes tormentas invernales. La ciudad busca una solución que garantice un suministro energético estable durante todo el año, reduzca los costes a largo plazo y, a ser posible, cree empleo local. La zona disfruta de vientos marinos constantes y se encuentra cerca de importantes recursos forestales gestionados de forma sostenible. Sin embargo, la preservación de la biodiversidad marina y los ecosistemas forestales locales es una prioridad para la comunidad.

Tu tarea:

Redacta una breve propuesta en la que recomiendes una estrategia equilibrada de energía renovable que combine dos tipos de energía renovable. Justifica claramente tu recomendación discutiendo:

Cómo cada fuente de energía renovable se adapta a la geografía local, los retos climáticos y las demandas energéticas.
La viabilidad financiera y los beneficios económicos esperados, incluida la creación de empleo.
Los posibles impactos ambientales y cómo tu estrategia mitiga los riesgos para los bosques y la vida marina.

Esta tarea tiene un límite de tiempo de 45 minutos. 

La siguiente es la rúbrica (tabla de evaluación) proporcionada al estudiante:

Esta rúbrica se utiliza para evaluar su ensayo. 

El ensayo consta de entre 200 y 300 palabras. 
NO debe copiar directamente de la lectura ni de otras fuentes; el ensayo debe estar escrito con sus propias palabras.


La siguiente matriz es la rúbrica de calificación completa: 

1. Indique las fuentes de energía elegidas:
    Excelente (3): Combina claramente dos tipos de energía y da razones para ambos.
    Bueno (2): Menciona dos tipos de energía, pero con poca explicación.
    Básico (1): Solo un tipo de energía o solución poco clara; poca o ninguna explicación.

2. Uso de detalles geográficos y climáticos:
    Excelente (3): Explica claramente cómo ambos tipos de energía se adaptan a la geografía y el clima locales.
    Bueno (2): Da algunos detalles sobre la geografía/clima locales, pero no los relaciona con la elección energética.
    Básico (1): Poco o ningún uso de detalles locales; las elecciones energéticas no se ajustan al escenario.

3. Beneficios económicos y laborales:
    Excelente (3): Explicación sólida de cómo el plan ahorra dinero y crea puestos de trabajo locales.
    Bueno (2): Menciona el dinero o los puestos de trabajo, pero da pocos detalles.
    Básico (1): No menciona el dinero ni el empleo, o proporciona información incorrecta.

4. Protección medioambiental:
  Excelente (3): Explica claramente cómo su plan protege los bosques y el mar; ofrece formas específicas de evitar riesgos.
  Bueno (2): Menciona el impacto medioambiental, pero da pocos detalles sobre la protección.
  Básico (1): Menciona poco o nada el medio ambiente, o ignora los riesgos para la naturaleza.

5. Calidad de la redacción:
  Excelente (3): La redacción es clara, sin errores gramaticales ni ortográficos. Las ideas fluyen de forma lógica.
  Buena (2): Algunos errores gramaticales u ortográficos hacen que las ideas sean menos claras. El significado a veces no está claro.
  Básica (1): Errores gramaticales u ortográficos frecuentes; las ideas son difíciles de seguir o no son coherentes.

[[Fin de las condiciones de la tarea]]

[[Comienza tu tarea]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Para esta retroalimentacion, siga el marco de retroalimentación eficaz. Dicho marco está centrado en el alumno y debe incluir tres componentes principales:

1. Basándose en las condiciones de aprendizaje enumeradas anteriormente, utilice tanto los puntos fuertes como los débiles del rendimiento del alumno para orientar la enseñanza.
2. Céntrese en el impacto posterior proporcionando comentarios con información práctica para ayudar al alumno a alcanzar los resultados de aprendizaje de la tarea. Esto debe basarse en los consejos enumerados anteriormente.
3. Ayude al alumno a sentir que tiene el control de su aprendizaje, atienda sus necesidades sociales, emocionales y motivacionales, y anímelo a estar abierto a los comentarios evaluativos.

Tenga en cuenta las siguientes restricciones:

¡Haga todo lo posible por EVITAR dar CUALQUIER instrucción detallada sobre lo que debe incluirse en el ensayo!

¡Asegúrese de que solo se muestra el texto de los comentarios!

Por último, ¡los comentarios NO DEBEN superar las 100 palabras!

[[Fin de su tarea]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Inicio de las condiciones de la tarea]]

Un estudiante está trabajando en una tarea de redacción de un ensayo.

Las instrucciones de la tarea son las siguientes:

Tema de la tarea: Estrategia de energía renovable para una comunidad costera del norte.

Has sido contratado como experto en energía para asesorar a una comunidad costera del norte situada cerca de las montañas y que se enfrenta a inviernos duros y nevados. Actualmente, esta comunidad depende en gran medida de los combustibles fósiles importados, que son caros, perjudiciales para el medio ambiente y poco fiables durante las fuertes tormentas invernales. La ciudad busca una solución que garantice un suministro energético estable durante todo el año, reduzca los costes a largo plazo y, a ser posible, cree empleo local. La zona disfruta de vientos marinos constantes y se encuentra cerca de importantes recursos forestales gestionados de forma sostenible. Sin embargo, la preservación de la biodiversidad marina y los ecosistemas forestales locales es una prioridad para la comunidad.

Tu tarea:

Redacta una breve propuesta en la que recomiendes una estrategia equilibrada de energía renovable que combine dos tipos de energía renovable. Justifica claramente tu recomendación discutiendo:

Cómo cada fuente de energía renovable se adapta a la geografía local, los retos climáticos y las demandas energéticas.
La viabilidad financiera y los beneficios económicos esperados, incluida la creación de empleo.
Los posibles impactos ambientales y cómo tu estrategia mitiga los riesgos para los bosques y la vida marina.

Esta tarea tiene un límite de tiempo de 45 minutos. 

La siguiente es la rúbrica (tabla de evaluación) proporcionada al estudiante:

Esta rúbrica se utiliza para evaluar su ensayo. 

El ensayo consta de entre 200 y 300 palabras. 
NO debe copiar directamente de la lectura ni de otras fuentes; el ensayo debe estar escrito con sus propias palabras.


La siguiente matriz es la rúbrica de calificación completa: 

1. Indique las fuentes de energía elegidas:
    Excelente (3): Combina claramente dos tipos de energía y da razones para ambos.
    Bueno (2): Menciona dos tipos de energía, pero con poca explicación.
    Básico (1): Solo un tipo de energía o solución poco clara; poca o ninguna explicación.

2. Uso de detalles geográficos y climáticos:
    Excelente (3): Explica claramente cómo ambos tipos de energía se adaptan a la geografía y el clima locales.
    Bueno (2): Da algunos detalles sobre la geografía/clima locales, pero no los relaciona con la elección energética.
    Básico (1): Poco o ningún uso de detalles locales; las elecciones energéticas no se ajustan al escenario.

3. Beneficios económicos y laborales:
    Excelente (3): Explicación sólida de cómo el plan ahorra dinero y crea puestos de trabajo locales.
    Bueno (2): Menciona el dinero o los puestos de trabajo, pero da pocos detalles.
    Básico (1): No menciona el dinero ni el empleo, o proporciona información incorrecta.

4. Protección medioambiental:
  Excelente (3): Explica claramente cómo su plan protege los bosques y el mar; ofrece formas específicas de evitar riesgos.
  Bueno (2): Menciona el impacto medioambiental, pero da pocos detalles sobre la protección.
  Básico (1): Menciona poco o nada el medio ambiente, o ignora los riesgos para la naturaleza.

5. Calidad de la redacción:
  Excelente (3): La redacción es clara, sin errores gramaticales ni ortográficos. Las ideas fluyen de forma lógica.
  Buena (2): Algunos errores gramaticales u ortográficos hacen que las ideas sean menos claras. El significado a veces no está claro.
  Básica (1): Errores gramaticales u ortográficos frecuentes; las ideas son difíciles de seguir o no son coherentes.

[[Fin de las condiciones de la tarea]]

[[Comienza tu tarea]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Para esta retroalimentacion, siga el marco de retroalimentación eficaz. Dicho marco está centrado en el alumno y debe incluir tres componentes principales:

1. Basándose en las condiciones de aprendizaje enumeradas anteriormente, utilice tanto los puntos fuertes como los débiles del rendimiento del alumno para orientar la enseñanza.
2. Céntrese en el impacto posterior proporcionando comentarios con información práctica para ayudar al alumno a alcanzar los resultados de aprendizaje de la tarea. Esto debe basarse en los consejos enumerados anteriormente.
3. Ayude al alumno a sentir que tiene el control de su aprendizaje, atienda sus necesidades sociales, emocionales y motivacionales, y anímelo a estar abierto a los comentarios evaluativos.

Tenga en cuenta las siguientes restricciones:

¡Haga todo lo posible por EVITAR dar CUALQUIER instrucción detallada sobre lo que debe incluirse en el ensayo!

¡Asegúrese de que solo se muestra el texto de los comentarios!

Por último, ¡los comentarios NO DEBEN superar las 100 palabras!

[[Fin de su tarea]]`,
        "annotation-notes-title": "Panel de notas",
        "annotation-notes-delete-confirm-message": "¿Quieres eliminar?",
        "annotation-write-note-placeholder": "Escribe notas aquí...",
        "annotation-tag-placeholder": "Ingresa nuevas etiquetas (tags) y haz clic en Enter...",
        "annotation-note-save-btn-text": "Guardar",
        "annotation-note-cancel-btn-text": "Cancelar",
        "annotation-search-btn-text": "Buscar",
        "annotation-search-panel-input-placeholder": "Ingresa palabras clave para buscar...",
        "scaffolding-title": "Panel de instrucciones",
        "scaffolding-create-checklist-btn-text": "Crear lista de verificación",
        "scaffolding-edit-checklist-btn-text": "Editar",
        "scaffolding-unread-message-text": "Mensajes sin leer",
        "scaffolding-chat-open-text": "Abrir chat",
        "gpt-scaffolding-title": "Panel de Instrucciones",
        "planner-title": "Herramienta de planeación",
        "planner-learning-strategy-select-label-text": "1. Por favor crea un plan para tu estrategia de aprendizaje:",
        "planner-learning-strategy-select-option1-text": "Selecciona una estrategia",
        "planner-learning-strategy-select-customise-option-text": "Usa tu propia estrategia",
        "planner-add-more-customise-strategy-btn-text": "Agrega más estrategias",
        "planner-customise-option-hint-textarea-placeholder": "¿Por favor explica por qué has diseñado este plan?",
        "planner-next-btn-text": "Siguiente",
        "planner-time-unit-minute": "minutos",
        "planner-display-plan-title": "Mi Plan de Aprendizaje",
        "planner-display-overall-strategy-label": "Estrategia general:",
        "planner-display-time-allocation-label": "Tiempo requerido:",
        "planner-display-writing-strategy-label": "Estrategia de escritura:",
        "planner-display-reading-strategy-label": "Estrategia de lectura:",
        "planner-customise-plan-reason-placeholder": "(Opcional)",
        "essay-title": "Herramienta para escribir ensayos",
        "essay-save-btn-text": "Guardar ensayo",
        "essay-writing-placeholder": "Escribe tu ensayo aquí...",
        "essay-show-word-count-btn-text": "Mostrar número de palabras",
        "essay-save-toast-text": "¡Tu ensayo está guardado!",
        "dictionary-title": "Herramienta diccionario",
        "dictionary-send-btn-text": "Enviar",
        "dictionary-panel-input-placeholder": "Por favor ingresa una palabra para buscar...",
        "checklist-title": "Herramienta de verificación",
        "checklist-basic-panel-title": "Básico",
        "checklist-academic-panel-title": "Académico",
        "checklist-originality-panel-title": "Originalidad",
        "checklist-integration-panel-title": "Integración y elaboración",
        "checklist-analyse-btn-text": "Analizar",
        "chatgpt-title": "Herramienta Chatgpt",
        "chatgpt-send-btn-text": "Enviar",
        "chatgpt-panel-input-placeholder": "Haz una pregunta...",
        "chatteacher-title": "Herramienta preguntar al profesor",
        "chatteacher-panel-input-placeholder": "Haz una pregunta...",
        "chatteacher-connect-server-status-text": "Estado de conexión al servidor",
        "chatteacher-teacher-online-status-text": "Estado en línea del profesor",
        "chatteacher-send-btn-text": "Enviar",
        "chatgpt-role-description": "Eres un asistente muy útil, por favor responda preguntas con base en el texto suministrado.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Hasta este momento de la sesión de aprendizaje, los alumnos que obtuvieron buenos resultados en esta tarea se aseguraron de conocer el límite de tiempo para la tarea mediante el uso de la herramienta de temporizador proporcionada. Este no parece ser el caso de este alumno. ¿Podría proporcionar al estudiante comentarios en forma de párrafo (no utilice viñetas ni listas numeradas) sobre cómo mejorar su control de las limitaciones de tiempo mediante el uso de la herramienta de temporizador proporcionada, en la que el botón de tiempo de la barra de herramientas tiene un símbolo de reloj? Mientras tanto, considere de forma exhaustiva todas las siguientes condiciones de aprendizaje de este estudiante:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Hasta este punto de la sesión de aprendizaje, los alumnos que obtuvieron buenos resultados en esta tarea se aseguraron de consultar los requisitos de la tarea y la información de la rúbrica para evaluar el borrador de su ensayo y comprobar si su redacción se ajustaba a los requisitos de la tarea y a la rúbrica. Este no parece ser el caso de este alumno. ¿Podría proporcionar al estudiante comentarios en forma de párrafos (no utilice viñetas ni listas numeradas) sobre el uso de la información de las instrucciones de la tarea y la rúbrica para evaluar su borrador de ensayo y comprobar que su borrador está bien alineado con los requisitos de la tarea y la rúbrica, mientras se esfuerza por EVITAR dar instrucciones detalladas sobre lo que debe incluirse en el ensayo? Mientras tanto, tenga en cuenta de forma exhaustiva todas las siguientes condiciones de aprendizaje de este estudiante:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `Tenemos un estudiante que actualmente está trabajando en esta tarea de aprendizaje. Hasta el minuto 14 de la sesión de aprendizaje, otros estudiantes que han rendido bien en esta tarea han revisado constantemente las instrucciones de la tarea y la rúbrica. Este no es el caso de este estudiante. Por lo tanto, considerando toda la información proporcionada anteriormente (incluyendo los requisitos de la tarea, la rúbrica y el material de lectura), y dadas las condiciones de aprendizaje de este estudiante en particular, es importante proporcionarle retroalimentación sobre cómo debe revisar regularmente las instrucciones de la tarea y la rúbrica hasta el final de esta sesión de escritura.`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `
Hasta este momento de la sesión de aprendizaje, los alumnos que obtuvieron buenos resultados en esta tarea se aseguraron de comprender claramente los requisitos de la tarea y la rúbrica. No parece ser el caso de este alumno. ¿Podría proporcionar al estudiante comentarios en forma de párrafo (no utilice viñetas ni listas numeradas) sobre cómo mejorar su comprensión de las instrucciones de la tarea y la rúbrica, ayudándole a tomar conciencia de la necesidad de ajustar la redacción del ensayo a los requisitos de la tarea y la rúbrica, al tiempo que se esfuerza por EVITAR dar instrucciones detalladas sobre lo que debe incluirse en el ensayo? Mientras tanto, tenga en cuenta de forma exhaustiva todas las siguientes condiciones de aprendizaje de este estudiante:
`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Hasta este momento de la sesión de aprendizaje, los alumnos que obtuvieron buenos resultados en esta tarea se aseguraron de conocer el límite de tiempo o la tarea mediante el uso de la herramienta de temporizador proporcionada y, al mismo tiempo, comprendieron claramente los requisitos de la tarea y la rúbrica. Este no parece ser el caso de este alumno. ¿Podría proporcionar al estudiante comentarios en forma de párrafo (no utilice viñetas ni listas numeradas) que combinen consejos sobre todas estas áreas, sobre cómo mejorar su control de las limitaciones de tiempo mediante el uso de la herramienta de temporizador proporcionada, en la que el botón de tiempo de la barra de herramientas tiene un símbolo de reloj, y sobre cómo mejorar su comprensión de las instrucciones de la tarea y la rúbrica, apoyando la autoconciencia del estudiante para alinear la redacción del ensayo con los requisitos de la tarea y la rúbrica, mientras se hace todo lo posible por EVITAR dar instrucciones detalladas sobre lo que debe incluirse en el ensayo. Mientras tanto, considere de manera exhaustiva todas las siguientes condiciones de aprendizaje de este estudiante:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": `Hasta el minuto 21 de la sesión de aprendizaje, notamos que otros estudiantes que han tenido un buen desempeño en esta tarea ya han comenzado a incluir información del material de lectura en sus ensayos, algo que aún no se observa en tu caso. Es importante integrar los contenidos de las lecturas para cumplir con los requisitos de la tarea y enriquecer tu ensayo. Te sugiero que identifiques puntos clave en el material que se relacionen con los temas de la inteligencia artificial y su impacto en la medicina. Reflexiona sobre cómo estos aspectos se vinculan con las instrucciones de la tarea y úsalos para apoyar tus argumentos o para proporcionar ejemplos específicos. Al hacerlo, asegúrate de que estas referencias al material de lectura estén bien integradas en tu análisis, contribuyendo así a desarrollar las discusiones sobre el concepto de la IA, su uso actual y futuro en la medicina, tal como se espera en la rúbrica. Esto no solo enriquecerá tu ensayo, sino que también demostrará una comprensión profunda del tema.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `Hasta este momento de la sesión de aprendizaje, los alumnos que obtuvieron buenos resultados en esta tarea se aseguraron de explicar las ideas con sus propias palabras basándose en el material de lectura. Este no parece ser el caso de este alumno. ¿Podría proporcionarle al alumno comentarios en forma de párrafo (no utilice viñetas ni listas numeradas) sobre la importancia de explicar las ideas con sus propias palabras mientras demuestra su comprensión de los materiales de lectura? Debe tener en cuenta que no puede dar instrucciones detalladas sobre cómo el estudiante podría escribir el ensayo. Mientras tanto, considere de manera exhaustiva todas las siguientes condiciones de aprendizaje de este estudiante:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Este estudiante ha participado en el estudio anterior, por lo que tiene un cierto nivel de conocimiento de la tarea.",
        "gpt-scaffold-isdimu-prompt-0": "Este estudiante tiene un nivel alto de entendimiento de varias estrategias o técnicas que pueden ser aplicadas para facilitar aprendizaje",
        "gpt-scaffold-isdimu-prompt-16": "Este estudiante tiene un nivel bajo de entendimiento de varias estrategias o técnicas que pueden ser aplicadas para facilitar aprendizaje",
        "gpt-scaffold-isdimu-prompt-32": "Este estudiante parece tener cierto nivel de entendimiento de varias estrategias o técnicas que pueden ser aplicadas para facilitar aprendizaje",
        "gpt-scaffold-pretest-grades-prompt-0": "Este estudiante tiene un alto nivel de conocimientos sobre energías renovables.",
        "gpt-scaffold-pretest-grades-prompt-5": "Este estudiante tiene un nivel bajo de conocimientos sobre energías renovables.",
        "gpt-scaffold-pretest-grades-prompt-10": "Este estudiante tiene un nivel medio de conocimientos sobre energías renovables.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Este estudiante entiende cómo aprende mejor y puede elegir buenas estrategias para aprender.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Este estudiante no tiene claro qué le ayuda a aprender ni qué estrategias le funcionan mejor.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Este estudiante tiene cierta comprensión de las formas de aprender de manera eficaz y puede nombrar algunas estrategias que le ayudan.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Este estudiante planifica, supervisa y ajusta su aprendizaje para obtener mejores resultados.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Este estudiante no planifica con antelación ni lleva un registro de su aprendizaje mientras trabaja.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Este alumno presta cierta atención a la planificación y comprobación de su aprendizaje durante las tareas.",
        "gpt-scaffold-test-mai-name": "Actividad 3: Cuestionario de Conciencia Metacognitiva",
        "gpt-scaffold-test-isdimu-name": "Actividad 3: conocimiento en tácticas de aprendizaje",
        "gpt-scaffold-pretest-name": "Actividad 2: prueba de conocimiento - AI en medicina",
        "gpt-scaffold-check-take-previous-study-name": "Actividad 1: Acerca de ti",
        "gpt-scaffold-planner-select-prompt-1": "Este estudiante ideó el plan de [leer primero y luego escribir] para esta tarea.",
        "gpt-scaffold-planner-select-prompt-2": "Este estudiante ideó el plan de [leer y escribir simultáneamente] para esta tarea.",
        "gpt-scaffold-planner-select-prompt-3": "Este estudiante ideó el plan de [escribir intensivamente y leer selectivamente] para esta tarea.",
        "gpt-scaffold-planner-select-prompt-4": "Este estudiante generó un plan para [diseŋar su própio plan] ésta tarea.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Este estudiante no ha creado planes explícitos sobre cómo llevará a cabo la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Este estudiante ha creado planes explícitos sobre cómo llevará a cabo la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Este estudiante no es consciente del tiempo que le queda para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Este estudiante es consciente del tiempo que le queda para completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Este estudiante no conoce las herramientas disponibles en el entorno de aprendizaje que podrían ayudarle a completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Este estudiante conoce las herramientas disponibles en el entorno de aprendizaje que pueden ayudarle a completar la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Este estudiante no conoce los materiales de lectura disponibles en el entorno de aprendizaje que podrían ayudarle con la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Este estudiante conoce los materiales de lectura disponibles en el entorno de aprendizaje que pueden ayudarle con la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Este estudiante no conoce la rúbrica.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Este estudiante conoce la rúbrica.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Este estudiante no conoce las instrucciones de la tarea.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Este estudiante conoce las instrucciones de la tarea.",
        "gpt-scaffold-role-description": "Eres un asistente muy útil, por favor brinde sugerencias basadas en el siguiente texto.",
        "planner-customise-step2-instruction": `Por favor describa en detalle la estrategia de aprendizaje que planea adoptar y como va a distribuir su tiempo. También puedes incluir las razones por las cuales tomaste esa estrategia y la forma en que distribuiiste el tiempo.`,
        "planner-reading-strategy-1": "Leer el material página por página.",
        "planner-reading-strategy-2": "Navegar rápidamente y luego leer en detalle.",
        "planner-reading-strategy-3": "Usar la herramienta de resaltado para marcar el contenido clave.",
        "planner-reading-strategy-4": "Tomar notas de lo que entiendo mientras leo.",
        "planner-reading-strategy-5": "Leer guiado por preguntas, enfocándome en cierto contenido.",
        "planner-reading-strategy-6": "Leer de forma selectiva y saltarme el contenido irrelevante.",
        "planner-reading-strategy-instruction": "¿Qué habilidades o técnicas de lectura planeas usar (opción múltiple)?",
        "planner-writing-strategy-1": "Primero, hacer un borrador de la estructura del ensayo y luego rellenarla con detalles.",
        "planner-writing-strategy-2": "Utilizar mis notas y lo que he resaltado al escribir el ensayo.",
        "planner-writing-strategy-3": "Revisar las instrucciones y los criterios de evaluación para que la redacción se ajuste a ellos.",
        "planner-writing-strategy-4": "Copiar y pegar las frases clave y luego reescribirlas con fluidez.",
        "planner-writing-strategy-5": "Utilizar las técnicas y los patrones de redacción que he aprendido para escribir.",
        "planner-writing-strategy-instruction": "¿Qué habilidades de redacción piensas utilizar (opción múltiple)?",
        "planner-main-strategy-1": "Primero leer y luego escribir ",
        "planner-main-strategy-1-instruction": "¿Cuánto tiempo piensas dedicar a la lectura y a la escritura, respectivamente?",
        "planner-main-strategy-1-task-1": "2.1 El tiempo que dedicaré a la lectura ",
        "planner-main-strategy-1-task-2": "2.2 El tiempo que dedicaré a la escritura ",
        "planner-main-strategy-2": "Leer y escribir simultáneamente ",
        "planner-main-strategy-2-instruction": "¿Cuánto tiempo piensas dedicar a cada tema?",
        "planner-main-strategy-2-task-1": "2.1 Leer/escribir sobre la selección de energías renovables",
        "planner-main-strategy-2-task-2": "2.2 Leer/escribir sobre costes y beneficios",
        "planner-main-strategy-2-task-3": "2.3 Leer/escribir sobre el impacto medioambiental",
        "planner-main-strategy-3": "Escribe intensamente, lee selectivamente. ",
        "planner-main-strategy-3-instruction": "¿Cuánto tiempo piensas dedicar a las diferentes etapas de la redacción?",
        "planner-main-strategy-3-task-1": "2.1 Planifica la estructura del ensayo:",
        "planner-main-strategy-3-task-2": "2.2 Escribe el primer borrador:",
        "planner-main-strategy-3-task-3": "2.3 Lee información adicional relevante para el ensayo:",
        "planner-main-strategy-3-task-4": "2.4 Revisa y mejora el ensayo:",
        "planner-customise-plan-title": "Plan de personalización",
        "planner-select-main-strategy-hint": "¡Por favor selecciona una estrategia para continuar!",
        "planner-allocate-time-hint": "¡Por favor asigna tiempo para todas las tareas. El tiempo total debe estar dentro de los 45 minutos!",
        "planner-select-reading-writing-strategy-hint": "¡Por favor selecciona habilidades que planeas utilizar!",
        "planner-save-plan-hint": "¡Por favor complete todo el nombre de la estrategia y corrija el tiempo!",
        "rule-based-scaffold-title-1": "Es importante entender de que se trata la tarea.",
        "rule-based-scaffold-title-1-task-1": "(a) Usar el menu para tener una vista general y dar un vistazo al texto",
        "rule-based-scaffold-title-1-task-2": "(b) Revisa la rúbrica del ensayo",
        "rule-based-scaffold-title-1-task-3": "(c) Revisa los objetivos de aprendizaje y las instrucciones",
        "rule-based-scaffold-title-2": "Es importante leer la información sobre los temas del ensayo.",
        "rule-based-scaffold-title-2-task-1": "(a) Anote información importante",
        "rule-based-scaffold-title-2-task-2": "(b) Seleccione que leer",
        "rule-based-scaffold-title-2-task-3": "(c) Revisa el tiempo que queda",
        "rule-based-scaffold-title-3": "Es importante leer la información relevante y revisar sus lecturas.",
        "rule-based-scaffold-title-3-task-1": "(a) Revisa las anotaciones para validar el aprendizaje hasta ahora",
        "rule-based-scaffold-title-3-task-2": "(b) Revisa los objetivos de aprendizaje y las instrucciones",
        "rule-based-scaffold-title-3-task-3": "(c) Revisa el ensayo para determinar los siguiente que debes leer",
        "rule-based-scaffold-title-4": "Es importante escribir un buen ensayo.",
        "rule-based-scaffold-title-4-task-1": "(a) Verifica cuánto tiempo te queda",
        "rule-based-scaffold-title-4-task-2": "(b) Verifica la rúbrica del ensayo",
        "rule-based-scaffold-title-4-task-3": "(c) Haz un borrador del ensayo transfiriendo tus aprendizajes en puntos principales del ensayo",
        "rule-based-scaffold-title-5": "Es importante escribir información relevante y verificar tu escritura.",
        "rule-based-scaffold-title-5-task-1": "(a) Verifica la rúbrica del ensayo",
        "rule-based-scaffold-title-5-task-2": "(b) Edita tu ensayo",
        "rule-based-scaffold-title-5-task-3": "(c) Revisa los objetivos de aprendizaje y las instrucciones",
        "annotation-label-1": "tomar nota",
        "annotation-label-2": "importante",
        "annotation-label-3": "útil",
        "annotation-label-4": "concepto",
        "annotation-label-5": "confuso",
        "product-visual-title": "Visualización de producto",
        "product-visual-close-btn": "Cerrar",
        "process-visual-title": "Visualización de proceso",
        "process-visual-set-goal-label": "Tus objetivos establecidos",
        "process-visual-close-btn": "Cerrar",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Panel de anotaciones",
        "annotation-search-toolbar-btn-hint": "Herramienta de búsqueda de anotaciones",
        "gpt-scaffold-toolbar-btn-hint": "Herramienta de instrucciones",
        "essay-writing-toolbar-btn-hint": "Herramienta de escritura",
        "planner-toolbar-btn-hint": "Herramienta de planeación",
        "multi-agents-single-window-toolbar-btn-hint": "Chat asistente ",
        "timer-toolbar-btn-hint": "Temporizador",
        "like-response-text": "¿Te gusta esta respuesta?",
        "annotation-tool-data-label": "Herramienta para hacer anotaciones",
        "search-annotation-tool-data-label": "Herramienta para buscar notas",
        "gpt-scaffold-tool-data-label": "Herramienta de instrucciones",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "Herramienta de escritura",
        "math-tool-data-label": "",
        "planner-tool-data-label": "Herramienta de planeación",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "Herramienta chatbot",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "Herramienta temporizador",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": `
Este chatbot ya está disponible para usted. No puede utilizar el chatbot para escribir su ensayo.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Introduzca el texto para iniciar el chat",
        "chat-reminder-message-title": "Mensaje recordatorio",
        "scaffolding-message-title": "Retroalimentación de tu progreso actual",
        "scaffold-chat-reminder": "Hola, llevas un rato entretenido con el chat. Volvamos a la tarea principal.",
    },
    fi: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Tehtävän ehtojen alku]]

Opiskelija työskentelee esseetehtävän parissa.

Seuraava on tehtävän ohje:

Tehtävän aihe: Uusiutuvan energian strategia pohjoiselle rannikkoyhteisölle

Sinut on palkattu energia-asiantuntijaksi neuvomaan pohjoista rannikkoyhteisöä, joka sijaitsee lähellä vuoria ja jossa talvet ovat ankarat ja lumiset. Yhteisö on tällä hetkellä voimakkaasti riippuvainen maahatuoduista fossiilisista polttoaineista, jotka ovat kalliita, ympäristölle haitallisia ja epäluotettavia ankarien talvimyrskyjen aikana. Kaupunki etsii ratkaisua, joka takaa vakaan energiansaannin ympäri vuoden, vähentää kustannuksia ajan mittaan ja luo ihannetapauksessa paikallisia työpaikkoja. Alueella puhaltaa tasaisesti merituuli, ja se sijaitsee lähellä merkittäviä, kestävästi hoidettuja metsävaroja. Paikallisen meren biologisen monimuotoisuuden ja metsäekosysteemien säilyttäminen on kuitenkin yhteisön prioriteetti.

Tehtäväsi:

Kirjoita lyhyt ehdotus, jossa suosittelet uusiutuvan energian strategiaa, jossa yhdistyvät kaksi uusiutuvan energian lähdettä. Perustele suosituksesi selkeästi keskustelemalla seuraavista seikoista:

Kuinka kukin uusiutuvan energian lähde sopii paikalliseen maantieteeseen, ilmastohaasteisiin ja energiantarpeeseen.
Taloudellinen toteutettavuus ja odotetut taloudelliset hyödyt, mukaan lukien työpaikkojen luominen.
Mahdolliset ympäristövaikutukset ja kuinka strategiasi vähentää metsiin ja meren elämään kohdistuvia riskejä.

Tämän tehtävän suorittamiseen on aikaa 45 minuuttia. 

Seuraava on opiskelijalle annettu arviointitaulukko:

Tätä arviointitaulukkoa käytetään esseesi arviointiin. 

Essee koostuu 200–300 sanasta. 
Et saa kopioida suoraan lukemastasi tai muista lähteistä – esseen tulee olla kirjoitettu omilla sanoillasi.


Alla oleva matriisi on arviointitaulukko: 

1. Ilmoita valitut energialähteet:
   Erinomainen (3): Yhdistää selkeästi kaksi energialähdettä ja perustelee molemmat.
   Hyvä (2): Mainitsee kaksi energialähdettä, mutta selittää niitä vain vähän.
   Perustaso (1): Vain yksi energialähde tai epäselvä ratkaisu; vähän tai ei lainkaan selityksiä.

2. Maantieteellisten ja ilmastollisten yksityiskohtien käyttö:
   Erinomainen (3): Selittää selkeästi, miten molemmat energialähteet sopivat paikalliseen maantieteeseen ja ilmastoon.
    Hyvä (2): Antaa joitakin yksityiskohtia paikallisesta maantieteestä/ilmastosta, mutta ei liitä niitä energian valintaan.
  Perustaso (1): Käyttää paikallisia yksityiskohtia vähän tai ei lainkaan; energian valinnat eivät sovi skenaarioon.

3. Taloudelliset ja työllisyyshyödyt:
  Erinomainen (3): Selittää vahvasti, kuinka suunnitelma säästää rahaa ja luo paikallisia työpaikkoja.
  Hyvä (2): Mainitsee rahan tai työpaikat, mutta antaa vain vähän yksityiskohtia.
    Perustaso (1): Ei mainitse rahaa tai työpaikkoja tai antaa virheellistä tietoa.

4. Ympäristönsuojelu:
   Erinomainen (3): Selittää selkeästi, miten suunnitelma suojelee metsiä ja meriympäristöä; antaa konkreettisia esimerkkejä riskien välttämisestä.
   Hyvä (2): Mainitsee ympäristövaikutukset, mutta antaa vain vähän yksityiskohtia suojelusta.
   Perustaso (1): Mainitsee ympäristön vain vähän tai ei lainkaan tai jättää luonnolle aiheutuvat riskit huomiotta.

5. Kirjoitustyyli:
   Erinomainen (3): Kirjoitus on selkeää, eikä siinä ole kieli- tai kirjoitusvirheitä. Ajatukset etenevät loogisesti.
   Hyvä (2): Joitakin kieli- tai kirjoitusvirheitä, jotka heikentävät ajatusten selkeyttä. Merkitys on paikoin epäselvä.
   Perustaso (1): Useita kieli- tai kirjoitusvirheitä; ajatuksia on vaikea seurata tai ne eivät ole johdonmukaisia.

[[Tehtävän ehtojen loppu]]

[[Aloita tehtäväsi]]

    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Tätä palautetta varten noudata tehokasta palautteen antamisen mallia. Se on oppijakeskeinen ja sen tulisi sisältää kolme pääkomponenttia:

1. Edellä lueteltujen oppimisolosuhteiden perusteella käytä sekä oppilaan vahvuuksia että heikkouksia opetuksen suunnittelussa.
2. Keskity seuraaviin vaikutuksiin antamalla kommentteja, jotka sisältävät käytännönläheistä tietoa, joka auttaa oppilasta saavuttamaan tehtävän oppimistulokset. Tämän tulisi perustua edellä lueteltuihin neuvoihin.
3. Tue oppilasta, jotta hän tuntee hallitsevansa oman oppimisensa huomioi hänen sosiaaliset, emotionaaliset ja motivaatiotarpeensa ja rohkaise häntä olemaan avoin palautteelle.

Huomioi seuraavat rajoitukset:

Yritä parhaasi mukaan VÄLTTÄÄ antamasta YHTÄÄN yksityiskohtaisia ohjeita siitä, mitä esseeseen tulee sisällyttää!

Varmista, että tuotat vain palautetekstin!

Lopuksi, palautteen SAA OLLA enintään 100 sanaa!

[[Tehtäväsi loppu]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Tehtävän ehtojen alku]]

Opiskelija työskentelee esseetehtävän parissa.

Seuraava on tehtävän ohje:

Tehtävän aihe: Uusiutuvan energian strategia pohjoiselle rannikkoyhteisölle

Sinut on palkattu energia-asiantuntijaksi neuvomaan pohjoista rannikkoyhteisöä, joka sijaitsee lähellä vuoria ja jossa talvet ovat ankarat ja lumiset. Yhteisö on tällä hetkellä voimakkaasti riippuvainen maahatuoduista fossiilisista polttoaineista, jotka ovat kalliita, ympäristölle haitallisia ja epäluotettavia ankarien talvimyrskyjen aikana. Kaupunki etsii ratkaisua, joka takaa vakaan energiansaannin ympäri vuoden, vähentää kustannuksia ajan mittaan ja luo ihannetapauksessa paikallisia työpaikkoja. Alueella puhaltaa tasaisesti merituuli, ja se sijaitsee lähellä merkittäviä, kestävästi hoidettuja metsävaroja. Paikallisen meren biologisen monimuotoisuuden ja metsäekosysteemien säilyttäminen on kuitenkin yhteisön prioriteetti.

Tehtäväsi:

Kirjoita lyhyt ehdotus, jossa suosittelet uusiutuvan energian strategiaa, jossa yhdistyvät kaksi uusiutuvan energian lähdettä. Perustele suosituksesi selkeästi keskustelemalla seuraavista seikoista:

Kuinka kukin uusiutuvan energian lähde sopii paikalliseen maantieteeseen, ilmastohaasteisiin ja energiantarpeeseen.
Taloudellinen toteutettavuus ja odotetut taloudelliset hyödyt, mukaan lukien työpaikkojen luominen.
Mahdolliset ympäristövaikutukset ja kuinka strategiasi vähentää metsiin ja meren elämään kohdistuvia riskejä.

Tämän tehtävän suorittamiseen on aikaa 45 minuuttia. 

Seuraava on opiskelijalle annettu arviointitaulukko:

Tätä arviointitaulukkoa käytetään esseesi arviointiin. 

Essee koostuu 200–300 sanasta. 
Et saa kopioida suoraan lukemastasi tai muista lähteistä – esseen tulee olla kirjoitettu omilla sanoillasi.


Alla oleva matriisi on arviointitaulukko: 

1. Ilmoita valitut energialähteet:
   Erinomainen (3): Yhdistää selkeästi kaksi energialähdettä ja perustelee molemmat.
   Hyvä (2): Mainitsee kaksi energialähdettä, mutta selittää niitä vain vähän.
   Perustaso (1): Vain yksi energialähde tai epäselvä ratkaisu; vähän tai ei lainkaan selityksiä.

2. Maantieteellisten ja ilmastollisten yksityiskohtien käyttö:
   Erinomainen (3): Selittää selkeästi, miten molemmat energialähteet sopivat paikalliseen maantieteeseen ja ilmastoon.
    Hyvä (2): Antaa joitakin yksityiskohtia paikallisesta maantieteestä/ilmastosta, mutta ei liitä niitä energian valintaan.
  Perustaso (1): Käyttää paikallisia yksityiskohtia vähän tai ei lainkaan; energian valinnat eivät sovi skenaarioon.

3. Taloudelliset ja työllisyyshyödyt:
  Erinomainen (3): Selittää vahvasti, kuinka suunnitelma säästää rahaa ja luo paikallisia työpaikkoja.
  Hyvä (2): Mainitsee rahan tai työpaikat, mutta antaa vain vähän yksityiskohtia.
    Perustaso (1): Ei mainitse rahaa tai työpaikkoja tai antaa virheellistä tietoa.

4. Ympäristönsuojelu:
   Erinomainen (3): Selittää selkeästi, miten suunnitelma suojelee metsiä ja meriympäristöä; antaa konkreettisia esimerkkejä riskien välttämisestä.
   Hyvä (2): Mainitsee ympäristövaikutukset, mutta antaa vain vähän yksityiskohtia suojelusta.
   Perustaso (1): Mainitsee ympäristön vain vähän tai ei lainkaan tai jättää luonnolle aiheutuvat riskit huomiotta.

5. Kirjoitustyyli:
   Erinomainen (3): Kirjoitus on selkeää, eikä siinä ole kieli- tai kirjoitusvirheitä. Ajatukset etenevät loogisesti.
   Hyvä (2): Joitakin kieli- tai kirjoitusvirheitä, jotka heikentävät ajatusten selkeyttä. Merkitys on paikoin epäselvä.
   Perustaso (1): Useita kieli- tai kirjoitusvirheitä; ajatuksia on vaikea seurata tai ne eivät ole johdonmukaisia.

[[Tehtävän ehtojen loppu]]

[[Aloita tehtäväsi]]

        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Tätä palautetta varten noudata tehokasta palautteen antamisen mallia. Se on oppijakeskeinen ja sen tulisi sisältää kolme pääkomponenttia:

1. Edellä lueteltujen oppimisolosuhteiden perusteella käytä sekä oppilaan vahvuuksia että heikkouksia opetuksen suunnittelussa.
2. Keskity seuraaviin vaikutuksiin antamalla kommentteja, jotka sisältävät käytännönläheistä tietoa, joka auttaa oppilasta saavuttamaan tehtävän oppimistulokset. Tämän tulisi perustua edellä lueteltuihin neuvoihin.
3. Tue oppilasta, jotta hän tuntee hallitsevansa oman oppimisensa huomioi hänen sosiaaliset, emotionaaliset ja motivaatiotarpeensa ja rohkaise häntä olemaan avoin palautteelle.

Huomioi seuraavat rajoitukset:

Yritä parhaasi mukaan VÄLTTÄÄ antamasta YHTÄÄN yksityiskohtaisia ohjeita siitä, mitä esseeseen tulee sisällyttää!

Varmista, että tuotat vain palautetekstin!

Lopuksi, palautteen SAA OLLA enintään 100 sanaa!

[[Tehtäväsi loppu]]`,
        "annotation-notes-title": "Muistiinpanot-paneeli",
        "annotation-notes-delete-confirm-message": "Haluatko poistaa?",
        "annotation-write-note-placeholder": "Kirjoita muistiinpanoja tähän...",
        "annotation-tag-placeholder": "Syötä uudet tunnisteet ja paina Enter...",
        "annotation-note-save-btn-text": "Tallenna",
        "annotation-note-cancel-btn-text": "Peruuta",
        "annotation-search-btn-text": "Hae",
        "annotation-search-panel-input-placeholder": "Syötä hakusanat...",
        "scaffolding-title": "Ohjauspaneeli",
        "scaffolding-create-checklist-btn-text": "Luo tarkistuslista",
        "scaffolding-edit-checklist-btn-text": "Muokata",
        "scaffolding-unread-message-text": "Lukematon viesti",
        "scaffolding-chat-open-text": "Chat auki",
        "gpt-scaffolding-title": "Hoksautusikkuna",
        "planner-title": "Suunnittelutyökalu",
        "planner-learning-strategy-select-label-text": "1. Suunnittele oppimisstrategiasi:",
        "planner-learning-strategy-select-option1-text": "Valitse strategiasi",
        "planner-learning-strategy-select-customise-option-text": "Käytän omaa oppimisstrategiaani",
        "planner-add-more-customise-strategy-btn-text": "Lisää uusi strategia",
        "planner-customise-option-hint-textarea-placeholder": "Kuvaile, miksi suunnittelit tällaisen strategian.",
        "planner-next-btn-text": "Seuraava",
        "planner-time-unit-minute": "Minuutit",
        "planner-display-plan-title": "Oppimissuunnitelmani",
        "planner-display-overall-strategy-label": "Kokonaisstrategia:",
        "planner-display-time-allocation-label": "Ajanjako:",
        "planner-display-writing-strategy-label": "Kirjoitusstrategia:",
        "planner-display-reading-strategy-label": "Lukustrategia:",
        "planner-customise-plan-reason-placeholder": "(Valinnainen)",
        "essay-title": "Esseen kirjoitustyökalu",
        "essay-save-btn-text": "Tallenna essee",
        "essay-writing-placeholder": "Kirjoita essee tähän...",
        "essay-show-word-count-btn-text": "Näytä sanamäärä",
        "essay-save-toast-text": "Esseesi on tallennettu!",
        "dictionary-title": "Sanakirjatyökalu",
        "dictionary-send-btn-text": "Lähettää",
        "dictionary-panel-input-placeholder": "Syötä kyselysana...",
        "checklist-title": "Tarkistuslistatyökalu",
        "checklist-basic-panel-title": "Perus",
        "checklist-academic-panel-title": "Akateeminen",
        "checklist-originality-panel-title": "Omaperäisyys",
        "checklist-integration-panel-title": "Integrointi ja kehittäminen",
        "checklist-analyse-btn-text": "Analysoida",
        "chatgpt-title": "Chatgpt-työkalu",
        "chatgpt-send-btn-text": "Lähettää",
        "chatgpt-panel-input-placeholder": "Kysy kysymys...",
        "chatteacher-title": "Kysy opettajatyökalu",
        "chatteacher-panel-input-placeholder": "Kysy kysymys...",
        "chatteacher-connect-server-status-text": "Yhdistä palvelimen tila",
        "chatteacher-teacher-online-status-text": "Opettajan online-tila",
        "chatteacher-send-btn-text": "Lähettää",
        "chatgpt-role-description": "Olet avulias avustaja ja vastaa kysymyksiin annetun tekstin perusteella.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Tähän asti oppitunnilla tehtävän hyvin suorittaneet opiskelijat ovat varmistaneet, että he ovat tietoisia tehtävän aikarajasta käyttämällä annettua ajastinta. Näin ei näytä olevan tämän opiskelijan kohdalla. Voisitteko antaa opiskelijalle kappaleiden muodossa (älä käytä luetteloita tai numeroituja luetteloita) palautetta siitä, miten hän voi parantaa ajan seurantaa käyttämällä annettua ajastinta, joka on työkalurivillä oleva kellosymboli. Samalla ota huomioon kaikki seuraavat tämän opiskelijan oppimisolosuhteet:

`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Tähän asti oppitunnilla tehtävän hyvin suorittaneet opiskelijat ovat varmistaneet, että he palaavat tehtävän vaatimuksiin ja arviointikriteereihin arvioidakseen esseensä luonnosta ja tarkistaakseen, että heidän kirjoituksensa on tehtävän vaatimusten ja arviointikriteerien mukainen. Näin ei näytä olevan tämän opiskelijan tapauksessa. Voisitteko antaa opiskelijalle kappaleiden muodossa (älä käytä luetteloita tai numeroituja luetteloita); palautetta tehtävän ohjeiden ja arviointikriteerien käyttämisestä esseeluonnoksen arvioimiseksi ja sen tarkistamiseksi, että esseenluonnos on tehtävän vaatimusten ja arviointikriteerien mukainen, samalla kun yrität parhaasi mukaan VÄLTTÄÄ antamasta yksityiskohtaisia ohjeita siitä, mitä esseeseen on sisällytettävä. Samalla ota kattavasti huomioon kaikki seuraavat tämän opiskelijan oppimisolosuhteet:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `Meillä on yksi opiskelija, joka parhaillaan työskentelee tällä oppimistehtävällä. Oppimisistunnon 14. minuuttiin mennessä muut opiskelijat, jotka menestyivät hyvin tässä tehtävässä, ovat jatkuvasti tarkistaneet tehtävän ohjeet ja arviointikriteerit. Tämä ei tunnu pätevän tämän opiskelijan kohdalla. Joten, ottaen huomioon kaikki yllä annetut tiedot (mukaan lukien tehtävän vaatimukset, arviointikriteerit ja oppimateriaali) sekä tämän erityisen oppijan oppimistilanteet, anna opiskelijalle kappaletyylisessä muodossa palautetta (älä käytä luettelo- tai numerointilistoja) siitä, miten ohjeita ja arviointikriteerejä voidaan tarkistaa säännöllisesti tämän kirjoitusistunnon loppuun asti.`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Tähän asti oppitunnilla tehtävän hyvin suorittaneet opiskelijat ovat varmistaneet, että he ovat ymmärtäneet tehtävän vaatimukset ja arviointikriteerit selvästi. Näin ei näytä olevan tämän opiskelijan kohdalla. Voisitteko antaa opiskelijalle kappaleiden muodossa (älä käytä luetteloita tai numeroituja luetteloita) palautetta siitä, miten hän voi parantaa tehtävän ohjeiden ja arviointikriteerien ymmärtämistä, tukien samalla opiskelijan itsetuntemusta. Huomio esseen kirjoittamisen sovittamisesta tehtävän vaatimuksiin ja arviointikriteereihin, samalla kun yrität parhaasi mukaan VÄLTTÄÄ antamasta yksityiskohtaisia ohjeita siitä, mitä esseen tulisi sisältää. Samalla ota kattavasti huomioon kaikki seuraavat tämän opiskelijan oppimisolosuhteet:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Tähän asti oppitunnilla tehtävän hyvin suorittaneet opiskelijat ovat varmistaneet, että he ovat tietoisia aikarajasta tai tehtävästä käyttämällä annettua ajastinta, ja samalla he ovat ymmärtäneet selvästi tehtävän vaatimukset ja arviointikriteerit. Näin ei näytä olevan tämän opiskelijan kohdalla. Voisitteko antaa opiskelijalle kappaleiden muodossa palautetta (älä käytä luetteloita tai numeroituja luetteloita), jossa yhdistyvät neuvot kaikista näistä alueista; miten parantaa ajan seurantaa käyttämällä annettua ajastinta, joka on työkalurivillä oleva kellosymboli, kuinka parantaa tehtävän ohjeiden ja arviointikriteerien ymmärtämistä, tukemalla opiskelijan itsetuntemusta esseen kirjoittamisen sovittamisesta tehtävän vaatimuksiin ja arviointikriteereihin, samalla kun yrität parhaasi mukaan VÄLTTÄÄ antamasta yksityiskohtaisia ohjeita siitä, mitä esseen tulisi sisältää. Samalla ota kattavasti huomioon kaikki seuraavat tämän opiskelijan oppimisolosuhteet:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": `Meillä on yksi opiskelija, joka parhaillaan työskentelee tällä oppimistehtävällä. Oppimisistunnon 21. minuuttiin mennessä muut opiskelijat, jotka ovat menestyneet hyvin tässä tehtävässä, ovat jo alkaneet sisällyttää joitakin tietoja oppimateriaalista esseisiin. Tämä ei näytä olevan tämän opiskelijan tapauksessa. Joten, kun otetaan huomioon kaikki yllä annetut tiedot (mukaan lukien tehtävän vaatimukset, arviointikriteerit ja oppimateriaali) ja tämän opiskelijan tietyt oppimisolosuhteet, anna opiskelijalle kappaletyylisessä muodossa palautetta (älä käytä luettelo- tai numerointilistoja) siitä, miten sisällyttää tietoja oppimateriaalista esseeluonnokseensa tehtävän vaatimusten mukaisesti.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `Tähän asti oppitunnilla tehtävän hyvin suorittaneet opiskelijat ovat varmistaneet, että he selittävät ideat omilla sanoillaan lukemansa materiaalin perusteella. Näin ei näytä olevan tämän opiskelijan tapauksessa. Voisitteko antaa opiskelijalle kappaleiden muodossa (älä käytä luetteloita tai numeroituja luetteloita) palautetta siitä, kuinka tärkeää on selittää ideat omilla sanoillaan ja osoittaa samalla ymmärtäneensä lukemansa materiaalin. Huomaa, että et voi antaa yksityiskohtaisia ohjeita siitä, miten opiskelija voisi kirjoittaa esseen. Samalla ota huomioon kaikki seuraavat tämän opiskelijan oppimisolosuhteet:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Tämä opiskelija on osallistunut aiempaan tutkimukseen, joten hänellä on tietty taso tehtävän ymmärryksestä.",
        "gpt-scaffold-isdimu-prompt-0": "Tämä opiskelija näyttää ymmärtävän hyvin erilaisia oppimista edistäviä strategioita tai tekniikoita.",
        "gpt-scaffold-isdimu-prompt-16": "Tämä opiskelija näyttää ymmärtävän vähän erilaisia oppimista edistäviä strategioita tai tekniikoita.",
        "gpt-scaffold-isdimu-prompt-32": "Tämä opiskelija näyttää ymmärtävän jonkin verran erilaisia oppimista edistäviä strategioita tai tekniikoita.",
        "gpt-scaffold-pretest-grades-prompt-0": "Tällä opiskelijalla on erinomainen ymmärrys uusiutuvasta energiasta.",
        "gpt-scaffold-pretest-grades-prompt-5": "Tällä opiskelijalla on tyydyttävä ymmärrys uusiutuvasta energiasta.",
        "gpt-scaffold-pretest-grades-prompt-10": "Tällä opiskelijalla on hyvä ymmärrys uusiutuvasta energiasta.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Tämä opiskelija ymmärtää, miten hän oppii parhaiten, ja osaa valita hyviä oppimisstrategioita.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Tämä opiskelija ei ole varma siitä, mikä auttaa häntä oppimaan tai mitkä oppimisstrategiat toimivat hänelle parhaiten.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Tämä opiskelija ymmärtää jonkin verran tehokkaista oppimisstragegioista ja osaa mainita muutamia hyödyllisiä strategioita.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Tämä opiskelija suunnittelee, monitoroi ja mukauttaa oppimistaan parempien tulosten saavuttamiseksi.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Tämä opiskelija ei suunnittele etukäteen eikä seuraa oppimistaan työnsä aikana.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Tämä opiskelija kiinnittää jonkin verran huomiota oppimisen suunnitteluun ja tarkistamiseen tehtävien aikana.",
        "gpt-scaffold-test-mai-name": "Tehtävä 3: Pohdi omaa oppimistasi",
        "gpt-scaffold-test-isdimu-name": "Tehtävä 3: tietämys oppimisstrategioista",
        "gpt-scaffold-pretest-name": "Tehtävä 2: Kuinka paljon tiedät uusiutuvasta energiasta?",
        "gpt-scaffold-check-take-previous-study-name": "Tehtävä 1: Itsestäsi",
        "gpt-scaffold-planner-select-prompt-1": "Tämä opiskelija keksi suunnitelman [Luen ensin, sitten kirjoitan] tätä tehtävää varten.",
        "gpt-scaffold-planner-select-prompt-2": "Tämä opiskelija keksi suunnitelman [luen ja kirjoitan samanaikaisesti] tätä tehtävää varten.",
        "gpt-scaffold-planner-select-prompt-3": "Tämä opiskelija keksi suunnitelman [kirjoitan intensiivisesti ja luen valikoivasti] tätä tehtävää varten.",
        "gpt-scaffold-planner-select-prompt-4": "Tämä opiskelija suunnitteli tehtäväksi [luo oma suunnitelma].",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Tämä opiskelija ei ole laatinut tarkkaa suunnitelmaa tehtävän suorittamisesta.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Tämä opiskelija on laatinut tarkan suunnitelman miten hän aikoo toteuttaa tehtävän.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Tämä opiskelija ei ole tietoinen jäljellä olevasta ajasta suorittaa tehtävä.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Tämä opiskelija on tietoinen jäljellä olevasta ajasta suorittaa tehtävä.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Tämä opiskelija ei ole tietoinen ympäristöstä löytyvistä työkaluista, jotka voisivat auttaa häntä suorittamaan tehtävän.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Tämä opiskelija on tietoinen ympäristöstä löytyvistä työkaluista, jotka voivat auttaa häntä suorittamaan tehtävän.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Tämä opiskelija ei ole tietoinen ympäristöstä löytyvistä oppimismateriaaleista, jotka voisivat auttaa häntä tehtävän suorittamisessa.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Tämä opiskelija on tietoinen ympäristöstä löytyvistä oppimismateriaaleista, jotka voivat auttaa häntä tehtävän suorittamisessa.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Tämä opiskelija ei ole tietoinen arviointikriteereistä.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Tämä opiskelija on tietoinen arviointikriteereistä.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Tämä opiskelija ei ole tietoinen tehtävän ohjeista.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Tämä opiskelija on tietoinen tehtävän ohjeista.",
        "gpt-scaffold-role-description": "Olet avulias avustaja, anna ehdotuksia annetun tekstin perusteella.",
        "planner-customise-step2-instruction": `Ole hyvä ja rakenna alle oppimisstrategiasi, mitä suunnittelet tekeväsi ja miten paljon varaat siihen aikaa. Voit myös kirjoittaa perustelut valitsemillesi strategioille ja suunnittelemallesi ajankäytölle.`,
        "planner-reading-strategy-1": "Luen materiaalin sivu kerrallaan",
        "planner-reading-strategy-2": "Selaan nopeasti ja luen sitten yksityiskohtaisesti",
        "planner-reading-strategy-3": "Merkitsen tärkeät kohdat yliviivaustyökalulla",
        "planner-reading-strategy-4": "Kirjoitan muistiinpanoihin mitä ymmärsin samalla kun luen",
        "planner-reading-strategy-5": "Keskityn lukiessani tiettyihin sisältöihin kysymysten avulla",
        "planner-reading-strategy-6": "Luen valikoivasti ja ohitan epäolennaiset kohdat",
        "planner-reading-strategy-instruction": "Mitä lukutaitoja aiot käyttää (monivalinta)?",
        "planner-writing-strategy-1": "Laadin ensin esseen rakenteen ja täytän sitten yksityiskohdat.",
        "planner-writing-strategy-2": "Käytän muistiinpanojani ja yliviivauksiani esseen kirjoittamisessa.",
        "planner-writing-strategy-3": "Tarkistan ohjeet ja arviointikriteerit, jotta esseeni on niiden mukainen.",
        "planner-writing-strategy-4": "Kopioin ja liitän avainlauseet ja muotoilen ne itse sitten sujuvaksi osaksi tekstiäni.",
        "planner-writing-strategy-5": "Käytän kirjoittamisessa oppimiani kirjoitusmalleja ja tapoja.",
        "planner-writing-strategy-instruction": "Mitä kirjoitustaitoja aiot käyttää (monivalinta)?",
        "planner-main-strategy-1": "Luen ensin, sitten kirjoitan ",
        "planner-main-strategy-1-instruction": "Kuinka paljon aikaa aiot käyttää lukemiseen ja kirjoittamiseen?",
        "planner-main-strategy-1-task-1": "2.1 Aikaa käytetään lukemiseen ",
        "planner-main-strategy-1-task-2": "2.2 Aikaa käytetään kirjoittamiseen ",
        "planner-main-strategy-2": "Luen ja kirjoitan samanaikaisesti ",
        "planner-main-strategy-2-instruction": "Kuinka paljon aikaa aiot käyttää kuhunkin aiheeseen?",
        "planner-main-strategy-2-task-1": "2.1 Luen/kirjoitan energian valinnoista",
        "planner-main-strategy-2-task-2": "2.2 Luen/kirjoitan kustannuksista ja hyödyistä",
        "planner-main-strategy-2-task-3": "2.3 Luen/kirjoitan ympäristövaikutuksista",
        "planner-main-strategy-3": "Kirjoitan intensiivisesti, luen valikoivasti ",
        "planner-main-strategy-3-instruction": "Kuinka paljon aikaa aiot käyttää kirjoittamisen eri vaiheisiin?",
        "planner-main-strategy-3-task-1": "2.1 Suunnittelen esseen rakennetta:",
        "planner-main-strategy-3-task-2": "2.2 Kirjoitan ensimmäistä luonnosta:",
        "planner-main-strategy-3-task-3": "2.3 Luen esseen kannalta merkityksellistä lisätietoa:",
        "planner-main-strategy-3-task-4": "2.4 Tarkistan ja parannan esseetä:",
        "planner-customise-plan-title": "Suunnittele oppimissuunnitelmasi",
        "planner-select-main-strategy-hint": "Valitse yksi strategia jatkaaksesi!!!",
        "planner-allocate-time-hint": "Jaa aika kaikkiin tehtäviin, ja kokonaisajan on oltava vaaditun ajan sisällä!!!",
        "planner-select-reading-writing-strategy-hint": "Ole hyvä ja valitse vähintään yksi lukustrategia, jota aiot käyttää!!!",
        "planner-save-plan-hint": "Täytä kaikki strategian nimet ja oikea aika!!!",
        "rule-based-scaffold-title-1": "On tärkeää ymmärtää, mistä tehtävässä on kyse.",
        "rule-based-scaffold-title-1-task-1": "(a) Käytä valikkoa saadaksesi yleiskuvan ja silmäile tekstiä",
        "rule-based-scaffold-title-1-task-2": "(b) Tarkasta esseen arviointikriteerit",
        "rule-based-scaffold-title-1-task-3": "(c) Tarkasta oppimistavoitteet ja ohjeet",
        "rule-based-scaffold-title-2": "On tärkeää lukea tietoa aiheista.",
        "rule-based-scaffold-title-2-task-1": "(a) Merkitse tärkeät tiedot muistiin",
        "rule-based-scaffold-title-2-task-2": "(b) Valitse, mitä luet",
        "rule-based-scaffold-title-2-task-3": "(c) Tarkasta jäljellä oleva aika",
        "rule-based-scaffold-title-3": "On tärkeää lukea oleelliset tiedot ja tarkastella lukemaasi.",
        "rule-based-scaffold-title-3-task-1": "(a) Tarkastele merkintöjä tarkistaaksesi oppimisen edistyksen",
        "rule-based-scaffold-title-3-task-2": "(b) Tarkastele oppimistavoitteita ja ohjeita",
        "rule-based-scaffold-title-3-task-3": "(c) Tarkista essee päättääksesi, mitä seuraavaksi lukea",
        "rule-based-scaffold-title-4": "On tärkeää kirjoittaa hyvä essee.",
        "rule-based-scaffold-title-4-task-1": "(a) Tarkista jäljellä oleva aika",
        "rule-based-scaffold-title-4-task-2": "(b) Tarkasta esseen arviointikriteerit",
        "rule-based-scaffold-title-4-task-3": "(c) Laadi essee siirtämällä oppiminen pääkohtiin",
        "rule-based-scaffold-title-5": "On tärkeää kirjoittaa merkitykselliset tiedot ja tarkistaa kirjoittamasi.",
        "rule-based-scaffold-title-5-task-1": "(a) Tarkasta esseen arviointikriteerit",
        "rule-based-scaffold-title-5-task-2": "(b) Muokkaa esseetä",
        "rule-based-scaffold-title-5-task-3": "(c) Tarkasta oppimistavoitteet ja ohjeet",
        "annotation-label-1": "Muistiinpano",
        "annotation-label-2": "Tärkeä",
        "annotation-label-3": "Hyödyllinen",
        "annotation-label-4": "Käsite",
        "annotation-label-5": "Hämmentävä",
        "product-visual-title": "Tuotevisualisointi",
        "product-visual-close-btn": "Sulje",
        "process-visual-title": "Prosessin visualisointi",
        "process-visual-set-goal-label": "Asettamasi tavoitteet",
        "process-visual-close-btn": "Sulje",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Muistiinpanot-paneeli",
        "annotation-search-toolbar-btn-hint": "Hakumerkintätyökalu",
        "gpt-scaffold-toolbar-btn-hint": "Ohjeistustyökalu",
        "essay-writing-toolbar-btn-hint": "Kirjoitustyökalu",
        "planner-toolbar-btn-hint": "Suunnittelutyökalu",
        "multi-agents-single-window-toolbar-btn-hint": "Tekoälyagentti",
        "timer-toolbar-btn-hint": "Ajastin",
        "like-response-text": "Pidätkö tästä vastauksesta?",
        "annotation-tool-data-label": "Muistiinpanotyökalu",
        "search-annotation-tool-data-label": "Hakupaneeli",
        "gpt-scaffold-tool-data-label": "",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "Kirjoitustyökalu",
        "math-tool-data-label": "",
        "planner-tool-data-label": "Suunnittelutyökalu",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "Tekoälytyökalu",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "Ajastintyökalu",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": `
Tämä tekoälyagentti on nyt käytettävissäsi. Et voi käyttää tekoälyagenttia esseesi kirjoittamiseen.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Kirjoita teksti keskustelun aloittamiseksi",
        "chat-reminder-message-title": "Muistutusviesti",
        "scaffolding-message-title": "Palautetta tämänhetkisestä edistymisestäsi:",
        "scaffold-chat-reminder": "Hei, olet ollut chatissa jo jonkin aikaa. Palataan takaisin päätehtävään!",
    },
    ind: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `"[[Kondisi Awal Tugas]]

Seorang siswa sedang mengerjakan tugas menulis esai.

Berikut instruksi tugasnya:

Topik tugas: Strategi Energi Terbarukan untuk Komunitas Pesisir Utara

Anda telah direkrut sebagai pakar energi untuk memberi nasihat kepada komunitas pesisir utara yang terletak di dekat pegunungan dan menghadapi musim dingin yang keras dan bersalju. Komunitas ini saat ini sangat bergantung pada bahan bakar fosil impor, yang mahal, merusak lingkungan, dan tidak dapat diandalkan selama badai musim dingin yang parah. Kota ini mencari solusi yang menjamin pasokan energi yang stabil sepanjang tahun, mengurangi biaya seiring waktu, dan idealnya menciptakan lapangan kerja lokal. Daerah ini mengalami angin laut yang stabil di lepas pantai dan terletak di dekat sumber daya hutan penting yang dikelola secara berkelanjutan. Namun, pelestarian keanekaragaman hayati laut dan ekosistem hutan setempat merupakan prioritas komunitas.

Tugas Anda:

Tulis proposal singkat yang merekomendasikan strategi energi terbarukan yang seimbang yang menggabungkan dua jenis energi terbarukan. Jelaskan secara jelas rekomendasi Anda dengan membahas:

Bagaimana setiap sumber energi terbarukan sesuai dengan geografi lokal, tantangan iklim, dan permintaan energi.
Kelayakan finansial dan manfaat ekonomi yang diharapkan, termasuk lapangan kerja penciptaan.
Potensi dampak lingkungan dan bagaimana strategi Anda memitigasi risiko terhadap hutan dan kehidupan laut.

Tugas ini dibatasi waktu selama 45 menit.

Berikut adalah rubrik yang diberikan kepada siswa:

Rubrik ini digunakan untuk mengevaluasi esai Anda.

Esai ini terdiri dari 200 hingga 300 kata.
Anda TIDAK boleh menyalin langsung dari bacaan atau sumber lain - esai harus ditulis dengan kata-kata Anda sendiri.

Matriks di bawah ini adalah rubrik penilaian lengkap:

1. Tunjukkan sumber energi yang dipilih:
Sangat Baik (3): Menggabungkan dua jenis energi dengan jelas dan memberikan alasan untuk keduanya.
Baik (2): Menyebutkan dua jenis energi tetapi sedikit penjelasan.
Dasar (1): Hanya satu jenis energi, atau solusinya tidak jelas; sedikit atau tanpa penjelasan.

2. Penggunaan Detail Geografis & Iklim:
Sangat Baik (3): Menjelaskan dengan jelas bagaimana kedua jenis energi tersebut sesuai dengan geografi dan iklim setempat.
Baik (2): Memberikan beberapa detail tentang geografi/iklim setempat, tetapi tidak terkait dengan pilihan energi.
Dasar (1): Sedikit atau tidak ada penggunaan detail lokal; pilihan energi tidak sesuai dengan skenario.

3. Manfaat Ekonomi dan Pekerjaan:
Sangat Baik (3): Penjelasan yang kuat tentang bagaimana rencana tersebut menghemat uang dan menciptakan pekerjaan.
Baik (2): Menyebutkan uang atau pekerjaan tetapi hanya memberikan sedikit detail.
Dasar (1): Tidak menyebutkan uang atau pekerjaan, atau memberikan informasi yang salah.

4. Perlindungan Lingkungan:
Sangat Baik (3): Menjelaskan dengan jelas bagaimana rencana Anda melindungi hutan dan laut; memberikan cara spesifik untuk menghindari risiko.
Baik (2): Menyebutkan dampak lingkungan tetapi hanya sedikit detail tentang perlindungan.
Dasar (1): Sedikit atau tidak ada penyebutan tentang lingkungan, atau mengabaikan risiko terhadap alam.

5. Kualitas Penulisan:
Sangat Baik (3): Tulisannya jelas, bebas dari kesalahan tata bahasa atau ejaan. Gagasan mengalir secara logis.
Baik (2): Beberapa kesalahan tata bahasa atau ejaan membuat gagasan kurang jelas. Maknanya terkadang tidak jelas.
Dasar (1): Sering terjadi kesalahan tata bahasa atau ejaan; gagasan sulit dipahami atau tidak koheren.

[[Kondisi Akhir Tugas]]

[[Mulailah tugas Anda]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Untuk umpan balik ini, harap ikuti kerangka kerja umpan balik yang efektif. Kerangka kerja ini berpusat pada peserta didik dan harus mencakup tiga komponen utama:

1. Berdasarkan kondisi pembelajaran yang tercantum di atas, gunakan kekuatan dan kelemahan kinerja peserta didik untuk menginformasikan instruksi.
2. Fokus pada dampak selanjutnya dengan memberikan komentar disertai informasi yang dapat ditindaklanjuti untuk membantu peserta didik mencapai hasil pembelajaran dari tugas tersebut. Hal ini harus berasal dari saran yang tercantum di atas.
3. Dukung peserta didik untuk merasa memegang kendali atas pembelajaran mereka, perhatikan kebutuhan sosial, emosional, dan motivasi mereka, dan dorong mereka untuk terbuka terhadap komentar evaluatif.

Perhatikan batasan berikut:

Mohon sebisa mungkin untuk HINDARI memberikan instruksi detail apa pun tentang apa yang perlu dicantumkan dalam esai!

Pastikan Anda hanya menampilkan teks umpan balik!

Terakhir, umpan balik TIDAK BOLEH melebihi 100 kata!

[[Akhir Tugas Anda]]`,
        "gpt-scaffold-prompt-template-groupC": `"[[Kondisi Awal Tugas]]

Seorang siswa sedang mengerjakan tugas menulis esai.

Berikut instruksi tugasnya:

Topik tugas: Strategi Energi Terbarukan untuk Komunitas Pesisir Utara

Anda telah direkrut sebagai pakar energi untuk memberi nasihat kepada komunitas pesisir utara yang terletak di dekat pegunungan dan menghadapi musim dingin yang keras dan bersalju. Komunitas ini saat ini sangat bergantung pada bahan bakar fosil impor, yang mahal, merusak lingkungan, dan tidak dapat diandalkan selama badai musim dingin yang parah. Kota ini mencari solusi yang menjamin pasokan energi yang stabil sepanjang tahun, mengurangi biaya seiring waktu, dan idealnya menciptakan lapangan kerja lokal. Daerah ini mengalami angin laut yang stabil di lepas pantai dan terletak di dekat sumber daya hutan penting yang dikelola secara berkelanjutan. Namun, pelestarian keanekaragaman hayati laut dan ekosistem hutan setempat merupakan prioritas komunitas.

Tugas Anda:

Tulis proposal singkat yang merekomendasikan strategi energi terbarukan yang seimbang yang menggabungkan dua jenis energi terbarukan. Jelaskan secara jelas rekomendasi Anda dengan membahas:

Bagaimana setiap sumber energi terbarukan sesuai dengan geografi lokal, tantangan iklim, dan permintaan energi.
Kelayakan finansial dan manfaat ekonomi yang diharapkan, termasuk lapangan kerja penciptaan.
Potensi dampak lingkungan dan bagaimana strategi Anda memitigasi risiko terhadap hutan dan kehidupan laut.

Tugas ini dibatasi waktu selama 45 menit.

Berikut adalah rubrik yang diberikan kepada siswa:

Rubrik ini digunakan untuk mengevaluasi esai Anda.

Esai ini terdiri dari 200 hingga 300 kata.
Anda TIDAK boleh menyalin langsung dari bacaan atau sumber lain - esai harus ditulis dengan kata-kata Anda sendiri.

Matriks di bawah ini adalah rubrik penilaian lengkap:

1. Tunjukkan sumber energi yang dipilih:
Sangat Baik (3): Menggabungkan dua jenis energi dengan jelas dan memberikan alasan untuk keduanya.
Baik (2): Menyebutkan dua jenis energi tetapi sedikit penjelasan.
Dasar (1): Hanya satu jenis energi, atau solusinya tidak jelas; sedikit atau tanpa penjelasan.

2. Penggunaan Detail Geografis & Iklim:
Sangat Baik (3): Menjelaskan dengan jelas bagaimana kedua jenis energi tersebut sesuai dengan geografi dan iklim setempat.
Baik (2): Memberikan beberapa detail tentang geografi/iklim setempat, tetapi tidak terkait dengan pilihan energi.
Dasar (1): Sedikit atau tidak ada penggunaan detail lokal; pilihan energi tidak sesuai dengan skenario.

3. Manfaat Ekonomi dan Pekerjaan:
Sangat Baik (3): Penjelasan yang kuat tentang bagaimana rencana tersebut menghemat uang dan menciptakan pekerjaan.
Baik (2): Menyebutkan uang atau pekerjaan tetapi hanya memberikan sedikit detail.
Dasar (1): Tidak menyebutkan uang atau pekerjaan, atau memberikan informasi yang salah.

4. Perlindungan Lingkungan:
Sangat Baik (3): Menjelaskan dengan jelas bagaimana rencana Anda melindungi hutan dan laut; memberikan cara spesifik untuk menghindari risiko.
Baik (2): Menyebutkan dampak lingkungan tetapi hanya sedikit detail tentang perlindungan.
Dasar (1): Sedikit atau tidak ada penyebutan tentang lingkungan, atau mengabaikan risiko terhadap alam.

5. Kualitas Penulisan:
Sangat Baik (3): Tulisannya jelas, bebas dari kesalahan tata bahasa atau ejaan. Gagasan mengalir secara logis.
Baik (2): Beberapa kesalahan tata bahasa atau ejaan membuat gagasan kurang jelas. Maknanya terkadang tidak jelas.
Dasar (1): Sering terjadi kesalahan tata bahasa atau ejaan; gagasan sulit dipahami atau tidak koheren.

[[Kondisi Akhir Tugas]]

[[Mulailah tugas Anda]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Untuk umpan balik ini, harap ikuti kerangka kerja umpan balik yang efektif. Kerangka kerja ini berpusat pada peserta didik dan harus mencakup tiga komponen utama:

1. Berdasarkan kondisi pembelajaran yang tercantum di atas, gunakan kekuatan dan kelemahan kinerja peserta didik untuk menginformasikan instruksi.
2. Fokus pada dampak selanjutnya dengan memberikan komentar disertai informasi yang dapat ditindaklanjuti untuk membantu peserta didik mencapai hasil pembelajaran dari tugas tersebut. Hal ini harus berasal dari saran yang tercantum di atas.
3. Dukung peserta didik untuk merasa memegang kendali atas pembelajaran mereka, perhatikan kebutuhan sosial, emosional, dan motivasi mereka, dan dorong mereka untuk terbuka terhadap komentar evaluatif.

Perhatikan batasan berikut:

Mohon sebisa mungkin untuk HINDARI memberikan instruksi detail apa pun tentang apa yang perlu dicantumkan dalam esai!

Pastikan Anda hanya menampilkan teks umpan balik!

Terakhir, umpan balik TIDAK BOLEH melebihi 100 kata!

[[Akhir Tugas Anda]]`,
        "annotation-notes-title": "Panel Catatan",
        "annotation-notes-delete-confirm-message": "Apakah Anda ingin menghapus?",
        "annotation-write-note-placeholder": "Tulis catatan di sini…",
        "annotation-tag-placeholder": "Masukkan tag baru lalu tekan Enter…",
        "annotation-note-save-btn-text": "Simpan",
        "annotation-note-cancel-btn-text": "Batal",
        "annotation-search-btn-text": "Cari",
        "annotation-search-panel-input-placeholder": "Masukkan kata kunci…",
        "scaffolding-title": "Panel Instruksi",
        "scaffolding-create-checklist-btn-text": "Buat Daftar Periksa",
        "scaffolding-edit-checklist-btn-text": "Edit",
        "scaffolding-unread-message-text": "Pesan belum dibaca",
        "scaffolding-chat-open-text": "Chat dibuka",
        "gpt-scaffolding-title": "Panel Instruksi",
        "planner-title": "Alat Perencana",
        "planner-learning-strategy-select-label-text": "1. Pilih strategi belajar Anda:",
        "planner-learning-strategy-select-option1-text": "Pilih strategi",
        "planner-learning-strategy-select-customise-option-text": "Gunakan strategi sendiri",
        "planner-add-more-customise-strategy-btn-text": "Tambah Strategi",
        "planner-customise-option-hint-textarea-placeholder": "Jelaskan mengapa Anda merancang seperti ini",
        "planner-next-btn-text": "Berikutnya",
        "planner-time-unit-minute": "menit",
        "planner-display-plan-title": "Rencana Belajar Saya",
        "planner-display-overall-strategy-label": "Strategi keseluruhan:",
        "planner-display-time-allocation-label": "Alokasi waktu:",
        "planner-display-writing-strategy-label": "Strategi menulis:",
        "planner-display-reading-strategy-label": "Strategi membaca:",
        "planner-customise-plan-reason-placeholder": "(Opsional)",
        "essay-title": "Alat Penulisan Esai",
        "essay-save-btn-text": "Simpan Esai",
        "essay-writing-placeholder": "Tulis esai di sini…",
        "essay-show-word-count-btn-text": "Jumlah Kata",
        "essay-save-toast-text": "Esai Anda berhasil disimpan!",
        "dictionary-title": "Kamus",
        "dictionary-send-btn-text": "Kirim",
        "dictionary-panel-input-placeholder": "Masukkan kata…",
        "checklist-title": "Alat Daftar Periksa",
        "checklist-basic-panel-title": "Dasar",
        "checklist-academic-panel-title": "Akademik",
        "checklist-originality-panel-title": "Orisinalitas",
        "checklist-integration-panel-title": "Integrasi & Elaborasi",
        "checklist-analyse-btn-text": "Analisis",
        "chatgpt-title": "Asisten AI",
        "chatgpt-send-btn-text": "Kirim",
        "chatgpt-panel-input-placeholder": "Ajukan pertanyaan…",
        "chatteacher-title": "Tanya Guru",
        "chatteacher-panel-input-placeholder": "Ajukan pertanyaan…",
        "chatteacher-connect-server-status-text": "Status koneksi server",
        "chatteacher-teacher-online-status-text": "Guru online",
        "chatteacher-send-btn-text": "Kirim",
        "chatgpt-role-description": "Anda adalah asisten yang membantu. Jawab berdasarkan teks yang diberikan.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Hingga titik ini dalam sesi pembelajaran, siswa yang berhasil menyelesaikan tugas ini memastikan mereka mengetahui batas waktu tugas melalui penggunaan alat pengatur waktu yang disediakan. Hal ini tampaknya tidak terjadi pada siswa ini. Mohon berikan umpan balik dalam bentuk paragraf (jangan gunakan poin-poin dan daftar bernomor) kepada siswa tentang cara meningkatkan pemantauan mereka terhadap batasan waktu melalui penggunaan alat pengatur waktu yang disediakan, yang tombol waktu pada bilah alatnya memiliki simbol jam. Sementara itu, mohon pertimbangkan secara komprehensif semua kondisi pembelajaran siswa ini berikut ini:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Hingga titik ini dalam sesi pembelajaran, siswa yang berhasil dalam tugas ini memastikan mereka merujuk kembali ke persyaratan tugas dan informasi rubrik untuk mengevaluasi draf esai mereka dan memantau apakah tulisan mereka selaras dengan persyaratan tugas dan rubrik. Hal ini tampaknya tidak terjadi pada siswa ini. Mohon berikan umpan balik dalam bentuk paragraf (jangan gunakan poin-poin dan daftar bernomor) kepada siswa tentang penggunaan informasi dari instruksi tugas dan rubrik untuk mengevaluasi draf esai mereka dan memantau apakah draf tulisan mereka selaras dengan persyaratan tugas dan rubrik, sambil berusaha semaksimal mungkin untuk MENGHINDARI memberikan instruksi terperinci tentang apa yang perlu dimasukkan dalam esai. Sementara itu, mohon pertimbangkan secara komprehensif semua kondisi pembelajaran siswa ini berikut ini:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "Pada menit ke-14, siswa lain telah rutin memeriksa instruksi dan rubrik; Anda belum. Berikan saran paragraf untuk terus memeriksa hingga sesi selesai.",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Hingga titik ini dalam sesi pembelajaran, siswa yang berhasil dalam tugas ini memastikan bahwa mereka memahami dengan jelas persyaratan tugas dan rubrik. Hal ini tampaknya tidak terjadi pada siswa ini. Mohon berikan umpan balik dalam bentuk paragraf (jangan gunakan poin-poin dan daftar bernomor) kepada siswa tentang cara meningkatkan pemahaman mereka terhadap instruksi tugas dan rubrik, dengan mendukung kesadaran diri siswa untuk menyelaraskan penulisan esai dengan persyaratan tugas dan rubrik, sambil sebisa mungkin MENGHINDARI memberikan instruksi terperinci tentang apa yang perlu dimasukkan dalam esai. Sementara itu, mohon pertimbangkan secara komprehensif semua kondisi pembelajaran siswa ini berikut ini:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Hingga titik ini dalam sesi pembelajaran, siswa yang berhasil menyelesaikan tugas ini memastikan bahwa mereka menyadari batas waktu atau tugas tersebut melalui penggunaan alat pengatur waktu yang disediakan, dan pada saat yang sama memahami dengan jelas persyaratan tugas dan rubrik. Hal ini tampaknya tidak terjadi pada siswa ini. Mohon berikan umpan balik dalam bentuk paragraf (jangan gunakan poin-poin dan daftar bernomor) yang menggabungkan saran untuk semua area ini, tentang cara meningkatkan pemantauan mereka terhadap batasan waktu melalui penggunaan alat pengatur waktu yang disediakan, di mana tombol waktu pada bilah alat memiliki simbol jam, dan tentang cara meningkatkan pemahaman mereka tentang instruksi tugas dan rubrik, dengan mendukung kesadaran diri siswa untuk menyelaraskan penulisan esai dengan persyaratan tugas dan rubrik, sambil berusaha semaksimal mungkin untuk MENGHINDARI memberikan instruksi terperinci tentang apa yang perlu dimasukkan dalam esai. Sementara itu, mohon pertimbangkan secara komprehensif semua kondisi pembelajaran siswa berikut ini:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "Pada menit ke-21, siswa lain sudah memasukkan informasi dari bacaan ke esai. Berikan saran cara melakukannya sesuai tugas.",
        "gpt-scaffold-need-check-srl-prompt-OT2": `Hingga titik ini dalam sesi pembelajaran, siswa yang berhasil dalam tugas ini memastikan mereka menjelaskan gagasan dengan kata-kata mereka sendiri berdasarkan bahan bacaan. Hal ini tampaknya tidak terjadi pada siswa ini. Bisakah Anda memberikan umpan balik dalam bentuk paragraf (jangan gunakan poin-poin dan daftar bernomor) kepada siswa tentang pentingnya menjelaskan gagasan dengan kata-kata mereka sendiri sambil menunjukkan pemahaman mereka terhadap bahan bacaan? Perlu diketahui bahwa Anda tidak dapat memberikan instruksi terperinci tentang bagaimana siswa dapat menulis esai. Sementara itu, mohon pertimbangkan secara komprehensif semua kondisi pembelajaran siswa berikut ini:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Siswa ini telah berpartisipasi dalam studi sebelumnya sehingga ia memiliki tingkat pengetahuan tugas tertentu.",
        "gpt-scaffold-isdimu-prompt-0": "Siswa ini memiliki kesadaran metakognitif yang baik.",
        "gpt-scaffold-isdimu-prompt-16": "Siswa ini memiliki kesadaran metakognitif rendah.",
        "gpt-scaffold-isdimu-prompt-32": "Siswa ini memiliki sedikit kesadaran metakognitif.",
        "gpt-scaffold-pretest-grades-prompt-0": "Siswa ini memiliki tingkat pengetahuan yang tinggi tentang energi terbarukan.",
        "gpt-scaffold-pretest-grades-prompt-5": "Siswa ini memiliki tingkat pengetahuan yang rendah tentang energi terbarukan.",
        "gpt-scaffold-pretest-grades-prompt-10": "Siswa ini memiliki tingkat pengetahuan sedang tentang energi terbarukan.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Siswa ini memahami cara terbaik untuk belajar dan dapat memilih strategi yang baik untuk belajar.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Siswa ini tidak memahami dengan jelas apa yang membantu mereka belajar atau strategi mana yang paling efektif bagi mereka.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Siswa ini memiliki pemahaman tentang cara belajar yang efektif dan dapat menyebutkan beberapa strategi yang membantu.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Siswa ini merencanakan, memantau, dan menyesuaikan pembelajaran mereka untuk mendapatkan hasil yang lebih baik.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Siswa ini tidak merencanakan ke depan atau memantau pembelajaran mereka saat mengerjakan tugas.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Siswa ini memperhatikan perencanaan dan memeriksa pembelajaran mereka selama mengerjakan tugas.",
        "gpt-scaffold-test-mai-name": "Kegiatan 3: Kuesioner Kesadaran Metakognitif",
        "gpt-scaffold-test-isdimu-name": "Kegiatan 3: ISDIMU",
        "gpt-scaffold-pretest-name": "Kegiatan 2: Pengetahuan domain energi terbarukan",
        "gpt-scaffold-check-take-previous-study-name": "Kegiatan 1: Tentang diri Anda",
        "gpt-scaffold-planner-select-prompt-1": "Siswa ini membuat rencana untuk [membaca dulu baru menulis] untuk tugas ini.",
        "gpt-scaffold-planner-select-prompt-2": "Siswa ini membuat rencana untuk [membaca dan menulis secara bersamaan] untuk tugas ini.",
        "gpt-scaffold-planner-select-prompt-3": "Siswa ini membuat rencana untuk [menulis secara intensif dan membaca secara selektif] untuk tugas ini.",
        "gpt-scaffold-planner-select-prompt-4": "Siswa ini berencana untuk [merancang rencana sendiri].",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Siswa ini belum membuat rencana yang jelas tentang bagaimana mereka akan mengerjakan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Siswa ini telah membuat rencana yang jelas tentang bagaimana mereka akan mengerjakan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Siswa ini tidak mengetahui waktu yang tersisa untuk menyelesaikan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Siswa ini mengetahui waktu yang tersisa untuk menyelesaikan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Siswa ini tidak mengetahui alat bantu yang tersedia di lingkungan sekitar yang dapat membantu mereka menyelesaikan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Siswa ini mengetahui alat bantu yang tersedia di lingkungan sekitar yang dapat membantu mereka menyelesaikan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Siswa ini tidak mengetahui bahan bacaan yang tersedia di lingkungan sekitar yang dapat membantu mereka mengerjakan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Siswa ini mengetahui bahan bacaan yang tersedia di lingkungan sekitar yang dapat membantu mereka mengerjakan tugas tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Siswa ini tidak mengetahui rubrik",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Siswa ini mengetahui rubrik. ",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Siswa ini tidak mengetahui instruksi tugas.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Siswa ini mengetahui instruksi tugas.",
        "gpt-scaffold-role-description": "Anda adalah asisten yang membantu, berikan saran berdasarkan teks.",
        "planner-customise-step2-instruction": "Jelaskan secara detail strategi dan alokasi waktu yang Anda rencanakan serta alasannya.",
        "planner-reading-strategy-1": "Baca materi halaman demi halaman",
        "planner-reading-strategy-2": "Penjelajahan cepat lalu baca detail",
        "planner-reading-strategy-3": "Gunakan alat sorotan untuk menandai konten utama",
        "planner-reading-strategy-4": "Tuliskan pemahaman saya di catatan saat membaca",
        "planner-reading-strategy-5": "Bacaan dengan panduan pertanyaan dan fokus pada konten tertentu",
        "planner-reading-strategy-6": "Baca secara selektif dan lewati konten yang tidak relevan",
        "planner-reading-strategy-instruction": "Keterampilan membaca apa yang akan Anda gunakan (pilihan ganda)?",
        "planner-writing-strategy-1": "Pertama, buat draf struktur esai, lalu isi dengan detail.",
        "planner-writing-strategy-2": "Gunakan catatan dan penanda saya saat menulis esai.",
        "planner-writing-strategy-3": "Tinjau instruksi dan rubrik agar tulisan Anda selaras.",
        "planner-writing-strategy-4": "Salin dan tempel kalimat kunci, lalu tulis ulang dengan lancar.",
        "planner-writing-strategy-5": "Gunakan kerangka dan pola penulisan yang telah saya pelajari untuk menulis.",
        "planner-writing-strategy-instruction": "Keterampilan menulis apa yang akan Anda gunakan (pilihan ganda)?",
        "planner-main-strategy-1": "Baca dulu baru tulis",
        "planner-main-strategy-1-instruction": "Berapa banyak waktu yang Anda rencanakan untuk membaca dan menulis?",
        "planner-main-strategy-1-task-1": "2.1 Waktu akan dihabiskan untuk membaca",
        "planner-main-strategy-1-task-2": "2.2 Waktu akan dihabiskan untuk menulis",
        "planner-main-strategy-2": "Membaca dan menulis secara bersamaan",
        "planner-main-strategy-2-instruction": "Berapa banyak waktu yang Anda rencanakan untuk setiap topik?",
        "planner-main-strategy-2-task-1": "2.1 Membaca/menulis tentang pemilihan energi",
        "planner-main-strategy-2-task-2": "2.2 Membaca/menulis tentang biaya dan manfaat",
        "planner-main-strategy-2-task-3": "2.3 Membaca/menulis tentang dampak lingkungan",
        "planner-main-strategy-3": "Menulis secara intensif, membaca secara selektif",
        "planner-main-strategy-3-instruction": "Berapa banyak waktu yang Anda rencanakan untuk dihabiskan pada berbagai tahap penulisan?",
        "planner-main-strategy-3-task-1": "2.1 Rencanakan struktur esai:",
        "planner-main-strategy-3-task-2": "2.2 Tulis draf pertama:",
        "planner-main-strategy-3-task-3": "2.3 Baca informasi tambahan yang relevan dengan esai:",
        "planner-main-strategy-3-task-4": "2.4 Tinjau dan perbaiki esai:",
        "planner-customise-plan-title": "Rencana Kustom",
        "planner-select-main-strategy-hint": "Pilih satu strategi untuk melanjutkan!",
        "planner-allocate-time-hint": "Alokasikan waktu untuk semua tugas dan total harus sesuai batas!",
        "planner-select-reading-writing-strategy-hint": "Pilih keterampilan yang akan digunakan!",
        "planner-save-plan-hint": "Isi nama strategi dan waktu dengan benar!",
        "rule-based-scaffold-title-1": "Penting untuk memahami tugas.",
        "rule-based-scaffold-title-1-task-1": "(a) Gunakan menu untuk gambaran dan pindai teks",
        "rule-based-scaffold-title-1-task-2": "(b) Periksa rubrik esai",
        "rule-based-scaffold-title-1-task-3": "(c) Periksa tujuan belajar dan instruksi",
        "rule-based-scaffold-title-2": "Penting untuk membaca informasi tentang topik.",
        "rule-based-scaffold-title-2-task-1": "(a) Catat informasi penting",
        "rule-based-scaffold-title-2-task-2": "(b) Pilih apa yang akan dibaca",
        "rule-based-scaffold-title-2-task-3": "(c) Periksa waktu tersisa",
        "rule-based-scaffold-title-3": "Penting untuk meninjau informasi relevan.",
        "rule-based-scaffold-title-3-task-1": "(a) Tinjau anotasi",
        "rule-based-scaffold-title-3-task-2": "(b) Tinjau tujuan dan instruksi",
        "rule-based-scaffold-title-3-task-3": "(c) Periksa esai untuk menentukan bacaan selanjutnya",
        "rule-based-scaffold-title-4": "Penting untuk menulis esai yang baik.",
        "rule-based-scaffold-title-4-task-1": "(a) Periksa waktu tersisa",
        "rule-based-scaffold-title-4-task-2": "(b) Periksa rubrik esai",
        "rule-based-scaffold-title-4-task-3": "(c) Rancang draf esai dengan poin utama",
        "rule-based-scaffold-title-5": "Penting untuk meninjau tulisan Anda.",
        "rule-based-scaffold-title-5-task-1": "(a) Periksa rubrik esai",
        "rule-based-scaffold-title-5-task-2": "(b) Sunting esai Anda",
        "rule-based-scaffold-title-5-task-3": "(c) Periksa tujuan dan instruksi",
        "annotation-label-1": "Catat",
        "annotation-label-2": "Penting",
        "annotation-label-3": "Berguna",
        "annotation-label-4": "Konsep",
        "annotation-label-5": "Membingungkan",
        "product-visual-title": "Visualisasi Produk",
        "product-visual-close-btn": "Tutup",
        "process-visual-title": "Visualisasi Proses",
        "process-visual-set-goal-label": "Tujuan Anda",
        "process-visual-close-btn": "Tutup",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Panel Anotasi",
        "annotation-search-toolbar-btn-hint": "Cari Catatan",
        "gpt-scaffold-toolbar-btn-hint": "Alat Instruksi",
        "essay-writing-toolbar-btn-hint": "Alat Menulis",
        "planner-toolbar-btn-hint": "Alat Perencana",
        "multi-agents-single-window-toolbar-btn-hint": "Asisten Chat",
        "timer-toolbar-btn-hint": "Timer",
        "like-response-text": "Apakah Anda menyukai respons ini?",
        "annotation-tool-data-label": "Alat Catatan",
        "search-annotation-tool-data-label": "Cari Catatan",
        "gpt-scaffold-tool-data-label": "Alat Instruksi",
        "process-visual-tool-data-label": "Alat Proses",
        "essay-product-visual-tool-data-label": "Alat Produk Esai",
        "collaborate-writing-tool-data-label": "Penulisan Kolaboratif",
        "essay-writing-tool-data-label": "Alat Menulis",
        "math-tool-data-label": "Alat Matematika",
        "planner-tool-data-label": "Alat Perencana",
        "checklist-tool-data-label": "Alat Analitik Tulisan",
        "multi-agents-single-window-tool-data-label": "Alat Chatbot",
        "dictionary-tool-data-label": "Kamus",
        "timer-tool-data-label": "Timer",
        "questionnaire-tool-data-label": "Kuesioner",
        "chat-reminder-message": `
Chatbot ini sekarang tersedia untuk Anda. Anda tidak dapat menggunakan chatbot untuk menulis esai Anda.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Masukkan teks untuk memulai obrolan",
        "chat-reminder-message-title": "Pesan Pengingat",
        "scaffolding-message-title": "Umpan balik tentang perkembangan Anda saat ini:",
        "scaffold-chat-reminder": "Hai, kamu sudah cukup lama asyik mengobrol. Ayo kembali ke tugas utama!",
    },
    msa: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Permulaan Syarat Tugasan]]

Seorang pelajar sedang menjalankan tugasan penulisan esei.

Berikut ialah arahan tugasan:

Tajuk Tugasan: Strategi Tenaga Boleh Diperbaharui untuk Komuniti Pantai Utara

Anda telah dilantik sebagai pakar tenaga untuk menasihati sebuah komuniti pantai di utara yang terletak berhampiran kawasan pergunungan dan menghadapi musim sejuk yang teruk serta bersalji. Komuniti ini kini sangat bergantung kepada bahan api fosil yang diimport yang mahal, memberi kesan buruk kepada alam sekitar, dan tidak boleh diharap ketika ribut musim sejuk yang teruk.

Bandar ini sedang mencari penyelesaian yang dapat menjamin bekalan tenaga yang stabil sepanjang tahun, mengurangkan kos dalam jangka masa panjang, dan sebaiknya mewujudkan peluang pekerjaan tempatan. Kawasan ini mengalami angin laut yang stabil di luar pesisir dan terletak berhampiran sumber hutan yang diurus secara lestari. Walau bagaimanapun, pemeliharaan biodiversiti marin dan ekosistem hutan tempatan merupakan keutamaan komuniti tersebut.

Tugasan Anda:

Tulis satu cadangan ringkas yang mengesyorkan strategi tenaga boleh diperbaharui yang seimbang dengan menggabungkan dua jenis tenaga boleh diperbaharui.
Jelaskan dengan jelas cadangan anda dengan membincangkan:

Bagaimana setiap sumber tenaga boleh diperbaharui sesuai dengan geografi tempatan, cabaran iklim, dan keperluan tenaga.

Kebolehlaksanaan kewangan serta manfaat ekonomi yang dijangka, termasuk peluang pekerjaan.

Kesan alam sekitar yang berpotensi dan bagaimana strategi anda mengurangkan risiko terhadap hutan dan hidupan marin.

Tempoh masa untuk tugasan ini ialah 45 minit.

Berikut ialah rubrik yang diberikan kepada pelajar:

Rubrik ini digunakan untuk menilai esei anda.

Esei hendaklah mengandungi 200 hingga 300 patah perkataan.
Anda TIDAK dibenarkan menyalin secara langsung daripada bahan bacaan atau sumber lain - esei mestilah ditulis dalam ayat anda sendiri.

Jadual berikut ialah rubrik penilaian lengkap:

1. Menyatakan sumber tenaga yang dipilih:

Cemerlang (3): Menggabungkan dua jenis tenaga dengan jelas dan memberikan sebab bagi kedua-duanya.

Baik (2): Menyebut dua jenis tenaga tetapi dengan penjelasan yang terhad.

Asas (1): Hanya menyatakan satu jenis tenaga, atau penyelesaian tidak jelas; penjelasan sedikit atau tiada.

2. Penggunaan Butiran Geografi dan Iklim:

Cemerlang (3): Menjelaskan dengan jelas bagaimana kedua-dua jenis tenaga sesuai dengan geografi dan iklim tempatan.

Baik (2): Memberi beberapa butiran tentang geografi/iklim tempatan tetapi tidak dikaitkan dengan pilihan tenaga.

Asas (1): Sedikit atau tiada penggunaan butiran tempatan; pilihan tenaga tidak sesuai dengan senario.

3. Manfaat Ekonomi dan Pekerjaan:

Cemerlang (3): Memberi penjelasan kukuh tentang bagaimana rancangan menjimatkan kos dan mewujudkan pekerjaan tempatan.

Baik (2): Menyebut tentang wang atau pekerjaan tetapi dengan penjelasan yang terhad.

Asas (1): Tidak menyebut tentang wang atau pekerjaan, atau memberikan maklumat yang salah.

4. Perlindungan Alam Sekitar:

Cemerlang (3): Menjelaskan dengan jelas bagaimana rancangan anda melindungi hutan dan kawasan marin; memberikan cara khusus untuk mengelak risiko.

Baik (2): Menyebut kesan alam sekitar tetapi dengan sedikit butiran tentang perlindungan.

Asas (1): Sedikit atau tiada sebutan tentang alam sekitar, atau mengabaikan risiko terhadap alam semula jadi.

5. Kualiti Penulisan:

Cemerlang (3): Penulisan jelas, bebas daripada kesalahan tatabahasa atau ejaan. Idea disusun secara logik.

Baik (2): Beberapa kesalahan tatabahasa atau ejaan yang menjadikan idea kurang jelas. Maksud kadangkala sukar difahami.

Asas (1): Banyak kesalahan tatabahasa atau ejaan; idea sukar diikuti atau tidak tersusun.

[[Tamat Syarat Tugasan]]

[[Mulakan tugasan anda]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Untuk maklum balas ini, sila ikut kerangka maklum balas berkesan. Ia berpusatkan pelajar dan harus merangkumi tiga komponen utama:

Berdasarkan keadaan pembelajaran yang disenaraikan di atas, gunakan kekuatan dan kelemahan prestasi pelajar untuk memaklumkan pendekatan pengajaran.

Fokus pada kesan seterusnya dengan memberikan ulasan yang mengandungi maklumat yang boleh diambil tindakan bagi membantu pelajar mencapai hasil pembelajaran untuk tugasan tersebut. Bahagian ini perlu berpandukan kepada nasihat yang telah disenaraikan di atas.

Sokong pelajar untuk berasa yakin dalam mengawal pembelajaran mereka, beri perhatian kepada keperluan sosial, emosi dan motivasi mereka, serta galakkan mereka untuk bersikap terbuka terhadap komen penilaian.

Ambil perhatian terhadap sekatan berikut:

Sila cuba sedaya upaya untuk MENGELAK daripada memberikan ARAHAN terperinci tentang apa yang perlu dimasukkan dalam esei!

Sila pastikan bahawa anda hanya mengeluarkan teks maklum balas sahaja!

Akhir sekali, maklum balas MESTILAH tidak melebihi 100 patah perkataan!

[[Tamat Tugasan Anda]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Permulaan Syarat Tugasan]]

Seorang pelajar sedang menjalankan tugasan penulisan esei.

Berikut ialah arahan tugasan:

Tajuk Tugasan: Strategi Tenaga Boleh Diperbaharui untuk Komuniti Pantai Utara

Anda telah dilantik sebagai pakar tenaga untuk menasihati sebuah komuniti pantai di utara yang terletak berhampiran kawasan pergunungan dan menghadapi musim sejuk yang teruk serta bersalji. Komuniti ini kini sangat bergantung kepada bahan api fosil yang diimport yang mahal, memberi kesan buruk kepada alam sekitar, dan tidak boleh diharap ketika ribut musim sejuk yang teruk.

Bandar ini sedang mencari penyelesaian yang dapat menjamin bekalan tenaga yang stabil sepanjang tahun, mengurangkan kos dalam jangka masa panjang, dan sebaiknya mewujudkan peluang pekerjaan tempatan. Kawasan ini mengalami angin laut yang stabil di luar pesisir dan terletak berhampiran sumber hutan yang diurus secara lestari. Walau bagaimanapun, pemeliharaan biodiversiti marin dan ekosistem hutan tempatan merupakan keutamaan komuniti tersebut.

Tugasan Anda:

Tulis satu cadangan ringkas yang mengesyorkan strategi tenaga boleh diperbaharui yang seimbang dengan menggabungkan dua jenis tenaga boleh diperbaharui.
Jelaskan dengan jelas cadangan anda dengan membincangkan:

Bagaimana setiap sumber tenaga boleh diperbaharui sesuai dengan geografi tempatan, cabaran iklim, dan keperluan tenaga.

Kebolehlaksanaan kewangan serta manfaat ekonomi yang dijangka, termasuk peluang pekerjaan.

Kesan alam sekitar yang berpotensi dan bagaimana strategi anda mengurangkan risiko terhadap hutan dan hidupan marin.

Tempoh masa untuk tugasan ini ialah 45 minit.

Berikut ialah rubrik yang diberikan kepada pelajar:

Rubrik ini digunakan untuk menilai esei anda.

Esei hendaklah mengandungi 200 hingga 300 patah perkataan.
Anda TIDAK dibenarkan menyalin secara langsung daripada bahan bacaan atau sumber lain - esei mestilah ditulis dalam ayat anda sendiri.

Jadual berikut ialah rubrik penilaian lengkap:

1. Menyatakan sumber tenaga yang dipilih:

Cemerlang (3): Menggabungkan dua jenis tenaga dengan jelas dan memberikan sebab bagi kedua-duanya.

Baik (2): Menyebut dua jenis tenaga tetapi dengan penjelasan yang terhad.

Asas (1): Hanya menyatakan satu jenis tenaga, atau penyelesaian tidak jelas; penjelasan sedikit atau tiada.

2. Penggunaan Butiran Geografi dan Iklim:

Cemerlang (3): Menjelaskan dengan jelas bagaimana kedua-dua jenis tenaga sesuai dengan geografi dan iklim tempatan.

Baik (2): Memberi beberapa butiran tentang geografi/iklim tempatan tetapi tidak dikaitkan dengan pilihan tenaga.

Asas (1): Sedikit atau tiada penggunaan butiran tempatan; pilihan tenaga tidak sesuai dengan senario.

3. Manfaat Ekonomi dan Pekerjaan:

Cemerlang (3): Memberi penjelasan kukuh tentang bagaimana rancangan menjimatkan kos dan mewujudkan pekerjaan tempatan.

Baik (2): Menyebut tentang wang atau pekerjaan tetapi dengan penjelasan yang terhad.

Asas (1): Tidak menyebut tentang wang atau pekerjaan, atau memberikan maklumat yang salah.

4. Perlindungan Alam Sekitar:

Cemerlang (3): Menjelaskan dengan jelas bagaimana rancangan anda melindungi hutan dan kawasan marin; memberikan cara khusus untuk mengelak risiko.

Baik (2): Menyebut kesan alam sekitar tetapi dengan sedikit butiran tentang perlindungan.

Asas (1): Sedikit atau tiada sebutan tentang alam sekitar, atau mengabaikan risiko terhadap alam semula jadi.

5. Kualiti Penulisan:

Cemerlang (3): Penulisan jelas, bebas daripada kesalahan tatabahasa atau ejaan. Idea disusun secara logik.

Baik (2): Beberapa kesalahan tatabahasa atau ejaan yang menjadikan idea kurang jelas. Maksud kadangkala sukar difahami.

Asas (1): Banyak kesalahan tatabahasa atau ejaan; idea sukar diikuti atau tidak tersusun.

[[Tamat Syarat Tugasan]]

[[Mulakan tugasan anda]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Untuk maklum balas ini, sila ikut kerangka maklum balas berkesan. Ia berpusatkan pelajar dan harus merangkumi tiga komponen utama:

Berdasarkan keadaan pembelajaran yang disenaraikan di atas, gunakan kekuatan dan kelemahan prestasi pelajar untuk memaklumkan pendekatan pengajaran.

Fokus pada kesan seterusnya dengan memberikan ulasan yang mengandungi maklumat yang boleh diambil tindakan bagi membantu pelajar mencapai hasil pembelajaran untuk tugasan tersebut. Bahagian ini perlu berpandukan kepada nasihat yang telah disenaraikan di atas.

Sokong pelajar untuk berasa yakin dalam mengawal pembelajaran mereka, beri perhatian kepada keperluan sosial, emosi dan motivasi mereka, serta galakkan mereka untuk bersikap terbuka terhadap komen penilaian.

Ambil perhatian terhadap sekatan berikut:

Sila cuba sedaya upaya untuk MENGELAK daripada memberikan ARAHAN terperinci tentang apa yang perlu dimasukkan dalam esei!

Sila pastikan bahawa anda hanya mengeluarkan teks maklum balas sahaja!

Akhir sekali, maklum balas MESTILAH tidak melebihi 100 patah perkataan!

[[Tamat Tugasan Anda]]`,
        "annotation-notes-title": "Panel Nota",
        "annotation-notes-delete-confirm-message": "Adakah anda mahu padam?",
        "annotation-write-note-placeholder": "Tulis nota di sini…",
        "annotation-tag-placeholder": "Masukkan tag baharu dan tekan Enter…",
        "annotation-note-save-btn-text": "Simpan",
        "annotation-note-cancel-btn-text": "Batal",
        "annotation-search-btn-text": "Cari",
        "annotation-search-panel-input-placeholder": "Masukkan kata kunci…",
        "scaffolding-title": "Panel Arahan",
        "scaffolding-create-checklist-btn-text": "Cipta Senarai Semak",
        "scaffolding-edit-checklist-btn-text": "Edit",
        "scaffolding-unread-message-text": "Mesej belum dibaca",
        "scaffolding-chat-open-text": "Chat dibuka",
        "gpt-scaffolding-title": "Panel Arahan",
        "planner-title": "Alat Perancang",
        "planner-learning-strategy-select-label-text": "1. Sila pilih strategi pembelajaran:",
        "planner-learning-strategy-select-option1-text": "Pilih strategi",
        "planner-learning-strategy-select-customise-option-text": "Gunakan strategi sendiri",
        "planner-add-more-customise-strategy-btn-text": "Tambah Strategi",
        "planner-customise-option-hint-textarea-placeholder": "Jelaskan mengapa anda merancang seperti ini",
        "planner-next-btn-text": "Seterusnya",
        "planner-time-unit-minute": "minit",
        "planner-display-plan-title": "Pelan Pembelajaran Saya",
        "planner-display-overall-strategy-label": "Strategi keseluruhan:",
        "planner-display-time-allocation-label": "Peruntukan masa:",
        "planner-display-writing-strategy-label": "Strategi penulisan:",
        "planner-display-reading-strategy-label": "Strategi pembacaan:",
        "planner-customise-plan-reason-placeholder": "(Pilihan)",
        "essay-title": "Alat Penulisan Esei",
        "essay-save-btn-text": "Simpan Esei",
        "essay-writing-placeholder": "Tulis esei di sini…",
        "essay-show-word-count-btn-text": "Kiraan Perkataan",
        "essay-save-toast-text": "Esei anda telah disimpan!",
        "dictionary-title": "Kamus",
        "dictionary-send-btn-text": "Hantar",
        "dictionary-panel-input-placeholder": "Masukkan perkataan…",
        "checklist-title": "Alat Senarai Semak",
        "checklist-basic-panel-title": "Asas",
        "checklist-academic-panel-title": "Akademik",
        "checklist-originality-panel-title": "Keaslian",
        "checklist-integration-panel-title": "Integrasi & Huraian",
        "checklist-analyse-btn-text": "Analisis",
        "chatgpt-title": "Pembantu AI",
        "chatgpt-send-btn-text": "Hantar",
        "chatgpt-panel-input-placeholder": "Tanya soalan…",
        "chatteacher-title": "Tanya Guru",
        "chatteacher-panel-input-placeholder": "Tanya soalan…",
        "chatteacher-connect-server-status-text": "Status sambungan pelayan",
        "chatteacher-teacher-online-status-text": "Guru dalam talian",
        "chatteacher-send-btn-text": "Hantar",
        "chatgpt-role-description": "Anda ialah pembantu yang membantu. Sila jawab berdasarkan teks yang diberi.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Sehingga ke tahap ini dalam sesi pembelajaran, pelajar yang menunjukkan prestasi baik dalam tugasan ini memastikan mereka sedar tentang had masa tugasan dengan menggunakan alat pemasa yang disediakan. Hal ini nampaknya tidak berlaku bagi pelajar ini. Sila berikan maklum balas kepada pelajar dalam bentuk perenggan (jangan gunakan poin atau senarai bernombor) tentang cara untuk meningkatkan pemantauan terhadap kekangan masa melalui penggunaan alat pemasa yang disediakan, di mana butang masa pada bar alat mempunyai simbol jam. Sementara itu, sila pertimbangkan dengan menyeluruh semua keadaan pembelajaran pelajar ini.`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Sehingga ke tahap ini dalam sesi pembelajaran, pelajar yang menunjukkan prestasi baik dalam tugasan ini memastikan mereka merujuk semula kepada keperluan tugasan dan maklumat rubrik untuk menilai draf esei mereka serta memantau sama ada penulisan mereka sejajar dengan keperluan tugasan dan rubrik tersebut. Hal ini nampaknya tidak berlaku bagi pelajar ini. Sila berikan maklum balas kepada pelajar dalam bentuk perenggan (jangan gunakan poin atau senarai bernombor) tentang penggunaan maklumat daripada arahan tugasan dan rubrik untuk menilai draf esei mereka serta memantau sama ada draf penulisan mereka sejajar dengan keperluan tugasan dan rubrik, sambil berusaha sedaya upaya untuk MENGELAK daripada memberikan arahan terperinci tentang apa yang perlu dimasukkan dalam esei. Sementara itu, sila pertimbangkan dengan menyeluruh semua keadaan pembelajaran pelajar ini.`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "Menjelang minit ke-14, pelajar lain telah kerap menyemak arahan dan rubrik; anda belum. Berikan nasihat perenggan untuk menyemak secara berkala sehingga akhir sesi.",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Sehingga ke tahap ini dalam sesi pembelajaran, pelajar yang menunjukkan prestasi baik dalam tugasan ini memastikan mereka memahami dengan jelas keperluan tugasan dan rubrik. Namun, perkara ini nampaknya tidak berlaku bagi pelajar ini. Bolehkah anda memberikan maklum balas kepada pelajar dalam bentuk perenggan (tanpa menggunakan poin atau senarai bernombor) tentang cara untuk memperbaiki pemahaman mereka terhadap arahan tugasan dan rubrik, dengan menyokong kesedaran diri pelajar dalam menyelaraskan penulisan esei dengan keperluan tugasan dan rubrik, sambil berusaha sedaya upaya untuk MENGELAK memberikan arahan terperinci tentang perkara yang perlu dimasukkan dalam esei. Sementara itu, sila pertimbangkan secara menyeluruh semua keadaan pembelajaran pelajar ini.`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Sehingga ke tahap ini dalam sesi pembelajaran, pelajar yang menunjukkan prestasi baik dalam tugasan ini memastikan mereka sedar tentang had masa atau tugasan melalui penggunaan alat pemasa yang disediakan, dan pada masa yang sama memahami dengan jelas keperluan tugasan serta rubrik penilaian. Namun, perkara ini nampaknya tidak berlaku bagi pelajar ini. Bolehkah anda memberikan maklum balas kepada pelajar dalam bentuk perenggan (tanpa menggunakan senarai berpoin atau bernombor) yang menggabungkan nasihat dalam semua aspek ini iaitu bagaimana pelajar boleh meningkatkan pemantauan terhadap had masa melalui penggunaan alat pemasa yang disediakan (butang masa dalam bar alat yang mempunyai simbol jam), serta bagaimana pelajar boleh memperkukuh pemahaman terhadap arahan tugasan dan rubrik penilaian. Maklum balas ini juga perlu menyokong kesedaran kendiri pelajar tentang kepentingan menyelaraskan penulisan esei dengan keperluan tugasan dan rubrik, sambil mengelakkan pemberian arahan terperinci tentang apa yang perlu dimasukkan dalam esei. Pada masa yang sama, sila ambil kira dengan menyeluruh semua keadaan pembelajaran pelajar ini.`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "Menjelang minit ke-21, pelajar lain telah memasukkan maklumat daripada bahan bacaan dalam esei. Berikan nasihat cara melakukannya mengikut keperluan tugasan.",
        "gpt-scaffold-need-check-srl-prompt-OT2": `Sehingga ke tahap ini dalam sesi pembelajaran, pelajar yang menunjukkan prestasi baik dalam tugasan ini memastikan mereka menjelaskan idea dalam kata-kata mereka sendiri berdasarkan bahan bacaan yang diberikan. Namun, perkara ini tidak kelihatan berlaku bagi pelajar ini. Bolehkah anda memberikan maklum balas berbentuk perenggan (tanpa menggunakan senarai berbulet atau bernombor) kepada pelajar tentang kepentingan menjelaskan idea dengan kata-kata sendiri sambil menunjukkan pemahaman terhadap bahan bacaan. Anda perlu sedar bahawa anda tidak boleh memberikan arahan terperinci tentang cara pelajar tersebut harus menulis esei. Pada masa yang sama, sila pertimbangkan dengan menyeluruh semua keadaan pembelajaran pelajar ini.`,
        "gpt-scaffold-user-take-pre-study-prompt": "Pelajar ini telah mengambil bahagian dalam kajian terdahulu, jadi beliau mempunyai tahap pengetahuan tugasan tertentu.",
        "gpt-scaffold-isdimu-prompt-0": "Pelajar ini mempunyai kesedaran metakognitif yang baik.",
        "gpt-scaffold-isdimu-prompt-16": "Pelajar ini mempunyai tahap kesedaran metakognitif yang rendah.",
        "gpt-scaffold-isdimu-prompt-32": "Pelajar ini mempunyai sedikit kesedaran metakognitif.",
        "gpt-scaffold-pretest-grades-prompt-0": "Pelajar ini mempunyai tahap pengetahuan yang tinggi tentang tenaga boleh diperbaharui.",
        "gpt-scaffold-pretest-grades-prompt-5": "Pelajar ini mempunyai tahap pengetahuan yang rendah tentang tenaga boleh diperbaharui.",
        "gpt-scaffold-pretest-grades-prompt-10": "Pelajar ini mempunyai tahap pengetahuan sederhana tentang tenaga boleh diperbaharui.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Pelajar ini memahami cara mereka belajar dengan paling berkesan dan boleh memilih strategi yang baik untuk pembelajaran.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Pelajar ini tidak jelas tentang apa yang membantu mereka belajar atau strategi mana yang paling berkesan untuk mereka.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Pelajar ini mempunyai sedikit pemahaman tentang cara untuk belajar dengan berkesan dan boleh menyebut beberapa strategi yang membantu.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Pelajar ini merancang, memantau, dan menyesuaikan pembelajaran mereka untuk mencapai hasil yang lebih baik.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Pelajar ini tidak merancang lebih awal atau menjejaki pembelajaran mereka semasa mereka bekerja.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Pelajar ini memberi sedikit perhatian terhadap perancangan dan semakan pembelajaran mereka semasa melaksanakan tugasan.",
        "gpt-scaffold-test-mai-name": "Aktiviti 3: Soal Selidik Kesedaran Metakognitif",
        "gpt-scaffold-test-isdimu-name": "Aktiviti 3: ISDIMU",
        "gpt-scaffold-pretest-name": "Aktiviti 2: Pengetahuan domain tenaga boleh diperbaharui",
        "gpt-scaffold-check-take-previous-study-name": "Aktiviti 1: Tentang diri anda",
        "gpt-scaffold-planner-select-prompt-1": "Pelajar ini telah merancang untuk [membaca dahulu kemudian menulis] bagi tugasan ini.",
        "gpt-scaffold-planner-select-prompt-2": "Pelajar ini telah merancang untuk [membaca dan menulis secara serentak] bagi tugasan ini.",
        "gpt-scaffold-planner-select-prompt-3": "Pelajar ini telah merancang untuk [menulis secara intensif dan membaca secara terpilih] bagi tugasan ini.",
        "gpt-scaffold-planner-select-prompt-4": "Pelajar ini merancang untuk [reka pelan sendiri].",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Pelajar ini belum membuat rancangan yang jelas tentang bagaimana mereka akan melaksanakan tugasan tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Pelajar ini telah membuat rancangan yang jelas tentang bagaimana mereka akan melaksanakan tugasan tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Pelajar ini tidak sedar tentang masa yang tinggal untuk menyiapkan tugasan.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Pelajar ini sedar tentang masa yang tinggal untuk menyiapkan tugasan.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Pelajar ini tidak menyedari alat yang tersedia dalam persekitaran yang boleh membantu mereka menyiapkan tugasan.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Pelajar ini menyedari alat yang tersedia dalam persekitaran yang boleh membantu mereka menyiapkan tugasan.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Pelajar ini tidak menyedari bahan bacaan yang tersedia dalam persekitaran yang boleh membantu mereka dengan tugasan tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Pelajar ini menyedari bahan bacaan yang tersedia dalam persekitaran yang boleh membantu mereka dengan tugasan tersebut.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Pelajar ini tidak menyedari tentang rubrik penilaian.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Pelajar ini menyedari tentang rubrik penilaian.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": `Pelajar ini tidak sedar tentang arahan tugasan.
`,
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Pelajar ini sedar tentang arahan tugasan.",
        "gpt-scaffold-role-description": "Anda ialah pembantu yang membantu, berikan cadangan berdasarkan teks.",
        "planner-customise-step2-instruction": "Sila terangkan strategi dan peruntukan masa dengan terperinci serta sebabnya.",
        "planner-reading-strategy-1": "Baca bahan halaman demi halaman",
        "planner-reading-strategy-2": "Semak secara pantas kemudian baca dengan lebih terperinci",
        "planner-reading-strategy-3": "Gunakan alat sorotan (highlight tool) untuk menandakan kandungan penting",
        "planner-reading-strategy-4": "Catat pemahaman sendiri dalam nota semasa membaca",
        "planner-reading-strategy-5": "Bacaan berpandukan soalan dengan tumpuan pada kandungan tertentu",
        "planner-reading-strategy-6": "Baca secara terpilih dan langkau kandungan yang tidak relevan",
        "planner-reading-strategy-instruction": "Apakah kemahiran membaca yang anda rancangkan untuk digunakan? (pilihan berbilang jawapan)",
        "planner-writing-strategy-1": "Draf terlebih dahulu struktur esei dan kemudian isikan dengan butiran",
        "planner-writing-strategy-2": "Gunakan nota dan bahagian yang saya sorot semasa menulis esei",
        "planner-writing-strategy-3": "Semak arahan dan rubrik untuk memastikan penulisan saya selaras dengan kehendak tugasan",
        "planner-writing-strategy-4": "Salin dan tampal ayat-ayat utama kemudian tulis semula dengan lebih lancar",
        "planner-writing-strategy-5": "Gunakan rangka penulisan dan pola yang telah saya pelajari untuk menulis",
        "planner-writing-strategy-instruction": "Kemahiran menulis manakah yang anda rancangkan untuk digunakan? (pilihan pelbagai)",
        "planner-main-strategy-1": "Baca terlebih dahulu kemudian tulis",
        "planner-main-strategy-1-instruction": "Berapa banyak masa yang anda rancang untuk diperuntukkan bagi aktiviti membaca dan menulis masing-masing?",
        "planner-main-strategy-1-task-1": "2.1 Masa yang akan diperuntukkan untuk membaca:",
        "planner-main-strategy-1-task-2": "2.2 Masa yang akan diperuntukkan untuk menulis:",
        "planner-main-strategy-2": "Baca dan tulis secara serentak",
        "planner-main-strategy-2-instruction": "Berapa banyak masa yang anda rancangkan untuk setiap topik?",
        "planner-main-strategy-2-task-1": "2.1 Baca/tulis tentang pemilihan tenaga",
        "planner-main-strategy-2-task-2": "2.2 Baca/tulis tentang kos dan faedah",
        "planner-main-strategy-2-task-3": "2.3 Baca/tulis tentang kesan terhadap alam sekitar",
        "planner-main-strategy-3": "Tulis secara intensif, baca secara selektif",
        "planner-main-strategy-3-instruction": "Berapa banyak masa yang anda rancangkan untuk setiap peringkat penulisan?",
        "planner-main-strategy-3-task-1": "2.1 Rancang struktur esei:",
        "planner-main-strategy-3-task-2": "2.2 Tulis draf pertama:",
        "planner-main-strategy-3-task-3": "2.3 Baca maklumat tambahan yang berkaitan dengan esei:",
        "planner-main-strategy-3-task-4": "2.4 Semak dan perbaiki esei:",
        "planner-customise-plan-title": "Pelan Tersuai",
        "planner-select-main-strategy-hint": "Sila pilih satu strategi untuk diteruskan!",
        "planner-allocate-time-hint": "Sila peruntukkan masa kepada semua tugas dan jumlah masa mesti dalam had!",
        "planner-select-reading-writing-strategy-hint": "Sila pilih kemahiran yang akan digunakan!",
        "planner-save-plan-hint": "Sila isi nama strategi dan masa yang betul!",
        "rule-based-scaffold-title-1": "Penting untuk memahami tugasan.",
        "rule-based-scaffold-title-1-task-1": "(a) Gunakan menu untuk gambaran keseluruhan dan imbas teks",
        "rule-based-scaffold-title-1-task-2": "(b) Semak rubrik esei",
        "rule-based-scaffold-title-1-task-3": "(c) Semak matlamat pembelajaran dan arahan",
        "rule-based-scaffold-title-2": "Penting untuk membaca maklumat tentang topik.",
        "rule-based-scaffold-title-2-task-1": "(a) Catat maklumat penting",
        "rule-based-scaffold-title-2-task-2": "(b) Pilih apa yang akan dibaca",
        "rule-based-scaffold-title-2-task-3": "(c) Semak masa yang tinggal",
        "rule-based-scaffold-title-3": "Penting untuk menyemak maklumat berkaitan.",
        "rule-based-scaffold-title-3-task-1": "(a) Semak anotasi",
        "rule-based-scaffold-title-3-task-2": "(b) Semak matlamat dan arahan",
        "rule-based-scaffold-title-3-task-3": "(c) Semak esei untuk tentukan bacaan seterusnya",
        "rule-based-scaffold-title-4": "Penting untuk menulis esei yang baik.",
        "rule-based-scaffold-title-4-task-1": "(a) Semak masa yang tinggal",
        "rule-based-scaffold-title-4-task-2": "(b) Semak rubrik esei",
        "rule-based-scaffold-title-4-task-3": "(c) Draf esei dengan isi utama",
        "rule-based-scaffold-title-5": "Penting untuk menyemak penulisan anda.",
        "rule-based-scaffold-title-5-task-1": "(a) Semak rubrik esei",
        "rule-based-scaffold-title-5-task-2": "(b) Edit esei anda",
        "rule-based-scaffold-title-5-task-3": "(c) Semak matlamat dan arahan",
        "annotation-label-1": "Ambil perhatian",
        "annotation-label-2": "Penting",
        "annotation-label-3": "Berguna",
        "annotation-label-4": "Konsep",
        "annotation-label-5": "Mengelirukan",
        "product-visual-title": "Visualisasi Produk",
        "product-visual-close-btn": "Tutup",
        "process-visual-title": "Visualisasi Proses",
        "process-visual-set-goal-label": "Matlamat anda",
        "process-visual-close-btn": "Tutup",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Panel Anotasi",
        "annotation-search-toolbar-btn-hint": "Cari Nota",
        "gpt-scaffold-toolbar-btn-hint": "Alat Arahan",
        "essay-writing-toolbar-btn-hint": "Alat Penulisan",
        "planner-toolbar-btn-hint": "Alat Perancang",
        "multi-agents-single-window-toolbar-btn-hint": "Pembantu Chat",
        "timer-toolbar-btn-hint": "Pemasa",
        "like-response-text": "Adakah anda menyukai respons ini?",
        "annotation-tool-data-label": "Alat Nota",
        "search-annotation-tool-data-label": "Cari Nota",
        "gpt-scaffold-tool-data-label": "Alat Arahan",
        "process-visual-tool-data-label": "Alat Proses",
        "essay-product-visual-tool-data-label": "Alat Produk Esei",
        "collaborate-writing-tool-data-label": "Penulisan Kolaboratif",
        "essay-writing-tool-data-label": "Alat Penulisan",
        "math-tool-data-label": "Alat Matematik",
        "planner-tool-data-label": "Alat Perancang",
        "checklist-tool-data-label": "Alat Analitik Penulisan",
        "multi-agents-single-window-tool-data-label": "Alat Chatbot",
        "dictionary-tool-data-label": "Kamus",
        "timer-tool-data-label": "Pemasa",
        "questionnaire-tool-data-label": "Borang Soal Selidik",
        "chat-reminder-message": `
Chatbot ini kini tersedia untuk anda. Anda tidak boleh menggunakan chatbot ini untuk menulis esei anda.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Masukkan teks untuk memulakan perbualan",
        "chat-reminder-message-title": "Mesej Peringatan ",
        "scaffolding-message-title": "Maklum balas mengenai kemajuan semasa anda:",
        "scaffold-chat-reminder": "Hai, anda sudah lama asyik berbual. Jom kembali kepada tugas utama!",
    },
    nl: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": "",
        "gpt-scaffold-prompt-template-groupC": "",
        "annotation-notes-title": "Notitiepaneel",
        "annotation-notes-delete-confirm-message": "",
        "annotation-write-note-placeholder": "Schrijf hier aantekeningen...",
        "annotation-tag-placeholder": "Voer nieuwe tags in en druk op Enter...",
        "annotation-note-save-btn-text": "Opslaan",
        "annotation-note-cancel-btn-text": "Annuleren",
        "annotation-search-btn-text": "Zoekopdracht",
        "annotation-search-panel-input-placeholder": "Voer trefwoorden in om te zoeken...",
        "scaffolding-title": "Steigerpaneel",
        "scaffolding-create-checklist-btn-text": "Maak een checklist",
        "scaffolding-edit-checklist-btn-text": "Bewerking",
        "scaffolding-unread-message-text": "Ongelezen bericht",
        "scaffolding-chat-open-text": "",
        "gpt-scaffolding-title": "GPT steigerpaneel",
        "planner-title": "Planner-tool",
        "planner-learning-strategy-select-label-text": "1. Maak een plan voor uw leerstrategie:",
        "planner-learning-strategy-select-option1-text": "Selecteer een strategie",
        "planner-learning-strategy-select-customise-option-text": "Gebruik uw eigen strategie",
        "planner-add-more-customise-strategy-btn-text": "Voeg meer strategie toe",
        "planner-customise-option-hint-textarea-placeholder": "Leg uit waarom u dit plan ontwerpt?",
        "planner-next-btn-text": "Volgende",
        "planner-time-unit-minute": "",
        "planner-display-plan-title": "Mijn Leerplan",
        "planner-display-overall-strategy-label": "Algemene strategie:",
        "planner-display-time-allocation-label": "Tijdsbesteding:",
        "planner-display-writing-strategy-label": "Strategie schrijven:",
        "planner-display-reading-strategy-label": "Lees strategie:",
        "planner-customise-plan-reason-placeholder": "(Optioneel)",
        "essay-title": "Hulpmiddel voor het schrijven van essays",
        "essay-save-btn-text": "Opstel opslaan",
        "essay-writing-placeholder": "Schrijf hier een essay...",
        "essay-show-word-count-btn-text": "Aantal woorden",
        "essay-save-toast-text": "Je essay is opgeslagen!",
        "dictionary-title": "Woordenboekhulpmiddel",
        "dictionary-send-btn-text": "Versturen",
        "dictionary-panel-input-placeholder": "Voer een zoekwoord in...",
        "checklist-title": "Controlelijsthulpmiddel",
        "checklist-basic-panel-title": "Basis",
        "checklist-academic-panel-title": "Academisch",
        "checklist-originality-panel-title": "Originaliteit",
        "checklist-integration-panel-title": "Integratie en uitwerking",
        "checklist-analyse-btn-text": "Analyseren",
        "chatgpt-title": "Chatgpt-tool",
        "chatgpt-send-btn-text": "Versturen",
        "chatgpt-panel-input-placeholder": "Een vraag stellen...",
        "chatteacher-title": "Vraag het aan de docententool",
        "chatteacher-panel-input-placeholder": "Een vraag stellen...",
        "chatteacher-connect-server-status-text": "Verbind serverstatus",
        "chatteacher-teacher-online-status-text": "Onlinestatus van de docent",
        "chatteacher-send-btn-text": "Versturen",
        "chatgpt-role-description": "Je bent een behulpzame assistent en beantwoordt graag vragen op basis van de verstrekte tekst.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": "",
        "gpt-scaffold-need-check-srl-prompt-CMTR": "",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `We hebben een student die momenteel aan deze leertaken werkt. Tot aan de 14e minuut van de leersessie hebben andere studenten die goed presteerden bij deze taak constant de instructies en rubriek gecontroleerd. Dit lijkt niet het geval te zijn bij deze student. Dus, rekening houdend met alle bovenstaande informatie (inclusief de taakvereisten, de rubriek en het leesmateriaal) en gegeven de leeromstandigheden van deze specifieke student zoals hierboven beschreven, geef de student een paragraafstijl (gebruik geen opsommingen of genummerde lijsten) feedback over hoe ze instructies en de rubriek regelmatig kunnen controleren tot het einde van deze schrijfsessie.`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": "",
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": "",
        "gpt-scaffold-need-check-srl-prompt-OR2": `We hebben een student die momenteel aan deze leertaken werkt. Tot aan de 21e minuut van de leersessie hebben andere studenten die goed presteerden in deze taak al informatie uit het leesmateriaal in hun essays opgenomen. Dit lijkt niet het geval te zijn bij deze student. Dus, rekening houdend met alle bovenstaande informatie (inclusief de taakvereisten, de rubriek en het leesmateriaal) en gegeven de leeromstandigheden van deze specifieke student zoals hierboven beschreven, geef de student een paragraafstijl (gebruik geen opsommingen of genummerde lijsten) feedback over hoe ze informatie uit het leesmateriaal kunnen opnemen in hun werkstukconcept, gebaseerd op de taakvereisten.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `We hebben een student die momenteel aan deze leertaken werkt. Tot aan de 28e minuut van de leersessie hebben andere studenten die goed presteerden in deze taak al nieuwe informatie toegevoegd in hun eigen woorden, gebaseerd op het leesmateriaal. Dit lijkt niet het geval te zijn bij deze student. Dus, rekening houdend met alle bovenstaande informatie (inclusief de taakvereisten, de rubriek en het leesmateriaal) en gegeven de leeromstandigheden van deze specifieke student zoals hierboven beschreven, geef de student een paragraafstijl (gebruik geen opsommingen of genummerde lijsten) feedback over hoe ze verder kunnen bouwen op de informatie die ze uit het leesmateriaal hebben gebruikt, in hun eigen woorden.`,
        "gpt-scaffold-user-take-pre-study-prompt": "Deze student heeft deelgenomen aan de eerdere studie en heeft een bepaald niveau van taakkennis.",
        "gpt-scaffold-isdimu-prompt-0": "Deze student lijkt goed inzicht te hebben in verschillende strategieën of technieken die toegepast kunnen worden om leren te bevorderen.",
        "gpt-scaffold-isdimu-prompt-16": "Deze student lijkt een laag niveau van begrip van strategieën of technieken te hebben die toegepast kunnen worden om leren te bevorderen.",
        "gpt-scaffold-isdimu-prompt-32": "Deze student lijkt enigszins begrip te hebben van strategieën of technieken die toegepast kunnen worden om leren te bevorderen.",
        "gpt-scaffold-pretest-grades-prompt-0": "Deze student heeft een hoog kennisniveau over AI in de geneeskunde.",
        "gpt-scaffold-pretest-grades-prompt-5": "Deze student heeft een laag kennisniveau over AI in de geneeskunde.",
        "gpt-scaffold-pretest-grades-prompt-10": "Deze student heeft een gemiddeld kennisniveau over AI in de geneeskunde.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Deze leerling begrijpt hoe hij/zij het beste leert en kan goede leerstrategieën kiezen.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Deze leerling weet niet goed wat hem/haar helpt leren of welke strategieën het beste werken.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Deze leerling begrijpt enigszins hoe je effectief kunt leren en kan enkele strategieën benoemen die helpen.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Deze leerling plant, monitort en past het leren aan voor betere resultaten.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Deze leerling plant niet vooruit of houdt het leerproces niet bij tijdens het werk.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Deze leerling let enigszins op het plannen en controleren van het leren tijdens taken.",
        "gpt-scaffold-test-mai-name": "Activiteit 3: Metacognitieve Bewustzijnsvragenlijst",
        "gpt-scaffold-test-isdimu-name": "Activiteit 3: kennis van leertactieken",
        "gpt-scaffold-pretest-name": "Activiteit 2: kennistest - AI in de geneeskunde",
        "gpt-scaffold-check-take-previous-study-name": "Activiteit 1: over jezelf",
        "gpt-scaffold-planner-select-prompt-1": "Deze student heeft het plan bedacht om [eerst lezen en dan schrijven] voor deze taak uit te voeren.",
        "gpt-scaffold-planner-select-prompt-2": "Deze student heeft het plan bedacht om [lezen en schrijven tegelijk] toe te passen voor deze taak.",
        "gpt-scaffold-planner-select-prompt-3": "Deze student heeft het plan bedacht om [intensief schrijven en selectief lezen] uit te voeren voor deze taak.",
        "gpt-scaffold-planner-select-prompt-4": "Deze student heeft het plan bedacht om [zijn/haar eigen plan te ontwerpen] voor de taak.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Deze student heeft geen expliciete plannen gemaakt over hoe hij/zij de taak zal aanpakken.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Deze student heeft expliciete plannen gemaakt over hoe hij/zij de taak zal aanpakken.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Deze student is zich niet bewust van de resterende tijd om de taak te voltooien.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Deze student is zich bewust van de resterende tijd om de taak te voltooien.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Deze student is zich niet bewust van de beschikbare hulpmiddelen in de omgeving die kunnen helpen bij het voltooien van de taak.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Deze student is zich bewust van de beschikbare hulpmiddelen in de omgeving die kunnen helpen bij het voltooien van de taak.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Deze student is zich niet bewust van de beschikbare leesmaterialen in de omgeving die steun kunnen bieden bij de taak.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Deze student is zich bewust van de beschikbare leesmaterialen in de omgeving die steun kunnen bieden bij de taak.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Deze student is zich niet bewust van de rubriek.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Deze student is zich bewust van de rubriek.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Deze student is zich niet bewust van de taakvereisten.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Deze student is zich bewust van de taakvereisten.",
        "gpt-scaffold-role-description": "Je bent een behulpzame assistent, geef suggesties op basis van de gegeven tekst.",
        "planner-customise-step2-instruction": "Beschrijf in detail de leerstrategie die je van plan bent toe te passen en hoe je je tijd verdeelt. Je kunt ook de redenen voor de strategie en tijdstoewijzing opnemen.",
        "planner-reading-strategy-1": "Lees het materiaal pagina voor pagina",
        "planner-reading-strategy-2": "Eerst vluchtig scannen en daarna gedetailleerd lezen",
        "planner-reading-strategy-3": "Gebruik de markeertool om belangrijke inhoud te markeren",
        "planner-reading-strategy-4": "Schrijf mijn begrip op in notities tijdens het lezen",
        "planner-reading-strategy-5": "Vraaggerichte lezing met focus op bepaalde inhoud",
        "planner-reading-strategy-6": "Selectief lezen en irrelevante inhoud overslaan",
        "planner-reading-strategy-instruction": "Welke leesvaardigheden ben je van plan te gebruiken (meerdere keuzes mogelijk)?",
        "planner-writing-strategy-1": "Maak eerst een structuur voor het essay en vul daarna details in",
        "planner-writing-strategy-2": "Gebruik mijn notities en gemarkeerde tekst bij het schrijven van het essay",
        "planner-writing-strategy-3": "Controleer de instructies en rubrieken om het schrijven op koers te houden",
        "planner-writing-strategy-4": "Kopieer en plak belangrijke zinnen en herschrijf deze vervolgens vloeiend",
        "planner-writing-strategy-5": "Gebruik het schrijfkader en de patronen die ik heb geleerd",
        "planner-writing-strategy-instruction": "Welke schrijfvaardigheden ben je van plan te gebruiken (meerdere keuzes mogelijk)?",
        "planner-main-strategy-1": "Eerst lezen, dan schrijven",
        "planner-main-strategy-1-instruction": "Hoeveel tijd ben je van plan te besteden aan lezen en schrijven?",
        "planner-main-strategy-1-task-1": "Lees eerste module",
        "planner-main-strategy-1-task-2": "Lees tweede module",
        "planner-main-strategy-2": "Lezen en schrijven tegelijkertijd",
        "planner-main-strategy-2-instruction": "Hoeveel tijd ben je van plan te besteden aan elk onderwerp?",
        "planner-main-strategy-2-task-1": "Lezen/schrijven over eerste module",
        "planner-main-strategy-2-task-2": "Lezen/schrijven over tweede module",
        "planner-main-strategy-2-task-3": "Lezen/schrijven over derde module",
        "planner-main-strategy-3": "Intensief schrijven, selectief lezen",
        "planner-main-strategy-3-instruction": "Hoeveel tijd ben je van plan te besteden aan verschillende fasen van het schrijven?",
        "planner-main-strategy-3-task-1": "Bedenk de structuur van het essay",
        "planner-main-strategy-3-task-2": "Schrijf de eerste versie",
        "planner-main-strategy-3-task-3": "Lees aanvullende informatie gerelateerd aan het essay",
        "planner-main-strategy-3-task-4": "Herzien, verfijnen en verbeteren van het essay",
        "planner-customise-plan-title": "",
        "planner-select-main-strategy-hint": "Selecteer een strategie om door te gaan!!!",
        "planner-allocate-time-hint": "Wijs tijd toe aan alle taken en totale tijd moet binnen de vereiste tijd blijven!!!",
        "planner-select-reading-writing-strategy-hint": "Selecteer de vaardigheden die je wilt gebruiken!!!",
        "planner-save-plan-hint": "Vul alle strategienamen en correcte tijd in!!!",
        "rule-based-scaffold-title-1": "Het is belangrijk om te begrijpen waar de taak over gaat.",
        "rule-based-scaffold-title-1-task-1": "(a) Gebruik het menu om een overzicht te krijgen en scan de tekst",
        "rule-based-scaffold-title-1-task-2": "(b) Controleer de essayrubriek",
        "rule-based-scaffold-title-1-task-3": "(c) Controleer de leerdoelen en instructies",
        "rule-based-scaffold-title-2": "Het is belangrijk om informatie over de onderwerpen te lezen.",
        "rule-based-scaffold-title-2-task-1": "(a) Noteer belangrijke informatie",
        "rule-based-scaffold-title-2-task-2": "(b) Selecteer wat je wilt lezen",
        "rule-based-scaffold-title-2-task-3": "(c) Controleer de resterende tijd",
        "rule-based-scaffold-title-3": "Het is belangrijk om relevante informatie te lezen en je leesmateriaal te herzien.",
        "rule-based-scaffold-title-3-task-1": "(a) Bekijk aantekeningen om de voortgang te controleren",
        "rule-based-scaffold-title-3-task-2": "(b) Herzie de leerdoelen en instructies",
        "rule-based-scaffold-title-3-task-3": "(c) Controleer het essay om te bepalen wat je daarna moet lezen",
        "rule-based-scaffold-title-4": "Het is belangrijk om een goed essay te schrijven.",
        "rule-based-scaffold-title-4-task-1": "(a) Controleer de resterende tijd",
        "rule-based-scaffold-title-4-task-2": "(b) Controleer de essayrubriek",
        "rule-based-scaffold-title-4-task-3": "(c) Maak een essay door je leerpunten over te brengen naar hoofdpunten",
        "rule-based-scaffold-title-5": "Het is belangrijk om relevante informatie te schrijven en je werk te controleren.",
        "rule-based-scaffold-title-5-task-1": "(a) Controleer de essayrubriek",
        "rule-based-scaffold-title-5-task-2": "(b) Bewerk je essay",
        "rule-based-scaffold-title-5-task-3": "(c) Controleer de leerdoelen en instructies",
        "annotation-label-1": "Notitie maken",
        "annotation-label-2": "belangrijk",
        "annotation-label-3": "bruikbaar",
        "annotation-label-4": "concept",
        "annotation-label-5": "verwarrend",
        "product-visual-title": "Productvisualisatie",
        "product-visual-close-btn": "Sluiten",
        "process-visual-title": "Procesvisualisatie",
        "process-visual-set-goal-label": "Uw gestelde doelen",
        "process-visual-close-btn": "Sluiten",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "",
        "annotation-toolbar-btn-hint": "Annotatietool",
        "annotation-search-toolbar-btn-hint": "Zoekannotatietool",
        "gpt-scaffold-toolbar-btn-hint": "Instructietool",
        "essay-writing-toolbar-btn-hint": "Schrijftool",
        "planner-toolbar-btn-hint": "Plannertool",
        "multi-agents-single-window-toolbar-btn-hint": "Chatassistent",
        "timer-toolbar-btn-hint": "Timer",
        "like-response-text": "",
        "annotation-tool-data-label": "",
        "search-annotation-tool-data-label": "",
        "gpt-scaffold-tool-data-label": "",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "",
        "math-tool-data-label": "",
        "planner-tool-data-label": "",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": "",
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "",
        "chat-reminder-message-title": "",
        "scaffolding-message-title": "Feedback over je huidige voortgang:",
        "scaffold-chat-reminder": "Hoi, je bent al een tijdje bezig met de chat. Laten we teruggaan naar de hoofdtaak!",
    },
    pt: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": "",
        "gpt-scaffold-prompt-template-groupC": "",
        "annotation-notes-title": "Painel de Anotações",
        "annotation-notes-delete-confirm-message": "",
        "annotation-write-note-placeholder": "Escreva anotações aqui...",
        "annotation-tag-placeholder": "Escreva novos rótulos/tags aqui e pressione Enter...",
        "annotation-note-save-btn-text": "Salvar",
        "annotation-note-cancel-btn-text": "Cancelar",
        "annotation-search-btn-text": "Busca",
        "annotation-search-panel-input-placeholder": "Escreva as palavras-chave para pesquisa...",
        "scaffolding-title": "Painel de Instruções",
        "scaffolding-create-checklist-btn-text": "Criar Checklist",
        "scaffolding-edit-checklist-btn-text": "Editar",
        "scaffolding-unread-message-text": "Mensagem Não Lida",
        "scaffolding-chat-open-text": "",
        "gpt-scaffolding-title": "Painel de Instruções",
        "planner-title": "Ferramenta de Planejamento",
        "planner-learning-strategy-select-label-text": "1. Por favor, faça um plano para sua estratégia de aprendizagem:",
        "planner-learning-strategy-select-option1-text": "Selecione uma estratégia",
        "planner-learning-strategy-select-customise-option-text": "Use sua própria estratégia",
        "planner-add-more-customise-strategy-btn-text": "Adicione Mais Estratégia",
        "planner-customise-option-hint-textarea-placeholder": "Por favor, explique: por que você criou esse plano?",
        "planner-next-btn-text": "Próximo",
        "planner-time-unit-minute": "",
        "planner-display-plan-title": "Meu Plano de Aprendizagem",
        "planner-display-overall-strategy-label": "Estratégia Geral:",
        "planner-display-time-allocation-label": "Alocação de Tempo:",
        "planner-display-writing-strategy-label": "Estratégia de Escrita:",
        "planner-display-reading-strategy-label": "Estratégia de Leitura:",
        "planner-customise-plan-reason-placeholder": "(Opcional)",
        "essay-title": "Ferramenta de Escrita de Redação",
        "essay-save-btn-text": "Salvar Redação",
        "essay-writing-placeholder": "Escreva a redação aqui...",
        "essay-show-word-count-btn-text": "Mostrar Contagem de Palavras",
        "essay-save-toast-text": "Seu ensaio foi salvo!",
        "dictionary-title": "Ferramenta de Dicionário",
        "dictionary-send-btn-text": "Enviar",
        "dictionary-panel-input-placeholder": "Por favor, escreva uma palavra para consulta...",
        "checklist-title": "Ferramenta de Checklist",
        "checklist-basic-panel-title": "Básico",
        "checklist-academic-panel-title": "Acadêmico",
        "checklist-originality-panel-title": "Originalidade",
        "checklist-integration-panel-title": "Integração e Elaboração",
        "checklist-analyse-btn-text": "Analisar",
        "chatgpt-title": "Ferramenta ChatGPT",
        "chatgpt-send-btn-text": "Enviar",
        "chatgpt-panel-input-placeholder": "Faça uma pergunta...",
        "chatteacher-title": "Ferramenta de Perguntar ao Professor",
        "chatteacher-panel-input-placeholder": "Faça uma pergunta...",
        "chatteacher-connect-server-status-text": "Status de conexão ao servidor",
        "chatteacher-teacher-online-status-text": "Status de professor online",
        "chatteacher-send-btn-text": "Enviar",
        "chatgpt-role-description": "Você é um assistente prestativo e responde às perguntas com base no texto fornecido.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": "",
        "gpt-scaffold-need-check-srl-prompt-CMTR": "",
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `Temos um estudante que está atualmente trabalhando nesta tarefa de aprendizado. Até o 14º minuto da sessão de aprendizado, outros estudantes que se saíram bem nesta tarefa têm constantemente verificado as instruções da tarefa e a rubrica. Este não é o caso deste estudante. Portanto, considerando todas as informações fornecidas acima (incluindo os requisitos da tarefa, a rubrica e o material de leitura), e dadas as condições de aprendizado deste estudante em particular, que foram fornecidas acima, forneça feedback ao estudante em estilo de parágrafo (sem marcadores ou listas numeradas) sobre como verificar regularmente as instruções da tarefa e a rubrica até o final desta sessão de escrita.`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": "",
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": "",
        "gpt-scaffold-need-check-srl-prompt-OR2": `Temos um estudante que está atualmente trabalhando nesta tarefa de aprendizado. Até o 21º minuto da sessão de aprendizado, outros estudantes que se saíram bem nesta tarefa já começaram a incluir algumas informações do material de leitura em suas redações. Isso não parece ser o caso deste estudante. Portanto, considerando todas as informações fornecidas acima (incluindo os requisitos da tarefa, a rubrica e o material de leitura), e dadas as condições de aprendizado deste estudante em particular, que foram fornecidas acima, forneça feedback ao estudante em estilo de parágrafo (sem marcadores ou listas numeradas) sobre como incluir informações do material de leitura em seu rascunho da redação, com base nos requisitos da tarefa.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `Temos um estudante que está atualmente trabalhando nesta tarefa de aprendizado. Até o 28º minuto da sessão de aprendizado, outros estudantes que se saíram bem nesta tarefa já começaram a adicionar informações novas com suas próprias palavras, com base no material de leitura. Isso não parece ser o caso deste estudante. Portanto, considerando todas as informações fornecidas acima (incluindo os requisitos da tarefa, a rubrica e o material de leitura), e dadas as condições de aprendizado deste estudante em particular, que foram fornecidas acima, forneça feedback ao estudante em estilo de parágrafo (sem marcadores ou listas numeradas) sobre como expandir as informações que eles utilizaram dos materiais de leitura. O estudante deve fazer isso com suas próprias palavras.`,
        "gpt-scaffold-user-take-pre-study-prompt": "Este estudante participou do estudo anterior, então ele/ela tem um certo nível de conhecimento da tarefa.",
        "gpt-scaffold-isdimu-prompt-0": "Este estudante tem um alto nível de compreensão de várias estratégias ou técnicas que podem ser aplicadas para facilitar a aprendizagem.",
        "gpt-scaffold-isdimu-prompt-16": "Este estudante tem um baixo nível de compreensão de várias estratégias ou técnicas que podem ser aplicadas para facilitar a aprendizagem.",
        "gpt-scaffold-isdimu-prompt-32": "Este estudante parece ter alguma compreensão de várias estratégias ou técnicas que podem ser aplicadas para facilitar a aprendizagem.",
        "gpt-scaffold-pretest-grades-prompt-0": "Este estudante tem um nível alto de conhecimento sobre IA e IA na medicina.",
        "gpt-scaffold-pretest-grades-prompt-5": "Este estudante tem um nível baixo de conhecimento sobre IA e IA na medicina.",
        "gpt-scaffold-pretest-grades-prompt-10": "Este estudante tem um nível médio de conhecimento sobre IA e IA na medicina.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Este estudante entende como aprende melhor e pode escolher boas estratégias de aprendizagem.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Este estudante não tem clareza sobre o que o ajuda a aprender ou quais estratégias funcionam melhor para ele.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Este estudante tem algum entendimento sobre maneiras eficazes de aprender e pode citar algumas estratégias que ajudam.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Este estudante planeja, monitora e ajusta seu aprendizado para obter melhores resultados.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Este estudante não planeja com antecedência nem acompanha seu aprendizado durante as tarefas.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Este estudante presta alguma atenção ao planejamento e à verificação de seu aprendizado durante as tarefas.",
        "gpt-scaffold-test-mai-name": "Atividade 3: Questionário de Consciência Metacognitiva",
        "gpt-scaffold-test-isdimu-name": "Atividade 3: conhecimento em táticas de aprendizagem",
        "gpt-scaffold-pretest-name": "Atividade 2: teste de conhecimento - IA na medicina",
        "gpt-scaffold-check-take-previous-study-name": "Atividade 1: sobre você",
        "gpt-scaffold-planner-select-prompt-1": "Este estudante elaborou o plano de [ler primeiro e depois escrever] para esta tarefa.",
        "gpt-scaffold-planner-select-prompt-2": "Este estudante elaborou o plano de [ler e escrever ao mesmo tempo] para esta tarefa.",
        "gpt-scaffold-planner-select-prompt-3": "Este estudante elaborou o plano de [escrever intensivamente e ler seletivamente] para esta tarefa.",
        "gpt-scaffold-planner-select-prompt-4": "Este estudante elaborou o plano de [criar seu próprio plano] para a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Este estudante não criou planos explícitos sobre como ele abordará a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Este estudante criou planos explícitos sobre como ele abordará a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Este estudante não está ciente do tempo restante para completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Este estudante está ciente do tempo restante para completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Este estudante não está ciente das ferramentas disponíveis no ambiente que podem ajudá-lo a completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Este estudante está ciente das ferramentas disponíveis no ambiente que podem ajudá-lo a completar a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Este estudante não está ciente dos materiais de leitura disponíveis no ambiente que podem ajudá-lo com a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Este estudante está ciente dos materiais de leitura disponíveis no ambiente que podem ajudá-lo com a tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Este estudante não está ciente da rubrica.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Este estudante está ciente da rubrica.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Este estudante não está ciente das instruções da tarefa.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Este estudante está ciente das instruções da tarefa.",
        "gpt-scaffold-role-description": "Você é um assistente prestativo, por favor, dê sugestões com base no texto fornecido.",
        "planner-customise-step2-instruction": "Por favor, descreva detalhadamente a estratégia de aprendizagem que você planeja adotar e como você irá alocar seu tempo. Você também pode incluir os motivos para a estratégia e a alocação de tempo.",
        "planner-reading-strategy-1": "Ler o material página por página",
        "planner-reading-strategy-2": "Navegação rápida e depois leitura detalhada",
        "planner-reading-strategy-3": "Use the highlight tool to mark key content",
        "planner-reading-strategy-4": "Write down my understanding in notes while reading",
        "planner-reading-strategy-5": "Question-guided reading with focus on certain content",
        "planner-reading-strategy-6": "",
        "planner-reading-strategy-instruction": "Quais habilidades de leitura você planeja usar (múltipla escolha)?",
        "planner-writing-strategy-1": "Fazer um rascunho de uma estrutura de redação primeiro e depois preenchê-la com detalhes",
        "planner-writing-strategy-2": "Use my notes and highlighting when writing the essay",
        "planner-writing-strategy-3": "Copiar e colar frases-chave e depois reescrevê-las fluentemente",
        "planner-writing-strategy-4": "",
        "planner-writing-strategy-5": "Use the writing framework and patterns I have learned to write",
        "planner-writing-strategy-instruction": "Quais habilidades de escrita você planeja usar (múltipla escolha)?",
        "planner-main-strategy-1": "Leia Primeiro, Depois Escreva",
        "planner-main-strategy-1-instruction": "Quanto tempo você planeja gastar lendo e escrevendo respectivamente?",
        "planner-main-strategy-1-task-1": "Leia o primeiro módulo",
        "planner-main-strategy-1-task-2": "Leia o segundo módulo",
        "planner-main-strategy-2": "Leia e Escreva Simultaneamente",
        "planner-main-strategy-2-instruction": "Quanto tempo você planeja gastar em cada tópico?",
        "planner-main-strategy-2-task-1": "Leitura/escrita sobre o primeiro módulo",
        "planner-main-strategy-2-task-2": "Leitura/escrita sobre o segundo módulo",
        "planner-main-strategy-2-task-3": "Leitura/escrita sobre o terceiro módulo",
        "planner-main-strategy-3": "Escreva Intensivamente, Leia Seletivamente",
        "planner-main-strategy-3-instruction": "Quanto tempo você planeja gastar em diferentes estágios da escrita?",
        "planner-main-strategy-3-task-1": "Estabelecer a estrutura da redação",
        "planner-main-strategy-3-task-2": "Escrever o primeiro rascunho",
        "planner-main-strategy-3-task-3": "Ler informações adicionais relacionadas à redação",
        "planner-main-strategy-3-task-4": "Revisar, refinar e aprimorar a redação",
        "planner-customise-plan-title": "",
        "planner-select-main-strategy-hint": "Por favor, selecione uma estratégia para continuar!!!",
        "planner-allocate-time-hint": "Por favor, atribua tempo para todas as tarefas e o tempo total deve ser de no máximo 45 minutos!!!",
        "planner-select-reading-writing-strategy-hint": "Por favor, selecione as habilidades que você planeja usar!!!",
        "planner-save-plan-hint": "Por favor, preencha todos os nomes das estratégias e o tempo correto!!!",
        "rule-based-scaffold-title-1": "É importante entender do que se trata a tarefa.",
        "rule-based-scaffold-title-1-task-1": "(a) Use o menu para ter uma visão geral e passar os olhos pelo texto",
        "rule-based-scaffold-title-1-task-2": "(b) Verifique a rubrica de redação",
        "rule-based-scaffold-title-1-task-3": "(c) Verifique os objetivos de aprendizagem e as instruções",
        "rule-based-scaffold-title-2": "É importante ler informações sobre os tópicos.",
        "rule-based-scaffold-title-2-task-1": "(a) Anote informações importantes",
        "rule-based-scaffold-title-2-task-2": "(b) Selecione o que ler",
        "rule-based-scaffold-title-2-task-3": "(c) Verifique o tempo restante",
        "rule-based-scaffold-title-3": "É importante ler informações relevantes e revisar sua leitura.",
        "rule-based-scaffold-title-3-task-1": "(a) Revise anotações para verificar o aprendizado até agora",
        "rule-based-scaffold-title-3-task-2": "(b) Revise os objetivos de aprendizagem e as instruções",
        "rule-based-scaffold-title-3-task-3": "(c) Verifique a redação para determinar o que ler em seguida",
        "rule-based-scaffold-title-4": "É importante escrever uma boa redação.",
        "rule-based-scaffold-title-4-task-1": "(a) Verifique o tempo restante",
        "rule-based-scaffold-title-4-task-2": "(b) Verifique a rubrica de redação",
        "rule-based-scaffold-title-4-task-3": "(c) Faça um rascunho da redação transferindo seus aprendizados para os principais pontos do texto.",
        "rule-based-scaffold-title-5": "É importante escrever informações relevantes e verificar sua escrita.",
        "rule-based-scaffold-title-5-task-1": "(a) Verifique a rubrica de redação",
        "rule-based-scaffold-title-5-task-2": "(b) Edite sua redação",
        "rule-based-scaffold-title-5-task-3": "(c) Verifique os objetivos de aprendizagem e as instruções",
        "annotation-label-1": "Tomar nota",
        "annotation-label-2": "importante",
        "annotation-label-3": "útil",
        "annotation-label-4": "conceito",
        "annotation-label-5": "confuso",
        "product-visual-title": "Visualização do Produto",
        "product-visual-close-btn": "Fechar",
        "process-visual-title": "Visualização de Processo",
        "process-visual-set-goal-label": "Suas metas definidas",
        "process-visual-close-btn": "Fechar",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "",
        "annotation-toolbar-btn-hint": "Ferramenta de anotação",
        "annotation-search-toolbar-btn-hint": "Ferramenta de busca de anotações",
        "gpt-scaffold-toolbar-btn-hint": "Ferramenta de instrução",
        "essay-writing-toolbar-btn-hint": "Ferramenta de escrita",
        "planner-toolbar-btn-hint": "Ferramenta de planejamento",
        "multi-agents-single-window-toolbar-btn-hint": "Assistente de chat",
        "timer-toolbar-btn-hint": "Cronômetro",
        "like-response-text": "",
        "annotation-tool-data-label": "",
        "search-annotation-tool-data-label": "",
        "gpt-scaffold-tool-data-label": "",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "",
        "math-tool-data-label": "",
        "planner-tool-data-label": "",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": "",
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "",
        "chat-reminder-message-title": "",
        "scaffolding-message-title": "Feedback sobre o seu progresso atual:",
        "scaffold-chat-reminder": "Oi, você está envolvido com o chat há um tempo. Vamos voltar à tarefa principal!",
    },
    sk: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[Začiatok podmienok úlohy]]

Študent pracuje na úlohe písania eseje.

Nasleduje inštrukcia k úlohe:

Téma úlohy: Stratégia využitia obnoviteľnej energie pre severnú prímorskú komunitu

Bol/a si najatý/á ako energetický expert/ka, aby si pomohol/a severnej prímorskej komunite, ktorá sa nachádza v blízkosti hôr a čelí drsným, snežným zimám. Táto komunita sa v súčasnosti silne spolieha na fosílne palivá z iných miest, ktoré sú drahé, škodlivé pre životné prostredie a nespoľahlivé počas silných zimných búrok. 

Mesto hľadá riešenie, ktoré poskytne stabilné celoročné dodávky energie, časom ušetrí peniaze a ideálne vytvorí pracovné miesta pre miestnych obyvateľov. V tejto oblasti sú stále oceánske vetry a nachádza sa v blízkosti veľkých lesných zdrojov, ktoré sú spravované udržateľne. Prioritou komunity je však ochrana miestneho oceánskeho života a lesného prostredia.

Tvoja úloha:

Vymysli a napíš krátky plán, v ktorom odporučíš vyváženú stratégiu obnoviteľnej energie kombinujúcu dva typy obnoviteľnej energie. Jasne zdôvodni svoje odporúčania s tým, že uvedieš:

Ako každý zdroj obnoviteľnej energie zapadá do miestnych podmienok, klimatických výziev a energetických potrieb komunity.
Aké finančné aspekty má tento plán a aké sú jeho očakávané ekonomické výhody, vrátane vytvárania pracovných miest.
Aké sú jeho možné dopady na životné prostredie a ako tvoja stratégia znižuje riziká pre lesy a oceánsky život.
Táto úloha je časovo obmedzená na 45 minút.

Nasledujú kritériá, ktoré sú poskytnuté študentovi:

Tieto kritériá sa využívajú na hodnotenie eseje.

Esej musí obsahovať 200 až 300 slov. 
Nesmieš priamo kopírovať zo študijného materiálu ani z iných zdrojov - esej musí byť napísaná vlastnými slovami.

Nižšie sú kompletné hodnotiace kritériá:

1. Uveď zvolené zdroje energie:
Výborný (3): Jasne kombinuje dva typy energie a uvádza dôvody pre ich výber.
Dobrý (2): Spomína dva typy energie, ale ich výber nie je zdôvodnený dostatočne.
Základný (1): Uvádza iba jeden typ energie, alebo riešenie je nejasné; text neobsahuje žiadne alebo nedostatočné zdôvodnenie výberu energie.

2. Využitie geografických a klimatických detailov:
Výborný (3): Jasne vysvetľuje, ako obidva typy energie zapadajú do miestnej geografie a klímy.
Dobrý (2): Uvádza niektoré detaily o miestnej geografii/klíme, ale nie sú spojené s výberom energie.
Základný (1): Málo alebo žiadne využitie miestnych detailov; výber energie neodpovedá situácii.

3. Ekonomické výhody a pracovné miesta:
Výborný (3): Jasné vysvetlenie toho, ako plán šetrí peniaze a vytvára pracovné miesta.
Dobrý (2): Spomína peniaze alebo pracovné miesta, ale uvádza len málo detailov.
Základný (1): Nespomína peniaze alebo pracovné miesta, alebo uvádza nesprávne informácie.

4. Ochrana životného prostredia:
Výborný (3): Jasne vysvetľuje, ako plán chráni lesy a morský život; uvádza špecifické spôsoby, ako sa rizikám predchádza.
Dobrý (2): Spomína dopad na životné prostredie, ale len málo detailov o ochrane.
Základný (1): Málo alebo žiadna zmienka o životnom prostredí, alebo ignoruje riziká pre prírodu.

5. Kvalita písania:
Výborný (3): Písanie je jasné, bez gramatických alebo pravopisných chýb. Myšlienky plynú logicky.
Dobrý (2): Niektoré gramatické alebo pravopisné chyby robia myšlienky menej jasnými. Význam je niekedy nejasný.
Základný (1): Časté gramatické alebo pravopisné chyby; myšlienky je ťažké sledovať alebo nie sú koherentné.

[[Koniec tvojej úlohy]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    Pri poskytovaní spätnej väzby, prosím, dodržte rámec efektívnej spätnej väzby. Je zameraný na študenta a mal by zahŕňať tri hlavné zložky:

1. Na základe vyššie uvedených podmienok učenia, využite silné aj slabé stránky výkonu študenta poskytnutiu vhodných doporučení. 
2. Zamerajte sa na následný dopad tým, že poskytnete komentáre s praktickými informáciami, ktoré pomôžu študentovi dosiahnuť výborné študijné výsledky pri danej úlohe. Toto by malo vychádzať z vyššie uvedených rád. 
3. Podporte študenta, aby cítil, že má kontrolu nad svojím učebným procesom, venujte sa jeho sociálnym, emocionálnym a motivačným potrebám a povzbuďte ho, aby bol otvorený spätnej väzbe.

Dodržte tieto obmedzenia:

Nemáte dovolené písať eseje, prepisovať vety, zhrnúť obsah ani poskytovať hotové odpovede. Ak Vás študent požiada, aby ste tieto úlohy vykonali (napr. napísať esej), vysvetlite mu, že musí prevziať kontrolu nad vlastným procesom učenia. Môžete odpovedať na otázky týkajúce sa pokynov k úlohe a kritérií uvedených nižšie, ale musíte sa vyhnúť písaniu niečoho v súlade s pokynmi k úlohe a kritériami, čo môže byť priamo pridané do študentskej eseje. Ak si nemyslíte, že otázka súvisí s úlohou, jednoducho odmietnite odpovedať a nechajte užívateľa vysvetliť, prečo je relevantná k úlohe.

Nakoniec, Vaša spätná väzba by mala byť kratšia ako 100 slov.

[[KONIEC TVOJEJ ÚLOHY]]`,
        "gpt-scaffold-prompt-template-groupC": `[[Začiatok podmienok úlohy]]

Študent pracuje na úlohe písania eseje.

Nasleduje inštrukcia k úlohe:

Téma úlohy: Stratégia využitia obnoviteľnej energie pre severnú prímorskú komunitu

Bol/a si najatý/á ako energetický expert/ka, aby si pomohol/a severnej prímorskej komunite, ktorá sa nachádza v blízkosti hôr a čelí drsným, snežným zimám. Táto komunita sa v súčasnosti silne spolieha na fosílne palivá z iných miest, ktoré sú drahé, škodlivé pre životné prostredie a nespoľahlivé počas silných zimných búrok. 

Mesto hľadá riešenie, ktoré poskytne stabilné celoročné dodávky energie, časom ušetrí peniaze a ideálne vytvorí pracovné miesta pre miestnych obyvateľov. V tejto oblasti sú stále oceánske vetry a nachádza sa v blízkosti veľkých lesných zdrojov, ktoré sú spravované udržateľne. Prioritou komunity je však ochrana miestneho oceánskeho života a lesného prostredia.

Tvoja úloha:

Vymysli a napíš krátky plán, v ktorom odporučíš vyváženú stratégiu obnoviteľnej energie kombinujúcu dva typy obnoviteľnej energie. Jasne zdôvodni svoje odporúčania s tým, že uvedieš:

Ako každý zdroj obnoviteľnej energie zapadá do miestnych podmienok, klimatických výziev a energetických potrieb komunity.
Aké finančné aspekty má tento plán a aké sú jeho očakávané ekonomické výhody, vrátane vytvárania pracovných miest.
Aké sú jeho možné dopady na životné prostredie a ako tvoja stratégia znižuje riziká pre lesy a oceánsky život.
Táto úloha je časovo obmedzená na 45 minút.

Nasledujú kritériá, ktoré sú poskytnuté študentovi:

Tieto kritériá sa využívajú na hodnotenie eseje.

Esej musí obsahovať 200 až 300 slov. 
Nesmieš priamo kopírovať zo študijného materiálu ani z iných zdrojov - esej musí byť napísaná vlastnými slovami.

Nižšie sú kompletné hodnotiace kritériá:

1. Uveď zvolené zdroje energie:
Výborný (3): Jasne kombinuje dva typy energie a uvádza dôvody pre ich výber.
Dobrý (2): Spomína dva typy energie, ale ich výber nie je zdôvodnený dostatočne.
Základný (1): Uvádza iba jeden typ energie, alebo riešenie je nejasné; text neobsahuje žiadne alebo nedostatočné zdôvodnenie výberu energie.

2. Využitie geografických a klimatických detailov:
Výborný (3): Jasne vysvetľuje, ako obidva typy energie zapadajú do miestnej geografie a klímy.
Dobrý (2): Uvádza niektoré detaily o miestnej geografii/klíme, ale nie sú spojené s výberom energie.
Základný (1): Málo alebo žiadne využitie miestnych detailov; výber energie neodpovedá situácii.

3. Ekonomické výhody a pracovné miesta:
Výborný (3): Jasné vysvetlenie toho, ako plán šetrí peniaze a vytvára pracovné miesta.
Dobrý (2): Spomína peniaze alebo pracovné miesta, ale uvádza len málo detailov.
Základný (1): Nespomína peniaze alebo pracovné miesta, alebo uvádza nesprávne informácie.

4. Ochrana životného prostredia:
Výborný (3): Jasne vysvetľuje, ako plán chráni lesy a morský život; uvádza špecifické spôsoby, ako sa rizikám predchádza.
Dobrý (2): Spomína dopad na životné prostredie, ale len málo detailov o ochrane.
Základný (1): Málo alebo žiadna zmienka o životnom prostredí, alebo ignoruje riziká pre prírodu.

5. Kvalita písania:
Výborný (3): Písanie je jasné, bez gramatických alebo pravopisných chýb. Myšlienky plynú logicky.
Dobrý (2): Niektoré gramatické alebo pravopisné chyby robia myšlienky menej jasnými. Význam je niekedy nejasný.
Základný (1): Časté gramatické alebo pravopisné chyby; myšlienky je ťažké sledovať alebo nie sú koherentné.

[[Koniec tvojej úlohy]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        Pri poskytovaní spätnej väzby, prosím, dodržte rámec efektívnej spätnej väzby. Je zameraný na študenta a mal by zahŕňať tri hlavné zložky:

1. Na základe vyššie uvedených podmienok učenia, využite silné aj slabé stránky výkonu študenta poskytnutiu vhodných doporučení. 
2. Zamerajte sa na následný dopad tým, že poskytnete komentáre s praktickými informáciami, ktoré pomôžu študentovi dosiahnuť výborné študijné výsledky pri danej úlohe. Toto by malo vychádzať z vyššie uvedených rád. 
3. Podporte študenta, aby cítil, že má kontrolu nad svojím učebným procesom, venujte sa jeho sociálnym, emocionálnym a motivačným potrebám a povzbuďte ho, aby bol otvorený spätnej väzbe.

Dodržte tieto obmedzenia:

Nemáte dovolené písať eseje, prepisovať vety, zhrnúť obsah ani poskytovať hotové odpovede. Ak Vás študent požiada, aby ste tieto úlohy vykonali (napr. napísať esej), vysvetlite mu, že musí prevziať kontrolu nad vlastným procesom učenia. Môžete odpovedať na otázky týkajúce sa pokynov k úlohe a kritérií uvedených nižšie, ale musíte sa vyhnúť písaniu niečoho v súlade s pokynmi k úlohe a kritériami, čo môže byť priamo pridané do študentskej eseje. Ak si nemyslíte, že otázka súvisí s úlohou, jednoducho odmietnite odpovedať a nechajte užívateľa vysvetliť, prečo je relevantná k úlohe.

Nakoniec, Vaša spätná väzba by mala byť kratšia ako 100 slov.

[[KONIEC TVOJEJ ÚLOHY]]`,
        "annotation-notes-title": "Panel poznámok",
        "annotation-notes-delete-confirm-message": "Chcete odstrániť?",
        "annotation-write-note-placeholder": "Sem píšte poznámky...",
        "annotation-tag-placeholder": "Zadajte nové značky a stlačte Enter...",
        "annotation-note-save-btn-text": "Uložiť",
        "annotation-note-cancel-btn-text": "Zrušiť",
        "annotation-search-btn-text": "Hľadať",
        "annotation-search-panel-input-placeholder": "Zadajte kľúčové slová na vyhľadávanie...",
        "scaffolding-title": "Panel s inštrukciami",
        "scaffolding-create-checklist-btn-text": "Vytvoriť kontrolný zoznam",
        "scaffolding-edit-checklist-btn-text": "Upraviť",
        "scaffolding-unread-message-text": "Neprečítaná správa",
        "scaffolding-chat-open-text": "Chat otvorený",
        "gpt-scaffolding-title": "Panel inštrukcií",
        "planner-title": "Plánovač",
        "planner-learning-strategy-select-label-text": "1. Vytvor si plán pre písanie eseje:",
        "planner-learning-strategy-select-option1-text": "Vyber stratégiu",
        "planner-learning-strategy-select-customise-option-text": "Použi vlastnú stratégiu",
        "planner-add-more-customise-strategy-btn-text": "Pridať ďalšiu stratégiu",
        "planner-customise-option-hint-textarea-placeholder": "Prosím vysvetlite, prečo ste navrhli tento plán",
        "planner-next-btn-text": "Ďalší",
        "planner-time-unit-minute": "minút",
        "planner-display-plan-title": "Môj plán učenia",
        "planner-display-overall-strategy-label": "Celková stratégia:",
        "planner-display-time-allocation-label": "Rozdelenie času:",
        "planner-display-writing-strategy-label": "Stratégia písania:",
        "planner-display-reading-strategy-label": "Stratégia čítania:",
        "planner-customise-plan-reason-placeholder": "(Voliteľné)",
        "essay-title": "Nástroj na písanie esejí",
        "essay-save-btn-text": "Uložiť esej",
        "essay-writing-placeholder": "Sem píšte esej...",
        "essay-show-word-count-btn-text": "Počet slov",
        "essay-save-toast-text": "Vaša esej bola uložená!",
        "dictionary-title": "Slovníkový nástroj",
        "dictionary-send-btn-text": "Odoslať",
        "dictionary-panel-input-placeholder": "Zadajte hľadané slovo...",
        "checklist-title": "Nástroj kontrolného zoznamu",
        "checklist-basic-panel-title": "Základné",
        "checklist-academic-panel-title": "Akademické",
        "checklist-originality-panel-title": "Originalita",
        "checklist-integration-panel-title": "Integrácia a rozpracovanie",
        "checklist-analyse-btn-text": "Analyzovať",
        "chatgpt-title": "AI asistent",
        "chatgpt-send-btn-text": "Odoslať",
        "chatgpt-panel-input-placeholder": "Spýtajte sa otázku...",
        "chatteacher-title": "Nástroj Opýtaj sa učiteľa",
        "chatteacher-panel-input-placeholder": "Spýtajte sa otázku...",
        "chatteacher-connect-server-status-text": "Stav pripojenia k serveru",
        "chatteacher-teacher-online-status-text": "Status učiteľa online",
        "chatteacher-send-btn-text": "Odoslať",
        "chatgpt-role-description": "Ste užitočný asistent, prosím odpovedajte na otázky na základe poskytnutého textu.",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `Až doteraz v tejto výučbovej lekcii študenti, ktorí si v úlohe viedli dobre, priebežne sledovali časový limit pomocou poskytnutého časovača. V prípade tohto študenta sa zdá, že to tak nebolo. Mohli by ste mu, prosím, poskytnúť spätnú väzbu v podobe jedného odseku (bez odrážok a číslovaných zoznamov) o tom, ako môže lepšie sledovať časový limit pomocou časovača, ktorý sa nachádza na paneli nástrojov ako tlačidlo s ikonou hodín. Zároveň prosím dôkladne zohľadnite všetky nasledujúce podmienky jeho učenia:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `Až do tohto bodu výukovej lekcie študenti, ktorí si v tejto úlohe viedli dobre, dbali na to, aby sa priebežne vracali k zadaniu úlohy a ku kritériám hodnotenia, aby zhodnotili svoj návrh eseje a overili, či ich písanie zodpovedá požiadavkám úlohy a kritériám hodnotenia. V prípade tohto študenta sa zdá, že tomu tak nie je. Mohli by ste, prosím, poskytnúť študentovi spätnú väzbu vo forme odstavca (nepoužívajte odrážky a číslované zoznamy) ohľadom použitia informácií z pokynov a kritérií hodnotenia, pričom sa budete snažiť VYHÝBAŤ poskytovaniu podrobných inštrukcií o tom, čo by esej mala obsahovať. Zároveň prosím komplexne zvážte všetky nasledujúce podmienky učenia tohto študenta:`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": `Máme študenta, ktorý pracuje na tejto úlohe. Do 14. minúty učebnej aktivity úspešní študenti pravidelne kontrolovali inštrukcie a rubriku. Tento študent to nerobí. Na základe všetkých poskytnutých informácií (požiadavky úlohy, rubrika, študijné materiály) a berúc do úvahy podmienky tohto študenta, poskytnite mu spätnú väzbu vo forme odseku (nepoužívajte odrážky ani číslované zoznamy) o tom, ako má až do konca písania pravidelne kontrolovať inštrukcie a rubriku.`,
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `Až do tohto bodu výukovej lekcie si študenti, ktorí si v tejto úlohe viedli dobre, overili, že plne rozumejú zadaniu a kritériám hodnotenia. V prípade tohto študenta sa zdá, že tomu tak nie je. Mohli by ste, prosím, poskytnúť študentovi spätnú väzbu vo forme odstavca (nepoužívajte odrážky a číslované zoznamy) o tom, ako zlepšiť porozumenie zadaniu a kritériám hodnotenia a podporiť tak študentovo sebauvedomenie ohľadom súladu eseje so zadaním úlohy a kritériami hodnotenia, pričom sa budete snažiť VYHÝBAŤ poskytovaniu podrobných inštrukcií o tom, čo by esej mala obsahovať. Zároveň prosím komplexne zvážte všetky nasledujúce podmienky učenia tohto študenta:`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `Až do tohto bodu výukovej lekcie študenti, ktorí si v tejto úlohe viedli dobre, dbali na to, aby si pomocou poskytnutého časovača boli vedomí časového limitu pre danú úlohu a zároveň jasne rozumeli zadaniu a kritériám hodnotenia. V prípade tohto študenta sa zdá, že tomu tak nie je. Mohli by ste, prosím, poskytnúť študentovi spätnú väzbu vo forme odstavca (nepoužívajte odrážky a číslované zoznamy), ktorá kombinuje rady vo všetkých týchto oblastiach, ako zlepšiť sledovanie časových obmedzení pomocou časovača, ktorý je zobrazený ako tlačidlo s ikonou hodín na paneli nástrojov, a ako zlepšiť svoje porozumenie pokynom a kritériám hodnotenia a podporiť tak študentovo sebauvedomenie ohľadom súladu eseje so zadaním úlohy a kritériami hodnotenia, pričom sa budete snažiť VYHÝBAŤ poskytovaniu podrobných inštrukcií o tom, čo by esej mala obsahovať. Zároveň prosím komplexne zvážte všetky nasledujúce podmienky učenia u tohto študenta:`,
        "gpt-scaffold-need-check-srl-prompt-OR2": `Máme študenta, ktorý pracuje na tejto úlohe. Do 21. minúty tí úspešní už začali zahrňovať informácie z čítaného textu do svojich esejí. Tento študent nie. S ohľadom na všetky poskytnuté informácie a podmienky tohto študenta mu poskytnite spätnú väzbu vo forme odseku (nepoužívajte odrážky a číslovanie) o tom, ako začleniť informácie z textu do návrhu eseje podľa požiadaviek úlohy.`,
        "gpt-scaffold-need-check-srl-prompt-OT2": `Až do tohto bodu výukovej lekcie študenti, ktorí si v tejto úlohe viedli dobre, dbali na to, aby vysvetľovali myšlienky vlastnými slovami na základe prečítaného materiálu. V prípade tohto študenta sa zdá, že tomu tak nie je. Mohli by ste, prosím, poskytnúť študentovi spätnú väzbu vo forme odstavca (nepoužívajte odrážky a číslované zoznamy) o tom, ako je dôležité vysvetľovať myšlienky vlastnými slovami a zároveň tým preukázať porozumenie prečítanému materiálu. Zároveň prosím komplexne zvážte všetky nasledujúce podmienky učenia u tohto študenta:`,
        "gpt-scaffold-user-take-pre-study-prompt": "Tento študent sa zúčastnil predchádzajúcej štúdie, takže už má určitú úroveň znalostí o úlohe.",
        "gpt-scaffold-isdimu-prompt-0": "Zdá sa, že tento študent má dobré porozumenie metakognitívnemu uvedomeniu.",
        "gpt-scaffold-isdimu-prompt-16": "Zdá sa, že tento študent má nízke metakognitívne uvedomenie.",
        "gpt-scaffold-isdimu-prompt-32": "Zdá sa, že tento študent má čiastočné metakognitívne uvedomenie.",
        "gpt-scaffold-pretest-grades-prompt-0": "Tento/táto študent/ka má vysokú úroveň vedomostí o obnoviteľnej energii.",
        "gpt-scaffold-pretest-grades-prompt-5": "Tento/táto študent/ka má nízku úroveň vedomostí o obnoviteľnej energii.",
        "gpt-scaffold-pretest-grades-prompt-10": "Tento/táto študent/ka má strednú úroveň vedomostí o obnoviteľnej energii.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "Tento/táto študent/ka rozumie tomu, ako sa učí najlepšie, a dokáže si zvoliť vhodné stratégie učenia.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "Tento/táto študent/ka si nie je istý/á v tom, čo mu/jej pomáha pri učení, ani ktoré stratégie pre neho/ňu fungujú najlepšie.",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "Tento/táto študent/ka má určité znalosti o stratégiách efektívneho učenia sa a vie pomenovať niekoľko stratégií, ktoré mu/jej pomáhajú.",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "Tento/táto študent/ka plánuje, monitoruje a reguluje svoje učenie, aby dosiahol/a lepšie výsledky.",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "Tento/táto študent/ka neplánuje dopredu ani nesleduje svoje učenie počas práce.",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "Tento/táto študent/ka venuje čiastočnú pozornosť plánovaniu a kontrole svojho učenia počas riešenia úlohy.",
        "gpt-scaffold-test-mai-name": "Aktivita 3: Dotazník metakognitívneho uvedomenia",
        "gpt-scaffold-test-isdimu-name": "Aktivita 3: ISDIMU",
        "gpt-scaffold-pretest-name": "Aktivita 2: Znalosti o obnovitelnej energii",
        "gpt-scaffold-check-take-previous-study-name": "Aktivita 1: O vás",
        "gpt-scaffold-planner-select-prompt-1": "Tento/táto študent/ka prišiel/prišla s plánom [Najprv prečítaj, potom začni písať] pre túto úlohu.",
        "gpt-scaffold-planner-select-prompt-2": "Tento/táto študent/ka prišiel/prišla s plánom [Čítanie a písanie súčasne] pre túto úlohu.",
        "gpt-scaffold-planner-select-prompt-3": "Tento/táto študent/ka prišiel/prišla s plánom [Píš intenzívne, čítaj selektívne] pre túto úlohu.",
        "gpt-scaffold-planner-select-prompt-4": "Tento študent si zvolil plán [vytvoriť vlastný plán] pre túto úlohu",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "Tento/táto študent/ka nevytvoril/a jasný plán, ako bude riešiť túto úlohu.",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "Tento/táto študent/ka vytvoril/a jasný plán, ako bude postupovať pri plnení úlohy.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "Tento/táto študent/ka si nie je vedomý/á času, ktorý zostáva na dokončenie úlohy.",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "Tento/táto študent/ka si je vedomý/á času, ktorý zostáva na dokončenie úlohy.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "Tento/táto študent/ka si nie je vedomý/á nástrojov, ktoré má k dispozícii a ktoré mu/jej môžu pomôcť pri plnení úlohy.",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "Tento/táto študent/ka si je vedomý/á nástrojov, ktoré má k dispozícii a ktoré mu/jej môžu pomôcť pri plnení úlohy.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "Tento/táto študent/ka si nie je vedomý/á dostupných študijných materiálov, ktoré mu môžu pomôcť s úlohou.",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "Tento/táto študent/ka si je vedomý/á dostupných študijných materiálov, ktoré mu môžu pomôcť s úlohou.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "Tento/táto študent/ka si nie je vedomý/á hodnotiacich kritérií.",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "Tento/táto študent/ka si je vedomý/á hodnotiacich kritérií.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "Tento/táto študent/ka si nie je vedomý/á zadania k úlohe.",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "Tento/táto študent/ka si je vedomý/á zadania k úlohe.",
        "gpt-scaffold-role-description": "Ste užitočný asistent, prosím poskytujte návrhy na základe daného textu.",
        "planner-customise-step2-instruction": "Opíš detailne svoj plán na písanie eseje, ktorý plánuješ použiť a ako si rozdelíš svoj čas. Môžeš tiež uviesť dôvody, prečo si zvolil/a práve túto stratégiu a toto rozloženie času.",
        "planner-reading-strategy-1": "Budem materiál čítať stránku po stránke.",
        "planner-reading-strategy-2": "Najprv si materiál rýchlo prebehnem a potom si ho podrobne prečítam.",
        "planner-reading-strategy-3": "Použijem zvýrazňovač na označenie kľúčového obsahu.",
        "planner-reading-strategy-4": "Počas čítania si budem priebežne robiť poznámky.",
        "planner-reading-strategy-5": "Budem čítať podľa otázok, so zameraním na konkrétny obsah.",
        "planner-reading-strategy-6": "Budem čítať selektívne a vynechávať menej dôležitý obsah.",
        "planner-reading-strategy-instruction": "Aké čitateľské stratégie plánuješ použiť (možnosť výberu viacerých odpovedí)?",
        "planner-writing-strategy-1": "Najprv navrhnem štruktúru eseje a potom doplním detaily",
        "planner-writing-strategy-2": "Pri písaní eseje používam svoje poznámky a zvýraznené časti textu",
        "planner-writing-strategy-3": "Znovu si prejdem zadanie a hodnotiace kritériá, aby som písal/a podľa požiadaviek",
        "planner-writing-strategy-4": "Skopírujem si kľúčové vety a potom ich preformulujem vlastnými slovami",
        "planner-writing-strategy-5": "Použijem osnovu a spôsoby písania eseje, ktoré som sa naučil/a",
        "planner-writing-strategy-instruction": "Aké stratégie písania plánuješ využiť (možnosť výberu viacerých odpovedí)?",
        "planner-main-strategy-1": "Najprv prečítaj, potom začni písať",
        "planner-main-strategy-1-instruction": "Koľko času plánuješ venovať čítaniu a písaniu?",
        "planner-main-strategy-1-task-1": "2.1 Čas venovaný čítaniu",
        "planner-main-strategy-1-task-2": "2.2 Čas venovaný písaniu",
        "planner-main-strategy-2": "Čítanie a písanie súčasne",
        "planner-main-strategy-2-instruction": "Koľko času plánuješ stráviť každou témou?",
        "planner-main-strategy-2-task-1": "2.1 Čítanie/písanie o výbere energie",
        "planner-main-strategy-2-task-2": "2.2 Čítanie/písanie o nákladoch a ekonomických prínosoch",
        "planner-main-strategy-2-task-3": "2.3 Čítanie/písanie o dopadoch na životné prostredie",
        "planner-main-strategy-3": "Píš intenzívne, čítaj selektívne",
        "planner-main-strategy-3-instruction": "Koľko času plánuješ stráviť jednotlivými fázami písania?",
        "planner-main-strategy-3-task-1": "2.1 Plánovanie štruktúry eseje:",
        "planner-main-strategy-3-task-2": "2.2 Písanie prvej verzie eseje:",
        "planner-main-strategy-3-task-3": "2.3 Čítanie doplňujúcich informácií relevantných pre esej:",
        "planner-main-strategy-3-task-4": "2.4 Kontrola a vylepšenie eseje:",
        "planner-customise-plan-title": "Pridať ďalšiu stratégiu",
        "planner-select-main-strategy-hint": "Prosím vyberte jednu stratégiu, aby ste pokračovali!!!",
        "planner-allocate-time-hint": "Prosím priraďte čas všetkým úlohám a celkový čas musí byť v rámci požadovaného!!!",
        "planner-select-reading-writing-strategy-hint": "Prosím vyberte zručnosti, ktoré plánujete použiť!!!",
        "planner-save-plan-hint": "Plán prispôsobenia",
        "rule-based-scaffold-title-1": "Je dôležité pochopiť, o čom je úloha.",
        "rule-based-scaffold-title-1-task-1": "(a) Použite ponuku na získanie prehľadu a prelistovanie textu",
        "rule-based-scaffold-title-1-task-2": "(b) Skontrolujte rubriku eseje",
        "rule-based-scaffold-title-1-task-3": "(c) Skontrolujte ciele učenia a inštrukcie",
        "rule-based-scaffold-title-2": "Je dôležité čítať informácie o témach.",
        "rule-based-scaffold-title-2-task-1": "(a) Poznačte si dôležité informácie",
        "rule-based-scaffold-title-2-task-2": "(b) Vyberte, čo čítať",
        "rule-based-scaffold-title-2-task-3": "(c) Skontrolujte zostávajúci čas",
        "rule-based-scaffold-title-3": "Je dôležité čítať relevantné informácie a prehodnotiť svoje čítanie.",
        "rule-based-scaffold-title-3-task-1": "(a) Skontrolujte anotácie, aby ste overili doterajšie učenie",
        "rule-based-scaffold-title-3-task-2": "(b) Skontrolujte ciele učenia a inštrukcie",
        "rule-based-scaffold-title-3-task-3": "(c) Skontrolujte esej, aby ste určili, čo čítať ďalej",
        "rule-based-scaffold-title-4": "Je dôležité napísať dobrú esej.",
        "rule-based-scaffold-title-4-task-1": "(a) Skontrolujte zostávajúci čas",
        "rule-based-scaffold-title-4-task-2": "(b) Skontrolujte rubriku eseje",
        "rule-based-scaffold-title-4-task-3": "(c) Napíšte návrh eseje prenesením učenia do hlavných bodov",
        "rule-based-scaffold-title-5": "Je dôležité písať relevantné informácie a kontrolovať svoje písanie.",
        "rule-based-scaffold-title-5-task-1": "(a) Skontrolujte rubriku eseje",
        "rule-based-scaffold-title-5-task-2": "(b) Upraviť svoju esej",
        "rule-based-scaffold-title-5-task-3": "(c) Skontrolujte ciele učenia a inštrukcie",
        "annotation-label-1": "Vytvoriť poznámku",
        "annotation-label-2": "Dôležité",
        "annotation-label-3": "Užitočné",
        "annotation-label-4": "Koncept",
        "annotation-label-5": "Mätúci",
        "product-visual-title": "Vizualizácia produktu",
        "product-visual-close-btn": "Zavrieť",
        "process-visual-title": "Vizualizácia procesu",
        "process-visual-set-goal-label": "Vaše stanovené ciele",
        "process-visual-close-btn": "Zavrieť",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "Panel s poznámkami",
        "annotation-search-toolbar-btn-hint": "Nástroj na vyhľadávanie poznámok",
        "gpt-scaffold-toolbar-btn-hint": "Nástroj inštrukcií",
        "essay-writing-toolbar-btn-hint": "Nástroj písania",
        "planner-toolbar-btn-hint": "Plánovač",
        "multi-agents-single-window-toolbar-btn-hint": "Chat asistent",
        "timer-toolbar-btn-hint": "Časovač",
        "like-response-text": "Páči sa vám táto odpoveď?",
        "annotation-tool-data-label": "Nástroj poznámok",
        "search-annotation-tool-data-label": "Vyhľadávač poznámok",
        "gpt-scaffold-tool-data-label": "Nástroj inštrukcií",
        "process-visual-tool-data-label": "Nástroj procesu",
        "essay-product-visual-tool-data-label": "Nástroj produktu eseje",
        "collaborate-writing-tool-data-label": "Nástroj spolupráce pri písaní",
        "essay-writing-tool-data-label": "Nástroj písania",
        "math-tool-data-label": "Matematický nástroj",
        "planner-tool-data-label": "Plánovač",
        "checklist-tool-data-label": "Nástroj analýzy písania",
        "multi-agents-single-window-tool-data-label": "Nástroj chatbotu",
        "dictionary-tool-data-label": "Slovníkový nástroj",
        "timer-tool-data-label": "Časovač",
        "questionnaire-tool-data-label": "Dotazníkový nástroj",
        "chat-reminder-message": `
Tento chatbot je pre teba teraz k dispozícii. Chatbota nemôžeš použiť na napísanie svojej eseje.`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "Vlož text na začatie chatu",
        "chat-reminder-message-title": "Pripomienka",
        "scaffolding-message-title": "Spätná väzba k vášmu aktuálnemu pokroku:",
        "scaffold-chat-reminder": "Ahoj, už si chvíľu chatujeme. Poďme sa vrátiť k hlavnej úlohe!",
    },
    tha: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[เงื่อนไขเริ่มต้นของงาน]]
นักเรียนกำลังทำภารกิจการเขียนเรียงความ
คำชี้แจงของงานมีดังนี้:
หัวข้อของงาน: กลยุทธ์พลังงานหมุนเวียนสำหรับชุมชนชายฝั่งตอนเหนือ
คุณได้รับการว่าจ้างให้เป็นผู้เชี่ยวชาญด้านพลังงาน เพื่อให้คำปรึกษาแก่ชุมชนชายฝั่งตอนเหนือที่ตั้งอยู่ใกล้ภูเขา และเผชิญกับฤดูหนาวที่รุนแรงและมีหิมะตกหนัก ชุมชนแห่งนี้พึ่งพาพลังงานฟอสซิลที่นำเข้ามาเป็นหลัก ซึ่งมีต้นทุนสูง ส่งผลกระทบต่อสิ่งแวดล้อม และไม่มั่นคงในช่วงพายุฤดูหนาวรุนแรง เมืองนี้ต้องการหาทางออกที่สามารถจัดหาพลังงานได้อย่างมั่นคงตลอดทั้งปี ลดค่าใช้จ่ายในระยะยาว และในอุดมคติควรช่วยสร้างงานให้กับคนในท้องถิ่น พื้นที่นี้มีลมทะเลที่พัดคงที่บริเวณนอกชายฝั่ง และอยู่ใกล้กับทรัพยากรป่าไม้ที่มีการจัดการอย่างยั่งยืน อย่างไรก็ตาม การอนุรักษ์ความหลากหลายทางชีวภาพทางทะเลและระบบนิเวศป่ายังคงเป็นสิ่งที่ชุมชนให้ความสำคัญเป็นลำดับต้น ๆ
ภารกิจของคุณ:
เขียนข้อเสนอฉบับสั้นเพื่อแนะนำ กลยุทธ์พลังงานหมุนเวียนแบบผสมผสาน ที่รวมพลังงานหมุนเวียนสองประเภทเข้าด้วยกัน พร้อมให้เหตุผลที่ชัดเจนโดยอธิบายว่า
•        พลังงานหมุนเวียนแต่ละประเภทเหมาะสมกับภูมิประเทศ ภูมิอากาศ และความต้องการพลังงานของพื้นที่อย่างไร
•        ความเป็นไปได้ทางการเงินและประโยชน์ทางเศรษฐกิจที่คาดว่าจะได้รับ รวมถึงการสร้างงานในท้องถิ่น
•        ผลกระทบต่อสิ่งแวดล้อมที่อาจเกิดขึ้น และวิธีที่กลยุทธ์ของคุณจะช่วยลดความเสี่ยงต่อระบบนิเวศป่าไม้และสิ่งมีชีวิตทางทะเล
เวลาที่กำหนดสำหรับงานนี้คือ 45 นาที

เกณฑ์การประเมินผลการเขียน (Rubric) ที่ให้นักเรียนใช้ในการเขียนเรียงความ
เกณฑ์นี้ใช้สำหรับประเมินเรียงความของคุณ
ข้อกำหนดของเรียงความ:
•        ความยาวของเรียงความอยู่ระหว่าง 200–300 คำ
•        ห้ามคัดลอกข้อความโดยตรง จากบทอ่านหรือจากแหล่งอื่น — เรียงความต้องเขียนด้วย สำนวนของคุณเอง

รายละเอียดด้านล่างนี้คือเกณฑ์การให้คะแนนฉบับสมบูรณ์:
1. การระบุแหล่งพลังงานที่เลือกใช้
•        ดีเยี่ยม (3 คะแนน): ระบุพลังงานหมุนเวียน 2 ประเภทอย่างชัดเจน พร้อมให้เหตุผลสำหรับทั้งสองประเภท
•        ดี (2 คะแนน): ระบุพลังงานหมุนเวียน 2 ประเภท แต่ให้คำอธิบายน้อยหรือไม่ชัดเจน
•        พื้นฐาน (1 คะแนน): ระบุเพียงประเภทเดียว หรือคำตอบไม่ชัดเจน และไม่มีคำอธิบายที่เพียงพอ

2. การใช้ข้อมูลภูมิศาสตร์และภูมิอากาศในท้องถิ่น
•        ดีเยี่ยม (3 คะแนน): อธิบายอย่างชัดเจนว่าพลังงานทั้งสองประเภทเหมาะสมกับภูมิประเทศและภูมิอากาศของพื้นที่อย่างไร
•        ดี (2 คะแนน): กล่าวถึงลักษณะภูมิประเทศหรือภูมิอากาศบ้าง แต่ไม่เชื่อมโยงกับการเลือกพลังงานอย่างชัดเจน
•        พื้นฐาน (1 คะแนน): แทบไม่ได้กล่าวถึงข้อมูลท้องถิ่น หรือการเลือกพลังงานไม่สอดคล้องกับบริบทของพื้นที่
3. ประโยชน์ทางเศรษฐกิจและการสร้างงาน
•        ดีเยี่ยม (3 คะแนน): อธิบายอย่างชัดเจนว่ากลยุทธ์ช่วยลดต้นทุนและสร้างงานในท้องถิ่นได้อย่างไร
•        ดี (2 คะแนน): กล่าวถึงเรื่องต้นทุนหรือการจ้างงาน แต่ให้รายละเอียดน้อย
•        พื้นฐาน (1 คะแนน): ไม่กล่าวถึงเรื่องต้นทุนหรือการจ้างงาน หรือให้ข้อมูลที่ไม่ถูกต้อง
4. การอนุรักษ์สิ่งแวดล้อม
•        ดีเยี่ยม (3 คะแนน): อธิบายอย่างชัดเจนว่ากลยุทธ์ของคุณช่วยปกป้องป่าไม้และสิ่งมีชีวิตทางทะเลอย่างไร พร้อมระบุวิธีลดความเสี่ยงที่เฉพาะเจาะจง
•        ดี (2 คะแนน): กล่าวถึงผลกระทบต่อสิ่งแวดล้อม แต่ไม่ให้รายละเอียดเกี่ยวกับแนวทางป้องกัน
•        พื้นฐาน (1 คะแนน): แทบไม่ได้กล่าวถึงสิ่งแวดล้อม หรือเพิกเฉยต่อความเสี่ยงทางธรรมชาติ
5. คุณภาพของการเขียน
•        ดีเยี่ยม (3 คะแนน): การเขียนชัดเจน ไม่มีข้อผิดพลาดทางไวยากรณ์หรือการสะกดคำ ความคิดเรียงลำดับอย่างมีเหตุผล
•        ดี (2 คะแนน): มีข้อผิดพลาดทางไวยากรณ์หรือการสะกดบ้าง ทำให้ความหมายบางส่วนไม่ชัดเจน
•        พื้นฐาน (1 คะแนน): มีข้อผิดพลาดทางไวยากรณ์หรือการสะกดจำนวนมาก ทำให้เนื้อหายากต่อการเข้าใจหรือไม่เป็นลำดับ

[[สิ้นสุดเงื่อนไขของงาน]]

[[เริ่มต้นงานของคุณ]]

    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    ในการให้ข้อเสนอแนะ โปรดปฏิบัติตามกรอบในการให้ข้อเสนอแนะที่มีประสิทธิผล (Effective Feedback Framework) ซึ่งมีลักษณะเน้นผู้เรียนเป็นศูนย์กลาง และประกอบด้วย 3 องค์ประกอบหลัก ดังนี้
1. การอิงตามสภาพการเรียนรู้ของผู้เรียน โดยให้ข้อเสนอแนะที่สะท้อนถึงทั้งจุดแข็งและจุดที่ต้องปรับปรุงของผู้เรียน เพื่อให้ครูรับทราบผลจากการสอนและการแนะนำของตน
2. การมุ่งเน้นผลกระทบที่จะตามมา โดยการให้ข้อมูลที่นำไปปฏิบัติได้ เพื่อช่วยให้ผู้เรียนปรับปรุงและบรรลุผลการเรียนรู้ที่ตั้งไว้ ซึ่งการให้ข้อเสนอแนะเช่นนี้สามารถเกิดได้จากการใช้คำแนะนำจากรายการข้อแนะนำก่อนหน้านี้ 
3. การส่งเสริมให้ผู้เรียนรู้สึกถึงความเป็นเจ้าของการเรียนรู้ของตนเอง โดยสร้างความตระหนักในความต้องการจำเป็นด้านสังคม อารมณ์และกำลังใจในการเรียนของตน รวมถึงส่งเสริมให้นักเรียนเปิดรับความคิดเห็นเชิงประเมินจากผู้อื่น 

โปรดระมัดระวังข้อจำกัดต่อไปนี้:
กรุณาหลีกเลี่ยงการให้ คำแนะนำเชิงรายละเอียดเกี่ยวกับสิ่งที่ต้องเขียนในเรียงความโดยเด็ดขาด!
โปรดแสดงเฉพาะ ข้อความป้อนกลับ (feedback) เท่านั้น
และ ความยาวของข้อความต้องไม่เกิน 100 คำ!
[[จบภารกิจของคุณ]]
`,
        "gpt-scaffold-prompt-template-groupC": `[[เงื่อนไขเริ่มต้นของงาน]]
นักเรียนกำลังทำภารกิจการเขียนเรียงความ
คำชี้แจงของงานมีดังนี้:
หัวข้อของงาน: กลยุทธ์พลังงานหมุนเวียนสำหรับชุมชนชายฝั่งตอนเหนือ
คุณได้รับการว่าจ้างให้เป็นผู้เชี่ยวชาญด้านพลังงาน เพื่อให้คำปรึกษาแก่ชุมชนชายฝั่งตอนเหนือที่ตั้งอยู่ใกล้ภูเขา และเผชิญกับฤดูหนาวที่รุนแรงและมีหิมะตกหนัก ชุมชนแห่งนี้พึ่งพาพลังงานฟอสซิลที่นำเข้ามาเป็นหลัก ซึ่งมีต้นทุนสูง ส่งผลกระทบต่อสิ่งแวดล้อม และไม่มั่นคงในช่วงพายุฤดูหนาวรุนแรง เมืองนี้ต้องการหาทางออกที่สามารถจัดหาพลังงานได้อย่างมั่นคงตลอดทั้งปี ลดค่าใช้จ่ายในระยะยาว และในอุดมคติควรช่วยสร้างงานให้กับคนในท้องถิ่น พื้นที่นี้มีลมทะเลที่พัดคงที่บริเวณนอกชายฝั่ง และอยู่ใกล้กับทรัพยากรป่าไม้ที่มีการจัดการอย่างยั่งยืน อย่างไรก็ตาม การอนุรักษ์ความหลากหลายทางชีวภาพทางทะเลและระบบนิเวศป่ายังคงเป็นสิ่งที่ชุมชนให้ความสำคัญเป็นลำดับต้น ๆ
ภารกิจของคุณ:
เขียนข้อเสนอฉบับสั้นเพื่อแนะนำ กลยุทธ์พลังงานหมุนเวียนแบบผสมผสาน ที่รวมพลังงานหมุนเวียนสองประเภทเข้าด้วยกัน พร้อมให้เหตุผลที่ชัดเจนโดยอธิบายว่า
•        พลังงานหมุนเวียนแต่ละประเภทเหมาะสมกับภูมิประเทศ ภูมิอากาศ และความต้องการพลังงานของพื้นที่อย่างไร
•        ความเป็นไปได้ทางการเงินและประโยชน์ทางเศรษฐกิจที่คาดว่าจะได้รับ รวมถึงการสร้างงานในท้องถิ่น
•        ผลกระทบต่อสิ่งแวดล้อมที่อาจเกิดขึ้น และวิธีที่กลยุทธ์ของคุณจะช่วยลดความเสี่ยงต่อระบบนิเวศป่าไม้และสิ่งมีชีวิตทางทะเล
เวลาที่กำหนดสำหรับงานนี้คือ 45 นาที

เกณฑ์การประเมินผลการเขียน (Rubric) ที่ให้นักเรียนใช้ในการเขียนเรียงความ
เกณฑ์นี้ใช้สำหรับประเมินเรียงความของคุณ
ข้อกำหนดของเรียงความ:
•        ความยาวของเรียงความอยู่ระหว่าง 200–300 คำ
•        ห้ามคัดลอกข้อความโดยตรง จากบทอ่านหรือจากแหล่งอื่น — เรียงความต้องเขียนด้วย สำนวนของคุณเอง

รายละเอียดด้านล่างนี้คือเกณฑ์การให้คะแนนฉบับสมบูรณ์:
1. การระบุแหล่งพลังงานที่เลือกใช้
•        ดีเยี่ยม (3 คะแนน): ระบุพลังงานหมุนเวียน 2 ประเภทอย่างชัดเจน พร้อมให้เหตุผลสำหรับทั้งสองประเภท
•        ดี (2 คะแนน): ระบุพลังงานหมุนเวียน 2 ประเภท แต่ให้คำอธิบายน้อยหรือไม่ชัดเจน
•        พื้นฐาน (1 คะแนน): ระบุเพียงประเภทเดียว หรือคำตอบไม่ชัดเจน และไม่มีคำอธิบายที่เพียงพอ

2. การใช้ข้อมูลภูมิศาสตร์และภูมิอากาศในท้องถิ่น
•        ดีเยี่ยม (3 คะแนน): อธิบายอย่างชัดเจนว่าพลังงานทั้งสองประเภทเหมาะสมกับภูมิประเทศและภูมิอากาศของพื้นที่อย่างไร
•        ดี (2 คะแนน): กล่าวถึงลักษณะภูมิประเทศหรือภูมิอากาศบ้าง แต่ไม่เชื่อมโยงกับการเลือกพลังงานอย่างชัดเจน
•        พื้นฐาน (1 คะแนน): แทบไม่ได้กล่าวถึงข้อมูลท้องถิ่น หรือการเลือกพลังงานไม่สอดคล้องกับบริบทของพื้นที่
3. ประโยชน์ทางเศรษฐกิจและการสร้างงาน
•        ดีเยี่ยม (3 คะแนน): อธิบายอย่างชัดเจนว่ากลยุทธ์ช่วยลดต้นทุนและสร้างงานในท้องถิ่นได้อย่างไร
•        ดี (2 คะแนน): กล่าวถึงเรื่องต้นทุนหรือการจ้างงาน แต่ให้รายละเอียดน้อย
•        พื้นฐาน (1 คะแนน): ไม่กล่าวถึงเรื่องต้นทุนหรือการจ้างงาน หรือให้ข้อมูลที่ไม่ถูกต้อง
4. การอนุรักษ์สิ่งแวดล้อม
•        ดีเยี่ยม (3 คะแนน): อธิบายอย่างชัดเจนว่ากลยุทธ์ของคุณช่วยปกป้องป่าไม้และสิ่งมีชีวิตทางทะเลอย่างไร พร้อมระบุวิธีลดความเสี่ยงที่เฉพาะเจาะจง
•        ดี (2 คะแนน): กล่าวถึงผลกระทบต่อสิ่งแวดล้อม แต่ไม่ให้รายละเอียดเกี่ยวกับแนวทางป้องกัน
•        พื้นฐาน (1 คะแนน): แทบไม่ได้กล่าวถึงสิ่งแวดล้อม หรือเพิกเฉยต่อความเสี่ยงทางธรรมชาติ
5. คุณภาพของการเขียน
•        ดีเยี่ยม (3 คะแนน): การเขียนชัดเจน ไม่มีข้อผิดพลาดทางไวยากรณ์หรือการสะกดคำ ความคิดเรียงลำดับอย่างมีเหตุผล
•        ดี (2 คะแนน): มีข้อผิดพลาดทางไวยากรณ์หรือการสะกดบ้าง ทำให้ความหมายบางส่วนไม่ชัดเจน
•        พื้นฐาน (1 คะแนน): มีข้อผิดพลาดทางไวยากรณ์หรือการสะกดจำนวนมาก ทำให้เนื้อหายากต่อการเข้าใจหรือไม่เป็นลำดับ

[[สิ้นสุดเงื่อนไขของงาน]]

[[เริ่มต้นงานของคุณ]]

        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        ในการให้ข้อเสนอแนะ โปรดปฏิบัติตามกรอบในการให้ข้อเสนอแนะที่มีประสิทธิผล (Effective Feedback Framework) ซึ่งมีลักษณะเน้นผู้เรียนเป็นศูนย์กลาง และประกอบด้วย 3 องค์ประกอบหลัก ดังนี้
1. การอิงตามสภาพการเรียนรู้ของผู้เรียน โดยให้ข้อเสนอแนะที่สะท้อนถึงทั้งจุดแข็งและจุดที่ต้องปรับปรุงของผู้เรียน เพื่อให้ครูรับทราบผลจากการสอนและการแนะนำของตน
2. การมุ่งเน้นผลกระทบที่จะตามมา โดยการให้ข้อมูลที่นำไปปฏิบัติได้ เพื่อช่วยให้ผู้เรียนปรับปรุงและบรรลุผลการเรียนรู้ที่ตั้งไว้ ซึ่งการให้ข้อเสนอแนะเช่นนี้สามารถเกิดได้จากการใช้คำแนะนำจากรายการข้อแนะนำก่อนหน้านี้ 
3. การส่งเสริมให้ผู้เรียนรู้สึกถึงความเป็นเจ้าของการเรียนรู้ของตนเอง โดยสร้างความตระหนักในความต้องการจำเป็นด้านสังคม อารมณ์และกำลังใจในการเรียนของตน รวมถึงส่งเสริมให้นักเรียนเปิดรับความคิดเห็นเชิงประเมินจากผู้อื่น 

โปรดระมัดระวังข้อจำกัดต่อไปนี้:
กรุณาหลีกเลี่ยงการให้ คำแนะนำเชิงรายละเอียดเกี่ยวกับสิ่งที่ต้องเขียนในเรียงความโดยเด็ดขาด!
โปรดแสดงเฉพาะ ข้อความป้อนกลับ (feedback) เท่านั้น
และ ความยาวของข้อความต้องไม่เกิน 100 คำ!
[[จบภารกิจของคุณ]]
`,
        "annotation-notes-title": "แผงบันทึกย่อ",
        "annotation-notes-delete-confirm-message": "ต้องการลบหรือไม่?",
        "annotation-write-note-placeholder": "เขียนบันทึกที่นี่…",
        "annotation-tag-placeholder": "พิมพ์แท็กใหม่แล้วกด Enter…",
        "annotation-note-save-btn-text": "บันทึก",
        "annotation-note-cancel-btn-text": "ยกเลิก",
        "annotation-search-btn-text": "ค้นหา",
        "annotation-search-panel-input-placeholder": "พิมพ์คำค้น…",
        "scaffolding-title": "แผงคำแนะนำ",
        "scaffolding-create-checklist-btn-text": "สร้างเช็กลิสต์",
        "scaffolding-edit-checklist-btn-text": "แก้ไข",
        "scaffolding-unread-message-text": "ข้อความยังไม่อ่าน",
        "scaffolding-chat-open-text": "เปิดแชท",
        "gpt-scaffolding-title": "แผงคำแนะนำ",
        "planner-title": "เครื่องมือวางแผน",
        "planner-learning-strategy-select-label-text": "1. โปรดเลือกกลยุทธ์การเรียนรู้:",
        "planner-learning-strategy-select-option1-text": "เลือกกลยุทธ์",
        "planner-learning-strategy-select-customise-option-text": "ใช้กลยุทธ์ของคุณเอง",
        "planner-add-more-customise-strategy-btn-text": "เพิ่มกลยุทธ์",
        "planner-customise-option-hint-textarea-placeholder": "อธิบายเหตุผลของแผนนี้",
        "planner-next-btn-text": "ถัดไป",
        "planner-time-unit-minute": "นาที",
        "planner-display-plan-title": "แผนการเรียนของฉัน",
        "planner-display-overall-strategy-label": "กลยุทธ์โดยรวม:",
        "planner-display-time-allocation-label": "การจัดสรรเวลา:",
        "planner-display-writing-strategy-label": "กลยุทธ์การเขียน:",
        "planner-display-reading-strategy-label": "กลยุทธ์การอ่าน:",
        "planner-customise-plan-reason-placeholder": "(ไม่บังคับ)",
        "essay-title": "เครื่องมือเขียนเรียงความ",
        "essay-save-btn-text": "บันทึกเรียงความ",
        "essay-writing-placeholder": "เขียนเรียงความที่นี่…",
        "essay-show-word-count-btn-text": "จำนวนคำ",
        "essay-save-toast-text": "บันทึกเรียงความแล้ว!",
        "dictionary-title": "พจนานุกรม",
        "dictionary-send-btn-text": "ส่ง",
        "dictionary-panel-input-placeholder": "พิมพ์คำที่ต้องการค้นหา…",
        "checklist-title": "เครื่องมือเช็กลิสต์",
        "checklist-basic-panel-title": "พื้นฐาน",
        "checklist-academic-panel-title": "วิชาการ",
        "checklist-originality-panel-title": "ความเป็นต้นฉบับ",
        "checklist-integration-panel-title": "บูรณาการและขยายความ",
        "checklist-analyse-btn-text": "วิเคราะห์",
        "chatgpt-title": "ผู้ช่วย AI",
        "chatgpt-send-btn-text": "ส่ง",
        "chatgpt-panel-input-placeholder": "ถามคำถาม…",
        "chatteacher-title": "ถามครู",
        "chatteacher-panel-input-placeholder": "ถามคำถาม…",
        "chatteacher-connect-server-status-text": "สถานะการเชื่อมต่อเซิร์ฟเวอร์",
        "chatteacher-teacher-online-status-text": "สถานะครูออนไลน์",
        "chatteacher-send-btn-text": "ส่ง",
        "chatgpt-role-description": "คุณคือผู้ช่วยที่เป็นประโยชน์ โปรดตอบตามข้อความที่ให้ไว้",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": `จนถึงตอนนี้ของช่วงการเรียนรู้ นักเรียนที่ทำผลงานได้ดีในงานนี้มักจะให้ความสำคัญกับการรับรู้เวลาที่จำกัดของงาน โดยใช้เครื่องมือตัวจับเวลา (timer tool) ที่มีให้ในระบบ อย่างไรก็ตาม ดูเหมือนว่านักเรียนคนนี้จะยังไม่ได้ใช้เครื่องมือนี้อย่างมีประสิทธิภาพ กรุณาให้ข้อเสนอแนะกับนักเรียนในลักษณะ ย่อหน้าเดียว (ไม่ใช้สัญลักษณ์หัวข้อย่อยหรือหมายเลข) เกี่ยวกับวิธีปรับปรุงการติดตามและจัดการเวลาในการทำงาน โดยแนะนำให้นักเรียนใช้เครื่องมือตัวจับเวลาที่มี ปุ่มสัญลักษณ์นาฬิกา ในแถบเครื่องมือ เพื่อช่วยให้ตระหนักถึงเวลาที่เหลือระหว่างการทำงาน นอกจากนี้ โปรดพิจารณาอย่างรอบด้านถึง เงื่อนไขการเรียนรู้ทั้งหมดของนักเรียนคนนี้ เพื่อให้คำแนะนำมีความเหมาะสมและเป็นประโยชน์สูงสุดต่อพัฒนาการด้านการเรียนรู้ของนักเรียน`,
        "gpt-scaffold-need-check-srl-prompt-CMTR": `จนถึงตอนนี้ของช่วงการเรียนรู้ นักเรียนควรหมั่นอ้างอิงกลับไปยังคำชี้แจงของงานและเกณฑ์การประเมินระหว่างการตรวจทานร่างเรียงความ เพื่อประเมินว่าผลงานของตนตอบโจทย์ตามข้อกำหนดและเกณฑ์การให้คะแนนหรือไม่ การตรวจสอบเช่นนี้จะช่วยให้นักเรียนพัฒนาความตระหนักรู้ในตนเองด้านการเรียนรู้ (self-awareness) และสามารถปรับปรุงงานเขียนให้มีคุณภาพยิ่งขึ้นโดยไม่ต้องพึ่งพาคำแนะนำเชิงรายละเอียดจากผู้อื่นมากนัก`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "ภายในนาทีที่ 14 นักเรียนคนอื่นตรวจสอบคำสั่งงานและรูบริกตลอดเวลา แต่นักเรียนคนนี้ไม่ทำ กรุณาแนะนำวิธีตรวจสอบเป็นระยะจนจบเซสชัน",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `จนถึงตอนนี้ของช่วงการเรียนรู้ นักเรียนที่ทำผลงานได้ดีในงานนี้มักจะแน่ใจว่าตนเองเข้าใจข้อกำหนดของงานและเกณฑ์การประเมิน (rubric) อย่างชัดเจน แต่ดูเหมือนว่านักเรียนคนนี้อาจยังไม่เข้าใจในส่วนนี้อย่างเพียงพอ กรุณาให้ข้อเสนอแนะกับนักเรียนในลักษณะ ย่อหน้าเดียว (ไม่ใช้สัญลักษณ์หัวข้อย่อยหรือหมายเลข) โดยมุ่งเน้นไปที่การแนะนำให้นักเรียนพัฒนาความเข้าใจเกี่ยวกับคำชี้แจงของงานและเกณฑ์การประเมินให้ดียิ่งขึ้น เพื่อช่วยให้นักเรียนตระหนักรู้ถึงความสำคัญของการเขียนเรียงความให้สอดคล้องกับข้อกำหนดของงานและเกณฑ์การให้คะแนน โดยหลีกเลี่ยงการให้คำแนะนำเชิงรายละเอียดเกี่ยวกับเนื้อหาที่ต้องเขียนในเรียงความ นอกจากนี้ โปรดพิจารณาอย่างรอบด้านถึง เงื่อนไขการเรียนรู้ทั้งหมดของนักเรียนคนนี้ เพื่อให้คำแนะนำมีความเหมาะสม ช่วยส่งเสริมความเข้าใจในตนเอง และสนับสนุนให้นักเรียนพัฒนาแนวทางการเรียนรู้ที่มีประสิทธิภาพมากขึ้น`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `จนถึงตอนนี้ของช่วงการเรียนรู้ นักเรียนที่ทำผลงานได้ดีในงานนี้มักจะให้ความสำคัญกับการจัดการเวลา โดยใช้เครื่องมือตัวจับเวลา (สัญลักษณ์รูปนาฬิกาในแถบเครื่องมือ) เพื่อควบคุมเวลาทำงานให้อยู่ในขอบเขตที่กำหนด พร้อมทั้งเข้าใจข้อกำหนดของงานและเกณฑ์การประเมิน (rubric) อย่างชัดเจน ซึ่งจะช่วยให้การเขียนเรียงความเป็นไปตามเป้าหมายของงานได้อย่างมีประสิทธิภาพ อย่างไรก็ตาม นักเรียนดูเหมือนอาจยังไม่ตระหนักถึงความสำคัญของทั้งสองประเด็นนี้อย่างเต็มที่ เพื่อปรับปรุง นักเรียนควรเริ่มต้นจากการใช้เครื่องมือตัวจับเวลาเพื่อติดตามความคืบหน้าของงานอย่างสม่ำเสมอ เพื่อให้สามารถจัดสรรเวลาได้เหมาะสมระหว่างการอ่าน การวางแผน และการเขียนเรียงความ นอกจากนี้ การทำความเข้าใจคำชี้แจงของงานและเกณฑ์การให้คะแนนอย่างลึกซึ้งจะช่วยให้นักเรียนเขียนงานได้ตรงประเด็นมากขึ้น และสามารถประเมินตนเองระหว่างทำงานได้ว่าสิ่งที่เขียนนั้นสอดคล้องกับเป้าหมายของงานหรือไม่`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "ถึงนาทีที่ 21 นักเรียนคนอื่นได้ใส่ข้อมูลจากเอกสารอ่านลงในเรียงความแล้ว แต่นักเรียนคนนี้ยังไม่ได้ทำ กรุณาให้คำแนะนำเกี่ยวกับการนำข้อมูลมาใช้ให้ตรงตามข้อกำหนด",
        "gpt-scaffold-need-check-srl-prompt-OT2": `จนถึงตอนนี้ของช่วงการเรียนรู้ นักเรียนที่ทำได้ดีมักจะถ่ายทอดความคิดด้วยถ้อยคำของตนเอง แทนการคัดลอกจากเนื้อหาที่อ่านมา เพราะการเขียนด้วยคำพูดของตนเองสะท้อนถึงความเข้าใจอย่างแท้จริงและช่วยพัฒนาทักษะการคิดเชิงวิเคราะห์ของนักเรียนเอง นักเรียนจึงควรให้ความสำคัญกับการอธิบายแนวคิดด้วยสำนวนของตน เพื่อให้เห็นถึงความเข้าใจที่มาจากการคิดและตีความของตนเองมากกว่าการท่องจำ`,
        "gpt-scaffold-user-take-pre-study-prompt": "นักเรียนคนนี้เคยเข้าร่วมการศึกษาในครั้งก่อน จึงมีความเข้าใจในงานอยู่ในระดับหนึ่ง ",
        "gpt-scaffold-isdimu-prompt-0": "นักเรียนคนนี้มีความตระหนักรู้ด้านเมตาควอนดี",
        "gpt-scaffold-isdimu-prompt-16": "นักเรียนคนนี้มีความตระหนักรู้ด้านเมตาควอนต่ำ",
        "gpt-scaffold-isdimu-prompt-32": "นักเรียนคนนี้มีความตระหนักรู้ด้านเมตาควอนปานกลาง",
        "gpt-scaffold-pretest-grades-prompt-0": "นักเรียนคนนี้มีระดับความรู้เกี่ยวกับพลังงานทดแทน สูง",
        "gpt-scaffold-pretest-grades-prompt-5": "นักเรียนคนนี้มีระดับความรู้เกี่ยวกับพลังงานทดแทน ต่ำ",
        "gpt-scaffold-pretest-grades-prompt-10": "นักเรียนคนนี้มีระดับความรู้เกี่ยวกับพลังงานทดแทน ปานกลาง",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "นักเรียนคนนี้เข้าใจวิธีการเรียนรู้ของตนเองได้ดี และสามารถเลือกใช้กลยุทธ์การเรียนรู้ที่เหมาะสมได้",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "นักเรียนคนนี้ยังไม่ชัดเจนว่าอะไรช่วยให้ตนเองเรียนรู้ได้ดี หรือกลยุทธ์ใดที่ใช้ได้ผลดีที่สุด",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "นักเรียนคนนี้มีความเข้าใจบางส่วนเกี่ยวกับวิธีการเรียนรู้ที่มีประสิทธิภาพ และสามารถระบุได้ว่ามีกลยุทธ์ใดบ้างที่ช่วยได้",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "นักเรียนคนนี้สามารถวางแผน ตรวจสอบ และปรับการเรียนรู้ของตนเองเพื่อให้ได้ผลลัพธ์ที่ดีขึ้น",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "นักเรียนคนนี้ไม่วางแผนล่วงหน้า หรือไม่ติดตามกระบวนการเรียนรู้ของตนเองระหว่างทำงาน",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "นักเรียนคนนี้ให้ความสนใจบางส่วนต่อการวางแผนและตรวจสอบการเรียนรู้ของตนเองระหว่างทำงาน",
        "gpt-scaffold-test-mai-name": "กิจกรรม 3: แบบสอบถามเมตาค็อกนิชัน",
        "gpt-scaffold-test-isdimu-name": "กิจกรรม 3: ISDIMU",
        "gpt-scaffold-pretest-name": "กิจกรรม 2: ความรู้ด้านพลังงานหมุนเวียน",
        "gpt-scaffold-check-take-previous-study-name": "กิจกรรม 1: เกี่ยวกับตัวคุณ",
        "gpt-scaffold-planner-select-prompt-1": "นักเรียนคนนี้ได้วางแผนว่าจะ อ่านก่อนแล้วจึงเขียน สำหรับงานนี้",
        "gpt-scaffold-planner-select-prompt-2": "นักเรียนคนนี้ได้วางแผนว่าจะ อ่านและเขียนไปพร้อมกัน สำหรับงานนี้",
        "gpt-scaffold-planner-select-prompt-3": "นักเรียนคนนี้ได้วางแผนว่าจะ เขียนอย่างเข้มข้นและอ่านอย่างเลือกสรร สำหรับงานนี้",
        "gpt-scaffold-planner-select-prompt-4": "นักเรียนคนนี้วางแผนจะ [ออกแบบแผนของตนเอง]",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "นักเรียนคนนี้ยังไม่ได้วางแผนอย่างชัดเจนว่าจะดำเนินการภารกิจนี้อย่างไร",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "นักเรียนคนนี้ได้วางแผนอย่างชัดเจนแล้วว่าจะดำเนินการทำงานนี้อย่างไร",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "นักเรียนคนนี้ ไม่ตระหนักถึงเวลาที่เหลืออยู่ สำหรับการทำงานให้เสร็จสิ้น",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "นักเรียนคนนี้ ตระหนักถึงเวลาที่เหลืออยู่ สำหรับการทำงานให้เสร็จสิ้น",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "นักเรียนคนนี้ ไม่ตระหนักถึงเครื่องมือที่มีอยู่ในสภาพแวดล้อมการเรียนรู้ ซึ่งอาจช่วยให้พวกเขาทำงานให้สำเร็จได้",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "นักเรียนคนนี้ ตระหนักถึงเครื่องมือที่มีอยู่ในสภาพแวดล้อมการเรียนรู้ ซึ่งอาจช่วยให้พวกเขาทำงานให้สำเร็จได้",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "นักเรียนคนนี้ ไม่ตระหนักถึงสื่อการอ่านที่มีอยู่ในสภาพแวดล้อมการเรียนรู้ ซึ่งอาจช่วยให้พวกเขาทำงานได้สำเร็จ",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "นักเรียนคนนี้ ตระหนักถึงสื่อการอ่านที่มีอยู่ในสภาพแวดล้อมการเรียนรู้ ซึ่งอาจช่วยให้พวกเขาทำงานได้สำเร็จ",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "นักเรียนคนนี้ ไม่ตระหนักถึงเกณฑ์การให้คะแนน ",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "นักเรียนคนนี้ ตระหนักถึงเกณฑ์การให้คะแนน ",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "นักเรียนคนนี้ ไม่ตระหนักถึงคำชี้แจงของงาน ",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "นักเรียนคนนี้ ตระหนักถึงคำชี้แจงของงาน ",
        "gpt-scaffold-role-description": "คุณคือผู้ช่วยที่เป็นประโยชน์ ให้คำแนะนำตามข้อความ",
        "planner-customise-step2-instruction": "โปรดอธิบายกลยุทธ์และการจัดสรรเวลาอย่างละเอียด รวมเหตุผลด้วยได้",
        "planner-reading-strategy-1": "อ่านเนื้อหาทีละหน้า",
        "planner-reading-strategy-2": "ทบทวนอย่างรวดเร็ว แล้วจึงอ่านละเอียด",
        "planner-reading-strategy-3": "ใช้เครื่องมือเน้นข้อความเพื่อทำเครื่องหมายหัวข้อสำคัญ",
        "planner-reading-strategy-4": "บันทึกความเข้าใจของฉันลงในโน้ตในขณะอ่าน",
        "planner-reading-strategy-5": "อ่านโดยมีคำถามเป็นแนวทาง มุ่งเน้นเนื้อหาที่กำหนด",
        "planner-reading-strategy-6": "เลือกอ่านเฉพาะส่วนที่เกี่ยวข้อง และข้ามเนื้อหาที่ไม่จำเป็น",
        "planner-reading-strategy-instruction": "ทักษะการอ่านแบบใดที่คุณตั้งใจใช้ (เลือกได้หลายข้อ)?",
        "planner-writing-strategy-1": "“ร่างโครงสร้างของเรียงความก่อน แล้วค่อยเติมรายละเอียดในภายหลัง",
        "planner-writing-strategy-2": "ใช้บันทึกย่อและข้อความที่ได้เน้นไว้ในการเขียนเรียงความ",
        "planner-writing-strategy-3": "ทบทวนคำชี้แจงและเกณฑ์การให้คะแนน (rubric) เพื่อให้การเขียนเป็นไปตามแนวทางที่กำหนด",
        "planner-writing-strategy-4": "คัดลอกประโยคสำคัญ แล้วเขียนใหม่ให้ลื่นไหลและเป็นธรรมชาติ",
        "planner-writing-strategy-5": "ใช้โครงสร้างและรูปแบบการเขียนที่เคยเรียนรู้มาในการเขียนเรียงความ",
        "planner-writing-strategy-instruction": "คุณวางแผนจะใช้ทักษะการเขียนแบบใดบ้าง (เลือกได้หลายข้อ)?”",
        "planner-main-strategy-1": "อ่านก่อน แล้วจึงเขียน (Read first then write)",
        "planner-main-strategy-1-instruction": `
คุณวางแผนจะใช้เวลาเท่าไรในการ “อ่าน” และ “เขียน” ตามลำดับ?`,
        "planner-main-strategy-1-task-1": "2.1 เวลาที่จะใช้ในการอ่าน:",
        "planner-main-strategy-1-task-2": `2.2 เวลาที่จะใช้ในการเขียน:
`,
        "planner-main-strategy-2": "อ่านและเขียนไปพร้อมกัน (Read and write simultaneously)",
        "planner-main-strategy-2-instruction": "คุณวางแผนจะใช้เวลาเท่าไรในแต่ละหัวข้อ?",
        "planner-main-strategy-2-task-1": "2.1 อ่าน/เขียนเกี่ยวกับ การเลือกใช้พลังงาน",
        "planner-main-strategy-2-task-2": "2.2 อ่าน/เขียนเกี่ยวกับ ต้นทุนและผลประโยชน์",
        "planner-main-strategy-2-task-3": `2.3 อ่าน/เขียนเกี่ยวกับ ผลกระทบต่อสิ่งแวดล้อม
`,
        "planner-main-strategy-3": "เขียนอย่างเข้มข้น อ่านอย่างเลือกสรร (Write intensively, read selectively)",
        "planner-main-strategy-3-instruction": "คุณวางแผนจะใช้เวลาเท่าไรในแต่ละขั้นตอนของการเขียน?",
        "planner-main-strategy-3-task-1": "2.1 วางแผนโครงสร้างของเรียงความ:",
        "planner-main-strategy-3-task-2": "2.2 เขียนร่างแรกของเรียงความ:",
        "planner-main-strategy-3-task-3": "2.3 อ่านข้อมูลเพิ่มเติมที่เกี่ยวข้องกับเรียงความ:",
        "planner-main-strategy-3-task-4": "2.4 ตรวจทานและปรับปรุงเรียงความ:",
        "planner-customise-plan-title": "แผนที่ปรับเอง",
        "planner-select-main-strategy-hint": "โปรดเลือกกลยุทธ์เพื่อดำเนินการต่อ!",
        "planner-allocate-time-hint": "โปรดจัดสรรเวลาให้ครบทุกงานและไม่เกินเวลาที่กำหนด!",
        "planner-select-reading-writing-strategy-hint": "โปรดเลือกทักษะที่คุณจะใช้!",
        "planner-save-plan-hint": "กรุณากรอกชื่อกลยุทธ์และเวลาถูกต้อง!",
        "rule-based-scaffold-title-1": "สำคัญที่จะเข้าใจงาน",
        "rule-based-scaffold-title-1-task-1": "(a) ใช้เมนูเพื่อมองภาพรวมและอ่านอย่างรวดเร็ว",
        "rule-based-scaffold-title-1-task-2": "(b) ตรวจสอบรูบริกของเรียงความ",
        "rule-based-scaffold-title-1-task-3": "(c) ตรวจสอบเป้าหมายการเรียนและคำสั่ง",
        "rule-based-scaffold-title-2": "สำคัญที่จะอ่านข้อมูลเกี่ยวกับหัวข้อ",
        "rule-based-scaffold-title-2-task-1": "(a) จดข้อมูลสำคัญ",
        "rule-based-scaffold-title-2-task-2": "(b) เลือกว่าจะอ่านอะไร",
        "rule-based-scaffold-title-2-task-3": "(c) ตรวจสอบเวลาที่เหลือ",
        "rule-based-scaffold-title-3": "สำคัญที่จะทบทวนข้อมูลที่เกี่ยวข้อง",
        "rule-based-scaffold-title-3-task-1": "(a) ทบทวนบันทึกย่อ",
        "rule-based-scaffold-title-3-task-2": "(b) ทบทวนเป้าหมายและคำสั่ง",
        "rule-based-scaffold-title-3-task-3": "(c) ตรวจสอบเรียงความเพื่อกำหนดการอ่านต่อ",
        "rule-based-scaffold-title-4": "สำคัญที่จะเขียนเรียงความที่ดี",
        "rule-based-scaffold-title-4-task-1": "(a) ตรวจสอบเวลาที่เหลือ",
        "rule-based-scaffold-title-4-task-2": "(b) ตรวจสอบรูบริก",
        "rule-based-scaffold-title-4-task-3": "(c) ร่างเรียงความโดยสรุปประเด็นหลัก",
        "rule-based-scaffold-title-5": "สำคัญที่จะตรวจสอบงานเขียน",
        "rule-based-scaffold-title-5-task-1": "(a) ตรวจสอบรูบริก",
        "rule-based-scaffold-title-5-task-2": "(b) แก้ไขเรียงความ",
        "rule-based-scaffold-title-5-task-3": "(c) ตรวจสอบเป้าหมายและคำสั่ง",
        "annotation-label-1": "จดบันทึก ",
        "annotation-label-2": "สำคัญ ",
        "annotation-label-3": "มีประโยชน์ ",
        "annotation-label-4": "แนวคิด",
        "annotation-label-5": "น่าสับสน ",
        "product-visual-title": "ภาพผลิตภัณฑ์",
        "product-visual-close-btn": "ปิด",
        "process-visual-title": "ภาพกระบวนการ",
        "process-visual-set-goal-label": "เป้าหมายของคุณ",
        "process-visual-close-btn": "ปิด",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "กด Ctrl+Enter",
        "annotation-toolbar-btn-hint": "เครื่ื่องมือบันทึกหมายเหตุ ",
        "annotation-search-toolbar-btn-hint": "ค้นหาบันทึกย่อ",
        "gpt-scaffold-toolbar-btn-hint": "เครื่องมือคำแนะนำ",
        "essay-writing-toolbar-btn-hint": "เครื่องมือเขียน",
        "planner-toolbar-btn-hint": "เครื่องมือวางแผน",
        "multi-agents-single-window-toolbar-btn-hint": "ผู้ช่วยแชท",
        "timer-toolbar-btn-hint": "ตัวจับเวลา",
        "like-response-text": "คุณชอบข้อความตอบกลับนี้ไหม?",
        "annotation-tool-data-label": "เครื่องมือบันทึกย่อ",
        "search-annotation-tool-data-label": "ค้นหาบันทึกย่อ",
        "gpt-scaffold-tool-data-label": "เครื่องมือคำแนะนำ",
        "process-visual-tool-data-label": "เครื่องมือกระบวนการ",
        "essay-product-visual-tool-data-label": "เครื่องมือผลิตภัณฑ์เรียงความ",
        "collaborate-writing-tool-data-label": "เขียนร่วมกัน",
        "essay-writing-tool-data-label": "เครื่องมือเขียน",
        "math-tool-data-label": "เครื่องมือคณิตศาสตร์",
        "planner-tool-data-label": "เครื่องมือวางแผน",
        "checklist-tool-data-label": "เครื่องมือวิเคราะห์การเขียน",
        "multi-agents-single-window-tool-data-label": "เครื่องมือแชทบอต",
        "dictionary-tool-data-label": "พจนานุกรม",
        "timer-tool-data-label": "ตัวจับเวลา",
        "questionnaire-tool-data-label": "แบบสอบถาม",
        "chat-reminder-message": `
ขณะนี้แชตบอทพร้อมให้คุณใช้งานแล้ว แต่คุณ ไม่สามารถใช้แชตบอทในการเขียนเรียงความของคุณได้
`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "พิมพ์ข้อความเพื่อเริ่มการสนทนา",
        "chat-reminder-message-title": "ข้อความแจ้งเตือน:",
        "scaffolding-message-title": "ข้อเสนอแนะเกี่ยวกับความก้าวหน้าปัจจุบันของคุณ:",
        "scaffold-chat-reminder": "สวัสดี คุณกำลังสนทนาอยู่นานพอสมควรแล้ว กลับไปที่ภารกิจหลักกันเถอะ!",
    },
    zh: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[任务条件开始]]

一名学生正在进行一项写作任务。

以下是任务说明：

任务主题：北方沿海社区的可再生能源策略

你将以能源专家的身份，为某北方沿海社区解决能源难题。该社区毗邻山区，冬季严寒多雪，目前严重依赖外地输入燃料。这些燃料不仅成本高昂、污染环境，且在冬季强风暴期间供应极不稳定。

该镇亟需一套解决方案，要求能实现全年稳定供能、长期节约成本，同时最好能创造本地就业岗位。该地区海上有持续海风，且临近大片管理规范的森林资源，但保护当地海洋生物与森林环境是社区的首要考量。

你的任务：

结合两种可再生能源类型，撰写一份简短的策略推荐计划。请从以下维度展开论述，清晰佐证你的推荐：

每种能源如何适配当地地域特征、气候挑战及能源需求。
方案的经济可行性与预期效益，包括就业岗位创造情况。
对环境的潜在影响，以及降低森林与海洋生物危害的具体策略。

你有45分钟的时间来完成这个任务。

以下是提供给学生的评分标准：

这份评分标准将用来给你的作文打分。

作文字数需控制在 200-300 字。
禁止直接复制阅读材料或其他资料，需用自身语言表达。

下表是完整的评分标准：

1.能源类型选择：

优秀（3分）：明确结合两种能源类型，且为每种选择提供充分理由。
良好（2 分）：提及两种能源类型，但缺乏详细说明。
及格（1 分）：仅涉及一种能源类型或解决方案模糊，几乎无解释。

2. 地理气候细节运用：

优秀（3分）：清晰阐释两种能源与当地地理、气候条件的适配性。
良好（2 分）：提及部分地理 / 气候细节，但与能源选择关联性不足。
及格（1 分）：几乎未运用本地细节，能源选择与实际情况不符。

3. 经济与就业效益：

优秀（3分）：充分说明方案的成本节约价值及本地就业创造能力。
良好（2 分）：提及成本或就业问题，但缺乏详细阐述。
及格（1 分）：未提及相关内容或存在错误信息。

4. 环境保护：

优秀（3分）：清晰说明方案对森林、海洋生物的保护作用，并给出具体风险规避方法。
良好（2 分）：提及环境影响，但保护措施说明不详细。
及格（1 分）：几乎未提及环境问题或忽视自然风险。

5. 写作质量：
优秀（3分）：表达清晰，无语法、拼写错误，逻辑连贯。
良好（2 分）：存在少量语法、拼写错误，部分内容表达不明确。
及格（1 分）：语法、拼写错误频繁，内容难以理解或逻辑混乱。

[[任务条件结束]]

[[开始你的任务]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    在此反馈中，请遵循有效反馈框架。这是以学习者为中心的，应该包含三个主要组成部分：

1. 根据上述学习条件，运用学生表现的优势和不足来指导教学。
2. 通过提供可行的信息来帮助学生实现任务的学习目标，专注于后续影响。这应该来自上述建议。
3. 支持学生掌控自己的学习，关注他们的社交、情感和动机需求，并鼓励他们开放地接受评价性意见。

请注意以下限制条件：

请尽力避免给出任何作文中需要包含什么内容的详细指导！

请确保你只输出反馈文本！

最后，反馈不得超过100字！

[[你的任务结束]]`,
        "gpt-scaffold-prompt-template-groupC": `[[任务条件开始]]

一名学生正在进行一项写作任务。

以下是任务说明：

任务主题：北方沿海社区的可再生能源策略

你将以能源专家的身份，为某北方沿海社区解决能源难题。该社区毗邻山区，冬季严寒多雪，目前严重依赖外地输入燃料。这些燃料不仅成本高昂、污染环境，且在冬季强风暴期间供应极不稳定。

该镇亟需一套解决方案，要求能实现全年稳定供能、长期节约成本，同时最好能创造本地就业岗位。该地区海上有持续海风，且临近大片管理规范的森林资源，但保护当地海洋生物与森林环境是社区的首要考量。

你的任务：

结合两种可再生能源类型，撰写一份简短的策略推荐计划。请从以下维度展开论述，清晰佐证你的推荐：

每种能源如何适配当地地域特征、气候挑战及能源需求。
方案的经济可行性与预期效益，包括就业岗位创造情况。
对环境的潜在影响，以及降低森林与海洋生物危害的具体策略。

你有45分钟的时间来完成这个任务。

以下是提供给学生的评分标准：

这份评分标准将用来给你的作文打分。

作文字数需控制在 200-300 字。
禁止直接复制阅读材料或其他资料，需用自身语言表达。

下表是完整的评分标准：

1.能源类型选择：

优秀（3分）：明确结合两种能源类型，且为每种选择提供充分理由。
良好（2 分）：提及两种能源类型，但缺乏详细说明。
及格（1 分）：仅涉及一种能源类型或解决方案模糊，几乎无解释。

2. 地理气候细节运用：

优秀（3分）：清晰阐释两种能源与当地地理、气候条件的适配性。
良好（2 分）：提及部分地理 / 气候细节，但与能源选择关联性不足。
及格（1 分）：几乎未运用本地细节，能源选择与实际情况不符。

3. 经济与就业效益：

优秀（3分）：充分说明方案的成本节约价值及本地就业创造能力。
良好（2 分）：提及成本或就业问题，但缺乏详细阐述。
及格（1 分）：未提及相关内容或存在错误信息。

4. 环境保护：

优秀（3分）：清晰说明方案对森林、海洋生物的保护作用，并给出具体风险规避方法。
良好（2 分）：提及环境影响，但保护措施说明不详细。
及格（1 分）：几乎未提及环境问题或忽视自然风险。

5. 写作质量：
优秀（3分）：表达清晰，无语法、拼写错误，逻辑连贯。
良好（2 分）：存在少量语法、拼写错误，部分内容表达不明确。
及格（1 分）：语法、拼写错误频繁，内容难以理解或逻辑混乱。

[[任务条件结束]]

[[开始你的任务]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        在此反馈中，请遵循有效反馈框架。这是以学习者为中心的，应该包含三个主要组成部分：

1. 根据上述学习条件，运用学生表现的优势和不足来指导教学。
2. 通过提供可行的信息来帮助学生实现任务的学习目标，专注于后续影响。这应该来自上述建议。
3. 支持学生掌控自己的学习，关注他们的社交、情感和动机需求，并鼓励他们开放地接受评价性意见。

请注意以下限制条件：

请尽力避免给出任何作文中需要包含什么内容的详细指导！

请确保你只输出反馈文本！

最后，反馈不得超过100字！

[[你的任务结束]]`,
        "annotation-notes-title": "笔记面板",
        "annotation-notes-delete-confirm-message": "确定要删除吗？",
        "annotation-write-note-placeholder": "在这里写笔记...",
        "annotation-tag-placeholder": "输入新标签并按回车...",
        "annotation-note-save-btn-text": "保存",
        "annotation-note-cancel-btn-text": "取消",
        "annotation-search-btn-text": "搜索",
        "annotation-search-panel-input-placeholder": "输入关键字搜索...",
        "scaffolding-title": "指示面板",
        "scaffolding-create-checklist-btn-text": "创建清单",
        "scaffolding-edit-checklist-btn-text": "编辑",
        "scaffolding-unread-message-text": "未读消息",
        "scaffolding-chat-open-text": "",
        "gpt-scaffolding-title": "指示面板",
        "planner-title": "计划工具",
        "planner-learning-strategy-select-label-text": "1. 请为你的学习策略制定计划：",
        "planner-learning-strategy-select-option1-text": "选一个策略",
        "planner-learning-strategy-select-customise-option-text": "用你自己的策略",
        "planner-add-more-customise-strategy-btn-text": "添加更多策略",
        "planner-customise-option-hint-textarea-placeholder": "请解释为什么你设计这个计划？",
        "planner-next-btn-text": "下一步",
        "planner-time-unit-minute": "分钟",
        "planner-display-plan-title": "我的学习计划",
        "planner-display-overall-strategy-label": "整体策略：",
        "planner-display-time-allocation-label": "时间分配：",
        "planner-display-writing-strategy-label": "写作策略：",
        "planner-display-reading-strategy-label": "阅读策略：",
        "planner-customise-plan-reason-placeholder": "（可选）",
        "essay-title": "笔记面板",
        "essay-save-btn-text": "保存",
        "essay-writing-placeholder": "在这里写作...",
        "essay-show-word-count-btn-text": "显示字数",
        "essay-save-toast-text": "你的写作已保存!",
        "dictionary-title": "词典工具",
        "dictionary-send-btn-text": "发送",
        "dictionary-panel-input-placeholder": "请输入一个搜索词...",
        "checklist-title": "清单工具",
        "checklist-basic-panel-title": "基本的",
        "checklist-academic-panel-title": "学术的",
        "checklist-originality-panel-title": "原创性",
        "checklist-integration-panel-title": "整合与阐述",
        "checklist-analyse-btn-text": "分析",
        "chatgpt-title": "AI 助手",
        "chatgpt-send-btn-text": "Ctrl + Enter",
        "chatgpt-panel-input-placeholder": "问一个问题...",
        "chatteacher-title": "询问老师工具",
        "chatteacher-panel-input-placeholder": "问一个问题...",
        "chatteacher-connect-server-status-text": "连接服务器状态",
        "chatteacher-teacher-online-status-text": "教师在线状态",
        "chatteacher-send-btn-text": "发送",
        "chatgpt-role-description": "你是一个乐于助人的助手，请根据提供的文本回答问题。",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": "到目前为止在这个学习过程中，在此任务中表现良好的学生都确保通过使用提供的计时工具来了解任务的时间限制。但这名学生的情况似乎并非如此。请你为这名学生提供段落式的反馈（不要使用要点和编号列表），告诉他们如何通过使用提供的计时工具来更好地管理时间，工具栏中的时间按钮有一个时钟符号。同时，请全面考虑这名学生的所有以下学习条件：",
        "gpt-scaffold-need-check-srl-prompt-CMTR": `到目前为止在这个学习过程中，在此任务中表现良好的学生都确保回顾任务要求和评分标准信息来评估他们的作文草稿，并检查他们的写作是否与任务要求和评分标准保持一致。但这名学生的情况似乎并非如此。请你为这名学生提供段落式的反馈（不要使用要点和编号列表），说明如何利用任务说明和评分标准的信息来评估他们的作文草稿，并检查他们的写作草稿是否符合任务要求和评分标准，同时尽力避免给出作文中需要包含什么内容的详细指导。同时，请全面考虑这名学生的所有以下学习条件：`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "我们有一名学生目前正在做这个学习任务。截止学习过程的第14分钟，其他在这个任务中表现良好的学生不断检查任务说明和评分标准。而该学生却不是这样。因此，请根据上面提供的所有信息(包含任务要求、打分标准和阅读材料)，以及并考虑到这位特定学生的学习情况，为学生提供段落形式(不要使用项目符号和编号列表)的反馈意见，指导其如何定期检查任务说明和打分标准直到这个写作过程的结束。",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": "到目前为止在这个学习过程中，在此任务中表现良好的学生都确保他们清楚地理解了任务要求和评分标准。但这名学生的情况似乎并非如此。请你为这名学生提供段落式的反馈（不要使用要点和编号列表），告诉他们如何提高对任务说明和评分标准的理解，帮助学生认识到作文写作需要符合任务要求和评分标准，同时尽力避免给出作文中需要包含什么内容的详细指导。同时，请全面考虑这名学生的所有以下学习条件：",
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `到目前为止在这个学习过程中，在此任务中表现良好的学生都确保通过使用提供的计时工具来了解任务的时间限制，并清楚地理解了任务要求和评分标准。但这名学生的情况似乎并非如此。请你为这名学生提供段落式的反馈（不要使用要点和编号列表），结合所有这些方面的建议，告诉他们如何通过使用提供的计时工具来更好地管理时间（工具栏中的时间按钮有一个时钟符号），以及如何提高对任务说明和评分标准的理解，帮助学生认识到作文写作需要符合任务要求和评分标准，同时尽力避免给出作文中需要包含什么内容的详细指导。同时，请全面考虑这名学生的所有以下学习条件：`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "我们有一名学生目前正在做这个学习任务。截止学习过程的第21分钟，其他在这个任务中表现良好的学生已经开始在他们的作文中包含一些阅读材料中的信息。但这名学生似乎没有这样做。因此，请根据上面提供了的所有信息(包含任务要求、打分标准和阅读材料)，并考虑到这位特定学生的学习情况，为学生提供段落形式(不要使用项目符号和编号列表)的反馈意见，指导其如何根据任务要求将一些阅读材料中的信息包含到他们作文草稿中。",
        "gpt-scaffold-need-check-srl-prompt-OT2": "到目前为止在这个学习过程中，在此任务中表现良好的学生都确保基于阅读材料用自己的话来解释想法。但这名学生的情况似乎并非如此。请你为这名学生提供段落式的反馈（不要使用要点和编号列表），说明在展示对阅读材料理解的同时用自己的话解释想法的重要性。你应该注意不能给出学生如何写作文的详细指导。同时，请全面考虑这名学生的所有以下学习条件：",
        "gpt-scaffold-user-take-pre-study-prompt": "这名学生参与过之前的研究，所以他/她一定程度了解这个任务知识。",
        "gpt-scaffold-isdimu-prompt-0": "该学生对可用于促进学习的各种策略或技巧有较高的理解水平。",
        "gpt-scaffold-isdimu-prompt-16": "该学生对可用于促进学习的各种策略或技巧有较低的理解水平。",
        "gpt-scaffold-isdimu-prompt-32": "这个学生看起来对可用于促进学习的各种策略或技巧有一些了解。",
        "gpt-scaffold-pretest-grades-prompt-0": "这名学生的可再生能源知识水平较高。",
        "gpt-scaffold-pretest-grades-prompt-5": "这名学生的可再生能源知识水平较低。",
        "gpt-scaffold-pretest-grades-prompt-10": "这名学生的可再生能源知识水平中等。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "这名学生明白自己如何学得最好，能够选择好的学习策略。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "这名学生不清楚什么能帮助他们学习，或者哪些策略对他们最有效。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "这名学生对有效学习方法有一些了解，能说出几种有帮助的策略。",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "这名学生会规划、监控并调整自己的学习以获得更好的结果。",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "这名学生在学习时不提前规划，也不跟踪自己的学习过程。",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "这名学生在完成任务时会适当注意规划和检查自己的学习。",
        "gpt-scaffold-test-mai-name": "任务3：反思你的学习",
        "gpt-scaffold-test-isdimu-name": "活动3：学习策略中的知识",
        "gpt-scaffold-pretest-name": "任务2：你对可再生能源了解多少？",
        "gpt-scaffold-check-take-previous-study-name": "任务1：关于你自己",
        "gpt-scaffold-planner-select-prompt-1": "这名学生为这项任务制定了[先阅读再写作]的计划。",
        "gpt-scaffold-planner-select-prompt-2": "这名学生为这项任务制定了[同时阅读和写作]的计划。",
        "gpt-scaffold-planner-select-prompt-3": "这名学生为这项任务制定了[集中写作，有选择地阅读]的计划。",
        "gpt-scaffold-planner-select-prompt-4": "这个学生提出了为任务设计自己的计划。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "这名学生没有制定明确的计划来说明如何完成任务。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "这名学生制定了明确的计划来说明如何完成任务。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "这名学生没有意识到完成任务的剩余时间。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "这名学生知道完成任务的剩余时间。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "这名学生没有意识到平台中有助于完成任务的工具。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "这名学生意识到平台中有助于完成任务的工具。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "这名学生没有意识到平台中有助于完成任务的现有阅读材料。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "这名学生意识到平台中有助于完成任务的现有阅读材料。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "这名学生没有阅读评分标准。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "这名学生阅读了评分标准。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "这名学生没有阅读任务说明。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "这名学生阅读了任务说明。",
        "gpt-scaffold-role-description": "你是一个乐于助人的助手，请根据给定的文本给出建议。",
        "planner-customise-step2-instruction": "请详细描述你计划使用的学习策略以及你将如何分配时间。你还可以说明学习策略与时间分配的原因。",
        "planner-reading-strategy-1": "逐页阅读材料",
        "planner-reading-strategy-2": "快速浏览后详细阅读",
        "planner-reading-strategy-3": "使用高亮工具标记重点内容",
        "planner-reading-strategy-4": "阅读时在笔记中记录我的理解",
        "planner-reading-strategy-5": "以问题为导向，重点阅读特定内容",
        "planner-reading-strategy-6": "有选择地阅读，跳过无关内容",
        "planner-reading-strategy-instruction": "你计划使用哪些阅读技巧（多选）？",
        "planner-writing-strategy-1": "先起草文章结构，然后填入详细内容",
        "planner-writing-strategy-2": "写作时使用我的笔记和高亮标记",
        "planner-writing-strategy-3": "查看任务要求和评分标准以确保写作符合要求",
        "planner-writing-strategy-4": "复制关键句子然后改写使句子流畅",
        "planner-writing-strategy-5": "使用我学过的写作框架和模式来写作",
        "planner-writing-strategy-instruction": "你计划使用哪些写作技巧（多选）？",
        "planner-main-strategy-1": "先阅读再写作",
        "planner-main-strategy-1-instruction": "你计划分别在阅读和写作上花费多少时间？",
        "planner-main-strategy-1-task-1": "2.1 预计花费在阅读上的时间",
        "planner-main-strategy-1-task-2": "2.2 预计花费在写作上的时间",
        "planner-main-strategy-2": "阅读和写作同时进行",
        "planner-main-strategy-2-instruction": "你计划在每个主题上花费多少时间？",
        "planner-main-strategy-2-task-1": "2.1 关于能源选择的阅读/写作",
        "planner-main-strategy-2-task-2": "2.2 关于成本和效益的阅读/写作",
        "planner-main-strategy-2-task-3": "2.3 关于环境影响的阅读/写作",
        "planner-main-strategy-3": "集中写作，有选择地阅读",
        "planner-main-strategy-3-instruction": "你准备在写作的不同阶段花费多少时间？",
        "planner-main-strategy-3-task-1": "2.1 规划文章结构：",
        "planner-main-strategy-3-task-2": "2.2 写初稿：",
        "planner-main-strategy-3-task-3": "2.3 阅读与文章相关的补充信息：",
        "planner-main-strategy-3-task-4": "2.4 审阅和改进文章：",
        "planner-customise-plan-title": "",
        "planner-select-main-strategy-hint": "请选择一个策略以继续！",
        "planner-allocate-time-hint": "请给所有任务分配时间，并且总时间相加必须在任务时间以内！",
        "planner-select-reading-writing-strategy-hint": "请选择你计划使用的技巧以继续！",
        "planner-save-plan-hint": "请填写所有策略名称及正确时间！",
        "rule-based-scaffold-title-1": "理解任务要求很重要。",
        "rule-based-scaffold-title-1-task-1": "1. 利用目录来获得整体概览和略读文本",
        "rule-based-scaffold-title-1-task-2": "2. 查看作文打分标准",
        "rule-based-scaffold-title-1-task-3": "3. 查看学习目标和说明",
        "rule-based-scaffold-title-2": "阅读与主题相关的信息很重要。",
        "rule-based-scaffold-title-2-task-1": "1. 对重要信息做笔记",
        "rule-based-scaffold-title-2-task-2": "2. 选择性阅读",
        "rule-based-scaffold-title-2-task-3": "3. 检查剩余时间",
        "rule-based-scaffold-title-3": "阅读相关信息和回顾你的阅读很重要。",
        "rule-based-scaffold-title-3-task-1": "1. 回顾注释以检查目前的学习情况",
        "rule-based-scaffold-title-3-task-2": "2. 回顾学习目标和说明",
        "rule-based-scaffold-title-3-task-3": "3. 查看作文以决定接下来读什么",
        "rule-based-scaffold-title-4": "写好作文很重要。",
        "rule-based-scaffold-title-4-task-1": "1. 查看剩余时间",
        "rule-based-scaffold-title-4-task-2": "2. 查看作文打分标准",
        "rule-based-scaffold-title-4-task-3": "3. 把所学内容转化为主要观点来起草作文",
        "rule-based-scaffold-title-5": "写下有关的信息和检查你的写作很重要。",
        "rule-based-scaffold-title-5-task-1": "1. 查看作文打分标准",
        "rule-based-scaffold-title-5-task-2": "2. 修改你的作文。",
        "rule-based-scaffold-title-5-task-3": "3. 查看学习目标和说明",
        "annotation-label-1": "做笔记",
        "annotation-label-2": "重要",
        "annotation-label-3": "有用",
        "annotation-label-4": "概念",
        "annotation-label-5": "疑惑",
        "product-visual-title": "产品可视化",
        "product-visual-close-btn": "关闭",
        "process-visual-title": "过程可视化",
        "process-visual-set-goal-label": "你设定的目标",
        "process-visual-close-btn": "关闭",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "标注面板",
        "annotation-search-toolbar-btn-hint": "搜索工具",
        "gpt-scaffold-toolbar-btn-hint": "",
        "essay-writing-toolbar-btn-hint": "",
        "planner-toolbar-btn-hint": "",
        "multi-agents-single-window-toolbar-btn-hint": "聊天助理",
        "timer-toolbar-btn-hint": "",
        "like-response-text": "你喜欢这个回答吗？",
        "annotation-tool-data-label": "标注工具",
        "search-annotation-tool-data-label": "搜索标注工具",
        "gpt-scaffold-tool-data-label": "指令工具",
        "process-visual-tool-data-label": "流程工具",
        "essay-product-visual-tool-data-label": "论文产品工具",
        "collaborate-writing-tool-data-label": "协作写作工具",
        "essay-writing-tool-data-label": "写作工具",
        "math-tool-data-label": "数学工具",
        "planner-tool-data-label": "计划工具",
        "checklist-tool-data-label": "写作分析工具",
        "multi-agents-single-window-tool-data-label": "聊天机器人工具",
        "dictionary-tool-data-label": "词典工具",
        "timer-tool-data-label": "计时器工具",
        "questionnaire-tool-data-label": "问卷工具",
        "chat-reminder-message": "聊天机器人现在可供你使用。你不能用聊天机器人来替代你写作文。",
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "输入文字开始对话",
        "chat-reminder-message-title": "提醒信息",
        "scaffolding-message-title": "你目前进度的反馈：",
        "scaffold-chat-reminder": "嗨，你已经在聊天上花了不少时间了，我们回到主要任务吧！",
    },
    zh_hk: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[開始任務條件]]

一位學生正在進行一項論文寫作任務。

以下是任務說明：

任務主題：為北方海岸社區制定再生能源策略

你受雇為能源顧問，向位於山脈鄰近、冬季嚴酷多雪的北方海岸社區提出建議。這個社區目前嚴重依賴外來的化石燃料，不僅成本高昂、對環境有害，在嚴寒暴風雪時期也供應不穩。該社區希望找到能保證全年穩定供能、長期降低成本，並且能帶來本地就業機會的解決方案。此區域擁有相當穩定的離岸海洋風力，且鄰近可持續管理的森林資源。然而，保護當地的海洋生態及森林生態系統是社區優先考量。

您的任務：

撰寫一份簡短的提案，建議結合兩種不同的再生能源，提出一個平衡的能源策略。請在提案中清楚說明：

• 為什麼每一種再生能源適合當地的地理環境、氣候挑戰與能源需求。
• 財務可行性以及預期能帶來的經濟效益，包括就業機會。
• 可能的環境影響，以及您的策略如何降低對森林與海洋生態的風險。

此任務限時 45 分鐘完成。

以下是提供給學生的評分指標。此指標將用於評估您的文章：

文章字數需介乎 200 至 300 字。
請注意，您不可直接從閱讀材料或其他來源複製內容——文章必須以自行撰寫的文字呈現。

評分細項如下：

指明所選的能源來源：
• 優秀 (3)：清楚結合兩種能源類型，並為兩者提供合理原因。
• 良好 (2)：提及兩種能源種類，但對原因著墨不多。
• 基本 (1)：只提及一種能源或缺乏清晰解決方案；幾乎沒有或沒有解釋。
地理與氣候細節的運用：
• 優秀 (3)：清楚闡明這兩種能源如何適合當地的地理和氣候。
• 良好 (2)：對當地地理與氣候有部分描述，但與能源選擇連結不夠緊密。
• 基本 (1)：對於當地相關細節著墨甚少或無；能源選擇與情景不符。
經濟及就業效益：
• 優秀 (3)：能充分解釋計劃如何節省成本並創造本地就業機會。
• 良好 (2)：提及資金或就業機會，但沒有詳細說明。
• 基本 (1)：未提及資金或就業，或內容有誤。
環境保護：
• 優秀 (3)：明確說明如何保護森林與海洋，並闡述特定的風險控管方法。
• 良好 (2)：提到環境影響，但對於如何保護的細節不足。
• 基本 (1)：幾乎不提及環境，或忽略對自然生態的威脅。
文章寫作質素：
• 優秀 (3)：文字清晰，無拼寫或文法錯誤，思路流暢。
• 良好 (2)：有一些拼寫或文法錯誤，影響文章清晰度；部分意念不夠明確。
• 基本 (1)：文法或拼寫錯誤頻繁；思路混亂或缺乏連貫性。

[[任務條件結束]]

[[開始你的任務]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    關於此次回饋，請遵循有效回饋框架。它以學習者為中心，並應包括三個主要部分：

1. 根據上面列出的學習條件，利用學生表現出來的優勢和劣勢來指導教學。  
2. 專注於後續影響，提供具有可操作性的評論資訊，幫助學生達成該任務的學習成果。這應該根據上述建議。  
3. 支持學生對自己的學習保持掌控感，關注他們的社交、情緒與行動需求，並鼓勵他們對評估性意見保持開放態度。  

請注意以下限制：

請盡力避免提供任何有關應該包含在文章中的詳細指示！

請確保你只輸出回饋文字！

最後，回饋不得超過100個單字！

[[任務結束]]`,
        "gpt-scaffold-prompt-template-groupC": `[[開始任務條件]]

一位學生正在進行一項論文寫作任務。

以下是任務說明：

任務主題：為北方海岸社區制定再生能源策略

你受雇為能源顧問，向位於山脈鄰近、冬季嚴酷多雪的北方海岸社區提出建議。這個社區目前嚴重依賴外來的化石燃料，不僅成本高昂、對環境有害，在嚴寒暴風雪時期也供應不穩。該社區希望找到能保證全年穩定供能、長期降低成本，並且能帶來本地就業機會的解決方案。此區域擁有相當穩定的離岸海洋風力，且鄰近可持續管理的森林資源。然而，保護當地的海洋生態及森林生態系統是社區優先考量。

您的任務：

撰寫一份簡短的提案，建議結合兩種不同的再生能源，提出一個平衡的能源策略。請在提案中清楚說明：

• 為什麼每一種再生能源適合當地的地理環境、氣候挑戰與能源需求。
• 財務可行性以及預期能帶來的經濟效益，包括就業機會。
• 可能的環境影響，以及您的策略如何降低對森林與海洋生態的風險。

此任務限時 45 分鐘完成。

以下是提供給學生的評分指標。此指標將用於評估您的文章：

文章字數需介乎 200 至 300 字。
請注意，您不可直接從閱讀材料或其他來源複製內容——文章必須以自行撰寫的文字呈現。

評分細項如下：

指明所選的能源來源：
• 優秀 (3)：清楚結合兩種能源類型，並為兩者提供合理原因。
• 良好 (2)：提及兩種能源種類，但對原因著墨不多。
• 基本 (1)：只提及一種能源或缺乏清晰解決方案；幾乎沒有或沒有解釋。
地理與氣候細節的運用：
• 優秀 (3)：清楚闡明這兩種能源如何適合當地的地理和氣候。
• 良好 (2)：對當地地理與氣候有部分描述，但與能源選擇連結不夠緊密。
• 基本 (1)：對於當地相關細節著墨甚少或無；能源選擇與情景不符。
經濟及就業效益：
• 優秀 (3)：能充分解釋計劃如何節省成本並創造本地就業機會。
• 良好 (2)：提及資金或就業機會，但沒有詳細說明。
• 基本 (1)：未提及資金或就業，或內容有誤。
環境保護：
• 優秀 (3)：明確說明如何保護森林與海洋，並闡述特定的風險控管方法。
• 良好 (2)：提到環境影響，但對於如何保護的細節不足。
• 基本 (1)：幾乎不提及環境，或忽略對自然生態的威脅。
文章寫作質素：
• 優秀 (3)：文字清晰，無拼寫或文法錯誤，思路流暢。
• 良好 (2)：有一些拼寫或文法錯誤，影響文章清晰度；部分意念不夠明確。
• 基本 (1)：文法或拼寫錯誤頻繁；思路混亂或缺乏連貫性。

[[任務條件結束]]

[[開始你的任務]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        關於此次回饋，請遵循有效回饋框架。它以學習者為中心，並應包括三個主要部分：

1. 根據上面列出的學習條件，利用學生表現出來的優勢和劣勢來指導教學。  
2. 專注於後續影響，提供具有可操作性的評論資訊，幫助學生達成該任務的學習成果。這應該根據上述建議。  
3. 支持學生對自己的學習保持掌控感，關注他們的社交、情緒與行動需求，並鼓勵他們對評估性意見保持開放態度。  

請注意以下限制：

請盡力避免提供任何有關應該包含在文章中的詳細指示！

請確保你只輸出回饋文字！

最後，回饋不得超過100個單字！

[[任務結束]]`,
        "annotation-notes-title": "",
        "annotation-notes-delete-confirm-message": "",
        "annotation-write-note-placeholder": "",
        "annotation-tag-placeholder": "",
        "annotation-note-save-btn-text": "",
        "annotation-note-cancel-btn-text": "",
        "annotation-search-btn-text": "",
        "annotation-search-panel-input-placeholder": "",
        "scaffolding-title": "",
        "scaffolding-create-checklist-btn-text": "",
        "scaffolding-edit-checklist-btn-text": "",
        "scaffolding-unread-message-text": "",
        "scaffolding-chat-open-text": "",
        "gpt-scaffolding-title": "",
        "planner-title": "",
        "planner-learning-strategy-select-label-text": "",
        "planner-learning-strategy-select-option1-text": "",
        "planner-learning-strategy-select-customise-option-text": "",
        "planner-add-more-customise-strategy-btn-text": "",
        "planner-customise-option-hint-textarea-placeholder": "",
        "planner-next-btn-text": "",
        "planner-time-unit-minute": "",
        "planner-display-plan-title": "",
        "planner-display-overall-strategy-label": "",
        "planner-display-time-allocation-label": "",
        "planner-display-writing-strategy-label": "",
        "planner-display-reading-strategy-label": "",
        "planner-customise-plan-reason-placeholder": "",
        "essay-title": "",
        "essay-save-btn-text": "",
        "essay-writing-placeholder": "",
        "essay-show-word-count-btn-text": "",
        "essay-save-toast-text": "",
        "dictionary-title": "",
        "dictionary-send-btn-text": "",
        "dictionary-panel-input-placeholder": "",
        "checklist-title": "",
        "checklist-basic-panel-title": "",
        "checklist-academic-panel-title": "",
        "checklist-originality-panel-title": "",
        "checklist-integration-panel-title": "",
        "checklist-analyse-btn-text": "",
        "chatgpt-title": "",
        "chatgpt-send-btn-text": "",
        "chatgpt-panel-input-placeholder": "",
        "chatteacher-title": "",
        "chatteacher-panel-input-placeholder": "",
        "chatteacher-connect-server-status-text": "",
        "chatteacher-teacher-online-status-text": "",
        "chatteacher-send-btn-text": "",
        "chatgpt-role-description": "",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": "直到目前為止的這個學習階段，那些在此任務中表現良好的學生，都確保透過使用所提供的計時工具來了解任務的時間限制。然而，這位學生似乎並非如此。可否請你以段落形式（不要使用項目符號與編號列表）為這位學生提供回饋，說明他如何透過使用工具列中帶有時鐘符號的計時器工具，更好地監控時間限制？同時，也請你在給出回饋時，全面考量以下這位學生的所有學習條件：",
        "gpt-scaffold-need-check-srl-prompt-CMTR": `直到目前為止的這個學習階段，在這項作業中表現出色的學生，都確保自己會回顧作業要求和評分標準，藉此評估他們的文章草稿，並檢視自己的寫作是否與作業要求以及評分標準相符。這位學生似乎沒有做到這一點。是否能請你為這位學生提供段落形式的回饋（不要使用項目符號和編號列表），說明該如何使用作業說明及評分標準來評估自己的文章草稿，並監督自己的撰寫是否符合作業要求與評分標準，同時儘量避免提供任何有關文章內容應該包含哪些細節的詳細指示？另外，也請你在此過程中，綜合考量這位學生的所有以下學習條件：`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `直到目前為止的這個學習階段，表現良好的學生都確保清楚理解任務說明與評分標準，而你似乎尚未完全掌握這兩項關鍵要素。在檢視任務指示時，試著先聚焦於最核心的要求，然後再從評分標準一一對照，思考哪個部分与你的文章思路最直接相關。過程中，如果發現自己對某些術語或規範缺乏了解，可以將它們整理出來並查詢或討論，以確保你真正明白所需達到的水準。同時也要留意自己的心態與步驟安排，反思是否有忽略任何重要細節，或對評分準則的應用沒有足夠意識。在寫作前與寫作後，都建議再次檢視任務要求與評分標準是否一致，培養對照和自我審查的習慣。藉由這樣的反覆檢核，你將更能掌握文章與評分規範的對齊程度，提升對整體需求的理解與回應。`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `直到目前為止的這個學習階段，那些在此任務中表現良好的學生，都是透過使用所提供的計時器工具來確保自己了解時間限制或任務，同時也清楚理解任務要求和評分標準。這位學生似乎並非如此。請問你能否提供給這位學生以段落形式（不要使用項目符號和編號列表）的回饋，這些回饋要結合所有相關的建議，包括如何透過使用工具列中帶有時鐘符號的計時器工具來改進對時間限制的監控，以及如何改進他對任務說明和評分標準的理解，並協助他提升自我覺察，確保寫作能符合任務要求與評分標準；同時，請盡量避免給予任何有關文章內容的詳細指示？此外，也請你在此過程中，全面考量這位學生的所有以下學習條件。`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "",
        "gpt-scaffold-need-check-srl-prompt-OT2": `直到目前為止的這個學習階段，那些在此任務中表現良好的學生，都能根據所閱讀的材料以自己的語言解釋觀點，展現出深入消化與理解文本的能力。當你在論述時，嘗試留心自己是否真的掌握了材料的重點，並思考如何用個人化的方式表達訊息。這不只是對記憶和知識的延伸運用，更能幫助你發展對文字的獨立判斷與主動思維。若感到有難度，不妨先留意自己在閱讀時是否專注於理解內容，並檢視是否因時間安排或對概念的掌握而在敘述上受到侷限。在這過程中，也可以多觀察自己是否有形成清晰的思考模式，或是否仍需釐清一些專有名詞或關鍵概念。當你能以自己的話來解釋所閱讀到的資料，你對文本的理解程度往往也會更為深刻，自然更能融入任務要求並呼應評分標準。`,
        "gpt-scaffold-user-take-pre-study-prompt": "這位學生已參與先前的研究，因此他/她對這項任務已具備一定程度的認知。",
        "gpt-scaffold-isdimu-prompt-0": "",
        "gpt-scaffold-isdimu-prompt-16": "",
        "gpt-scaffold-isdimu-prompt-32": "",
        "gpt-scaffold-pretest-grades-prompt-0": "這位學生對再生能源的知識程度很高。",
        "gpt-scaffold-pretest-grades-prompt-5": "這位學生對再生能源的知識程度很低。",
        "gpt-scaffold-pretest-grades-prompt-10": "這位學生對再生能源的知識程度中等。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "這位學生了解什麼對自己最有效，並能選擇適合的學習策略。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "這位學生不清楚什麼能幫助他們學習，也不確定哪些策略最有效。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "這位學生對有效的學習方式有一些瞭解，能說出一些有幫助的策略。",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "這位學生會規劃、監控並調整自己的學習以取得更好成果。",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "這位學生在執行任務時沒有事先規劃或追蹤自己的學習進度。",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "這位學生在任務過程中只注意到部分學習規劃，並檢查自己的學習。",
        "gpt-scaffold-test-mai-name": "活動三：反思你的學習",
        "gpt-scaffold-test-isdimu-name": "",
        "gpt-scaffold-pretest-name": "活動二：你對可再生能源了解多少？",
        "gpt-scaffold-check-take-previous-study-name": "活動一：關於你自己",
        "gpt-scaffold-planner-select-prompt-1": "這位學生為此任務想出了[先閱讀再寫作]的計畫。",
        "gpt-scaffold-planner-select-prompt-2": "這位學生為此任務想出了[先閱讀後寫作]的計畫。",
        "gpt-scaffold-planner-select-prompt-3": "這位學生為此任務想出了[深度寫作並選擇性閱讀]的計畫。",
        "gpt-scaffold-planner-select-prompt-4": "",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "這位學生尚未為執行此任務而制定明確計畫。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "這位學生已經為執行此任務而制定了明確計畫。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "這位學生不知道還剩餘多少時間來完成任務。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "這位學生知道還剩餘多少時間來完成任務。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "這位學生不知道在環境中有哪些可幫助完成任務的工具。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "這位學生知道在環境中有哪些可幫助完成任務的工具。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "這位學生不知道在環境中有哪些可幫助完成此任務的閱讀材料。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "這位學生知道在環境中有哪些可幫助完成此任務的閱讀材料。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "這位學生不知道評分標準。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "這位學生知道評分標準。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "這位學生不知道任務指示。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "這位學生知道任務指示。",
        "gpt-scaffold-role-description": "",
        "planner-customise-step2-instruction": "",
        "planner-reading-strategy-1": "逐頁閱讀教材",
        "planner-reading-strategy-2": "先快速瀏覽，然後進行詳細閱讀",
        "planner-reading-strategy-3": "使用標記工具標示關鍵內容",
        "planner-reading-strategy-4": "邊讀邊在筆記中寫下自己的理解",
        "planner-reading-strategy-5": "以問題為導向閱讀，聚焦特定內",
        "planner-reading-strategy-6": "選擇性閱讀，略過無關內容",
        "planner-reading-strategy-instruction": "您計劃使用哪些閱讀技巧？（可多選）",
        "planner-writing-strategy-1": "先草擬文章結構，然後填入細節",
        "planner-writing-strategy-2": "撰寫時使用筆記與標記內容",
        "planner-writing-strategy-3": "參考指示與評分標準，確保寫作符合要求",
        "planner-writing-strategy-4": "複製並貼上關鍵句子，再將其流暢改寫",
        "planner-writing-strategy-5": "運用所學的寫作框架與模式",
        "planner-writing-strategy-instruction": "您計劃使用哪些寫作技巧？（可多選）",
        "planner-main-strategy-1": "先讀後寫",
        "planner-main-strategy-1-instruction": "您在閱讀和寫作上分別計畫花多少時間？",
        "planner-main-strategy-1-task-1": "2.1 用於閱讀的時間",
        "planner-main-strategy-1-task-2": "2.2 用於寫作的時間",
        "planner-main-strategy-2": "同時閱讀與寫作",
        "planner-main-strategy-2-instruction": "您計劃在每個主題上分配多少時間？",
        "planner-main-strategy-2-task-1": "2.1 同時閱讀與寫作：能源選擇",
        "planner-main-strategy-2-task-2": "2.2 同時閱讀與寫作：成本與效益",
        "planner-main-strategy-2-task-3": "2.3 同時閱讀與寫作：環境影響",
        "planner-main-strategy-3": "密集寫作，選擇性閱讀",
        "planner-main-strategy-3-instruction": "您打算在寫作流程的各個階段投入多少時間？",
        "planner-main-strategy-3-task-1": "2.1 規劃文章結構：",
        "planner-main-strategy-3-task-2": "2.2 撰寫初稿：",
        "planner-main-strategy-3-task-3": "2.3 閱讀與文章相關的補充資訊：",
        "planner-main-strategy-3-task-4": "2.4 審閱並改進文章：",
        "planner-customise-plan-title": "",
        "planner-select-main-strategy-hint": "",
        "planner-allocate-time-hint": "",
        "planner-select-reading-writing-strategy-hint": "",
        "planner-save-plan-hint": "",
        "rule-based-scaffold-title-1": "",
        "rule-based-scaffold-title-1-task-1": "",
        "rule-based-scaffold-title-1-task-2": "",
        "rule-based-scaffold-title-1-task-3": "",
        "rule-based-scaffold-title-2": "",
        "rule-based-scaffold-title-2-task-1": "",
        "rule-based-scaffold-title-2-task-2": "",
        "rule-based-scaffold-title-2-task-3": "",
        "rule-based-scaffold-title-3": "",
        "rule-based-scaffold-title-3-task-1": "",
        "rule-based-scaffold-title-3-task-2": "",
        "rule-based-scaffold-title-3-task-3": "",
        "rule-based-scaffold-title-4": "",
        "rule-based-scaffold-title-4-task-1": "",
        "rule-based-scaffold-title-4-task-2": "",
        "rule-based-scaffold-title-4-task-3": "",
        "rule-based-scaffold-title-5": "",
        "rule-based-scaffold-title-5-task-1": "",
        "rule-based-scaffold-title-5-task-2": "",
        "rule-based-scaffold-title-5-task-3": "",
        "annotation-label-1": "記筆記",
        "annotation-label-2": "重要",
        "annotation-label-3": "有用",
        "annotation-label-4": "概念",
        "annotation-label-5": "疑惑",
        "product-visual-title": "",
        "product-visual-close-btn": "",
        "process-visual-title": "",
        "process-visual-set-goal-label": "",
        "process-visual-close-btn": "",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "註解面板",
        "annotation-search-toolbar-btn-hint": "",
        "gpt-scaffold-toolbar-btn-hint": "",
        "essay-writing-toolbar-btn-hint": "",
        "planner-toolbar-btn-hint": "",
        "multi-agents-single-window-toolbar-btn-hint": "聊天助理",
        "timer-toolbar-btn-hint": "",
        "like-response-text": "你喜歡這個回覆嗎？",
        "annotation-tool-data-label": "",
        "search-annotation-tool-data-label": "",
        "gpt-scaffold-tool-data-label": "",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "",
        "math-tool-data-label": "",
        "planner-tool-data-label": "",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": `
此聊天機器人現在可供您使用。您不能使用此聊天機器人來撰寫您的文章。`,
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "輸入文字以開始聊天",
        "chat-reminder-message-title": "提醒訊息",
        "scaffolding-message-title": "你目前進度的反饋：",
        "scaffold-chat-reminder": "嗨，你喺聊天度花咗唔少時間，等我哋返去主要任務啦！",
    },
    zh_tw: {
        "gpt-scaffold-prompt-template-groupA": "",
        "gpt-scaffold-prompt-template-groupB": `[[開始任務條件]]
 
 一位學生正在進行一項論文寫作任務。
 
 以下是任務說明：
 
 任務主題：為北方海岸社區制定再生能源策略
 
 你受雇為能源顧問，向位於山脈鄰將近、冬季嚴酷多雪的北方海岸社區提出建議。這個社區目前嚴重依賴外來的化石燃料，不僅成本高昂、對環境有害，在嚴寒暴風雪時期也供應不穩。該社區希望找到能保證全年穩定供能、長期降低成本，並且能帶來本地就業機會的解決方案。此區域擁有相當穩定的離岸海洋風力，且鄰將近可持續管理的森林資源。然而，保護當地的海洋生態及森林生態系統是社區優先考量。
 
 您的任務：
 
 撰寫一份簡短的提案，建議結合兩種不同的再生能源，提出一個平衡的能源策略。請在提案中清楚說明：
 
 • 為什麼每一種再生能源適合當地的地理環境、氣候挑戰與能源需求。
 • 財務可行性以及預期能帶來的經濟效益，包括就業機會。
 • 可能的環境影響，以及您的策略如何降低對森林與海洋生態的風險。
 
 此任務限時 45 分鐘完成。

以下是提供給學生的評分指標。此指標將用於評估您的文章：
 
 文章字數需介乎 200 至 300 字。
 請注意，您不可直接從閱讀材料或其他來源複製內容——文章必須以自行撰寫的文字呈現。
 
 評分細項如下：
 
 指明所選的能源來源：
 • 優秀 (3)：清楚結合兩種能源類型，並為兩者提供合理原因。
 • 良好 (2)：提及兩種能源種類，但對原因著墨不多。
 • 基本 (1)：只提及一種能源或缺乏清晰解決方案；幾乎沒有或沒有解釋。
 地理與氣候細節的運用：
 • 優秀 (3)：清楚闡明這兩種能源如何適合當地的地理和氣候。
 • 良好 (2)：對當地地理與氣候有部分描述，但與能源選擇連結不夠緊密。
 • 基本 (1)：對於當地相關細節著墨甚少或無；能源選擇與情景不符。
 經濟及就業效益：
 • 優秀 (3)：能充分解釋計劃如何節省成本並創造在地就業。
 • 良好 (2)：提及資金或就業機會，但沒有詳細說明。
 • 基本 (1)：未提及資金或就業，或內容有誤。
 環境保護：
 • 優秀 (3)：明確說明如何保護森林與海洋，並闡述特定的風險控管方法。
 • 良好 (2)：提到環境影響，但對於如何保護的細節不足。
 • 基本 (1)：幾乎不提及環境，或忽略對自然生態的威脅。
 文章寫作質素：
 • 優秀 (3)：文字清晰，無拼寫或文法錯誤，思路流暢。
 • 良好 (2)：有一些拼寫或文法錯誤，影響文章清晰度；部分意念不夠明確。
 • 基本 (1)：文法或拼字錯誤頻繁；思路混亂或缺乏連貫性。

[[任務條件結束]]

[[開始你的任務]]
    ;;;SRL_PROCESS_PROMPT;;;

    Please note the following learning conditions of this student:
    ;;;ADAPTIVE_PROMPT;;;
    
    關於此次回饋，請遵循有效回饋框架。它以學習者為中心，並應包括三個主要部分：
 
 1. 根據上面列出的學習條件，利用學生表現中的優勢和劣勢來指導教學。 
 2. 專注於後續影響，提供具有可操作性的評論資訊，幫助學生達成該任務的學習成果。這應該源於上述建議。 
 3. 支持學生對自己的學習保持掌控感，關注他們的社會、情緒與動機需求，並鼓勵他們對評估性意見保持開放態度。

請注意以下限制：
 
 請盡力避免提供任何有關應該包含在文章中的詳細指示！
 
 請確保你只輸出回饋文字！
 
 最後，回饋不得超過100個單字！
 
 [[任務結束]]`,
        "gpt-scaffold-prompt-template-groupC": `[[開始任務條件]]
 
 一位學生正在進行一項論文寫作任務。
 
 以下是任務說明：
 
 任務主題：為北方海岸社區制定再生能源策略
 
 你受雇為能源顧問，向位於山脈鄰將近、冬季嚴酷多雪的北方海岸社區提出建議。這個社區目前嚴重依賴外來的化石燃料，不僅成本高昂、對環境有害，在嚴寒暴風雪時期也供應不穩。該社區希望找到能保證全年穩定供能、長期降低成本，並且能帶來本地就業機會的解決方案。此區域擁有相當穩定的離岸海洋風力，且鄰將近可持續管理的森林資源。然而，保護當地的海洋生態及森林生態系統是社區優先考量。
 
 您的任務：
 
 撰寫一份簡短的提案，建議結合兩種不同的再生能源，提出一個平衡的能源策略。請在提案中清楚說明：
 
 • 為什麼每一種再生能源適合當地的地理環境、氣候挑戰與能源需求。
 • 財務可行性以及預期能帶來的經濟效益，包括就業機會。
 • 可能的環境影響，以及您的策略如何降低對森林與海洋生態的風險。
 
 此任務限時 45 分鐘完成。

以下是提供給學生的評分指標。此指標將用於評估您的文章：
 
 文章字數需介乎 200 至 300 字。
 請注意，您不可直接從閱讀材料或其他來源複製內容——文章必須以自行撰寫的文字呈現。
 
 評分細項如下：
 
 指明所選的能源來源：
 • 優秀 (3)：清楚結合兩種能源類型，並為兩者提供合理原因。
 • 良好 (2)：提及兩種能源種類，但對原因著墨不多。
 • 基本 (1)：只提及一種能源或缺乏清晰解決方案；幾乎沒有或沒有解釋。
 地理與氣候細節的運用：
 • 優秀 (3)：清楚闡明這兩種能源如何適合當地的地理和氣候。
 • 良好 (2)：對當地地理與氣候有部分描述，但與能源選擇連結不夠緊密。
 • 基本 (1)：對於當地相關細節著墨甚少或無；能源選擇與情景不符。
 經濟及就業效益：
 • 優秀 (3)：能充分解釋計劃如何節省成本並創造在地就業。
 • 良好 (2)：提及資金或就業機會，但沒有詳細說明。
 • 基本 (1)：未提及資金或就業，或內容有誤。
 環境保護：
 • 優秀 (3)：明確說明如何保護森林與海洋，並闡述特定的風險控管方法。
 • 良好 (2)：提到環境影響，但對於如何保護的細節不足。
 • 基本 (1)：幾乎不提及環境，或忽略對自然生態的威脅。
 文章寫作質素：
 • 優秀 (3)：文字清晰，無拼寫或文法錯誤，思路流暢。
 • 良好 (2)：有一些拼寫或文法錯誤，影響文章清晰度；部分意念不夠明確。
 • 基本 (1)：文法或拼字錯誤頻繁；思路混亂或缺乏連貫性。

[[任務條件結束]]

[[開始你的任務]]
        ;;;SRL_PROCESS_PROMPT;;;

        Please note the following learning conditions of this student:
        ;;;ADAPTIVE_PROMPT;;;

        關於此次回饋，請遵循有效回饋框架。它以學習者為中心，並應包括三個主要部分：
 
 1. 根據上面列出的學習條件，利用學生表現中的優勢和劣勢來指導教學。 
 2. 專注於後續影響，提供具有可操作性的評論資訊，幫助學生達成該任務的學習成果。這應該源於上述建議。 
 3. 支持學生對自己的學習保持掌控感，關注他們的社會、情緒與動機需求，並鼓勵他們對評估性意見保持開放態度。

請注意以下限制：
 
 請盡力避免提供任何有關應該包含在文章中的詳細指示！
 
 請確保你只輸出回饋文字！
 
 最後，回饋不得超過100個單字！
 
 [[任務結束]]`,
        "annotation-notes-title": "筆記面板",
        "annotation-notes-delete-confirm-message": "",
        "annotation-write-note-placeholder": "請在這裡記下筆記...",
        "annotation-tag-placeholder": "請輸入新標籤並按確認鍵...",
        "annotation-note-save-btn-text": "Save",
        "annotation-note-cancel-btn-text": "Cancel",
        "annotation-search-btn-text": "搜尋",
        "annotation-search-panel-input-placeholder": "請輸入關鍵字進行搜尋...",
        "scaffolding-title": "指示面板",
        "scaffolding-create-checklist-btn-text": "創建清單",
        "scaffolding-edit-checklist-btn-text": "編輯",
        "scaffolding-unread-message-text": "未讀訊息",
        "scaffolding-chat-open-text": "",
        "gpt-scaffolding-title": "指示面板",
        "planner-title": "計畫工具",
        "planner-learning-strategy-select-label-text": "1. 請為您的學習策略制定計畫：",
        "planner-learning-strategy-select-option1-text": "選擇一個策略",
        "planner-learning-strategy-select-customise-option-text": "使用您自己的策略",
        "planner-add-more-customise-strategy-btn-text": "加入更多策略",
        "planner-customise-option-hint-textarea-placeholder": "請解釋您為什麼設計出這個計畫？",
        "planner-next-btn-text": "下一步",
        "planner-time-unit-minute": "",
        "planner-display-plan-title": "我的學習計畫",
        "planner-display-overall-strategy-label": "整體策略:",
        "planner-display-time-allocation-label": "時間分配:",
        "planner-display-writing-strategy-label": "寫作策略:",
        "planner-display-reading-strategy-label": "閱讀策略:",
        "planner-customise-plan-reason-placeholder": "(選填)",
        "essay-title": "作文寫作工具",
        "essay-save-btn-text": "儲存作文",
        "essay-writing-placeholder": "在此撰寫作文...",
        "essay-show-word-count-btn-text": "顯示字數",
        "essay-save-toast-text": "你的文章已儲存！",
        "dictionary-title": "字典工具",
        "dictionary-send-btn-text": "發送",
        "dictionary-panel-input-placeholder": "請輸入查詢詞...",
        "checklist-title": "清單工具",
        "checklist-basic-panel-title": "基本的",
        "checklist-academic-panel-title": "學術的",
        "checklist-originality-panel-title": "原創性",
        "checklist-integration-panel-title": "整合與闡述",
        "checklist-analyse-btn-text": "分析",
        "chatgpt-title": "AI 助手",
        "chatgpt-send-btn-text": "發送",
        "chatgpt-panel-input-placeholder": "提出問題...",
        "chatteacher-title": "詢問老師工具",
        "chatteacher-panel-input-placeholder": "提出問題...",
        "chatteacher-connect-server-status-text": "連接伺服器狀態",
        "chatteacher-teacher-online-status-text": "教師在線狀態",
        "chatteacher-send-btn-text": "發送",
        "chatgpt-role-description": "您是一個得力助手，請根據提供的資訊回答問題。",
        "gpt-scaffold-need-check-srl-prompt-CMTC1": "直到目前為止的這個學習階段，那些在此任務中表現良好的學生，都確保透過使用所提供的計時工具來了解任務的時間限制。然而，這位學生似乎並非如此。可否請你以段落形式（不要使用項目符號與編號列表）為這位學生提供回饋，說明他如何透過使用工具列中帶有時鐘符號的計時器工具，更好地監控時間限制？同時，也請你在給出回饋時，全面考量以下這位學生的所有學習條件：",
        "gpt-scaffold-need-check-srl-prompt-CMTR": `直到目前為止的這個學習階段，在這項作業中表現出色的學生，都確保自己會回顧作業要求和評分標準，藉此評估他們的文章草稿，並檢視自己的寫作是否與作業要求以及評分標準相符。這位學生似乎沒有做到這一點。是否能請你為這位學生提供段落形式的回饋（不要使用項目符號和編號列表），說明該如何使用作業說明及評分標準來評估自己的文章草稿，並監督自己的撰寫是否符合作業要求與評分標準，同時儘量避免提供任何有關文章內容應該包含哪些細節的詳細指示？另外，也請你在此過程中，綜合考量這位學生的所有以下學習條件：`,
        "gpt-scaffold-need-check-srl-prompt-CMTR2": "我我們有一位學生正在進行這項學習任務。在學習階段的第14分鐘之前，其他在此任務中表現良好的學生已經持續檢查任務指示和評分標準，但這位學生似乎未有類似的行動。因此，根據上述提供的所有資訊（包括任務要求、評分標準和閱讀內容），以及這位學生的學習條件，請以段落形式提供反饋，指導該學生如何在本次寫作課程結束前定期檢查任務指示和評分標準，並請避免以列點或條列方式呈現內容。",
        "gpt-scaffold-need-check-srl-prompt-CSTR2": `直到目前為止的這個學習階段，表現良好的學生都確保清楚理解任務說明與評分標準，而你似乎尚未完全掌握這兩項關鍵要素。在檢視任務指示時，試著先聚焦於最核心的要求，然後再從評分標準一一對照，思考哪個部分与你的文章思路最直接相關。過程中，如果發現自己對某些術語或規範缺乏了解，可以將它們整理出來並查詢或討論，以確保你真正明白所需達到的水準。同時也要留意自己的心態與步驟安排，反思是否有忽略任何重要細節，或對評分準則的應用沒有足夠意識。在寫作前與寫作後，都建議再次檢視任務要求與評分標準是否一致，培養對照和自我審查的習慣。藉由這樣的反覆檢核，你將更能掌握文章與評分規範的對齊程度，提升對整體需求的理解與回應。`,
        "gpt-scaffold-need-check-srl-prompt-STR-MTC": `直到目前為止的這個學習階段，那些在此任務中表現良好的學生，都是透過使用所提供的計時器工具來確保自己了解時間限制或任務，同時也清楚理解任務要求和評分標準。這位學生似乎並非如此。請問你能否提供給這位學生以段落形式（不要使用項目符號和編號列表）的回饋，這些回饋要結合所有相關的建議，包括如何透過使用工具列中帶有時鐘符號的計時器工具來改進對時間限制的監控，以及如何改進他對任務說明和評分標準的理解，並協助他提升自我覺察，確保寫作能符合任務要求與評分標準；同時，請盡量避免給予任何有關文章內容的詳細指示？此外，也請你在此過程中，全面考量這位學生的所有以下學習條件。`,
        "gpt-scaffold-need-check-srl-prompt-OR2": "我們有一位學生正在進行這項學習任務。截至學習階段的第21分鐘，其他在此任務中表現良好的學生已經開始在他們的作文中融入閱讀內容的相關資訊。因此，根據上述提供的所有資訊（包括任務要求、評分標準和閱讀內容），以及這位學生的學習條件，請以段落形式提供反饋，指導該學生如何根據任務要求，將閱讀內容中的資訊有效整合到他的作文草稿中，並請避免以列點或條列方式呈現內容。",
        "gpt-scaffold-need-check-srl-prompt-OT2": `直到目前為止的這個學習階段，那些在此任務中表現良好的學生，都能根據所閱讀的材料以自己的語言解釋觀點，展現出深入消化與理解文本的能力。當你在論述時，嘗試留心自己是否真的掌握了材料的重點，並思考如何用個人化的方式表達訊息。這不只是對記憶和知識的延伸運用，更能幫助你發展對文字的獨立判斷與主動思維。若感到有難度，不妨先留意自己在閱讀時是否專注於理解內容，並檢視是否因時間安排或對概念的掌握而在敘述上受到侷限。在這過程中，也可以多觀察自己是否有形成清晰的思考模式，或是否仍需釐清一些專有名詞或關鍵概念。當你能以自己的話來解釋所閱讀到的資料，你對文本的理解程度往往也會更為深刻，自然更能融入任務要求並呼應評分標準。`,
        "gpt-scaffold-user-take-pre-study-prompt": "這位學生已參與先前的研究，因此他/她對這項任務已具備一定程度的認知。",
        "gpt-scaffold-isdimu-prompt-0": "該學生對可用於促進學習的各種策略或技巧具有較高的理解水平。",
        "gpt-scaffold-isdimu-prompt-16": "該學生對可用於促進學習的各種策略或技巧具有較低的理解水平。",
        "gpt-scaffold-isdimu-prompt-32": "該學生似乎對可用於促進學習的各種策略或技巧有一些了解。",
        "gpt-scaffold-pretest-grades-prompt-0": "這位學生對再生能源的知識程度很高。",
        "gpt-scaffold-pretest-grades-prompt-5": "這位學生對再生能源的知識程度很低。",
        "gpt-scaffold-pretest-grades-prompt-10": "這位學生對再生能源的知識程度中等。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-0": "這位學生了解什麼對自己最有效，並能選擇適合的學習策略。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-21": "這位學生不清楚什麼能幫助他們學習，也不確定哪些策略最有效。",
        "gpt-scaffold-mai-knowledge-cognition-prompt-33": "這位學生對有效的學習方式有一些瞭解，能說出一些有幫助的策略。",
        "gpt-scaffold-mai-regulation-cognition-prompt-0": "這位學生會規劃、監控並調整自己的學習以取得更好成果。",
        "gpt-scaffold-mai-regulation-cognition-prompt-21": "這位學生在執行任務時沒有事先規劃或追蹤自己的學習進度。",
        "gpt-scaffold-mai-regulation-cognition-prompt-33": "這位學生在任務過程中有部分規劃並檢查自己的學習。",
        "gpt-scaffold-test-mai-name": "活動三：學習反思",
        "gpt-scaffold-test-isdimu-name": "活動 3：學習策略中的知識",
        "gpt-scaffold-pretest-name": "活動二：你對再生能源了解多少？",
        "gpt-scaffold-check-take-previous-study-name": "活動一：關於你自己",
        "gpt-scaffold-planner-select-prompt-1": "這位學生為此任務想出了[先閱讀再寫作]的計畫。",
        "gpt-scaffold-planner-select-prompt-2": "這位學生為此任務想出了[同時閱讀與寫作]的計畫。",
        "gpt-scaffold-planner-select-prompt-3": "這位學生為此任務想出了[深度寫作並選擇性閱讀]的計畫。",
        "gpt-scaffold-planner-select-prompt-4": "該學生為這項任務制定了「設計自己的計畫」的計畫。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist": "這位學生尚未為如何進行此任務制定明確計畫。",
        "gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist": "這位學生已經為如何進行此任務制定了明確計畫。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist": "這位學生不知道完成任務所剩餘的時間。",
        "gpt-scaffold-need-check-subaction-prompt-TIMER-exist": "這位學生知道完成任務所剩餘的時間。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist": "這位學生不知道在環境中有哪些可幫助完成任務的工具。",
        "gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist": "這位學生知道在環境中有哪些可幫助完成任務的工具。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist": "這位學生不知道在環境中有哪些可幫助完成此任務的閱讀材料。",
        "gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist": "這位學生知道在環境中有哪些可幫助完成此任務的閱讀材料。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist": "這位學生不知道評分標準。",
        "gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist": "這位學生知道評分標準。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist": "這位學生不知道任務指示。",
        "gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist": "這位學生知道任務指示。",
        "gpt-scaffold-role-description": "您是一個得力助手，請根據提供的內容給出建議。",
        "planner-customise-step2-instruction": "請詳細描述您計劃使用的學習策略以及如何分配時間。您也可以包括選擇這些策略和時間分配的原因。",
        "planner-reading-strategy-1": "逐頁閱讀教材",
        "planner-reading-strategy-2": "先快速瀏覽，然後進行詳細閱讀",
        "planner-reading-strategy-3": "使用標記工具標示關鍵內容",
        "planner-reading-strategy-4": "邊讀邊在筆記中寫下自己的理解",
        "planner-reading-strategy-5": "以問題為導向閱讀，聚焦特定內容",
        "planner-reading-strategy-6": "選擇性閱讀，略過無關內容",
        "planner-reading-strategy-instruction": "您計劃使用哪些閱讀技巧？（可多選）",
        "planner-writing-strategy-1": "先草擬文章結構，然後填入細節",
        "planner-writing-strategy-2": "撰寫時使用筆記與標記內容",
        "planner-writing-strategy-3": "參考指示與評分標準，確保寫作符合要求",
        "planner-writing-strategy-4": "複製並貼上關鍵句子，再將其流暢改寫",
        "planner-writing-strategy-5": "運用所學的寫作框架與模式",
        "planner-writing-strategy-instruction": "您計劃使用哪些寫作技巧？（可多選）",
        "planner-main-strategy-1": "先讀後寫",
        "planner-main-strategy-1-instruction": "您計劃分別花多少時間在閱讀和寫作上？",
        "planner-main-strategy-1-task-1": ` 
2.1 用於閱讀的時間`,
        "planner-main-strategy-1-task-2": "2.2 用於寫作的時間",
        "planner-main-strategy-2": "同時閱讀與寫作",
        "planner-main-strategy-2-instruction": ` 
您計劃在每個主題上分配多少時間？`,
        "planner-main-strategy-2-task-1": "2.1 同時閱讀與寫作：能源選擇",
        "planner-main-strategy-2-task-2": "2.2 同時閱讀與寫作：成本與效益",
        "planner-main-strategy-2-task-3": `
2.3 同時閱讀與寫作：環境影響`,
        "planner-main-strategy-3": "密集寫作，選擇性閱讀",
        "planner-main-strategy-3-instruction": "您打算在寫作流程的各個階段投入多少時間？",
        "planner-main-strategy-3-task-1": "2.1 規劃文章結構：",
        "planner-main-strategy-3-task-2": "2.2 撰寫初稿：",
        "planner-main-strategy-3-task-3": "2.3 閱讀與文章相關的補充資訊：",
        "planner-main-strategy-3-task-4": `
2.4 審閱並改進文章：`,
        "planner-customise-plan-title": "",
        "planner-select-main-strategy-hint": "請選擇一種策略繼續進行！",
        "planner-allocate-time-hint": "請為所有任務分配時間，總時間須在規定時間內！",
        "planner-select-reading-writing-strategy-hint": "請選擇您預計使用的技巧！",
        "planner-save-plan-hint": "請填寫所有策略名稱及正確的時間！",
        "rule-based-scaffold-title-1": "理解任務要求很重要。",
        "rule-based-scaffold-title-1-task-1": "(a) 請使用目錄以快速了解內容並略讀內容",
        "rule-based-scaffold-title-1-task-2": "(b) 請檢視作文評分標準",
        "rule-based-scaffold-title-1-task-3": "(c) 請檢視學習目標和指引說明",
        "rule-based-scaffold-title-2": "閱讀與主題相關資訊很重要。",
        "rule-based-scaffold-title-2-task-1": "(a) 請記錄重要資訊",
        "rule-based-scaffold-title-2-task-2": "(b) 請選擇閱讀內容",
        "rule-based-scaffold-title-2-task-3": "(c) 請檢查剩餘時間",
        "rule-based-scaffold-title-3": "閱讀相關資訊並回顧您的閱讀內容很重要。",
        "rule-based-scaffold-title-3-task-1": "(a) 請回顧註解以檢視目前的學習狀況",
        "rule-based-scaffold-title-3-task-2": "(b)請回顧學習目標和說明",
        "rule-based-scaffold-title-3-task-3": "(c) 請檢查作文以決定下一步閱讀的內容",
        "rule-based-scaffold-title-4": "寫好一篇優質的作文很重要。",
        "rule-based-scaffold-title-4-task-1": "(a) 請檢查剩餘時間",
        "rule-based-scaffold-title-4-task-2": "(b) 請檢視作文評分標準",
        "rule-based-scaffold-title-4-task-3": "(c) 請草擬作文，將學習內容轉化為主要要點",
        "rule-based-scaffold-title-5": "寫下與內容相關的資訊並檢查您的寫作是很重要的。",
        "rule-based-scaffold-title-5-task-1": "(a) 請檢視作文評分標準",
        "rule-based-scaffold-title-5-task-2": "(b) 請編輯您的作文",
        "rule-based-scaffold-title-5-task-3": "(c) 請檢視學習目標和說明指引",
        "annotation-label-1": "記筆記",
        "annotation-label-2": "重要",
        "annotation-label-3": "有用",
        "annotation-label-4": "概念",
        "annotation-label-5": "疑惑",
        "product-visual-title": "產品視覺化",
        "product-visual-close-btn": "關閉",
        "process-visual-title": "過程視覺化",
        "process-visual-set-goal-label": "您設定的目標",
        "process-visual-close-btn": "關閉",
        "gpt-scaffold-chat-send-btn-text": "Ctrl + Enter",
        "multi-agents-send-btn-text": "Ctrl+Enter",
        "annotation-toolbar-btn-hint": "註解面板",
        "annotation-search-toolbar-btn-hint": "註釋搜尋工具",
        "gpt-scaffold-toolbar-btn-hint": "指令工具",
        "essay-writing-toolbar-btn-hint": "寫作工具",
        "planner-toolbar-btn-hint": "規劃工具",
        "multi-agents-single-window-toolbar-btn-hint": "聊天助理",
        "timer-toolbar-btn-hint": "計時器",
        "like-response-text": "你喜歡這個回覆嗎？",
        "annotation-tool-data-label": "註釋工具",
        "search-annotation-tool-data-label": "",
        "gpt-scaffold-tool-data-label": "",
        "process-visual-tool-data-label": "",
        "essay-product-visual-tool-data-label": "",
        "collaborate-writing-tool-data-label": "",
        "essay-writing-tool-data-label": "",
        "math-tool-data-label": "",
        "planner-tool-data-label": "",
        "checklist-tool-data-label": "",
        "multi-agents-single-window-tool-data-label": "",
        "dictionary-tool-data-label": "",
        "timer-tool-data-label": "",
        "questionnaire-tool-data-label": "",
        "chat-reminder-message": "此聊天機器人現在可供您使用。您不能使用此聊天機器人來撰寫您的文章。",
        "multi-agents-single-window-placeholder-text-multi": "",
        "multi-agents-single-window-placeholder-text-single": "輸入文字以開始聊天",
        "chat-reminder-message-title": "提醒訊息",
        "scaffolding-message-title": "你目前進度的回饋",
        "scaffold-chat-reminder": "嗨，你已經在聊天上花了不少時間了，我們回到主要任務吧！",
    },
};


var annotationNotesTitle = "Notes Panel";
var deleteNoteConfirmMessage = "Do you want to delete this note?";
var annotationWriteNotePlaceholder = 'Write notes here...';
var annotationTagPlaceholder = "Input new tags and press Enter...";
var annotationNoteSaveBtnText = "Save";
var annotationNoteCancelBtnText = "Cancel";
var annotationSearchBtnText = "Search";
var annotationSearchPanelInputPlaceholder = "Input keywords to search...";

var scaffoldingTitle = "Instruction Panel";
var scaffoldingCreateChecklistBtnText = "Create Checklist";
var scaffoldingEditChecklistBtnText = "Edit";
var scaffoldingUnreadMessageText = "Unread Message";
// var scaffoldingChatOpenText = "Chat Open";
var popupUnreadMessageText = "new Question"

var gptScaffoldingTitle = "Instruction Panel";
var popupQuestionnaireTitle = "Questionnaire";

var plannerTitle = "Planner Tool";
var plannerLearningStrategySelectLabelText = "1. Please make a plan for your learning strategy:";
var plannerLearningStrategySelectOption1Text = "Select a strategy";
var plannerLearningStrategySelectCustomiseOptionText = "Use your own strategy";
var plannerAddMoreCustomiseStrategyBtnText = "Add More Strategy";
var plannerCustomiseOptionHintTextareaPlaceholder = "Please explain why you design this plan?";
var plannerCustomisePlanReasonPlaceholder = "(Optional)";
var plannerNextBtnText = "Next";
var plannerTimeUnitMinute = "minutes";

var plannerDisplayPlanTitle = "My Learning Plan";
var plannerDisplayOverallStrategyLabel = "Overall strategy:";
var plannerDisplayTimeAllocationLabel = "Time allocation:";
var plannerDisplayWritingStrategyLabel = "Writing strategy:";
var plannerDisplayReadingStrategyLabel = "Reading strategy:";
var plannerCustomisePlanTitle = "Customisation Plan";

var essayTitle = "Essay Writing Tool";
var essayTitleMedical = "Essay Writing Tool - Medical AI";
var essaySaveBtnText = "Save Essay";
var essayWritingPlaceholder = "Write essay here...";
var essayShowWordCountButtonText = "Word Count";
var essaySaveToastText = "Your essay is saved!";

var dictionaryTitle = "Dictionary Tool";
var dictionarySendBtnText = "Send";
var dictionaryPanelInputPlaceholder = "Please input a query word...";

var checklistTitle = "Checklist Tool";
var checklistBasicPanelTitle = "Basic";
var checklistAcademicPanelTitle = "Academic";
var checklistOriginalityPanelTitle = "Originality";
var checklistIntegrationPanelTitle = "Integration and Elaboration";
var checklistAnalyseBtnText = "Analyse";

var chatgptTitle = "AI Assistant";
var assistantTitle = "patient"
var chatgptSendBtnText = "Send";
var chatgptPanelInputPlaceholder = "Ask a question...";

var chatteacherTitle = "Ask Teacher Tool";
var chatTeacherPanelInputPlaceholder = "Ask a question...";
var chatteacherConnectServerStatusText = "Connect server status";
var chatteacherTeacherOnlineStatusText = "Teacher online status";
var chatteacherSendBtnText = "Send";


var mathTitle = "Math Editor";

var productVisualTitle = "Product Visualisation";
var productVisualCloseBtn = "Close";

var processVisualTitle = "Process Visualisation";
var processVisualSetGoalLabel = "Your set goals";
var processVisualCloseBtn = "Close";

var gptScaffoldChatSendBtnText = "Ctrl + Enter";
var multiAgentsSendBtnText = "Ctrl + Enter";
// var annotationTakeNoteLabel = "Takenote";


var annotationToolbarBtnHint = "Annotation Panel";
var annotationSearchToolbarBtnHint = "Annotation Search Tool";
var gptScaffoldToolbarBtnHint = "Instruction Tool";
var essayWritingToolbarBtnHint = "Writing Tool";
var plannerToolbarBtnHint = "Planner Tool";
var multiAgentsSingleWindowToolbarBtnHint = "Chat Assistant";
var timerToolbarBtnHint = "Timer";


var likeResponseText = "Do you like this response?";
var annotationToolDataLabel = "Annotations Tool";
var searchAnnotationToolDataLabel = "Search Annotations Tool";
var gptScaffoldToolDataLabel = "Instruction Tool";
var processVisualToolDataLabel = "Process Tool";
var essayProductVisualToolDataLabel = "Essay Product Tool";

var collaborateWritingToolDataLabel = "Collaborate Writing Tool";
var essayWritingToolDataLabel = "Writing Tool";
var mathToolDataLabel = "Math Tool";
var plannerToolDataLabel = "Planner Tool";
var checklistToolDataLabel = "Writing Analytics Tool";
var multiAgentsSingleWindowToolDataLabel = "Chatbot Tool";
var dictionaryToolDataLabel = "Dictionary Tool";
var timerToolDataLabel = "Timer Tool";
var questionnaireToolDataLabel = "Questionnaire Tool";
var chatReminderMessage = "This chatbot is now available for you. You cannot use the chatbot to write your essay.";
var chatReminderMessageTitle = "Reminder Message";
var scaffoldingMessageTitle = "Feedback of your current progress";


var multiAgentsSingleWindowPlaceholderTextMulti = "Input @ to select different Chatbots to chat";
var multiAgentsSingleWindowPlaceholderTextSingle = "Input text to start chat";
var scaffoldChatReminder = "Hi, you’ve been engaged with the chat for a while. Let’s go back to the main task!";

if (typeof gptScaffoldPromptTemplate === "undefined") {
    window.gptScaffoldPromptTemplate = "";
}

// var annotationLabelColors = [];

//
// var ruleBasedScaffoldContent = [];
//
//
// var plannerSelectStrategyHint = "Please select one strategy to continue!!!";
// var plannerAllocateTimeHint = "Please allocate time to all tasks and total time must within required time!!!";
// var plannerSelectSkillsHint = "Please selected skills you plan to use!!!";
// var plannerSavePlanHint = "Please fill all the strategy name and correct time!!!";
//
// var plannerAllStrategy = [];
//
// var defaultStep3ReadingStrategy = [];
// var defaultStep3ReadingInstruction = "What reading skills do you plan to use (multiple choice)?";
// var defaultStep3WritingStrategy = [];
// var defaultStep3WritingInstruction = "What writing skills do you plan to use (multiple choice)?";
// var customiseStep2Instruction = "Please describe in detail the learning strategy you plan to adopt and how you will allocate your time. You may also include the reasons for the strategy and time allocation.";
//
// var gptScaffoldRoleDescription = "You are a helpful assistant, please give suggestions based on the given text.";
// var gptScaffoldPromptTemplate = "";
//
// var gptScaffoldNeedCheckSubActionPrompt = [];
// var gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = [];
//
// var testISDIMUName = "Activity 3: knowledge in learning tactics";
// var preTestName = "Activity 2: knowledge test - AI in medicine";
// var hasTakePreviousStudyTestName = "Activity 1: about yourself";
// var pretestGradesPrompt = [];
// var isdimuScorePrompt = [];
// var userTakePreviousStudyPrompt = "This student has participated in the prior study so he/she has a certain level of task knowledge.";
// var gptScaffoldNeedCheckSRLProcessPrompt = [];
// var chatgptRoleDescription = "You are a helpful assistant and please answers questions based on the provided text.";


function getTranslation(key, langKey) {
    const value = lang[langKey]?.[key];
    // Check if value exists and is not an empty string
    if (value && value.trim() !== '') {
        return value;
    }
    // Fall back to English
    return lang["en"]?.[key] || key;
}


// 语言切换函数
function change_lang(lang_key){
    // var a = document.querySelectorAll('[language]');
    // console.log(a)
    // a.forEach(function (item) {
    //     var key = item.getAttribute("language");
    //     item.innerHTML = lang[lang_key][key];
    // });
    if (lang[lang_key] === null) {
        return;
    }

    annotationNotesTitle = getTranslation("annotation-notes-title", lang_key);
    deleteNoteConfirmMessage = getTranslation("annotation-notes-delete-confirm-message", lang_key);
    annotationWriteNotePlaceholder = getTranslation("annotation-write-note-placeholder", lang_key);
    annotationTagPlaceholder = getTranslation("annotation-tag-placeholder", lang_key);
    annotationNoteSaveBtnText = getTranslation("annotation-note-save-btn-text", lang_key);
    annotationNoteCancelBtnText = getTranslation("annotation-note-cancel-btn-text", lang_key);

    annotationSearchBtnText = getTranslation("annotation-search-btn-text", lang_key);
    annotationSearchPanelInputPlaceholder = getTranslation("annotation-search-panel-input-placeholder", lang_key);

    scaffoldingTitle = getTranslation("scaffolding-title", lang_key);
    scaffoldingCreateChecklistBtnText = getTranslation("scaffolding-create-checklist-btn-text", lang_key);
    scaffoldingEditChecklistBtnText = getTranslation("scaffolding-edit-checklist-btn-text", lang_key);
    scaffoldingUnreadMessageText = getTranslation("scaffolding-unread-message-text", lang_key);
    // scaffoldingChatOpenText = getTranslation("scaffolding-chat-open-text", lang_key);

    gptScaffoldingTitle = getTranslation("gpt-scaffolding-title", lang_key);

    plannerTitle = getTranslation("planner-title", lang_key);
    plannerLearningStrategySelectLabelText = getTranslation("planner-learning-strategy-select-label-text", lang_key);
    plannerLearningStrategySelectOption1Text = getTranslation("planner-learning-strategy-select-option1-text", lang_key);
    plannerLearningStrategySelectCustomiseOptionText = getTranslation("planner-learning-strategy-select-customise-option-text", lang_key);
    plannerAddMoreCustomiseStrategyBtnText = getTranslation("planner-add-more-customise-strategy-btn-text", lang_key);
    plannerCustomiseOptionHintTextareaPlaceholder = getTranslation("planner-customise-option-hint-textarea-placeholder", lang_key);
    plannerNextBtnText = getTranslation("planner-next-btn-text", lang_key);
    plannerTimeUnitMinute = getTranslation("planner-time-unit-minute", lang_key);

    plannerDisplayPlanTitle = getTranslation("planner-display-plan-title", lang_key);
    plannerDisplayOverallStrategyLabel = getTranslation("planner-display-overall-strategy-label", lang_key);
    plannerDisplayTimeAllocationLabel = getTranslation("planner-display-time-allocation-label", lang_key);
    plannerDisplayWritingStrategyLabel = getTranslation("planner-display-writing-strategy-label", lang_key);
    plannerDisplayReadingStrategyLabel = getTranslation("planner-display-reading-strategy-label", lang_key);
    plannerCustomisePlanReasonPlaceholder = getTranslation("planner-customise-plan-reason-placeholder", lang_key);
    plannerCustomisePlanTitle = getTranslation("planner-customise-plan-title", lang_key);

    essayTitle = getTranslation("essay-title", lang_key);
    if (typeof usePatientMultiAgentsSingleWindowTool !=='undefined' && usePatientMultiAgentsSingleWindowTool){
        essayTitle = "诊断过程思考记录";
    }
    essayTitleMedical = getTranslation("essay-title-medical", lang_key);
    essaySaveBtnText = getTranslation("essay-save-btn-text", lang_key);
    essayWritingPlaceholder = getTranslation("essay-writing-placeholder", lang_key);
    essayShowWordCountButtonText = getTranslation("essay-show-word-count-btn-text", lang_key);
    essaySaveToastText = getTranslation("essay-save-toast-text", lang_key);

    dictionaryTitle = getTranslation("dictionary-title", lang_key);
    dictionarySendBtnText = getTranslation("dictionary-send-btn-text", lang_key);
    dictionaryPanelInputPlaceholder = getTranslation("dictionary-panel-input-placeholder", lang_key);

    checklistTitle = getTranslation("checklist-title", lang_key);
    checklistBasicPanelTitle = getTranslation("checklist-basic-panel-title", lang_key);
    checklistAcademicPanelTitle = getTranslation("checklist-academic-panel-title", lang_key);
    checklistOriginalityPanelTitle = getTranslation("checklist-originality-panel-title", lang_key);
    checklistIntegrationPanelTitle = getTranslation("checklist-integration-panel-title", lang_key);
    checklistAnalyseBtnText = getTranslation("checklist-analyse-btn-text", lang_key);

    chatgptTitle = getTranslation("chatgpt-title", lang_key);
    chatgptSendBtnText = getTranslation("chatgpt-send-btn-text", lang_key);
    chatgptPanelInputPlaceholder = getTranslation("chatgpt-panel-input-placeholder", lang_key);

    chatteacherTitle = getTranslation("chatteacher-title", lang_key);
    chatTeacherPanelInputPlaceholder = getTranslation("chatteacher-panel-input-placeholder", lang_key);
    chatteacherConnectServerStatusText = getTranslation("chatteacher-connect-server-status-text", lang_key);
    chatteacherTeacherOnlineStatusText = getTranslation("chatteacher-teacher-online-status-text", lang_key);
    chatteacherSendBtnText = getTranslation("chatteacher-send-btn-text", lang_key);

    likeResponseText = getTranslation("like-response-text", lang_key);
    annotationToolDataLabel = getTranslation("annotation-tool-data-label", lang_key);
    searchAnnotationToolDataLabel = getTranslation("search-annotation-tool-data-label", lang_key);
    gptScaffoldToolDataLabel = getTranslation("gpt-scaffold-tool-data-label", lang_key);
    processVisualToolDataLabel = getTranslation("process-visual-tool-data-label", lang_key);
    essayProductVisualToolDataLabel = getTranslation("essay-product-visual-tool-data-label", lang_key);

    collaborateWritingToolDataLabel = getTranslation("collaborate-writing-tool-data-label", lang_key);
    essayWritingToolDataLabel = getTranslation("essay-writing-tool-data-label", lang_key);
    if (typeof usePatientMultiAgentsSingleWindowTool !=='undefined' && usePatientMultiAgentsSingleWindowTool){
        essayWritingToolDataLabel = "诊断过程思考记录 Diagnostic Thinking Log";
    }
    mathToolDataLabel = getTranslation("math-tool-data-label", lang_key);
    plannerToolDataLabel = getTranslation("planner-tool-data-label", lang_key);
    checklistToolDataLabel = getTranslation("checklist-tool-data-label", lang_key);
    multiAgentsSingleWindowToolDataLabel = getTranslation("multi-agents-single-window-tool-data-label", lang_key);
    dictionaryToolDataLabel = getTranslation("dictionary-tool-data-label", lang_key);
    timerToolDataLabel = getTranslation("timer-tool-data-label", lang_key);
    questionnaireToolDataLabel = getTranslation("questionnaire-tool-data-label", lang_key);

    if (typeof annotationTakeNoteLabel === 'undefined') {
        window.annotationTakeNoteLabel = getTranslation("annotation-label-1", lang_key);
    }
    if (typeof annotationLabelColors === 'undefined') {
        window.annotationLabelColors = [];
        annotationLabelColors.push({annotationLabel: getTranslation("annotation-label-2", lang_key), annotationLabelColor: '#99CCFF'});
        annotationLabelColors.push({annotationLabel: getTranslation("annotation-label-3", lang_key), annotationLabelColor: '#CCFFCC'});
        annotationLabelColors.push({annotationLabel: getTranslation("annotation-label-4", lang_key), annotationLabelColor: '#FFCCE5'});
        annotationLabelColors.push({annotationLabel: getTranslation("annotation-label-5", lang_key), annotationLabelColor: '#75ff66'});
    }
    if (typeof ruleBasedScaffoldContent === 'undefined') {
        window.ruleBasedScaffoldContent = [];
        ruleBasedScaffoldContent.push({
            triggerMinute: 2,
            title: getTranslation("rule-based-scaffold-title-1", lang_key),
            content: [getTranslation("rule-based-scaffold-title-1-task-1", lang_key), getTranslation("rule-based-scaffold-title-1-task-2", lang_key), getTranslation("rule-based-scaffold-title-1-task-3", lang_key)],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 7,
            title: getTranslation("rule-based-scaffold-title-2", lang_key),
            content: [getTranslation("rule-based-scaffold-title-2-task-1", lang_key), getTranslation("rule-based-scaffold-title-2-task-2", lang_key), getTranslation("rule-based-scaffold-title-2-task-3", lang_key)],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 16,
            title: getTranslation("rule-based-scaffold-title-3", lang_key),
            content: [getTranslation("rule-based-scaffold-title-3-task-1", lang_key), getTranslation("rule-based-scaffold-title-3-task-2", lang_key), getTranslation("rule-based-scaffold-title-3-task-3", lang_key)],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 21,
            title: getTranslation("rule-based-scaffold-title-4", lang_key),
            content: [getTranslation("rule-based-scaffold-title-4-task-1", lang_key), getTranslation("rule-based-scaffold-title-4-task-2", lang_key), getTranslation("rule-based-scaffold-title-4-task-3", lang_key)],
        });
        ruleBasedScaffoldContent.push({
            triggerMinute: 35,
            title: getTranslation("rule-based-scaffold-title-5", lang_key),
            content: [getTranslation("rule-based-scaffold-title-5-task-1", lang_key), getTranslation("rule-based-scaffold-title-5-task-2", lang_key), getTranslation("rule-based-scaffold-title-5-task-3", lang_key)],
        });
    }
    if (typeof plannerSelectStrategyHint === 'undefined') {
        window.plannerSelectStrategyHint = getTranslation("planner-select-main-strategy-hint", lang_key);
    }
    if (typeof plannerAllocateTimeHint === 'undefined') {
        window.plannerAllocateTimeHint = getTranslation("planner-allocate-time-hint", lang_key);
    }

    if (typeof plannerSelectSkillsHint === 'undefined') {
        window.plannerSelectSkillsHint = getTranslation("planner-select-reading-writing-strategy-hint", lang_key);
    }

    if (typeof plannerSavePlanHint === 'undefined') {
        window.plannerSavePlanHint = getTranslation("planner-save-plan-hint", lang_key);
    }

    if (typeof plannerAllStrategy === 'undefined') {
        window.plannerAllStrategy = [];
        plannerAllStrategy.push({
            "plannerOverallStrategy": getTranslation("planner-main-strategy-1", lang_key),
            "plannerStrategyInstruction": getTranslation("planner-main-strategy-1-instruction", lang_key),
            "plannerStep2Task": [
                {"title": getTranslation("planner-main-strategy-1-task-1", lang_key), "time": 5},
                {"title": getTranslation("planner-main-strategy-1-task-2", lang_key), "time": 5},
                // {"title": getTranslation("planner-main-strategy-1-task-3", lang_key), "time": 5},
                // {"title": getTranslation("planner-main-strategy-1-task-4", lang_key), "time": 5},
            ],
        });
        plannerAllStrategy.push({
            "plannerOverallStrategy": getTranslation("planner-main-strategy-2", lang_key),
            "plannerStrategyInstruction": getTranslation("planner-main-strategy-2-instruction", lang_key),
            "plannerStep2Task": [
                {"title": getTranslation("planner-main-strategy-2-task-1", lang_key), "time": 5},
                {"title": getTranslation("planner-main-strategy-2-task-2", lang_key), "time": 5},
                {"title": getTranslation("planner-main-strategy-2-task-3", lang_key), "time": 5},
            ],
        });
        plannerAllStrategy.push({
            "plannerOverallStrategy": getTranslation("planner-main-strategy-3", lang_key),
            "plannerStrategyInstruction": getTranslation("planner-main-strategy-3-instruction", lang_key),
            "plannerStep2Task": [
                {"title": getTranslation("planner-main-strategy-3-task-1", lang_key), "time": 5},
                {"title": getTranslation("planner-main-strategy-3-task-2", lang_key), "time": 5},
                {"title": getTranslation("planner-main-strategy-3-task-3", lang_key), "time": 5},
                {"title": getTranslation("planner-main-strategy-3-task-4", lang_key), "time": 5},
            ],
        });
    }
    if (typeof defaultStep3ReadingStrategy === 'undefined') {
        window.defaultStep3ReadingStrategy = [];
        defaultStep3ReadingStrategy.push(getTranslation("planner-reading-strategy-1", lang_key));
        defaultStep3ReadingStrategy.push(getTranslation("planner-reading-strategy-2", lang_key));
        defaultStep3ReadingStrategy.push(getTranslation("planner-reading-strategy-3", lang_key));
        /*if (lang[lang_key]["planner-reading-strategy-4"]) {
            defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-4"]);
        }
        if (lang[lang_key]["planner-reading-strategy-5"]) {
            defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-5"]);
        }
        if (lang[lang_key]["planner-reading-strategy-6"]) {
            defaultStep3ReadingStrategy.push(lang[lang_key]["planner-reading-strategy-6"]);
        }*/

        // defaultStep3ReadingStrategy.push(getTranslation("planner-reading-strategy-4", lang_key));
        // defaultStep3ReadingStrategy.push(getTranslation("planner-reading-strategy-5", lang_key));
        // defaultStep3ReadingStrategy.push(getTranslation("planner-reading-strategy-6", lang_key));

    }
    if (typeof defaultStep3ReadingInstruction === 'undefined') {
        window.defaultStep3ReadingInstruction = getTranslation("planner-reading-strategy-instruction", lang_key);
    }

    if (typeof defaultStep3WritingStrategy === 'undefined') {
        window.defaultStep3WritingStrategy = [];
        defaultStep3WritingStrategy.push(getTranslation("planner-writing-strategy-1", lang_key));
        defaultStep3WritingStrategy.push(getTranslation("planner-writing-strategy-2", lang_key));
        defaultStep3WritingStrategy.push(getTranslation("planner-writing-strategy-3", lang_key));

        // if (lang[lang_key]["planner-writing-strategy-4"]) {
        //     defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-4"]);
        // }
        // if (lang[lang_key]["planner-writing-strategy-5"]) {
        //     defaultStep3WritingStrategy.push(lang[lang_key]["planner-writing-strategy-5"]);
        // }
        // defaultStep3WritingStrategy.push(getTranslation("planner-writing-strategy-4", lang_key));
        // defaultStep3WritingStrategy.push(getTranslation("planner-writing-strategy-5", lang_key));

    }
    if (typeof defaultStep3WritingInstruction === 'undefined') {
        window.defaultStep3WritingInstruction = getTranslation("planner-writing-strategy-instruction", lang_key);
    }
    if (typeof customiseStep2Instruction === 'undefined') {
        window.customiseStep2Instruction = getTranslation("planner-customise-step2-instruction", lang_key);
    }

    if (typeof gptScaffoldRoleDescription === 'undefined') {
        window.gptScaffoldRoleDescription = getTranslation("gpt-scaffold-role-description", lang_key);
    }


    if (typeof gptScaffoldNeedCheckSubActionPrompt === 'undefined') {
        window.gptScaffoldNeedCheckSubActionPrompt = [];

        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "SAVE_PLANNER",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-not-exist", lang_key),
            "existPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-SAVE_PLANNER-exist", lang_key),
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "TIMER",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-TIMER-not-exist", lang_key),
            "existPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-TIMER-exist", lang_key),
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "TRY_OUT_TOOLS",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-not-exist", lang_key),
            "existPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-TRY_OUT_TOOLS-exist", lang_key),
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "PAGE_NAVIGATION",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-not-exist", lang_key),
            "existPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-PAGE_NAVIGATION-exist", lang_key),
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "RUBRIC",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-RUBRIC-not-exist", lang_key),
            "existPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-RUBRIC-exist", lang_key),
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        gptScaffoldNeedCheckSubActionPrompt.push({
            "subAction": "TASK_REQUIREMENT",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-not-exist", lang_key),
            "existPrompt": getTranslation("gpt-scaffold-need-check-subaction-prompt-TASK_REQUIREMENT-exist", lang_key),
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
    }

    if (typeof srlProcessBackupPromptList === 'undefined' || srlProcessBackupPromptList.length === 0) {
        window.srlProcessBackupPromptList = [
            {
                "scaffoldNumber": 0,
                "srlProcess": "CMTC1",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CMTC1", lang_key),
                "existPrompt": "",
                "threshold": 3, // <3
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "CMTR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CMTR2", lang_key),
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "CMTR1/CMTR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CMTR", lang_key),
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            /*
            {
                "scaffoldNumber": 0,
                "srlProcess": "CSTR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CSTR2", lang_key),
                "existPrompt": "",
                "threshold": 5,  //<5
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "CSTR2&CMTC1",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-STR-MTC", lang_key),
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CMTC1", lang_key),
                "appearOverOther": "",
                "appearLessThanOther": getTranslation("gpt-scaffold-need-check-srl-prompt-CSTR2", lang_key),
            },*/
            {
                "scaffoldNumber": 0,
                "srlProcess": "CSTR2/CMTR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": "",
                "existPrompt": "",
                "threshold": 3, // <=3, 小于4 就触发
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CSTR2", lang_key),
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "CSTR2->CMTC1",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CSTR2-non-exist->CMTC1", lang_key),
                "existPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CSTR2-exist->CMTC1", lang_key),
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "OR2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-OR2", lang_key),
                "existPrompt": "",
                "threshold": 0,
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": "",
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
            {
                "scaffoldNumber": 0,
                "srlProcess": "OT2",
                "srlProcessFreqComparison": "",
                "notExistPrompt": "",
                "existPrompt": "",
                "threshold": 1, // <=1 或者 < 2
                "appearOverThresholdPrompt": "",
                "appearLessThanEqualThresholdPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-OT2", lang_key),
                "appearOverOther": "",
                "appearLessThanOther": "",
            },
        ];
    }

   /* if (typeof srlProcessBackupPromptList === 'undefined') {
        window.srlProcessBackupPromptList = [];
        srlProcessBackupPromptList.push({
            "srlProcess": "CMTR2",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CMTR2", lang_key),
            "existPrompt": "",
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        srlProcessBackupPromptList.push({
            "srlProcess": "OR2",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-OR2", lang_key),
            "existPrompt": "",
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
        srlProcessBackupPromptList.push({
            "srlProcess": "OT2",
            "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-OT2", lang_key),
            "existPrompt": "",
            "threshold": 0,
            "appearOverThresholdPrompt": "",
            "appearLessThanEqualThresholdPrompt": ""
        });
    }*/

    if (typeof gptScaffoldNeedCheckSavePlannerSelectIndexPrompt === 'undefined') {
        window.gptScaffoldNeedCheckSavePlannerSelectIndexPrompt = [];
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push("");
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(getTranslation("gpt-scaffold-planner-select-prompt-1", lang_key));
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(getTranslation("gpt-scaffold-planner-select-prompt-2", lang_key));
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(getTranslation("gpt-scaffold-planner-select-prompt-3", lang_key));
        gptScaffoldNeedCheckSavePlannerSelectIndexPrompt.push(getTranslation("gpt-scaffold-planner-select-prompt-4", lang_key));
    }

    if (typeof testMAIName === 'undefined') {
        window.testMAIName = getTranslation("gpt-scaffold-test-mai-name", lang_key);
    }
    if (typeof testISDIMUName === 'undefined') {
        window.testISDIMUName = getTranslation("gpt-scaffold-test-isdimu-name", lang_key);
    }
    if (typeof preTestName === 'undefined') {
        window.preTestName = getTranslation("gpt-scaffold-pretest-name", lang_key);
    }
    if (typeof hasTakePreviousStudyTestName === 'undefined') {
        window.hasTakePreviousStudyTestName = getTranslation("gpt-scaffold-check-take-previous-study-name", lang_key);
    }


    if (typeof pretestGradesPrompt === 'undefined') {
        window.pretestGradesPrompt = [{"threshold": 0, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 5, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 10, "prompt": "", "scaffoldSrlProcess": []}];
        pretestGradesPrompt[0].prompt = (getTranslation("gpt-scaffold-pretest-grades-prompt-0", lang_key));
        pretestGradesPrompt[1].prompt = (getTranslation("gpt-scaffold-pretest-grades-prompt-5", lang_key));
        pretestGradesPrompt[2].prompt = (getTranslation("gpt-scaffold-pretest-grades-prompt-10", lang_key));
    }
    if (typeof isdimuScorePrompt === 'undefined') {
        window.isdimuScorePrompt = [{"threshold": 0, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 16, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 32, "prompt": "", "scaffoldSrlProcess": []}]
        isdimuScorePrompt[0].prompt = (getTranslation("gpt-scaffold-isdimu-prompt-0", lang_key));
        isdimuScorePrompt[1].prompt = (getTranslation("gpt-scaffold-isdimu-prompt-16", lang_key));
        isdimuScorePrompt[2].prompt = (getTranslation("gpt-scaffold-isdimu-prompt-32", lang_key));
    }
    if (typeof maiScoreKnowledgeCognitionPrompt === 'undefined') {
        window.maiScoreKnowledgeCognitionPrompt = [{"threshold": 0, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 21, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 33, "prompt": "", "scaffoldSrlProcess": []}]
        maiScoreKnowledgeCognitionPrompt[0].prompt = (getTranslation("gpt-scaffold-mai-knowledge-cognition-prompt-0", lang_key));
        maiScoreKnowledgeCognitionPrompt[1].prompt = (getTranslation("gpt-scaffold-mai-knowledge-cognition-prompt-21", lang_key));
        maiScoreKnowledgeCognitionPrompt[2].prompt = (getTranslation("gpt-scaffold-mai-knowledge-cognition-prompt-33", lang_key));
    }
    if (typeof maiScoreRegulationCognitionPrompt === 'undefined') {
        window.maiScoreRegulationCognitionPrompt = [{"threshold": 0, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 21, "prompt": "", "scaffoldSrlProcess": []},
            {"threshold": 33, "prompt": "", "scaffoldSrlProcess": []}]
        maiScoreRegulationCognitionPrompt[0].prompt = (getTranslation("gpt-scaffold-mai-regulation-cognition-prompt-0", lang_key));
        maiScoreRegulationCognitionPrompt[1].prompt = (getTranslation("gpt-scaffold-mai-regulation-cognition-prompt-21", lang_key));
        maiScoreRegulationCognitionPrompt[2].prompt = (getTranslation("gpt-scaffold-mai-regulation-cognition-prompt-33", lang_key));
    }


    if (typeof userTakePreviousStudyPrompt === 'undefined') {
        window.userTakePreviousStudyPrompt = getTranslation("gpt-scaffold-user-take-pre-study-prompt", lang_key);
    }

    //apply default SRL rules
    // if (typeof gptScaffoldNeedCheckSRLProcessPrompt !== 'undefined' && gptScaffoldNeedCheckSRLProcessPrompt[0].rules.length === 0) {
    //     gptScaffoldNeedCheckSRLProcessPrompt[0].rules.push(
    //         {
    //             "srlProcess": "CMTR2",
    //             "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-CMTR2", lang_key),
    //             "existPrompt": "",
    //             "threshold": 0,
    //             "appearOverThresholdPrompt": "",
    //             "appearLessThanEqualThresholdPrompt": ""
    //         });
    //     gptScaffoldNeedCheckSRLProcessPrompt[1].rules.push(
    //         {
    //             "srlProcess": "OR2",
    //             "notExistPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-OR2", lang_key),
    //             "existPrompt": "",
    //             "threshold": 0,
    //             "appearOverThresholdPrompt": "",
    //             "appearLessThanEqualThresholdPrompt": ""
    //         });
    //     gptScaffoldNeedCheckSRLProcessPrompt[2].rules.push(
    //         {
    //             "srlProcess": "OT2",
    //             "notExistPrompt": "",
    //             "existPrompt": "",
    //             "threshold": 3,
    //             "appearOverThresholdPrompt": "",
    //             "appearLessThanEqualThresholdPrompt": getTranslation("gpt-scaffold-need-check-srl-prompt-OT2", lang_key)
    //         });
    // }

    if (typeof chatgptRoleDescription === 'undefined') {
        window.chatgptRoleDescription = getTranslation("chatgpt-role-description", lang_key);
    }


    productVisualTitle = getTranslation("product-visual-title", lang_key);
    productVisualCloseBtn = getTranslation("product-visual-close-btn", lang_key);

    processVisualTitle = getTranslation("process-visual-title", lang_key);
    processVisualSetGoalLabel = getTranslation("process-visual-set-goal-label", lang_key);
    processVisualCloseBtn = getTranslation("process-visual-close-btn", lang_key);

    gptScaffoldChatSendBtnText = getTranslation("gpt-scaffold-chat-send-btn-text", lang_key);
    multiAgentsSendBtnText = getTranslation("multi-agents-send-btn-text", lang_key);



    annotationToolbarBtnHint = getTranslation("annotation-toolbar-btn-hint", lang_key);
    annotationSearchToolbarBtnHint = getTranslation("annotation-search-toolbar-btn-hint", lang_key);
    gptScaffoldToolbarBtnHint = getTranslation("gpt-scaffold-toolbar-btn-hint", lang_key);
    essayWritingToolbarBtnHint = getTranslation("essay-writing-toolbar-btn-hint", lang_key);
    plannerToolbarBtnHint = getTranslation("planner-toolbar-btn-hint", lang_key);
    multiAgentsSingleWindowToolbarBtnHint = getTranslation("multi-agents-single-window-toolbar-btn-hint", lang_key);
    timerToolbarBtnHint = getTranslation("timer-toolbar-btn-hint", lang_key);

    if (gptScaffoldPromptTemplate.length === 0 && typeof gptScaffoldPromptTemplateGroupA !== 'undefined') {
        gptScaffoldPromptTemplate = getTranslation("gpt-scaffold-prompt-template-groupA", lang_key);
    }
    if (gptScaffoldPromptTemplate.length === 0 && typeof gptScaffoldPromptTemplateGroupB !== 'undefined') {
        gptScaffoldPromptTemplate = getTranslation("gpt-scaffold-prompt-template-groupB", lang_key);
    }
    if (gptScaffoldPromptTemplate.length === 0 && typeof gptScaffoldPromptTemplateGroupC !== 'undefined') {
        gptScaffoldPromptTemplate = getTranslation("gpt-scaffold-prompt-template-groupC", lang_key);
    }
    chatReminderMessage = getTranslation("chat-reminder-message", lang_key);
    chatReminderMessageTitle = getTranslation("chat-reminder-message-title", lang_key);
    scaffoldingMessageTitle = getTranslation("scaffolding-message-title", lang_key);

    multiAgentsSingleWindowPlaceholderTextMulti = getTranslation("multi-agents-single-window-placeholder-text-multi", lang_key);
    multiAgentsSingleWindowPlaceholderTextSingle = getTranslation("multi-agents-single-window-placeholder-text-single", lang_key);
    scaffoldChatReminder = getTranslation("scaffold-chat-reminder", lang_key);
}

if (toolsLanguage == null) {
    toolsLanguage = "en";
}
// console.log("----------tools language----------" + toolsLanguage);
change_lang(toolsLanguage);

// jQuery(function($) {
//     console.log('------done!------')
//     $('.switch-locale').on('click', 'a', function(e) {
//         e.preventDefault();
//         let lang_key = $(this).data('locale');
//         console.log('------don!!!!!!!!!------', lang_key)
//         change_lang(lang_key);
//     });
// });
