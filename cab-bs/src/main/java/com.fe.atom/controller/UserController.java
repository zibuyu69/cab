package com.fe.atom.controller;

import com.fe.atom.domain.User;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.json.ParamJsonObject;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.service.UserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @classDesc: User Controller
 * @Author: Knove
 * @createTime: 2018/2/13 16:44
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class UserController {
    /**
     * log4j日志工具
     */
    private static final Logger PLOG = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ServerResponse<UserDTO> login(@RequestBody User user, HttpSession session) throws Exception {
        String phone_number = user.getPhone_number();
        String password = user.getPassword();
        PLOG.info("   login   ————     登录操作，接收到用户手机号  =>>>>  " + phone_number);
        if (StringUtils.isEmpty(phone_number) || StringUtils.isEmpty(password)) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        UserDTO userDTO = userService.login(user);
        if(!StringUtils.isEmpty(userDTO)){
            // 登录成功
            session.setAttribute("userInfo", userDTO);
            // session 存在一天
            session.setMaxInactiveInterval( 60 * 60 * 24 );
            UserDTO userDTOs = (UserDTO)session.getAttribute("userInfo");
            return ServerResponse.createBySuccess(userDTO);
        }
        return ServerResponse.createByErrorCodeMessage(ResponseCode.LOGINFAILD.getCode(), ResponseCode.LOGINFAILD.getDesc());
    }
    @PostMapping("/getUserBySession")
    public ServerResponse<UserDTO> getUserBySession(HttpSession session) throws Exception {
        UserDTO userDTO = (UserDTO)session.getAttribute("user_name");
        PLOG.info("   getUserById   ————     接收到获取当前用户请求 =>>>>  " + userDTO);
        if(StringUtils.isEmpty(userDTO)){
            // 登陆过期 必传此
            return ServerResponse.createByErrorCodeMessage(ResponseCode.LOGINNONE.getCode(),ResponseCode.LOGINNONE.getDesc());
        }
        return ServerResponse.createBySuccess(userDTO);
    }
    @PostMapping("/getUserById")
    public ServerResponse<UserDTO> getUserById(@RequestBody User user) throws Exception {
        String id = user.getUser_id();
        PLOG.info("   getUserById   ————     接收到id =>>>>  " + id);
        if (StringUtils.isEmpty(id)) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        UserDTO userVo = null;
        try {
            userVo = userService.findUserById(id);
        } catch (Exception e) {
            return ServerResponse.createByErrorMessage(e.getMessage());
        }
        return ServerResponse.createBySuccess(userVo);
    }
    @PostMapping("/getUsers")
    public ServerResponse<List<UserDTO>> getUsers(String key, ParamJsonObject<Object> page) throws Exception {
        PLOG.info("   getUsers   ————     接收到key  =>>>>  " + key);
        PLOG.info("   getUsers   ————     接收到page =>>>>  " + page.getParams());
        WebPage webPage = new WebPage(page);
        PLOG.info("   getUsers   ————     接收到webPage =>>>>  " + webPage.getPageno() + webPage.getRowcount());
        List<UserDTO> Users = null;
        try {
            Users = userService.queryUsers(key, webPage);
        } catch (Exception e) {
            return ServerResponse.createByErrorMessage(e.getMessage());
        }
        return ServerResponse.createBySuccess(Users);
    }

    @PostMapping("/insertUser")
    public ServerResponse<Boolean> insertUser(@RequestBody User user) throws Exception {
        PLOG.info("   getUsers   ————     接收到user  =>>>>  " + user);
        if (StringUtils.isEmpty(user.getUsername()) || StringUtils.isEmpty(user.getPassword())) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        boolean insertFlag = userService.insertUser(user);
        return ServerResponse.createBySuccess(insertFlag);
    }
    @PostMapping("/updateUser")
    public ServerResponse<Boolean> updateUser(@RequestBody User user) throws Exception {
        PLOG.info("   getUsers   ————     接收到user  =>>>>  " + user);
        if (StringUtils.isEmpty(user.getUser_id())) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        boolean updateFlag = userService.updateUser(user, user.getUser_id());
        return ServerResponse.createBySuccess(updateFlag);
    }
    @PostMapping("/deleteUsers")
    public ServerResponse<Boolean> deleteUsers(@RequestBody List<String> ids) throws Exception {
        PLOG.info("   getUsers   ————     接收到ids  =>>>>  " + ids);
        if (ids.size() <= 0) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        boolean deleteFlag = userService.deleteUser(ids);
        return ServerResponse.createBySuccess(deleteFlag);
    }
}
