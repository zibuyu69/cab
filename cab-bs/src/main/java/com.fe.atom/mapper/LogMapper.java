package com.fe.atom.mapper;

import com.fe.atom.domain.Log;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface LogMapper {
  List<Log> getAllLog(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

  Integer getAllLogNumber();

  boolean insertLog(Log log);
}
