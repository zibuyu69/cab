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
    private String userText;
    private Integer score;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserText() {
        return userText;
    }

    public void setUserText(String userText) {
        this.userText = userText;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "User: " + this.userId + "____" + this.userName + "____" + this.score;
    }
}
