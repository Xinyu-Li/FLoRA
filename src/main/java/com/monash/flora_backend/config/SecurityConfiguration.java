package com.monash.flora_backend.config;

import com.monash.flora_backend.config.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final LogoutHandler logoutHandler;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .antMatchers(
                        "/save-annotation", "/save-backgroundDoc",
                        "/update-annotation", "/save-essay-content",
                        "/save-essay-content-manually", "/save-planner-content", "/save-scaffold-content",
                        "/load-planner-to-sidebar", "/load-highlights-to-sidebar", "/load-whole-page-highlights",
                        "/load-essay-to-sidebar", "/load-scaffold-to-sidebar", "/delete-annotation",
                        "/rule-base-check-grammar", "/rule-base-writing-checklist", "/rule-base-originality",
                        "/rule-base-integration-and-elaboration",
                        "/rule-base-check-grammar-db/**", "/rule-base-writing-checklist-db/**", "/rule-base-originality-db/**",
                        "/rule-base-integration-and-elaboration-db/**",
                        "/rule-base-update-show-record-cache/**",

                        "/dictionary", "/load-dictionary-history/**",
                        "/search-by-keywords", "/search-all/**", "/rule-base-check-process-label-patterns/**",

                        "/chatgpt", "/chatgpt-scaffold", "/load-chatgpt-scaffold/**", "/load-chatgpt-chat/**", "/load-teacher-chat/**", "/rate-chatgpt-answer",
                        "/uploadvideo", "/download-student-essay/**", "/favicon.ico", "/flora/**", "/collaborate-write", "/collaborate-send-message","/collaborate-get-userColor", "/collaborate-write-openai",


                        "/ws/human-chat/**",
                        "/ws/teacher-chat/**", "/ws/page-event/**",

                        "/submit-consult-result",
                        "/chatgpt-consult",
                        "/save-rule-base-message",

                        //get Questionnaire Response
                        "/get-questionnaire-response",
                        "/get-questionnaire-all-response",

                        // trace part
                        "/trace-extra", "/trace-planner", "/trace-essay", "/trace-page-click",
                        "/trace-annotation-label", "/trace-annotation", "/trace-search-annotation",
                        "/trace-off-task", "/trace-checklist", "/trace-select-click", "/trace-body-click",
                        "/trace-page-reading", "/trace-chatgpt", "/trace-dictionary","/trace-teacherchat", "/trace-grammarly",
                        "/trace-scaffold", "/trace-timer", "/get-task-start-time",
                        // test part
                        "/test-student-handler", "/chattest", "/chatgpttool", "/test-video-upload", "/test-emitter",
                        "/test-video-record", "/", "/index-revision", "/index-revision2", "/index-revision3", "/index-revision4", "/index-revision_s2t_t2s", "/clear-trace-data/**", "/clear-student-logs","/login",
                        "/generate-download-link", "/get-cached-links/**", "/test-real-time-process/**",
                        // test
                        "/account/**", "/tools-config/**", "/data/**",
                        "data/label-model/**", "/label-model/**","/api/**","/api/**/**","/api/hpt-flora-annotations-update/**",
                        "/voice/**", "/visualization/**", "/test-tony", "/test-oulu", "/index-test-v**"
                ).permitAll()
//                .antMatchers("/manage/**").hasAnyRole(ADMIN.name(), MANAGER.name())
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/manage/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;
        return http.build();
    }


}
