package com.korit.passorder.entity;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RoleMst {

    @ApiModelProperty(hidden = true)
    private int roleId;
    @ApiModelProperty(hidden = true)
    private String roleName;
}
