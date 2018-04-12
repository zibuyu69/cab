package com.fe.atom.func.response;

public enum ResponseCode {
    SUCCESS(200,"SUCCESS"),
    LOGINFAILD(400,"登陆失败"),
    FINDNONE(4,"404 Not Found!"),
    LOGINNONE(3,"未登陆"),
    NULLPOINT(2,"请求的必要值为空"),
    ERROR(1,"ERROR"),
    // 登陆过期则前端会直接跳登陆页面。若不想，则应使用错误码 3 未登录
    SESSIONFAILD(0,"登陆过期");

    /**
     * 状态码
     */
    private final int code;
    /**
     * 描述信息
     */
    private final String desc;

    ResponseCode(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }
    public int getCode() {
        return code;
    }
    public String getDesc() {
        return desc;
    }

}
