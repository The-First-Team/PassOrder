package com.korit.passorder.service;


import com.korit.passorder.respository.CafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CafeService {

    @Autowired
    CafeRepository cafeRepository;

    public int getCafeIdByUserId(int userId) {
        return cafeRepository.getCafeIdByUserId(userId);
    }
}
