package com.fe.atom.mapper;

import com.fe.atom.domain.Blog;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface BlogMapper {

    boolean insertBlog(Blog blog);

    boolean updateBlog(Blog blog, String id);

    boolean deleteBlogs(List<String> ids);

    List<Blog> getAllBlogs(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

    List<Blog> getBlogChatBox(String id);

    Blog getBlogById(String id);
}
