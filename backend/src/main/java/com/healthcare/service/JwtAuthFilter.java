package com.healthcare.service;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        logger.trace("Checking shouldNotFilter for path: {}", path);
        boolean shouldSkip = path.startsWith("/api/auth/") ||
                            path.startsWith("/api/doctors") ||
                            path.startsWith("/api/hospitals") ||
                            path.startsWith("/api/ai/") ||
                            path.startsWith("/api/scan/");
        logger.trace("shouldNotFilter result for path {}: {}", path, shouldSkip);
        return shouldSkip;
    }

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        logger.debug("Processing request: {}", request.getRequestURI());

        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            logger.debug("Found Bearer token for request: {}", request.getRequestURI());

            // Check if token is empty or null
            if (jwt == null || jwt.trim().isEmpty()) {
                logger.warn("Token is empty or null for request: {}", request.getRequestURI());
            } else {
                try {
                    username = jwtUtil.extractUsername(jwt);
                } catch (io.jsonwebtoken.MalformedJwtException e) {
                    logger.warn("Malformed JWT token for request {}: {}", request.getRequestURI(), e.getMessage());
                } catch (Exception e) {
                    logger.error("Error extracting username from token for request {}: {}", request.getRequestURI(), e.getMessage());
                }
            }
        } else {
            logger.trace("No Authorization header for request: {}", request.getRequestURI());
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("Authentication set for user: {}", username);
            } else {
                logger.warn("Token validation failed for user: {}", username);
            }
        }
        filterChain.doFilter(request, response);
    }
}