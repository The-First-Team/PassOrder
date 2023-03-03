package com.korit.passorder.web.api;

import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.MenuService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/api/menu")
public class MenuApi {
    @Autowired
    MenuService menuService;

    @PostMapping()
    public ResponseEntity<?> createMenu(@RequestBody MenuMst menuMst){
        menuService.createMenu(menuMst);
        return  ResponseEntity.created(null).body(new CMRespDto<>(HttpStatus.CREATED.value(), "ok", menuMst));
    }

    @GetMapping("/{menuId}")
    public ResponseEntity<?> getMenuByMenuId(@PathVariable int menuId){
        MenuMst menuMst = menuService.getMenuByMenuId(menuId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMst));
    }

    @GetMapping("/{category}")
    public ResponseEntity<?> getMenuByCategory(@PathVariable String category){
        List<MenuMst> menuMstList = menuService.getMenuByCategory(category);

        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/{cafeId}")
    public List<MenuMst> getMenuByCafeId(@PathVariable int cafeId){
        return menuService.getMenuByCafeId(cafeId);
    }

    @PutMapping("")
    public void modifyMenu(@RequestBody MenuMst modifiedMenu, @AuthenticationPrincipal PrincipalDetails principal){
        prin
    };


}