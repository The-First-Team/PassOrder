package com.korit.passorder.web.dto;

import com.korit.passorder.entity.MenuDtl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuReqDto {
    private int menuId;
    private int cafeId;
    private String menuName;
    private String category;
    private int menuPrice;

    List<MenuDtl> menuDtl;
}
