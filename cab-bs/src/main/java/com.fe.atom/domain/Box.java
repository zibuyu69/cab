package com.fe.atom.domain;

/**
 * @classDesc: Box
 * @Author: Knove
 * @createTime: 2018/4/12 16:32
 * @email: knove@ntjump.cn
 */
public class Box {
  /**
   *  快递柜  id
   */
  private String box_id;
  /**
   *  快递柜 号
   */
  private String box_no;
  /**
   *  快递柜 目前状态
   */
  private String box_type;

  public String getBox_id() {
    return box_id;
  }

  public void setBox_id(String box_id) {
    this.box_id = box_id;
  }

  public String getBox_no() {
    return box_no;
  }

  public void setBox_no(String box_no) {
    this.box_no = box_no;
  }

  public String getBox_type() {
    return box_type;
  }

  public void setBox_type(String box_type) {
    this.box_type = box_type;
  }

  @Override
  public String toString() {
    return getBox_no();
  }
}
