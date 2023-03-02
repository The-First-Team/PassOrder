package com.korit.passorder.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MypageController {

    @GetMapping("/user")
    public String mypageUser() {
        return "mypage/userMypage";
    }

    @GetMapping("/admin")
    public String mypageAdmin() {
        return "mypage/adminMypage";
    }
}
