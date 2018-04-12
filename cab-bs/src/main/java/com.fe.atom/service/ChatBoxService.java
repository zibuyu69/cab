package com.fe.atom.service;

import com.fe.atom.domain.Blog;
import com.fe.atom.domain.ChatBox;
import com.fe.atom.func.webpage.WebPage;

import java.util.List;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/4/11 11:53
 * @email: knove@ntjump.cn
 */
public interface ChatBoxService {
    public List<ChatBox> queryChatBox(String id, Integer type);
    public boolean insertChatBox (ChatBox chatBox, String user_id);
}

