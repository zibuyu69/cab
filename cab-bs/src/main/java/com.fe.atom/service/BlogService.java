package com.fe.atom.service;

import com.fe.atom.domain.Blog;
import com.fe.atom.dto.BlogDTO;
import com.fe.atom.func.webpage.WebPage;

import java.util.List;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/20 16:05
 * @email: knove@ntjump.cn
 */
public interface BlogService {
    public BlogDTO findBlogById(String id)throws Exception;
    public boolean deleteBlogs(List<String> ids);
    public boolean insertBlog(Blog blog, String user_id);
    public List<BlogDTO> queryBlogs(String queryWord, WebPage webPage);
}

