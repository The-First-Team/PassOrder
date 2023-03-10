package com.korit.passorder.respository;

import com.korit.passorder.entity.MenuDtl;
import com.korit.passorder.entity.MenuMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuRepository {
    public int createMenu(MenuMst menuMst);
    public MenuMst getMenuByMenuId(int menuId);
    public List<MenuMst> getMenuByCategory(int cafeId, String category);
    public List<MenuMst> getMenuByCafeId(int cafeId);
    public List<String> getCategoriesByCafeId(int cafeId);
    public MenuMst getMenuIdByMenuName(int cafeId, String menuName);


    public int createMenuDtl(MenuDtl menuDtl);
    public List<MenuDtl> getMenuDtlByMenuId(int menuId);
    public int deleteMenu(int menuId);
    public int deleteMenuDtl(int menuId);

    public int modifyMenuMst(MenuMst menuMst);
    public int modifyMenuDtl(MenuDtl menuDtl);



}
