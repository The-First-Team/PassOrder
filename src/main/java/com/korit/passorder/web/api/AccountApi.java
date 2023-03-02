package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ValidAspect;
import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.AccountService;
import com.korit.passorder.web.dto.CMRespDto;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@Api(tags = {"Account Rest API Controller"})
@RestController
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private AccountService accountService;


    @ApiOperation(value = "회원가입", notes = "회원가입 요청 메소드")
    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> register(@RequestBody @Valid UserMst userMst, BindingResult bindingResult) {

        accountService.duplicateUsername(userMst.getUsername());
        accountService.compareToPassword(userMst.getPassword(), userMst.getRepassword());

        UserMst user = accountService.registerUser(userMst);

        return ResponseEntity
                .created(URI.create("/api/account/user/" + user.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new User", user));
    }

    @ValidAspect
    @PostMapping("/register/cafe")
    public ResponseEntity<? extends CMRespDto<? extends CafeMst>> registerAdminCafe(@RequestBody @Valid CafeMst cafeMst, BindingResult bindingResult) {

//        accountService.registerAdminAddCafe(userMst.getUserId(), cafeMst.getCafeId());


        System.out.println(cafeMst);

        CafeMst cafe = accountService.registerAdminAddCafe(cafeMst);

        return ResponseEntity
                .created(URI.create("/api/account/user/" + cafe.getCafeId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new Cafe", cafe));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "사용자 식별 코드", required = true, dataType = "int"),
    })
    @ApiResponses({
            @ApiResponse(code = 400, message = "클라이언트가 잘못했음"),
            @ApiResponse(code = 401, message = "클라이언트가 잘못했음2")
    })

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUser(
            @PathVariable int userId){

        UserMst user = accountService.getUser(userId);

        log.info("{}", userId);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "success", user));

    }

    @ApiOperation(value = "Get Principal", notes = "로그인 된 사용자 정보 가져오기")
    @GetMapping("/principal")
    public ResponseEntity<CMRespDto<? extends PrincipalDetails>> getUserByPrincipalDetails(@ApiParam(name = "principalDetails", hidden = true) @AuthenticationPrincipal PrincipalDetails principalDetails){
        if(principalDetails != null) {
            principalDetails.getAuthorities().forEach(role -> {
                System.out.println(role);
                log.info("로그인 된 사용자의 권한: {}", role.getAuthority());
            });
        }


        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", principalDetails));

//        UserMst userMst = principalDetails.getUser();
//
//        return ResponseEntity
//                .ok()
//                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", userMst));
    }
}
