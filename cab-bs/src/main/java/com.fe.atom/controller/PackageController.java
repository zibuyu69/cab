package com.fe.atom.controller;

import com.fe.atom.domain.Box;
import com.fe.atom.domain.Package;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
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
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @classDesc: PackageController
 * @Author: Knove
 * @createTime: 2018/4/12 20:13
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class PackageController {
  /**
   * log4j日志工具
   */
  private static final Logger PLOG = LoggerFactory.getLogger(UserController.class);
  @Autowired
  private PackageService packageService;
  @PostMapping("/getList")
  public ServerResponse<Map> getList(@RequestBody Map<String,String> data, HttpSession session) throws Exception {
    PLOG.info("   getList   ————     接收到data  =>>>>  " + data);
    WebPage webPage = new WebPage(Integer.parseInt(data.get("pageNum")),Integer.parseInt(data.get("pageSize")));
    PLOG.info("   getList   ————     接收到webPage =>>>>  " + webPage.getPageno() + webPage.getRowcount());
    List<Package> packages = null;
    UserDTO userDTOs = (UserDTO)session.getAttribute("userInfo");
    PLOG.info("   getList   ————     根据session 获取当前的用户  =>>>>  "+userDTOs);
    if(StringUtils.isEmpty(userDTOs)){
      // 登陆过期 必传此
      return ServerResponse.createByErrorCodeMessage(ResponseCode.SESSIONFAILD.getCode(),ResponseCode.SESSIONFAILD.getDesc());
    }
    packages = packageService.queryPackages(data.get("key"), webPage,data.get("type"), userDTOs.getPhoneNumber(), data.get("searchValue"));
    int total = packageService.queryPackagesNum(data.get("key"), webPage,data.get("type"), userDTOs.getPhoneNumber(), data.get("searchValue"));
    webPage.setTotal(total);
    Map map=new HashMap();
    map.put("data",packages);
    map.put("pageInfo", webPage);
    return ServerResponse.createBySuccess(map);
  }
  @PostMapping("/storage")
  public ServerResponse<Boolean> storage(@RequestBody Package packages) throws Exception {
    PLOG.info("   storage   ————     接收到packages  =>>>>  " + packages);
    if (StringUtils.isEmpty(packages.getPhone_number()) || StringUtils.isEmpty(packages.getBox_no()) || StringUtils.isEmpty(packages.getPa_no())) {
      return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
    }
    boolean insertFlag = packageService.insertPackage(packages);
    return ServerResponse.createBySuccess(insertFlag);
  }
  @PostMapping("/pickup")
  public ServerResponse<Boolean> pickup(@RequestBody Map<String,String[]> data) throws Exception {
    String[] boxNumberList = data.get("boxNumberList");
    PLOG.info("   pickup   ————     接收到ids  =>>>>  " + boxNumberList);
    if (boxNumberList.length <= 0){
      return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(),ResponseCode.NULLPOINT.getDesc());
    }
    boolean deleteFlag = packageService.pickupPackage(Arrays.asList(boxNumberList));
    return ServerResponse.createBySuccess(deleteFlag);
  }
  @PostMapping("/update")
  public ServerResponse<Boolean> update(@RequestBody Package packages) throws Exception {
    PLOG.info("   update   ————     接收到Package  =>>>>  " + packages);
    if (StringUtils.isEmpty(packages.getPa_no())) {
      return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
    }
    boolean updateFlag = packageService.update(packages);
    return ServerResponse.createBySuccess(updateFlag);
  }
}
