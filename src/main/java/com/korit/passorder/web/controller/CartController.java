package com.korit.passorder.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartController {

    @GetMapping("/user")
    public String cartUser() {
        return "cart/cart";
    }

//    @GetMapping("/admin")
//    public String mypageAdmin() {
//        return "mypage/adminMypage";
//    }
}
