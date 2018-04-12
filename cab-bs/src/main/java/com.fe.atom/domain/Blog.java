package com.fe.atom.domain;

import java.sql.Date;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/20 16:11
 * @email: knove@ntjump.cn
 */
public class Blog {
    /**
     *  帖子id
     */
    private String blog_id;
    /**
     *  发帖人Id
     */
    private String user_id;
    /**
     *  帖子Name
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
     *  帖子私有类型
     */
    private Integer prvite;
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

    public Integer getPrvite() {
        return prvite;
    }

    public void setPrvite(Integer prvite) {
        this.prvite = prvite;
    }

    public Date getShow_date() {
        return show_date;
    }

    public void setShow_date(Date show_date) {
        this.show_date = show_date;
    }
    @Override
    public String toString() {
        return getBlog_name() + "   -   " + getBlog_text();
    }
}
