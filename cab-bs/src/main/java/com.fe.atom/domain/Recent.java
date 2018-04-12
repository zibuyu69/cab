package com.fe.atom.domain;

import java.sql.Date;

/**
 * @classDesc: Recent 动态 实体类
 * @Author: Knove
 * @createTime: 2018/4/12 3:54
 * @email: knove@ntjump.cn
 */
public class Recent {
    /**
     *  动态id
     */
    private String target_id;
    /**
     *  动态 标题
     */
    private String title;
    /**
     *  用户id
     */
    private String user_id;
    /**
     *  用户名
     */
    private String user_name;
    /**
     *  动态类型
     *          .eq. 1 发帖  2 评论 3 点赞 4 收藏 ...
     */
    private Integer recent_type;
    /**
     * 动态描述
     */
    private String recent_small_text;
    /**
     * 动态正文
     */
    private String recent_text;
    /**
     * 动态日期
     */
    private Date recent_data;

    public String getTarget_id() {
        return target_id;
    }

    public void setTarget_id(String target_id) {
        this.target_id = target_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Integer getRecent_type() {
        return recent_type;
    }

    public void setRecent_type(Integer recent_type) {
        this.recent_type = recent_type;
    }

    public String getRecent_small_text() {
        return recent_small_text;
    }

    public void setRecent_small_text(String recent_small_text) {
        this.recent_small_text = recent_small_text;
    }

    public String getRecent_text() {
        return recent_text;
    }

    public void setRecent_text(String recent_text) {
        this.recent_text = recent_text;
    }

    public Date getRecent_data() {
        return recent_data;
    }

    public void setRecent_data(Date recent_data) {
        this.recent_data = recent_data;
    }
}
