package com.fe.atom.service.impl;

import com.fe.atom.domain.Blog;
import com.fe.atom.domain.User;
import com.fe.atom.dto.BlogDTO;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.mapper.BlogMapper;
import com.fe.atom.mapper.ChatBoxMapper;
import com.fe.atom.mapper.UserMapper;
import com.fe.atom.service.BlogService;
import com.github.pagehelper.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.UUID;
import java.util.*;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/20 16:22
 * @email: knove@ntjump.cn
 */
@Service
public class BlogServiceImpl implements BlogService {
    @Resource
    private BlogMapper blogMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private ChatBoxMapper chatBoxMapper;
    @Override
    public boolean insertBlog(Blog blog, String user_id) {
        // 获取 UUID 唯一标识
        String id = UUID.randomUUID().toString().replace("-", "");
        // 获取当前时间
        Date nowTime = new Date(new java.util.Date().getTime());
        // 装箱
        blog.setBlog_id(id);
        blog.setShow_date(nowTime);
        blog.setUser_id(user_id);
        return blogMapper.insertBlog(blog);
    }

    @Override
    public List<BlogDTO> queryBlogs(String queryWord, WebPage webPage) {
        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("key", queryWord);
        String orderbyStr = null;
        Map<String, Integer> orderby = webPage.getOrderby();
        if (orderby != null && !orderby.isEmpty()) {
            StringBuffer orderbyBuffer = new StringBuffer();
            for (Map.Entry<String, Integer> item : orderby.entrySet()) {
                if (item.getValue() == 1) {
                    orderbyBuffer.append(item.getKey()).append(" asc,");
                } else {
                    orderbyBuffer.append(item.getKey()).append(" desc,");
                }
            }
            orderbyStr = orderbyBuffer.substring(0, orderbyBuffer.length() - 1);
        }else{
            orderbyStr = "id desc";
        }
        List<Blog> list = blogMapper.getAllBlogs(queryMap,webPage.getPageno(),webPage.getRowcount(),orderbyStr);
        if (list == null || list.size() == 0) {
            return null;
        }
        // 开始装箱
        List<BlogDTO> blogDTOs = new ArrayList<>();
        List<Blog> blogVO = ((Page) list).getResult();
        Long total = ((Page) list).getTotal();
        for (Blog blog : blogVO) {
            // 调取User DAO 获取用户名
            String user_name = "";
            User user = userMapper.getUserById(blog.getUser_id());
            if(!StringUtils.isEmpty(user)) {
                user_name = user.getUser_name();
            }
            // 获取帖子的评论数
            int chatBoxNumber = chatBoxMapper.getChatBoxNumberFromBlog(blog.getBlog_id());
            BlogDTO blog1 = new BlogDTO();
            blog1.setUser_name(user_name);
            blog1.setUser_id(blog.getUser_id());
            blog1.setBlog_id(blog.getBlog_id());
            blog1.setBlog_name(blog.getBlog_name());
            blog1.setBlog_text(blog.getBlog_text());
            blog1.setBlog_type(blog.getBlog_type());
            blog1.setShow_date(blog.getShow_date());
            blog1.setBlog_chatbox_number(chatBoxNumber);
            blogDTOs.add(blog1);
        }
        return blogDTOs;
    }

    @Override
    public BlogDTO findBlogById(String id) throws Exception {
        Blog blogVO = blogMapper.getBlogById(id);
        if (StringUtils.isEmpty(blogVO)) {
            return null;
        }
        // 调取User DAO 获取用户名
        String user_name = "";
        User user = userMapper.getUserById(blogVO.getUser_id());
        if(!StringUtils.isEmpty(user)) {
            user_name = user.getUser_name();
        }
        BlogDTO blog1 = new BlogDTO();
        blog1.setUser_name(user_name);
        blog1.setUser_id(blogVO.getUser_id());
        blog1.setBlog_id(blogVO.getBlog_id());
        blog1.setBlog_name(blogVO.getBlog_name());
        blog1.setBlog_text(blogVO.getBlog_text());
        blog1.setBlog_type(blogVO.getBlog_type());
        blog1.setShow_date(blogVO.getShow_date());
        return blog1;
    }

    @Override
    public boolean deleteBlogs(List<String> ids){
       return blogMapper.deleteBlogs(ids);
    }
}
