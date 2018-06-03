package com.fe.atom.dto;

import java.io.Serializable;

/**
 * @classDesc: User DTO
 * @Author: Knove
 * @createTime: 2018/2/13 13:21
 * @email: knove@ntjump.cn
 */
public class UserDTO implements Serializable {
    private String userId;
    private String userName;
    private String phoneNumber;
    private String power;

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getPower() {
    return power;
  }

  public void setPower(String power) {
    this.power = power;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
}
