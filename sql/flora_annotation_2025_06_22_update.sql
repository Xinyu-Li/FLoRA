create table consultation_table_log
(
    id           bigint auto_increment
        primary key,
    user_id      bigint        not null,
    course_id    varchar(255)  not null,
    content_json longtext      not null,   -- 当前完整表格内容，JSON格式
    created_at   varchar(255)     not null  -- 操作时间
);

create index consultation_table_log_user_id_course_id_index
    on consultation_table_log (user_id, course_id);
