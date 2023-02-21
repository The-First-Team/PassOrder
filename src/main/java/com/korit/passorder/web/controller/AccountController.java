package com.korit.passorder.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/before-register")
    public String loadBfRegister() {return "beforeRegister";}

    @GetMapping("/register")
    public String loadRegister(){return "register";}

    @GetMapping("/admin-register")
    public String loadAdRegister() {return "adminRegister";}

}
