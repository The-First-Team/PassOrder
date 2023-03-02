package com.korit.passorder.respository;

import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public int saveUser(UserMst user);



    public UserMst findUserByUserId(int userId);
    public UserMst findUserByUsername(String username);


    public int saveAdminCafeInfo(CafeMst cafe);
}
