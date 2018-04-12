package com.fe.atom.domain;

import java.sql.Date;

/**
 * @classDesc: ChatBox
 * @Author: Knove
 * @createTime: 2018/4/11 10:52
 * @email: knove@ntjump.cn
 */
public class ChatBox {
    /**
     *  用户id
     */
    private String user_id;
    /**
     *  用户名
     */
    private String user_name;
    /**
     *  帖子/用户 id
     *              .eq. 0  帖子 1 用户
     */
    private String target_id;
    /**
     *  留言类型
     */
    private Integer chatbox_type;
    /**
     *  留言内容
     */
    private String chatbox_text;
    /**
     *  留言日期
     */
    private Date chatbox_date;

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getTarget_id() {
        return target_id;
    }

    public void setTarget_id(String target_id) {
        this.target_id = target_id;
    }

    public Integer getChatbox_type() {
        return chatbox_type;
    }

    public void setChatbox_type(Integer chatbox_type) {
        this.chatbox_type = chatbox_type;
    }

    public String getChatbox_text() {
        return chatbox_text;
    }

    public void setChatbox_text(String chatbox_text) {
        this.chatbox_text = chatbox_text;
    }

    public Date getChatbox_date() {
        return chatbox_date;
    }

    public void setChatbox_date(Date chatbox_date) {
        this.chatbox_date = chatbox_date;
    }

    @Override
    public String toString() {
        return getTarget_id() + "   -   " + getChatbox_type();
    }
}
