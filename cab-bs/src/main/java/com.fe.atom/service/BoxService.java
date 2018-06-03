package com.fe.atom.service;

import com.fe.atom.domain.Box;

import java.util.List;

public interface BoxService {
  List<Box> getBoxes();
  boolean updateBox(Box box);
}
