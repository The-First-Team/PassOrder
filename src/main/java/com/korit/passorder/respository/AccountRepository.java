package com.korit.passorder.respository;

import com.korit.passorder.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public UserMst findUserByUsername(String username);
    public int saveUser(UserMst user);


}
