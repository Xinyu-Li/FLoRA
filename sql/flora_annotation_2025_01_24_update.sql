create table user_chatgpt_topic
(
    id                bigint auto_increment
        primary key,
    topic_name        varchar(500) null,
    topic_create_time varchar(255) null,
    topic_update_time varchar(255) null,
    user_id           mediumtext   not null,
    course_id         varchar(255) not null
);

alter table user_chatgpt_log
    add topic_id bigint null;

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
)
    collate = utf8mb4_bin;

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

create table study_tool_config
(
    id          bigint auto_increment
        primary key,
    study_name  varchar(255) not null,
    config_json json         not null
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
    analysis_result varchar(500) null
);

create index essay_user_id_course_id_index
    on essay (user_id, course_id);

create index trace_data_user_id_course_id_index
    on trace_data (user_id, course_id);

create index trace_data_real_time_process_user_id_course_id_index
    on trace_data_real_time_process (user_id, course_id);

alter table essay_product_goal
    add course_id varchar(255) null;

alter table essay_product_goal
    modify structure text null;

alter table essay_product_goal
    modify relevance text null;

alter table essay_product_goal
    modify main_points text null;
alter table user_chatgpt_log
    add hidden varchar(255) default '0';

