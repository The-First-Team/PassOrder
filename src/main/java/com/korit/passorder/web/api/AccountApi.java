package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ValidAspect;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.service.AccountService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private AccountService accountService;

    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserMst userMst, BindingResult bindingResult){


        accountService.duplicateUsername(userMst.getUsername());
        accountService.compareToPassword(userMst.getPassword(), userMst.getRepassword());
        System.out.println(userMst);
        accountService.registerUser(userMst);


        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>("Create a new User",null));

    }
}
