package com.fe.atom.controller;

import com.fe.atom.domain.Box;
import com.fe.atom.func.json.ParamJsonObject;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.mapper.UserMapper;
import com.fe.atom.service.BoxService;
import com.fe.atom.service.PackageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @classDesc: BoxController
 * @Author: Knove
 * @createTime: 2018/4/12 20:03
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class BoxController {
  /**
   * log4j日志工具
   */
  private static final Logger PLOG = LoggerFactory.getLogger(UserController.class);
  @Autowired
  private BoxService boxService;
  @PostMapping("/getBoxes")
  public ServerResponse<List<Box>> getBoxes(@RequestBody Map<String,String> data) throws Exception {
    PLOG.info("   getUsers   ————     接收到data  =>>>>  " + data);
    List<Box> boxes = null;
    try {
      boxes = boxService.getBoxes();
    } catch (Exception e) {
      return ServerResponse.createByErrorMessage(e.getMessage());
    }
    return ServerResponse.createBySuccess(boxes);
  }
  @PostMapping("/updateBox")
  public ServerResponse<Boolean> updateBox(@RequestBody Box box) throws Exception {
    PLOG.info("   updateBox   ————     接收到box  =>>>>  " + box.getBox_id());
    if (StringUtils.isEmpty(box.getBox_id())) {
      return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
    }
    return ServerResponse.createBySuccess(boxService.updateBox(box));
  }
}
