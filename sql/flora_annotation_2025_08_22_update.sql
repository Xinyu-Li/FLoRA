-- new table
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


-- new table
create table assistant_record
(
    id             bigint auto_increment
        primary key,
    assistant_type varchar(500) not null,
    assistant_id   varchar(500) not null,
    assistant_name varchar(500) not null,
    project_id varchar(500) not null
);

create index assistant_record_assistant_id_index
    on assistant_record (assistant_id);


-- update old user_chatgpt_log table
alter table user_chatgpt_log
    change type assistant_type varchar(255) null;

alter table user_chatgpt_log
    add response_type varchar(500) null after question_version;

alter table user_chatgpt_log
    add api_model varchar(500) null after response_type;

alter table user_chatgpt_log
    add api_object varchar(500) null after api_model;

alter table user_chatgpt_log
    modify thread_id varchar(255) null after api_object;

alter table user_chatgpt_log
    add run_id varchar(500) null;

alter table user_chatgpt_log
    add assistant_id varchar(500) null;

alter table user_chatgpt_log
    change assistant_type assistant_name varchar(255) null;



alter table gpt_scaffold
    add thread_id varchar(500) null;

alter table gpt_scaffold
    add assistant_id varchar(500) null;

alter table gpt_scaffold
    add assistant_name varchar(500) null;


