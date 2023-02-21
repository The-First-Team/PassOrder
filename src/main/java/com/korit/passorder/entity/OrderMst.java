package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderMst {

    private int orderId;

    private int cafeId;

    private int userId;

    private LocalTime orderTime;

    private int totalPrice;

    private int complete;


}
