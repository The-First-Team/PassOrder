package com.korit.passorder.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
    @GetMapping({"", "/index"})
    public String index() {
        return "/index/index";
    }

    @GetMapping("/login-success")
    public String success(){
        return "index/indexSuccess";
    }

    //fail 시
    @ResponseBody
    @GetMapping("/login-fail")
    public String fail(){
        return "fail";
    }
}
