
package com.monash.flora_backend.config;

/**
 * ClassName: SecurityConfig
 * Description:
 *
 * @author Xinyu Li
 * @since 4/19/2023 2:27 PM
 */
/*
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/manage/**").hasAnyRole("TEACHER", "ADMIN")
                .antMatchers("/save-annotation", "/update-annotation", "/save-essay-content",
                        "/save-essay-content-manually", "/save-planner-content", "/save-scaffold-content",
                        "/load-planner-to-sidebar", "/load-highlights-to-sidebar", "/load-whole-page-highlights",
                        "/load-essay-to-sidebar", "/load-scaffold-to-sidebar", "/delete-annotation",
                        "/rule-base-check-grammar", "/rule-base-writing-checklist", "/rule-base-originality",
                        "/rule-base-integration-and-elaboration",
                        "/rule-base-check-grammar-db/**", "/rule-base-writing-checklist-db/**", "/rule-base-originality-db/**",
                        "/rule-base-integration-and-elaboration-db/**",
                        "/dictionary", "/load-dictionary-history/**",
                        "/rule-base-integration-and-elaboration", "/dictionary", "/load-dictionary-history/**", "/collaborate-write",
                        "/search-by-keywords", "/search-all/**", "/check-process-label-patterns/**",
                        "/chatgpt", "/chatgpt-scaffold", "/load-chatgpt-scaffold/**", "/load-chatgpt-chat/**", "/load-teacher-chat/**","/rate-chatgpt-answer",
                        "/uploadvideo", "/download-student-essay/**", "/favicon.ico", "/flora/**",

                        "/ws/human-chat/**",

                // trace part
                "/trace-extra", "/trace-planner", "/trace-essay", "/trace-collaborate", "/trace-page-click",

                        "/ws/teacher-chat/**", "/ws/page-event/**",
                        

                        "/trace-annotation-label", "/trace-annotation", "/trace-search-annotation",
                        "/trace-off-task", "/trace-checklist", "/trace-select-click", "/trace-body-click",
                        "/trace-page-reading", "/trace-chatgpt", "/trace-dictionary","/trace-teacherchat", "/trace-grammarly",

                        "/trace-scaffold", "/trace-chatgpt-scaffold", "/trace-timer", "/get-task-start-time",


                // test part

                "/collaborate-write", "/collaborate-get-userColor", "/collaborate-write-openai", "/test-video-upload",
                "/test-student-chat", "/chattest", "/chatgpttool", "/test-video-upload", "/test-emitter",

                        "/test-video-record", "/", "/index-revision", "/index-revision2", "/clear-trace-data/**").permitAll()


                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .defaultSuccessUrl(getDefaultSuccessUrl());

    }



    */
/**
     * 1. ADMIN 最高权限   (1)上传数据，(2)查看、下载数据，(3)配置工具，(4)查看Visualization，(5)选择学生并发送邮件
     *
     * 2. TEACHER     (1)上传数据，(2)查看、下载数据，(3)配置工具，(4)查看Visualization，(5)选择学生并发送邮件
     *
     * 3. USER_UPLOADER  (1)上传数据
     *
     * 4. USER_VIEWER  (4)查看Visualization
     *
     * @param auth the {@link org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder} to use
     * @throws java.lang.Exception
     *//*

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("flora_user_viewer")
                .password(passwordEncoder().encode("flora_user_viewer"))
                .roles("USER_VIEWER")
                .and()
                .withUser("flora_user_uploader")
                .password(passwordEncoder().encode("flora_user_uploader"))
                .roles("USER_UPLOADER")
                .and()
                .withUser("flora_teacher")
                .password(passwordEncoder().encode("flora_teacher"))
                .roles("TEACHER")
                .and()
                .withUser("flora_admin")
                .password(passwordEncoder().encode("flora_admin"))
                .roles("ADMIN");
    }


    protected String getDefaultSuccessUrl() {
        String successUrl = "/manage/list-all-students";

        Properties properties = System.getProperties();
        String osName = properties.getProperty("os.name");
        log.info("---------------------------security config:" + osName);
        if (osName.equals("Linux")) {
            successUrl = "/myapi/manage/list-all-students";
        }
        log.info("---------------------------security config:" + successUrl);
        return successUrl;
    }
}
*/