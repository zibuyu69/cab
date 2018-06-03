package com.fe.atom.controller;

import com.fe.atom.domain.Log;
import com.fe.atom.domain.Package;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.service.BoxService;
import com.fe.atom.service.LogService;
import com.fe.atom.service.PackageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @classDesc: LogController
 * @Author: Knove
 * @createTime: 2018/5/19 22:24
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class LogController {
  /**
   * log4j日志工具
   */
  private static final Logger PLOG = LoggerFactory.getLogger(UserController.class);

  @Autowired
  private LogService logService;
  @PostMapping("/getLogs")
  public ServerResponse<Map> getLogs(@RequestBody Map<String,String> data, HttpSession session) throws Exception {
    PLOG.info("   getList   ————     接收到data  =>>>>  " + data);
    WebPage webPage = new WebPage(Integer.parseInt(data.get("pageNum")),Integer.parseInt(data.get("pageSize")));
    PLOG.info("   getList   ————     接收到webPage =>>>>  " + webPage.getPageno() + webPage.getRowcount());
    List<Log> logs = null;
/*    UserDTO userDTOs = (UserDTO)session.getAttribute("userInfo");
    PLOG.info("   getList   ————     根据session 获取当前的用户  =>>>>  "+userDTOs);
    if(StringUtils.isEmpty(userDTOs)){
      // 登陆过期 必传此
      return ServerResponse.createByErrorCodeMessage(ResponseCode.SESSIONFAILD.getCode(),ResponseCode.SESSIONFAILD.getDesc());
    }*/
    logs = logService.queryLogs(data.get("key"), webPage);
    int total = logService.queryLogsNum(data.get("key"), webPage);
    webPage.setTotal(total);
    Map map=new HashMap();
    map.put("data",logs);
    map.put("pageInfo", webPage);
    return ServerResponse.createBySuccess(map);
  }
}
