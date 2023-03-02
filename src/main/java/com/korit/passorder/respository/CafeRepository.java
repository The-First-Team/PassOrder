package com.korit.passorder.respository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CafeRepository {
    public int getCafeIdByUserId(int userId);
}

