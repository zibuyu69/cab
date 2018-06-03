package com.fe.atom.mapper;

import com.fe.atom.domain.Box;

import java.util.List;

public interface BoxMapper {
  List<Box> getBoxes();
  boolean updateBox(Box box);
}
