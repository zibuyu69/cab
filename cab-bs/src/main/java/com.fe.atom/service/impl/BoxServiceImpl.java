package com.fe.atom.service.impl;

import com.fe.atom.domain.Box;
import com.fe.atom.mapper.BoxMapper;
import com.fe.atom.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @classDesc: BoxServiceImpl
 * @Author: Knove
 * @createTime: 2018/5/19 21:30
 * @email: knove@ntjump.cn
 */
@Service
public class BoxServiceImpl implements BoxService {
  @Resource
  private BoxMapper boxMapper;
  @Override
  public List<Box> getBoxes() {
    List<Box> boxes = boxMapper.getBoxes();
    return boxes;
  }

  @Override
  public boolean updateBox(Box box) {
    return boxMapper.updateBox(box);
  }
}
