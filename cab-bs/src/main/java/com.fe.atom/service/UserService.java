package com.fe.atom.service;

import com.fe.atom.domain.User;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.webpage.WebPage;

import java.util.List;
import java.util.Map;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/2/13 16:05
 * @email: knove@ntjump.cn
 */
public interface UserService {

    public UserDTO findUserById(String id)throws Exception;
    public List<UserDTO> queryUsers(String queryWord,WebPage webPage);
    public boolean insertUser(User user);
    public boolean updateUser(User user,String id);
    public boolean deleteUser(List<String> ids);
    public UserDTO login(User user);
}

