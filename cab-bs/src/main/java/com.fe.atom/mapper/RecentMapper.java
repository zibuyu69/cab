package com.fe.atom.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RecentMapper {
    List<Map> getAllRecentByUser(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);
}
