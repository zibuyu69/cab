package com.fe.atom.service;

import com.fe.atom.domain.Log;
import com.fe.atom.func.webpage.WebPage;

import java.util.List;

public interface LogService {
  public List<Log> queryLogs(String queryWord, WebPage webPage);
  public Integer queryLogsNum(String queryWord, WebPage webPage);
}
