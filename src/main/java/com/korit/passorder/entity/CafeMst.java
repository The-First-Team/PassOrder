package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CafeMst {

    private int cafeId;
    private String cafeName;
    private String address;

    private String phone;

    private LocalDateTime openTime;
    private LocalDateTime closeTime;

    private int userId;




}
