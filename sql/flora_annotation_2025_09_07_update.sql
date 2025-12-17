alter table user_chatgpt_log
    add openai_conversation_id varchar(500) null;

create table essay_at_time_point
(
    id            bigint primary key auto_increment,
    user_id       bigint       not null,
    save_time     varchar(255) not null,
    username      varchar(255) not null,
    url           varchar(500) not null,
    essay_content text         null,
    course_id     varchar(255) not null,
    time_point_desc varchar(500) null
);
