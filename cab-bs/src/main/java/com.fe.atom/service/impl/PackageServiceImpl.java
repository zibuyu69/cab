package com.fe.atom.service.impl;

import com.fe.atom.domain.Box;
import com.fe.atom.domain.Package;
import com.fe.atom.domain.User;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.mapper.PackageMapper;
import com.fe.atom.mapper.UserMapper;
import com.fe.atom.service.PackageService;
import com.fe.atom.service.UserService;
import com.github.pagehelper.Page;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.*;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/2/13 16:08
 * @email: knove@ntjump.cn
 */
@Service
public class PackageServiceImpl implements PackageService {
  @Resource
  private UserMapper userMapper;
  @Resource
  private PackageMapper packageMapper;
  @Override
  public List<Package> queryPackages(String queryWord, WebPage webPage, String type, String phone_number, String searchValue) {
    Map<String, Object> queryMap = new HashMap<String, Object>();
    queryMap.put("key", queryWord);
    queryMap.put("phone_number", phone_number);
    queryMap.put("searchValue", searchValue);
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
    List<Package> list = null;
    if("1".equals(type)) {
      list = packageMapper.getAllPackages(queryMap,webPage.getPageno(),webPage.getRowcount(),orderbyStr);
    } else {
      list = packageMapper.getPackagesByPhoneNumber(queryMap,webPage.getPageno(),webPage.getRowcount(),orderbyStr);
    }

    if (list == null || list.size() == 0) {
      return null;
    }
    // 开始装箱
    List<Package> packagesDTO = new ArrayList<>();
    List<Package> packagesVO = ((Page) list).getResult();
    Long total = ((Page) list).getTotal();
    for (Package packages : packagesVO) {
      // 调取User DAO 获取用户名
      String user_name = "";
      User user = userMapper.getUserByPhoneNumber(packages.getPhone_number());
      if(!StringUtils.isEmpty(user)) {
        user_name = user.getUsername();
      }
      if(StringUtils.isEmpty(user_name)) {
        user_name = packages.getUsername();
      }
      Package package1 = new Package();
      package1.setPa_id(packages.getPa_id());
      package1.setPa_no(packages.getPa_no());
      package1.setPhone_number(packages.getPhone_number());
      package1.setBox_no(packages.getBox_no());
      package1.setUsername(user_name);
      package1.setLast_time(packages.getLast_time());
      packagesDTO.add(package1);
    }
    return packagesDTO;
  }

  public Integer queryPackagesNum (String queryWord, WebPage webPage, String type, String phone_number, String searchValue) {
    Map<String, Object> queryMap = new HashMap<String, Object>();
    queryMap.put("key", queryWord);
    queryMap.put("phone_number", phone_number);
    queryMap.put("searchValue", searchValue);
    int total = 0;
    if("1".equals(type)) {
      total = packageMapper.getAllPackagesNum(queryMap,1,webPage.getRowcount(),"");
    } else {
      total = packageMapper.getPackagesByPhoneNumberNum(queryMap,1,webPage.getRowcount(),"");
    }
    return total;
  }
  @Override
  public boolean insertPackage(Package packages) {
    // 获取 UUID 唯一标识
    String id = UUID.randomUUID().toString().replace("-", "");
    // 获取一天后的时间
    Date nowTime = new Date(new java.util.Date().getTime() + 1000 * 60 * 60 * 24 * 2);
    Package packageVO = packageMapper.getPackageByBoxId(packages.getBox_no());

    if(StringUtils.isEmpty(packageVO)){
      // 装箱
      packages.setPa_id(id);
      packages.setLast_time(nowTime);
      return packageMapper.insertPackage(packages);
    }
    return false;
  }

  @Override
  public boolean update(Package packages) {
    Package packageVO = packageMapper.getPackageByBoxId(packages.getBox_no());
    // 如果 目标柜 不存在东西  或者 柜 没有改变
    if(StringUtils.isEmpty(packageVO) || packages.getBox_no().equals(packageVO.getBox_no())) {
      return packageMapper.update(packages);
    }
    return false;
  }

  @Override
  public boolean pickupPackage(List<String> ids) {
    return packageMapper.deletePackages(ids);
  }
}
