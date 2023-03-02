package com.korit.passorder.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserMst {

    @ApiModelProperty(hidden = true)
    private int userId;

    @ApiModelProperty(name = "username", value="사용자이름", example = "abc", required = true)
    @NotBlank
    private String username;

    @ApiModelProperty(name = "password", value = "비밀번호", example = "1234", required = true)
    @NotBlank
    private String password;

    @ApiModelProperty(name = "repassword", value = "비밀번호 확인", example = "1234", required = true)
    @NotBlank
    private String repassword;

    @ApiModelProperty(name = "name", value = "성명", example = "박창우", required = true)
    @NotBlank
    private String name;
    @NotBlank
    @Email
    @ApiModelProperty(name = "email", value = "이메일", example = "abc@gmail.com", required = true)
    private String email;

    @ApiModelProperty(hidden = true)
    private int roleId;

    @ApiModelProperty(hidden = true)
    private String roleName;

    @ApiModelProperty(hidden = true)
    private RoleMst roleMst;
}
