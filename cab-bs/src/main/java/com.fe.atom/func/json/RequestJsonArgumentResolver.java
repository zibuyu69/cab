package com.fe.atom.func.json;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * @classDesc: Json -> map
 * @Author: Knove
 * @createTime: 2018/2/19 18:55
 * @email: knove@ntjump.cn
 */
public class RequestJsonArgumentResolver  implements HandlerMethodArgumentResolver {

    private JacksonJsonParser jsonParser = new JacksonJsonParser();

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return ParamJsonObject.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        try {
            return new ParamJsonObject<Object>((jsonParser).parseMap(webRequest.getParameter((parameter.getParameterName()))))
            ;
        } catch(Exception ex) {
            return null;
        }
    }

}
