package com.fe.atom.service;

import com.fe.atom.domain.Package;
import com.fe.atom.func.webpage.WebPage;

import java.util.List;

public interface PackageService {
  public List<Package> queryPackages(String queryWord, WebPage webPage, String type, String phone_number, String searchValue);
  public boolean insertPackage(Package packages);
}
