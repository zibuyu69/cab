package com.fe.atom.mapper;

import com.fe.atom.domain.User;
import com.fe.atom.dto.UserDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserMapper{

    boolean insertUser(User user);

    boolean updateUser(User user);

    boolean deleteUsers(List<String> ids);

    List<User> getAllUsers(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

    User getUserById(String Id);

    User getUserByUserName(String user_name);
}
