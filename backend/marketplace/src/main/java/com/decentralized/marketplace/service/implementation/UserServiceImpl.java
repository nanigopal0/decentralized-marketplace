package com.decentralized.marketplace.service.implementation;

import com.decentralized.marketplace.dto.UpdateUserDTO;
import com.decentralized.marketplace.dto.UserLoginRequestDTO;
import com.decentralized.marketplace.dto.UserResponseDTO;
import com.decentralized.marketplace.dto.UserSignupRequestDTO;
import com.decentralized.marketplace.entity.*;
import com.decentralized.marketplace.exception.UnauthorizedUserException;
import com.decentralized.marketplace.exception.UserNotFoundException;
import com.decentralized.marketplace.jwt.JwtService;
import com.decentralized.marketplace.repository.BuyerRepo;
import com.decentralized.marketplace.repository.SellerRepo;
import com.decentralized.marketplace.repository.UserRepo;
import com.decentralized.marketplace.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.types.ObjectId;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final BuyerRepo buyerRepo;
    private final SellerRepo sellerRepo;
    private final JwtService jwtService;
    private final HttpServletResponse httpServletResponse;

    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, BuyerRepo buyerRepo, SellerRepo sellerRepo, JwtService jwtService, HttpServletResponse httpServletResponse) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.buyerRepo = buyerRepo;
        this.sellerRepo = sellerRepo;
        this.jwtService = jwtService;
        this.httpServletResponse = httpServletResponse;
    }

    @Override
    public void signup(UserSignupRequestDTO userSignupRequestDTO) {
        User user = User.builder()
                .email(userSignupRequestDTO.getEmail())
                .password(passwordEncoder.encode(userSignupRequestDTO.getPassword()))
                .createdAt(LocalDateTime.now())
                .ethereumPublicKey(userSignupRequestDTO.getEthereumPublicKey())
                .fullName(userSignupRequestDTO.getFullName())
                .role(userSignupRequestDTO.getRole())
                .build();
        User saved = userRepo.save(user);
        if (userSignupRequestDTO.getRole() == Role.SELLER)
            sellerRepo.save(Seller.builder().userId(saved.getId()).build());
        else
            buyerRepo.save(Buyer.builder().userId(saved.getId()).build());
    }

    @Override
    public UserResponseDTO login(UserLoginRequestDTO userLoginRequestDTO) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(userLoginRequestDTO.getEmail(), userLoginRequestDTO.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authentication);
        if (authenticate.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authenticate);

            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            generateJwtTokenAndSaveToCookie(userDetails.getUsername(),userDetails.getUserFullName(),userDetails.getUserId(),userDetails.getRole());

            UserResponseDTO responseDTO = UserResponseDTO.builder()
                    .id(userDetails.getUserId())
                    .email(userDetails.getUsername())
                    .avatar(userDetails.getUserAvatar())
                    .fullName(userDetails.getUserFullName())
                    .ethereumPublicKey(userDetails.getUserEthereumPublicKey())
                    .build();
            responseDTO.setRole(userDetails.getRole());
            return responseDTO;
        }
        throw new RuntimeException("Authentication failed");
    }

    @Override
    public void logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0) // Set maxAge to 0 to remove the cookie
                .sameSite("Strict")
                .build();

        httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private void  generateJwtTokenAndSaveToCookie(String email, String fullName, String id, Role role) {
        String token = jwtService.generateToken(fullName,id,role.name(),email);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(15 * 60)
                .sameSite("Strict")
                .build();

        httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Override
    public UserResponseDTO getUser(ObjectId userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId.toHexString()));
        return UserResponseDTO.builder()
                .role(user.getRole())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .ethereumPublicKey(user.getEthereumPublicKey())
                .avatar(user.getAvatar())
                .id(user.getId().toHexString())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Override
    public void deleteUser(ObjectId userId) {
        User user =userRepo.findById(userId).orElseThrow(UserNotFoundException::new);
        if(!Objects.equals(new ObjectId(getCustomUserDetailsFromAuthentication().getUserId()),user.getId()))
            throw new UnauthorizedUserException("Unauthorised user!");
    }

    @Override
    public UserResponseDTO updateUser(UpdateUserDTO update,ObjectId userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException(userId.toHexString()));
        if(!Objects.equals(new ObjectId(getCustomUserDetailsFromAuthentication().getUserId()),user.getId()))
            throw new UnauthorizedUserException("Unauthorised user!");
        user.setFullName(update.getFullName());
        user.setEmail(update.getEmail());
        user.setAvatar(update.getAvatar());
        User saved =userRepo.save(user);
        return UserResponseDTO.builder()
                .createdAt(saved.getCreatedAt())
                .email(saved.getEmail())
                .role(saved.getRole())
                .avatar(saved.getAvatar())
                .fullName(saved.getFullName())
                .ethereumPublicKey(user.getEthereumPublicKey())
                .id(user.getId().toHexString())
                .build();
    }



    public static CustomUserDetails getCustomUserDetailsFromAuthentication() {
        return (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}