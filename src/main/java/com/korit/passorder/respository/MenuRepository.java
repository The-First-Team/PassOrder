package com.korit.passorder.respository;

import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuRepository {
    public int createMenu(MenuMst menuMst);
    public MenuMst getMenuByMenuId(int menuId);
    public List<MenuMst> getMenuByCategory(String category);
    public List<MenuMst> getMenuByCafeId(int cafeId);
    public int modifyMenu(MenuMst modifiedMenu);



}
