package com.fe.atom.service.impl;

import com.fe.atom.domain.Recent;
import com.fe.atom.domain.User;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.mapper.RecentMapper;
import com.fe.atom.mapper.UserMapper;
import com.fe.atom.service.RecentService;
import com.github.pagehelper.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @classDesc: RecentServiceImpl
 * @Author: Knove
 * @createTime: 2018/4/12 4:08
 * @email: knove@ntjump.cn
 */
@Service
public class RecentServiceImpl implements RecentService {
    @Resource
    private RecentMapper recentMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    public List<Recent> queryRecent(String queryWord, WebPage webPage) {
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
        } else {
            orderbyStr = "";
        }
        List<Map> list = recentMapper.getAllRecentByUser(queryMap, webPage.getPageno(), webPage.getRowcount(), orderbyStr);
        if (list == null || list.size() == 0) {
            return null;
        }
        List<Recent> recents = new ArrayList<>();
        List<Map> mapList = ((Page) list).getResult();
        Long total = ((Page) list).getTotal();
        for (Map map : mapList) {
            // 调取User DAO 获取用户名
            String user_name = "";
            User user = userMapper.getUserById(map.get("user_id").toString());
            if(!StringUtils.isEmpty(user)) {
                user_name = user.getUser_name();
            }
            System.out.println(map);
            Recent recent = new Recent();
            recent.setTitle(map.get("blog_name").toString());
            recent.setRecent_small_text(map.get("blog_text").toString());
            recent.setTarget_id(map.get("blog_id").toString());
            recent.setUser_id(map.get("user_id").toString());
            recent.setRecent_data(java.sql.Date.valueOf(map.get("show_date").toString()));
            recent.setRecent_type(Integer.parseInt(map.get("1").toString()));
            recent.setRecent_text(map.get("blog_text").toString());
            recent.setUser_name(user_name);
            recents.add(recent);
        }
        return recents;
    }
}
