package com.fe.atom.service.impl;

import com.fe.atom.domain.User;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.mapper.UserMapper;
import com.fe.atom.service.UserService;
import com.github.pagehelper.Page;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.Date;
/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/2/13 16:08
 * @email: knove@ntjump.cn
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public UserDTO findUserById(String id) throws Exception {
        User userVO = userMapper.getUserById(id);
        UserDTO user = new UserDTO();
        user.setUserId(userVO.getUser_id());
        user.setUserName(userVO.getUser_name());
        user.setScore(userVO.getScore());
        user.setUserText(userVO.getUser_text());
        return user;
    }
    @Override
    public List<UserDTO> queryUsers(String queryWord, WebPage webPage) {
        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("key", queryWord);

        String orderbyStr = null;
        Map<String, Integer> orderby = webPage.getOrderby();
        if (orderby != null && !orderby.isEmpty()) {
            StringBuffer orderbyBuffer = new StringBuffer();
            for (Map.Entry<String, Integer> item : orderby.entrySet()) {
                if (item.getValue() == 1) {
                    orderbyBuffer.append(item.getKey()).append(" asc,");
                } else {
                    orderbyBuffer.append(item.getKey()).append(" desc,");
                }
            }
            orderbyStr = orderbyBuffer.substring(0, orderbyBuffer.length() - 1);
        }else{
            orderbyStr = " ";
        }
        List<User> list = userMapper.getAllUsers(queryMap,webPage.getPageno(),webPage.getRowcount(),orderbyStr);
        if (list == null || list.size() == 0) {
            return null;
        }
        List<UserDTO> users = new ArrayList<>();
        List<User> userVO = ((Page) list).getResult();
        Long total = ((Page) list).getTotal();
        for (User user : userVO) {
            UserDTO user1 = new UserDTO();
            user1.setUserId(user.getUser_id());
            user1.setUserName(user.getUser_name());
            user1.setScore(user.getScore());
            users.add(user1);
        }
        return users;
    }
    @Override
    public boolean insertUser(User user) {
        // 获取 UUID 唯一标识
        String id = UUID.randomUUID().toString().replace("-", "");
        // 获取当前时间
        Date nowTime = new Date(new java.util.Date().getTime());

        // 装箱
        user.setUser_id(id);
        user.setRegiste_date(nowTime);
        // MD5 加密
        String password = DigestUtils.md5Hex(user.getPassword());
        user.setPassword(password);

        return userMapper.insertUser(user);
    }
    @Override
    public boolean updateUser(User user,String id) {
        User updateUser = userMapper.getUserById(user.getUser_id());
        if (!StringUtils.isEmpty(user.getPassword())) {
            String password = user.getPassword();
            updateUser.setPassword(password);
        }
        if (!StringUtils.isEmpty(user.getScore())) {
            int score = user.getScore();
            updateUser.setScore(score);
        }
        if (!StringUtils.isEmpty(user.getPermission())) {
            int permission = user.getPermission();
            updateUser.setPermission(permission);
        }
        if (!StringUtils.isEmpty(user.getLast_login_date())) {
            Date date = user.getLast_login_date();
            updateUser.setLast_login_date(date);
        }
        return userMapper.updateUser(updateUser);
    }

    @Override
    public boolean deleteUser(List<String> ids) {
        return userMapper.deleteUsers(ids);
    }

    @Override
    public UserDTO login(User user) {
        User userVO = userMapper.getUserByUserName(user.getUser_name());
        // MD5 加密
        String password = DigestUtils.md5Hex(user.getPassword());
        if(!StringUtils.isEmpty(userVO) && password.equals(userVO.getPassword())){
            UserDTO userdto = new UserDTO();
            userdto.setUserId(userVO.getUser_id());
            userdto.setUserName(userVO.getUser_name());
            userdto.setScore(userVO.getScore());
            return userdto;
        }
        return null;
    }
}
