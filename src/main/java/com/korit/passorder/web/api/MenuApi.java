package com.korit.passorder.web.api;

import com.korit.passorder.entity.MenuDtl;
import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.CafeService;
import com.korit.passorder.service.MenuService;
import com.korit.passorder.web.dto.CMRespDto;
import com.korit.passorder.web.dto.MenuReqDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(tags = {"메뉴관리 Api"})
@RestController
@RequestMapping("/api/menu")
public class MenuApi {
    @Autowired
    MenuService menuService;

    @Autowired
    CafeService cafeService;


    @PostMapping()
    public ResponseEntity<?> createMenu(@RequestBody MenuReqDto menuReqDto){
        List<MenuDtl> menuDtls = new ArrayList<>();

        MenuMst menuMst = MenuMst.builder().
                cafeId("26").
                menuName(menuReqDto.getMenuName()).
                category(menuReqDto.getCategory()).
                menuPrice(menuReqDto.getMenuPrice())
                .build();

        menuService.createMenu(menuMst);

        List<MenuDtl> menuDtlList = new ArrayList<>();

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.getHotAndice()).
                addPrice(menuReqDto.getHotAndicePrice()).
                menuId(menuMst.getMenuId()).build());

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.isShotStatus()?"shotAdd" : "shotNone").
                addPrice(menuReqDto.isShotStatus()? menuReqDto.getShotPrice(): 0).
                menuId(menuMst.getMenuId()).build());

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.isWhipStatus()?"whipAdd" : "whipNone").
                addPrice(menuReqDto.isWhipStatus()? menuReqDto.getWhipPrice(): 0).
                menuId(menuMst.getMenuId()).build());

        menuMst.setMenuDtlList(menuDtlList);
        menuService.createMenuDtls(menuDtlList);


//        }
        return  ResponseEntity.created(null).body(new CMRespDto<>(HttpStatus.CREATED.value(), "ok", menuReqDto));
    }

    @GetMapping("/menuId/{menuId}")
    public ResponseEntity<?> getMenuByMenuId(@PathVariable int menuId){
        MenuMst menuMst = menuService.getMenuByMenuId(menuId);
        List<MenuDtl> menuDtl = menuService.getMenuDtlByMenuId(menuId);
        menuMst.setMenuDtlList(menuDtl);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMst));
    }

    @GetMapping("admin/{category}")
    public ResponseEntity<?> getMenuByCategoryForAdmin(@AuthenticationPrincipal PrincipalDetails principal, @PathVariable String category){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<MenuMst> menuMstList = menuService.getMenuByCategory(cafeId ,category);

        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("user/{cafeId}/{category}")
    public ResponseEntity<?> getMenuByCategoryForUser(@PathVariable int cafeId, @PathVariable String category){
        List<MenuMst> menuMstList = menuService.getMenuByCategory(cafeId ,category);

        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }


    @GetMapping("/admin/cafeId")
    public ResponseEntity<?> getMenuByCafeIdForAdmin(@AuthenticationPrincipal PrincipalDetails principal){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<MenuMst> menuMstList = menuService.getMenuByCafeId(cafeId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/user/{cafeId}")
    public ResponseEntity<?> getMenuByCafeId(@PathVariable int cafeId){
        List<MenuMst> menuMstList = menuService.getMenuByCafeId(cafeId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/admin/category")
    public ResponseEntity<?> getCategoriesForAdmin(@AuthenticationPrincipal PrincipalDetails principal){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<String> category = menuService.getCategoriesByCafeId(cafeId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", category));
    }

    @GetMapping("/user/{cafeId}/category")
    public ResponseEntity<?> getCategoriesForUser(@PathVariable int cafeId){
        List<String> category = menuService.getCategoriesByCafeId(cafeId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", category));
    }

    @GetMapping("/user/menuname")
    public ResponseEntity<?> getMenuByCafeId(@RequestParam String menuName){
        System.out.println(menuName);
        int cafeId = 26;
        MenuMst menuMst = menuService.getMenuIdByMenuName(cafeId, menuName);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMst));
    }
//    @GetMapping("/{cafeId}")
//    public ResponseEntity<?> getMenuByCafeId(@PathVariable int cafeId){
//        return menuService.getMenuByCafeId(cafeId);
//    }

    @PostMapping("/menuDtl")
    public ResponseEntity<?> createMenuDtl(@RequestBody  MenuDtl menuDtl) {
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuDtl));
    }
    @GetMapping("/menuDtl/{menuId}")
    public ResponseEntity<?> getMenuDtlByMenuId(@PathVariable int menuId) {
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuService.getMenuDtlByMenuId(menuId)));
    }

    @DeleteMapping("/{menuId}")
    public ResponseEntity<?> deleteMenu(@PathVariable int menuId) {
        menuService.deleteMenu(menuId);
        menuService.deleteMenuDtl(menuId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "delete", menuId));
    }

    @PutMapping("/{menuId}")
    public ResponseEntity<?> modifyMenu(@PathVariable int menuId, @RequestBody MenuReqDto menuReqDto) {

        MenuMst menuMst = MenuMst.builder().
                menuId(menuId).
                menuName(menuReqDto.getMenuName()).
                menuPrice(menuReqDto.getMenuPrice()).
                category(menuReqDto.getCategory()).build();

        List<MenuDtl> menuDtlList = new ArrayList<>();

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.getHotAndice()).
                addPrice(menuReqDto.getHotAndicePrice()).
                menuId(menuMst.getMenuId()).build());

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.isShotStatus()?"shotAdd" : "shotNone").
                addPrice(menuReqDto.isShotStatus()? menuReqDto.getShotPrice(): 0).
                menuId(menuMst.getMenuId()).build());

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.isWhipStatus()?"whipAdd" : "whipNone").
                addPrice(menuReqDto.isWhipStatus()? menuReqDto.getWhipPrice(): 0).
                menuId(menuMst.getMenuId()).build());

        menuMst.setMenuDtlList(menuDtlList);
        menuService.modifyMenuMst(menuMst);

        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "modifyOK", menuMst));
    }

}
