package com.korit.passorder.security;

import com.korit.passorder.entity.UserMst;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@AllArgsConstructor
public class PrincipalDetails implements UserDetails, OAuth2User {

    @Getter
    private final UserMst user;
    private Map<String, Object> response;


    //권한 들고오기
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        String roleName = user.getRoleName();
        System.out.println("롤 네임: " + roleName);

        GrantedAuthority role = new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return roleName;
            }
        };

        authorities.add(role);


        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    /*
            계정 만료 여부
         */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    /*
        계정 잠김 여부
    */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    /*
        비밀번호 만료 여부
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    /*
        사용자 활성화 여부
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return user.getName();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return response;
    }

    public UserMst getUser() {
        return this.user;
    }
}