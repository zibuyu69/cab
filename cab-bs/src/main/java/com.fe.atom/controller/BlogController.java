package com.fe.atom.controller;

import com.fe.atom.domain.Blog;
import com.fe.atom.domain.User;
import com.fe.atom.dto.BlogDTO;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.json.ParamJsonObject;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.service.BlogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;
/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/20 16:02
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class BlogController {
    /**
     * log4j日志工具
     */
    private static final Logger PLOG = LoggerFactory.getLogger(BlogController.class);
    @Autowired
    private BlogService blogService;

    @PostMapping("/insertBlog")
    public ServerResponse<Boolean> insertBlog (@RequestBody Blog blog, HttpSession session) throws Exception {
        PLOG.info("   insertBlog   ————     接收到blog  =>>>>  "+blog);
        if(StringUtils.isEmpty(blog.getBlog_name())){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(),ResponseCode.NULLPOINT.getDesc());
        }
        UserDTO userDTO = (UserDTO)session.getAttribute("user_name");
        PLOG.info("   insertBlog   ————     根据session 获取当前的用户  =>>>>  "+userDTO);
        if(StringUtils.isEmpty(userDTO)){
            // 登陆过期 必传此
            return ServerResponse.createByErrorCodeMessage(ResponseCode.SESSIONFAILD.getCode(),ResponseCode.SESSIONFAILD.getDesc());
        }
        boolean insertFlag = blogService.insertBlog(blog, userDTO.getUserId());
        return ServerResponse.createBySuccess(insertFlag);
    }
    @PostMapping("/deleteBlogs")
    public ServerResponse<Boolean> deleteBlogs(@RequestBody List<String>ids) throws Exception{
        PLOG.info("   deleteBlogs   ————     接收到blog  =>>>>  "+ids);
      if (ids.size()<=0){
           return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(),ResponseCode.NULLPOINT.getDesc());
        }
         boolean deleteFlag = blogService.deleteBlogs(ids);
        return ServerResponse.createBySuccess(deleteFlag);
}
    @PostMapping("/getBlogs")
    public ServerResponse<List<BlogDTO>> getBlogs(@RequestBody Map<String,String> data) throws Exception {
        PLOG.info("   getBlogs   ————     接收到data  =>>>>  " + data);
        WebPage webPage = new WebPage(Integer.parseInt(data.get("pageNum")),Integer.parseInt(data.get("pageSize")));
        PLOG.info("   getBlogs   ————     接收到webPage =>>>>  " + webPage.getPageno() + webPage.getRowcount());
        List<BlogDTO> BlogDTOs = null;
        BlogDTOs = blogService.queryBlogs(data.get("key"), webPage);
        return ServerResponse.createBySuccess(BlogDTOs);
    }
    @PostMapping("/getBlogById")
    public ServerResponse<BlogDTO> getBlogById(@RequestBody Blog blog) throws Exception {
        String id = blog.getBlog_id();
        PLOG.info("   getBlogById   ————     接收到id =>>>>  " + id);
        if (StringUtils.isEmpty(id)) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        BlogDTO blogDTO = null;
        blogDTO = blogService.findBlogById(id);
        if (StringUtils.isEmpty(blogDTO)) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.FINDNONE.getCode(), ResponseCode.FINDNONE.getDesc());
        }
        return ServerResponse.createBySuccess(blogDTO);
    }
}
