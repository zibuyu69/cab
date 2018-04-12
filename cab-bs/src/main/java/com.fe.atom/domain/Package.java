package com.fe.atom.domain;

/**
 * @classDesc: Package
 * @Author: Knove
 * @createTime: 2018/4/12 16:33
 * @email: knove@ntjump.cn
 */
public class Package {
  /**
   *  包裹/快递信息  id
   */
  private String pa_id;
  /**
   *  用户手机号
   */
  private String phone_number;
  /**
   *  用户名
   */
  private String username;
  /**
   *  快递柜单号
   */
  private String box_no;
  /**
   *  快递单号
   */
  private String pa_no;

  public String getPa_id() {
    return pa_id;
  }

  public void setPa_id(String pa_id) {
    this.pa_id = pa_id;
  }

  public String getPhone_number() {
    return phone_number;
  }

  public void setPhone_number(String phone_number) {
    this.phone_number = phone_number;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getBox_no() {
    return box_no;
  }

  public void setBox_no(String box_no) {
    this.box_no = box_no;
  }

  public String getPa_no() {
    return pa_no;
  }

  public void setPa_no(String pa_no) {
    this.pa_no = pa_no;
  }
}
