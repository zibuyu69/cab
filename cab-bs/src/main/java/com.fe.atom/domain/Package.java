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
   *  用户id
   */
  private String user_id;
  /**
   *  快递柜单号
   */
  private String box_no;
  /**
   *  快递柜单号
   */
  private String pa_no;

  public String getPa_id() {
    return pa_id;
  }

  public void setPa_id(String pa_id) {
    this.pa_id = pa_id;
  }

  public String getUser_id() {
    return user_id;
  }

  public void setUser_id(String user_id) {
    this.user_id = user_id;
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
