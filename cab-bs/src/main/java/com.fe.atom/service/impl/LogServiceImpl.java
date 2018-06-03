package com.fe.atom.service.impl;

import com.fe.atom.domain.Log;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.mapper.LogMapper;
import com.fe.atom.service.LogService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @classDesc: LogServiceImpl
 * @Author: Knove
 * @createTime: 2018/5/19 22:38
 * @email: knove@ntjump.cn
 */
@Service
public class LogServiceImpl implements LogService {
  @Resource
  private LogMapper logMapper;
  @Override
  public List<Log> queryLogs(String queryWord, WebPage webPage) {
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
    List<Log> list = logMapper.getAllLog(queryMap,webPage.getPageno(),webPage.getRowcount(),orderbyStr);

    return list;
  }

  @Override
  public Integer queryLogsNum(String queryWord, WebPage webPage) {
    Map<String, Object> queryMap = new HashMap<String, Object>();
    queryMap.put("key", queryWord);
    int number = logMapper.getAllLogNumber();
    return number;
  }
}
