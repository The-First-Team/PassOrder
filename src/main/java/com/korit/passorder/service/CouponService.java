package com.korit.passorder.service;

import com.korit.passorder.respository.CouponRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;
}
