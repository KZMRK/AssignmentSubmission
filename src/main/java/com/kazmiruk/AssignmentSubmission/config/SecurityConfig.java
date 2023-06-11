package com.kazmiruk.AssignmentSubmission.config;

import com.kazmiruk.AssignmentSubmission.filter.JwtFilter;
import com.kazmiruk.AssignmentSubmission.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomPasswordEncoder customPasswordEncoder;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(customPasswordEncoder.getPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http = http.csrf().disable().cors().disable();
        http = http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();

        http = http.exceptionHandling()
                .authenticationEntryPoint((request, response, e) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                })
                .and();

         http.authorizeRequests()
                 .antMatchers("/api/auth/**").permitAll()
                 .antMatchers("/api/assignments/**", "/api/comments").hasAnyAuthority("ROLE_STUDENT", "ROLE_CODE_REVIEWER")
                 .antMatchers("/api/users/**").hasAuthority("ROLE_ADMIN")
                 .anyRequest()
                 .authenticated()
                 .and()
                 .formLogin()
                 .and()
                 .logout();

         http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
