package com.korit.passorder.web.api;

import com.korit.passorder.entity.MenuDtl;
import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.service.MenuService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuApi {

    @Autowired
    MenuService menuService;

    @PostMapping()
    public ResponseEntity<?> createMenu(@RequestBody MenuMst menuMst){
        menuService.createMenu(menuMst);
        return  ResponseEntity.created(null).body(new CMRespDto<>(HttpStatus.CREATED.value(), "ok", menuMst));
    }

    @GetMapping("/menuId/{menuId}")
    public ResponseEntity<?> getMenuByMenuId(@PathVariable int menuId){
        MenuMst menuMst = menuService.getMenuByMenuId(menuId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMst));
    }

    @GetMapping("/{category}")
    public ResponseEntity<?> getMenuByCategory(@PathVariable String category){
        List<MenuMst> menuMstList = menuService.getMenuByCategory(category);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/cafe/{cafeId}")
    public ResponseEntity<?> getMenuByCafeId(@PathVariable int cafeId){
        List<MenuMst> menuMstList = menuService.getMenuByCafeId(cafeId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }


    @GetMapping("/addMenu/{menuId}")
    public ResponseEntity<?> getAddMenu(@PathVariable int menuId){
        List<MenuDtl> menuDtlList = menuService.getAddMenu(menuId);

        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuDtlList));
    }

}
