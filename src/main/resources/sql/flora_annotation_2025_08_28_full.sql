create table annotation
(
    id                  bigint auto_increment
        primary key,
    highlight_text      text         not null,
    notes_text_json     text         not null,
    notes_text          text         not null,
    default_tag         varchar(255) not null,
    extra_tags          varchar(500) not null,
    user_id             bigint       not null,
    save_time           varchar(255) not null,
    username            varchar(255) not null,
    url                 varchar(500) not null,
    highlight_timestamp varchar(255) not null,
    course_id           varchar(255) null
);

create table assistant_record
(
    id             bigint auto_increment
        primary key,
    assistant_type varchar(500) not null,
    assistant_id   varchar(500) not null,
    assistant_name varchar(500) not null,
    project_id     varchar(500) not null
);

create index assistant_record_assistant_id_index
    on assistant_record (assistant_id);

create table config_annotation_label_color
(
    id                          bigint auto_increment
        primary key,
    config_generico_template_id bigint       not null,
    annotation_label            varchar(500) null,
    annotation_label_color      varchar(500) null
);

create table config_generico_template
(
    id                                                       bigint auto_increment
        primary key,
    generico_template_name                                   varchar(500)                     not null,
    generico_template_key                                    varchar(500)                     null,
    total_minutes                                            int                              not null,
    unlimited_time                                           tinyint(1)   default 0           not null,
    hint_minutes_before_end                                  int          default 5           not null,
    annotation_take_note_label                               varchar(255) default 'Takenote'  not null,
    use_annotation_tool                                      tinyint(1)   default 1           not null,
    use_scaffold_tool                                        tinyint(1)   default 0           not null,
    use_gpt_scaffold_tool                                    tinyint(1)   default 0           not null,
    srl_model                                                varchar(255) default 'maria'     not null,
    gpt_scaffold_role                                        varchar(255) default 'assistant' not null,
    gpt_scaffold_role_description                            text                             null,
    gpt_scaffold_prompt_include_essay                        tinyint(1)   default 1           not null,
    gpt_scaffold_prompt_template                             longtext                         null,
    gpt_scaffold_background_filename_list                    varchar(500)                     null,
    gpt_scaffold_parameters                                  varchar(500)                     not null,
    gpt_scaffold_need_check_save_planner_select_index_prompt text                             null,
    test_isdimu_name                                         varchar(500)                     null,
    pre_test_name                                            varchar(500)                     null,
    has_take_previous_study_test_name                        varchar(500)                     null,
    test_isdimu_course_id                                    int                              null,
    has_take_previous_study_test_name_course_id              int                              null,
    pre_test_name_course_id                                  int                              null,
    use_write_essay_tool                                     tinyint(1)   default 1           not null,
    use_write_essay_word_count_button                        tinyint(1)   default 0           not null,
    use_collaborative_write_essay_tool                       tinyint(1)   default 0           not null,
    use_collaborative_write_essay_word_count_button          tinyint(1)   default 0           not null,
    include_chatgpt_to_collaborative_write_essay             tinyint(1)   default 0           not null,
    use_planner_tool                                         tinyint(1)   default 1           not null,
    use_chatgpt_tool                                         tinyint(1)   default 1           not null,
    chatgpt_background_file_name_list                        varchar(500)                     null,
    chatgpt_role_description                                 text                             null,
    chatgpt_role                                             varchar(500)                     null,
    chatgpt_prompt_include_essay                             tinyint(1)   default 1           not null,
    chatgpt_parameters                                       varchar(500)                     null,
    use_checklist_tool                                       tinyint(1)   default 0           not null,
    use_checklist_tool_grammar                               tinyint(1)   default 0           not null,
    use_checklist_tool_academic                              tinyint(1)   default 0           not null,
    use_checklist_tool_originality                           tinyint(1)   default 0           not null,
    use_checklist_tool_classification                        tinyint(1)   default 0           not null,
    use_dictionary_tool                                      tinyint(1)   default 0           not null,
    dictionary_source_language                               varchar(255)                     null,
    dictionary_target_language                               varchar(255)                     null,
    use_teacher_chat                                         tinyint(1)   default 0           not null,
    use_timer_tool                                           tinyint(1)   default 1           not null,
    use_video_recording_tool                                 tinyint(1)   default 0           not null,
    tools_language                                           varchar(255) default 'en'        not null,
    planner_select_strategy_hint                             text                             null,
    planner_allocate_time_hint                               text                             null,
    planner_select_skills_hint                               text                             null,
    planner_save_plan_hint                                   text                             null,
    planner_reading_strategy                                 text                             null,
    planner_reading_instruction                              text                             null,
    planner_writing_strategy                                 text                             null,
    planner_writing_instruction                              text                             null,
    planner_customise_plan_instruction                       text                             null,
    user_take_previous_study_prompt                          text                             null,
    classify_sentence_background_file_name_list              text                             null,
    generico_template_index                                  int                              not null
);

create table config_gpt_scaffold_sub_action_or_srl_process
(
    id                                      bigint auto_increment
        primary key,
    sub_action_or_srl_process               varchar(500) not null,
    not_exist_prompt                        text         null,
    exist_prompt                            text         null,
    threshold                               int          null,
    appear_over_threshold_prompt            text         null,
    appear_less_than_equal_threshold_prompt text         null,
    config_generico_template_id             bigint       not null,
    type                                    varchar(255) not null,
    trigger_number                          int          null,
    trigger_minute                          int          null,
    check_srl_process_begin_minute          int          null,
    check_srl_process_end_minute            int          null
);

create table config_isdimu_score_prompt
(
    id                          bigint auto_increment
        primary key,
    threshold                   int    null,
    prompt                      text   null,
    config_generico_template_id bigint not null
);

create table config_planner
(
    id                            bigint auto_increment
        primary key,
    config_generico_template_id   bigint       not null,
    planner_overall_strategy      text         null,
    planner_tasks                 text         null,
    planner_strategy_instruction  text         null,
    planner_tasks_allocated_times varchar(500) null,
    planner_strategy_number       int          null
);

create table config_pretest_grade_prompt
(
    id                          bigint auto_increment
        primary key,
    threshold                   int    null,
    prompt                      text   null,
    config_generico_template_id bigint not null
);

create table config_rule_based_scaffold
(
    id                          bigint auto_increment
        primary key,
    trigger_number              int    null,
    trigger_minute              int    null,
    main_message                text   null,
    options_content             text   null,
    config_generico_template_id bigint not null
);

create table consultation_table_log
(
    id           bigint auto_increment
        primary key,
    user_id      bigint       not null,
    course_id    varchar(255) not null,
    content_json longtext     not null,
    created_at   varchar(255) not null
);

create index consultation_table_log_user_id_course_id_index
    on consultation_table_log (user_id, course_id);

create table deleted_annotation
(
    id                  bigint       not null
        primary key,
    highlight_text      text         null,
    notes_text_json     text         null,
    notes_text          text         null,
    default_tag         varchar(255) null,
    extra_tags          varchar(500) null,
    user_id             bigint       null,
    save_time           varchar(255) null,
    username            varchar(255) null,
    url                 varchar(500) null,
    highlight_timestamp varchar(255) null,
    course_id           varchar(255) null
);

create table dialogue_fairness_label
(
    id                 bigint auto_increment
        primary key,
    user_id            bigint        not null,
    course_id          varchar(255)  not null,
    dialogue_text      longtext      not null,
    justification_text longtext      not null,
    deleted            int default 0 not null
);

create index dialogue_fairness_label_user_id_course_id_index
    on dialogue_fairness_label (user_id, course_id);

create table dictionary_log
(
    id              bigint auto_increment
        primary key,
    user_id         bigint        null,
    query_text      varchar(1000) null,
    translated_text varchar(1000) null,
    query_time      varchar(255)  null,
    response_time   varchar(255)  null,
    course_id       varchar(255)  null
);

create table essay
(
    id                 bigint auto_increment
        primary key,
    user_id            bigint       not null,
    save_time          varchar(255) not null,
    username           varchar(255) not null,
    url                varchar(500) not null,
    essay_content      text         null,
    essay_content_json text         null,
    course_id          varchar(255) null
);

create index essay_user_id_course_id_index
    on essay (user_id, course_id);

create table essay_product_goal
(
    id              bigint auto_increment
        primary key,
    user_id         bigint       not null,
    username        varchar(500) not null,
    process_time    varchar(255) not null,
    structure       text         null,
    relevance       text         null,
    main_points     text         null,
    essay           text         null,
    trigger_event   varchar(255) null,
    analysis_type   varchar(255) null,
    analysis_result varchar(500) null,
    course_id       varchar(255) null
);

create table flora_user
(
    id       bigint auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(500) not null,
    role     varchar(255) not null,
    email    varchar(500) null,
    constraint username
        unique (username)
)
    charset = armscii8;

create table flora_user_login_token
(
    id          bigint auto_increment
        primary key,
    token       varchar(500) not null,
    expired     tinyint(1)   not null,
    revoked     tinyint(1)   not null,
    expire_time varchar(255) not null,
    revoke_time varchar(255) null,
    user_id     bigint       not null
);

create table gpt_scaffold
(
    id                    bigint auto_increment
        primary key,
    user_id               bigint       not null,
    course_id             varchar(255) not null,
    gpt_role_description  longtext     null,
    prompt_send_time      varchar(255) null,
    gpt_scaffold_content  text         null,
    gpt_response_time     varchar(255) null,
    essay                 text         null,
    response_rating_star  int          null,
    response_rating_thumb int          null,
    gpt_role              varchar(255) null,
    gpt_whole_response    longtext     null,
    gpt_scaffold_number   int          null,
    gpt_whole_prompt      longtext     null,
    prompt                longtext     null,
    thread_id             varchar(500) null,
    assistant_id          varchar(500) null,
    assistant_name        varchar(500) null
);

create table medical_consult_result
(
    id             bigint auto_increment
        primary key,
    content_result text         null,
    save_time      varchar(255) null,
    user_id        bigint       null,
    course_id      varchar(255) null,
    score          decimal      null,
    feedback       text         null
);

create table planner
(
    id                          bigint auto_increment
        primary key,
    user_id                     bigint       not null,
    username                    varchar(255) not null,
    save_time                   varchar(255) not null,
    url                         varchar(500) not null,
    planner_elements_json       text         null,
    display_plan_div_inner_html text         null,
    course_id                   varchar(255) null
);

create table popup_questionnaire
(
    id               bigint auto_increment
        primary key,
    user_id          bigint       null,
    username         varchar(255) null,
    question_content text         null,
    answer           text         null,
    trigger_process  varchar(255) null,
    save_time        varchar(255) not null,
    answer_time      varchar(255) null,
    qorder           int          null
);

create table rule_base_check_grammar
(
    id               bigint auto_increment
        primary key,
    user_id          bigint       null,
    essay            text         null,
    response         text         null,
    check_time       varchar(255) null,
    response_content text         null,
    course_id        varchar(255) null
);

create table rule_base_integration_and_elaboration
(
    id         bigint auto_increment
        primary key,
    essay      text         null,
    response   text         null,
    check_time varchar(255) null,
    user_id    bigint       null,
    course_id  varchar(255) null
);

create table rule_base_originality
(
    id         bigint auto_increment
        primary key,
    user_id    bigint       null,
    essay      text         null,
    response   text         null,
    check_time varchar(255) null,
    course_id  varchar(255) null
);

create table rule_base_writing_checklist
(
    id         bigint auto_increment
        primary key,
    user_id    bigint       null,
    essay      text         null,
    response   text         null,
    check_time varchar(255) null,
    course_id  varchar(255) null
);

create table scaffold
(
    id                     bigint auto_increment
        primary key,
    user_id                bigint       not null,
    username               varchar(255) not null,
    save_time              varchar(255) not null,
    url                    varchar(500) not null,
    selected_suggestions   text         null,
    scaffold_info          text         null,
    scaffold_status        text         null,
    scaffold_viewed_status text         null,
    course_id              varchar(255) null
);

create table study_tool_config
(
    id          bigint auto_increment
        primary key,
    study_name  varchar(255) not null,
    config_json json         not null
);

create table thread_record
(
    id             bigint auto_increment
        primary key,
    user_id        bigint       not null,
    course_id      varchar(255) not null,
    assistant_type varchar(500) not null,
    assistant_name varchar(500) not null,
    assistant_id   varchar(500) not null,
    thread_id      varchar(500) not null
);

create index thread_record_assistant_id_course_id_user_id_index
    on thread_record (assistant_id, user_id, course_id);

create index thread_record_thread_id_uindex
    on thread_record (thread_id);

create table trace_data
(
    id                    bigint auto_increment
        primary key,
    user_id               bigint       null,
    save_time             varchar(255) null,
    username              varchar(255) null,
    url                   varchar(255) null,
    firstname             varchar(255) null,
    lastname              varchar(255) null,
    source                varchar(255) null,
    page_event            varchar(255) null,
    target_object         varchar(255) null,
    instant_event         varchar(255) null,
    sub_action_label      varchar(255) null,
    screen_x              varchar(255) null,
    screen_y              varchar(255) null,
    client_x              varchar(255) null,
    client_y              varchar(255) null,
    window_inner_width    varchar(255) null,
    window_inner_height   varchar(255) null,
    screen_width          varchar(255) null,
    screen_height         varchar(255) null,
    event_value           text         null,
    process_label         varchar(255) null,
    course_id             varchar(255) null,
    action_label          varchar(255) null,
    detailed_action_label varchar(255) null,
    model_type            varchar(255) null
);

create index trace_data_user_id_course_id_index
    on trace_data (user_id, course_id);

create table trace_data_real_time_process
(
    id                    bigint auto_increment
        primary key,
    user_id               bigint       null,
    save_time             varchar(255) null,
    username              varchar(255) null,
    url                   varchar(255) null,
    firstname             varchar(255) null,
    lastname              varchar(255) null,
    source                varchar(255) null,
    page_event            varchar(255) null,
    target_object         varchar(255) null,
    instant_event         varchar(255) null,
    sub_action_label      varchar(255) null,
    screen_x              varchar(255) null,
    screen_y              varchar(255) null,
    client_x              varchar(255) null,
    client_y              varchar(255) null,
    window_inner_width    varchar(255) null,
    window_inner_height   varchar(255) null,
    screen_width          varchar(255) null,
    screen_height         varchar(255) null,
    event_value           text         null,
    process_label         varchar(255) null,
    course_id             varchar(255) null,
    action_label          varchar(255) null,
    detailed_action_label varchar(255) null,
    model_type            varchar(255) null
);

create index trace_data_real_time_process_user_id_course_id_index
    on trace_data_real_time_process (user_id, course_id);

create table user_chatgpt_log
(
    id                       bigint auto_increment
        primary key,
    user_id                  bigint                   null,
    course_id                varchar(255)             null,
    chatgpt_role_description longtext                 null,
    question_id              varchar(500)             null,
    user_questions           text                     null,
    user_ask_time            varchar(255)             null,
    chatgpt_answer           text                     null,
    chatgpt_response_time    varchar(255)             null,
    essay                    text                     null,
    response_rating_star     int                      null,
    response_rating_thumb    int                      null,
    response_generated_times int                      null comment 'user can regenerate the answer for multiple times',
    chatgpt_role             varchar(255)             null,
    chatgpt_whole_response   longtext                 null,
    chatgpt_whole_prompt     longtext                 null,
    assistant_name           varchar(255)             null,
    topic_id                 bigint                   null,
    hidden                   varchar(255) default '0' null,
    question_version         int          default 0   null,
    response_type            varchar(500)             null,
    api_model                varchar(500)             null,
    api_object               varchar(500)             null,
    thread_id                varchar(255)             null,
    run_id                   varchar(500)             null,
    assistant_id             varchar(500)             null
);

create table user_chatgpt_topic
(
    id                bigint auto_increment
        primary key,
    topic_name        varchar(500)                    null,
    topic_create_time varchar(255)                    null,
    topic_update_time varchar(255)                    null,
    user_id           mediumtext                      not null,
    course_id         varchar(255)                    not null,
    thread_showing    varchar(255) default 'newTopic' null
);

create table user_data_management
(
    id                                        bigint auto_increment
        primary key,
    has_interview_data                        tinyint(1) default 0  not null,
    interview_data_path                       varchar(500)          null,
    has_eye_tracking_data                     tinyint(1) default 0  not null,
    eye_tracking_data_path                    varchar(500)          null,
    has_video_data                            tinyint(1) default 0  not null,
    video_data_path                           varchar(500)          null,
    essay_mark_by_gpt                         int        default -1 not null,
    essay_comment_by_gpt                      text                  null,
    essay_mark_by_human                       int        default -1 not null,
    essay_comment_by_human                    text                  null,
    has_user_feedback_for_essay_mark_comment  tinyint(1) default 0  not null,
    user_feedback_for_essay_mark_comment_path varchar(500)          null,
    user_id                                   bigint                not null
);

create table user_start_time
(
    id              bigint auto_increment
        primary key,
    user_id         bigint       not null,
    user_start_time varchar(255) not null,
    course_id       varchar(45)  not null
);

create table user_teacher_log
(
    id        bigint auto_increment
        primary key,
    user_id   bigint       null,
    chat_text text         null,
    chat_time varchar(255) null,
    chat_role varchar(255) null,
    course_id varchar(255) null
);

create table whole_page_annotation
(
    id                        bigint auto_increment
        primary key,
    url                       varchar(500) not null,
    user_id                   bigint       not null,
    serialize_highlights_json text         not null,
    save_time                 varchar(255) not null,
    course_id                 varchar(255) null
);

