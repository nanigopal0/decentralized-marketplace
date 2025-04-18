package com.decentralized.marketplace.jwt;

import com.decentralized.marketplace.entity.CustomUserDetails;
import com.decentralized.marketplace.entity.Role;
import com.decentralized.marketplace.entity.User;
import com.decentralized.marketplace.service.CustomUserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Configuration
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {


    private final CustomUserDetailsService userDetailService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return excludedMatchers.stream().anyMatch(
                matcher-> matcher.matches(request)
        );
    }

    private final JwtService jwtService;
    private final List<AntPathRequestMatcher> excludedMatchers = Arrays.asList(
            new AntPathRequestMatcher("/public/**"),
            new AntPathRequestMatcher("/contract/**")
    );

    public JwtAuthFilter(CustomUserDetailsService userDetailService, JwtService jwtService) {
        this.userDetailService = userDetailService;
        this.jwtService = jwtService;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (shouldNotFilter(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

//        String token = null;
//        for (Cookie cookie : request.getCookies()) {
//            if (cookie.getName().equals("jwt")) {
//                token = cookie.getValue();
//                break;
//            }
//        }

        try {
            String token = authHeader.substring(7);
            Claims jwtClaims = jwtService.getClaims(token);
            String username = jwtService.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                UserDetails userDetails = userDetailService.loadUserByUsername(username);
//                if (userDetails != null && jwtService.isTokenValid(token)) {
                if (jwtService.isTokenValid(token)) {
                    User user = new User();
                    user.setId(new ObjectId(jwtClaims.get("id", String.class)));
                    user.setRole(Role.valueOf(jwtClaims.get("role", String.class)));
                    user.setFullName(jwtClaims.get("name", String.class));
                    user.setEmail(username);
                    CustomUserDetails customUserDetails = new CustomUserDetails(user);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            customUserDetails,null,customUserDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//                    System.out.println(authentication.getPrincipal());
                } else {
                    response.setStatus(401);
                    log.error("Token is not valid: {}" ,response.getStatus());
                }
            }

        } catch (IllegalArgumentException e) {

            log.info("Illegal Argument while fetching the username !!");

        } catch (ExpiredJwtException e) {
            log.info("Given jwt token is expired !!");

        } catch (MalformedJwtException e) {
            log.info("Some changed has done in token !! Invalid Token");

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        filterChain.doFilter(request, response);

    }

}
