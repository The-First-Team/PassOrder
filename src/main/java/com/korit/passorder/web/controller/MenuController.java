package com.korit.passorder.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/menu")
public class MenuController {

    @GetMapping("/user")
    public String menuUser() {
        return "menu/userMenu";
    }

    @GetMapping("/admin")
    public String menuAdmin() {
        return "menu/adminMenu";
    }
}
