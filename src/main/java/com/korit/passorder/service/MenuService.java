package com.korit.passorder.service;

import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.respository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
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

    public int modifyMenu(MenuMst modifiedMenu){
        return menuRepository.modifyMenu(modifiedMenu);
    };
}