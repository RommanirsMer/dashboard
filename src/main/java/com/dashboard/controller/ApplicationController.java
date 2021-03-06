package com.dashboard.controller;

import com.dashboard.models.User;
import com.dashboard.payload.response.AboutResponse;
import com.dashboard.repository.UserRepository;
import com.dashboard.utils.GetQueryStrings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/")
public class ApplicationController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/about")
    public ResponseEntity<?> allAccess(HttpServletRequest request) {
        return ResponseEntity.ok(
                new AboutResponse(request.getRemoteAddr())
        );
    }

    @GetMapping("/verify")
    public String verifier(HttpServletRequest request) {
        Map<String, String> values = GetQueryStrings.getQueryMap(request.getQueryString());

        User user = userRepository.findByUsername(values.get("user"))
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + values.get("user")));

        Date now = new Date();

        if (!user.isIs_validated() && user.getToken().equals(values.get("token")) && now.before(user.getTokenExpiration())) {
            user.setIs_validated(true);
            userRepository.save(user);
            return "Congratulation, your account is now validated! This tab will close itself in 5 seconds.<script>setTimeout(()=>{window.close()}, 5000)</script>";
        } else {
            return "Error during validation";
        }

    }
}
