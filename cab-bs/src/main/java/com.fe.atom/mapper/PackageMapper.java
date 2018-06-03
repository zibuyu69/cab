package com.fe.atom.mapper;

import com.fe.atom.domain.Package;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface PackageMapper {
  List<Package> getAllPackages(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

  List<Package> getPackagesByPhoneNumber(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

  Integer getAllPackagesNum(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

  Integer getPackagesByPhoneNumberNum(@Param("map") Map<String, Object> queryMap, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("orderby") String order);

  boolean insertPackage(Package packages);

  Package getPackageByBoxId(String box_no);

  Package getPackageById(String id);

  Package getPackageByPaNo(String id);

  boolean deletePackages(List<String> ids);

  boolean update(Package packages);
}
