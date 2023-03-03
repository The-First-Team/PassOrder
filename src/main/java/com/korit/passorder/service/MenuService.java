package com.korit.passorder.service;

import com.korit.passorder.entity.MenuDtl;
import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.respository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    public void createMenu(MenuMst menuMst){
        menuRepository.createMenu(menuMst);
        // menudtl 함께 추가
    };
    public MenuMst getMenuByMenuId(int menuId){
        return menuRepository.getMenuByMenuId(menuId);
    };

    public List<MenuMst> getMenuByCategory(String category){
        return menuRepository.getMenuByCategory(category);
    };
    public List<MenuMst> getMenuByCafeId(int cafeId){
        return menuRepository.getMenuByCafeId(cafeId);
    };

//    public int modifyMenu(MenuMst modifiedMenu){
//        return menuRepository.modifyMenu(modifiedMenu);
//    };

    // menuDtl 관련
    public List<MenuDtl> getAddMenu(int menuId){
        List<MenuDtl> menuDtlList = menuRepository.getAddMenu(menuId);
        for(MenuDtl dtl: menuDtlList){
            dtl.setMenuId(menuId);
        }
        return menuDtlList;
    }

    public int createAddMenu(MenuDtl menuDtl){
        return menuRepository.createAddMenu(menuDtl);
    }

}
