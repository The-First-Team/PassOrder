package com.korit.passorder.service;

import com.korit.passorder.entity.UserMst;
import com.korit.passorder.exception.CustomValidationException;
import com.korit.passorder.respository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public UserMst registerUser(UserMst userMst){
        accountRepository.saveUser(userMst);
//        accountRepository.saveRole(userMst);

        return userMst;
    }

    public void duplicateUsername(String username){
        UserMst user = accountRepository.findUserByUsername(username);
//        log.info("{}",user);
        if (user != null){
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("username","이미 존재하는 아이디입니다..");
            throw new CustomValidationException(errorMap);
        }
    }

    public void compareToPassword(String password, String repassword){

        if(!password.equals(repassword)){
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("repassword","비밀번호가 일치하지 않습니다.");
            throw new CustomValidationException(errorMap);
        }


    }

}
