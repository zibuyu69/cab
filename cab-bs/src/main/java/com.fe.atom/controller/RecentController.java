package com.fe.atom.controller;

import com.fe.atom.domain.Recent;
import com.fe.atom.func.json.ParamJsonObject;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.service.RecentService;
import com.fe.atom.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @classDesc: RecentController
 * @Author: Knove
 * @createTime: 2018/4/12 4:04
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class RecentController {
    /**
     * log4j日志工具
     */
    private static final Logger PLOG = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private RecentService recentService;
    @PostMapping("/getRecentByUser")
    public ServerResponse<List<Recent>> getRecentByUser(@RequestBody Map<String,String> data) throws Exception {
        PLOG.info("   getRecentByUser   ————     接收到data  =>>>>  " + data);
        WebPage webPage = new WebPage(Integer.parseInt(data.get("pageNum")),Integer.parseInt(data.get("pageSize")));
        PLOG.info("   getRecentByUser   ————     接收到webPage =>>>>  " + webPage.getPageno() + webPage.getRowcount());
        List<Recent> recents = null;
        recents = recentService.queryRecent(data.get("key"), webPage);
        return ServerResponse.createBySuccess(recents);
    }
}
