package com.fe.atom.service.impl;

import com.fe.atom.domain.ChatBox;
import com.fe.atom.domain.User;
import com.fe.atom.mapper.ChatBoxMapper;
import com.fe.atom.mapper.UserMapper;
import com.fe.atom.service.ChatBoxService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/20 16:22
 * @email: knove@ntjump.cn
 */
@Service
public class ChatBoxServiceImpl implements ChatBoxService {
    @Resource
    private ChatBoxMapper chatBoxMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    public List<ChatBox> queryChatBox(String id, Integer type) {
        List<ChatBox> list = chatBoxMapper.getChatBox(id, type);
        if (list == null || list.size() == 0) {
            return null;
        }
        // 开始装箱
        List<ChatBox> chatBoxes = new ArrayList<>();
        for (ChatBox chatBox : list) {
            User user = userMapper.getUserById(chatBox.getUser_id());
            ChatBox chatBox1 = new ChatBox();
            chatBox1.setUser_id(chatBox.getUser_id());
            chatBox1.setUser_name(user.getUser_name());
            chatBox1.setTarget_id(chatBox.getTarget_id());
            chatBox1.setChatbox_text(chatBox.getChatbox_text());
            chatBox1.setChatbox_type(chatBox.getChatbox_type());
            chatBox1.setChatbox_date(chatBox.getChatbox_date());
            chatBoxes.add(chatBox1);
        }
        return chatBoxes;
    }

    @Override
    public boolean insertChatBox(ChatBox chatBox, String user_id) {
        // 获取 UUID 唯一标识
        String id = UUID.randomUUID().toString().replace("-", "");
        // 获取当前时间
        Date nowTime = new Date(new java.util.Date().getTime());
        // 装箱
        chatBox.setChatbox_date(nowTime);
        chatBox.setUser_id(user_id);
        return chatBoxMapper.insertChatBox(chatBox);

    }
}
