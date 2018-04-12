package com.fe.atom.func.log;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/2/13 17:49
 * @email: knove@ntjump.cn
 */
@Aspect
@Component
public class LogAspect {
    private Logger logger = LoggerFactory.getLogger(LogAspect.class);
    @Pointcut("execution(public * com.fe.*.controller..*.*(..))")
    public void log(){
    }
    @Before("log()")
    public void doBefore(JoinPoint joinPoint) throws Throwable{
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        logger.info("URL : "+request.getRequestURI().toString());
        logger.info("HTTP_METHOD : "+request.getMethod());
        logger.info("IP : "+request.getRemoteAddr());
        Enumeration<String> enu = request.getParameterNames();
        while(enu.hasMoreElements()){
            String name = enu.nextElement();
            logger.info("name:{},value:{}",name,request.getParameter(name));
        }
    }

    @AfterReturning(pointcut = "log()",returning = "ret")
    public void doAfterReturning(Object ret) throws Throwable{
        logger.info("RESPONSE : {}",ret);
    }
}
