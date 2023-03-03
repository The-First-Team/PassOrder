package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuMst {

    private int menuId;
    private String cafeId;
    private String menuName;
    private String category;
    private int menuPrice;

    private List<MenuDtl> menuDtlList;


}
