create table study_tool_config
(
    id          bigint auto_increment
        primary key,
    study_name  varchar(255) not null,
    config_json json         not null
);
create table essay_product_goal
(
    id           bigint auto_increment
        primary key,
    user_id      bigint       not null,
    username     varchar(500) not null,
    process_time varchar(255) not null,
    structure    text         not null,
    relevance    text         not null,
    main_points  text         not null
);
