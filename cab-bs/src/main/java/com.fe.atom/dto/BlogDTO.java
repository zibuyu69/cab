package com.fe.atom.dto;

import java.sql.Date;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/28 16:39
 * @email: knove@ntjump.cn
 */
public class BlogDTO {
    /**
     *  帖子id
     */
    private String blog_id;
    /**
     *  发帖人id
     */
    private String user_id;
    /**
     *  发帖人名称
     */
    private String user_name;
    /**
     *  帖子名
     */
    private String blog_name;
    /**
     *  帖子正文
     */
    private String blog_text;
    /**
     *  帖子类型
     */
    private Integer blog_type;
    /**
     *  帖子评论数
     */
    private Integer blog_chatbox_number;
    /**
     *  帖子点赞数
     */
    private Integer blog_chatbox_vote;
    /**
     *  创建日期
     */
    private Date show_date;

    public String getBlog_id() {
        return blog_id;
    }

    public void setBlog_id(String blog_id) {
        this.blog_id = blog_id;
    }
    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getBlog_name() {
        return blog_name;
    }

    public void setBlog_name(String blog_name) {
        this.blog_name = blog_name;
    }

    public String getBlog_text() {
        return blog_text;
    }

    public void setBlog_text(String blog_text) {
        this.blog_text = blog_text;
    }

    public Integer getBlog_type() {
        return blog_type;
    }

    public void setBlog_type(Integer blog_type) {
        this.blog_type = blog_type;
    }

    public Date getShow_date() {
        return show_date;
    }

    public Integer getBlog_chatbox_number() {
        return blog_chatbox_number;
    }

    public void setBlog_chatbox_number(Integer blog_chatbox_number) {
        this.blog_chatbox_number = blog_chatbox_number;
    }

    public Integer getBlog_chatbox_vote() {
        return blog_chatbox_vote;
    }

    public void setBlog_chatbox_vote(Integer blog_chatbox_vote) {
        this.blog_chatbox_vote = blog_chatbox_vote;
    }

    public void setShow_date(Date show_date) {
        this.show_date = show_date;
    }
}
