package com.fe.atom.domain;

import java.sql.Date;

/**
 * @classDesc: Log
 * @Author: Knove
 * @createTime: 2018/5/19 22:06
 * @email: knove@ntjump.cn
 */
public class Log {
  /**
   *  日志  id
   */
  private String log_id;
  /**
   *  日志  类型   1  为拿走快递  0 为 存放快递
   */
  private Integer log_type;
  /**
   *   快递的用户名
   */
  private String user_name;
  /**
   *   电话号码
   */
  private String phone_number;
  /**
   *   快递单号
   */
  private String pa_no;
  /**
   *   快递单号
   */
  private String box_no;
  /**
   *  日志 时间
   */
  private Date log_date;

  public String getLog_id() {
    return log_id;
  }

  public void setLog_id(String log_id) {
    this.log_id = log_id;
  }

  public Integer getLog_type() {
    return log_type;
  }

  public void setLog_type(Integer log_type) {
    this.log_type = log_type;
  }

  public String getUser_name() {
    return user_name;
  }

  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }

  public String getPhone_number() {
    return phone_number;
  }

  public void setPhone_number(String phone_number) {
    this.phone_number = phone_number;
  }

  public String getPa_no() {
    return pa_no;
  }

  public void setPa_no(String pa_no) {
    this.pa_no = pa_no;
  }

  public String getBox_no() {
    return box_no;
  }

  public void setBox_no(String box_no) {
    this.box_no = box_no;
  }

  public Date getLog_date() {
    return log_date;
  }

  public void setLog_date(Date log_date) {
    this.log_date = log_date;
  }
}
