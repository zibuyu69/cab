package com.fe.atom.func.json;

import java.util.Map;

/**
 * @classDesc: JsonObject
 * @Author: Knove
 * @createTime: 2018/2/19 18:55
 * @email: knove@ntjump.cn
 */
public class ParamJsonObject<T> {
    private Map<String,T> params;

    public ParamJsonObject(Map<String, T> map) {
        this.params = map;
    }

    public Map<String, T> getParams() {
        return params;
    }

    public void setParams(Map<String, T> params) {
        this.params = params;
    }

    public ParamJsonObject() {
    }
}
