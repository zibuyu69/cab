package com.fe.atom.domain;

import java.io.Serializable;
import java.sql.Date;

/**
 * @classDesc: 用户实体类
 * @Author: Knove
 * @createTime: 2018/2/12 16:42
 * @email: knove@ntjump.cn
 */

public class User implements Serializable {
    /**
     *  用户id
     */
    private String user_id;
    /**
     *  用户Name
     */
    private String username;
    /**
     *  密码
     */
    private String password;
    /**
     *  用户手机号
     */
    private String phone_number;

  public String getUser_id() {
    return user_id;
  }

  public void setUser_id(String user_id) {
    this.user_id = user_id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhone_number() {
    return phone_number;
  }

  public void setPhone_number(String phone_number) {
    this.phone_number = phone_number;
  }

  public User() {
    }
    @Override
    public String toString() {
        return getUsername() + "   -   " + getPhone_number();
    }
}
