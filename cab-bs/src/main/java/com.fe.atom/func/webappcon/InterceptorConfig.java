package com.fe.atom.func.webappcon;

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;

/**
 * @classDesc: 对于 登陆 的认证
 * @Author: Knove
 * @createTime: 2018/3/22 20:40
 * @email: knove@ntjump.cn
 */
public class InterceptorConfig implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
 //       HttpSession session = httpServletRequest.getSession();
//        if(!StringUtils.isEmpty(session.getAttribute("user_name"))){
//            return true;
//        }
//        else{
//            PrintWriter printWriter = httpServletResponse.getWriter();
//            printWriter.write("{\"code\":0,\"msg\":\"Session is invalid. Please login again!\"}");
//            return false;
//        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
