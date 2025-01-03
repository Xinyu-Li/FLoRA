
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
