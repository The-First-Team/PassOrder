package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuMst {
    private int menuId;
    private int cafeId;
    private String menuName;
    private String category;
    private int menuPrice;

}
