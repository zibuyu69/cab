package com.fe.atom.mapper;

import com.fe.atom.domain.ChatBox;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ChatBoxMapper {

    List<ChatBox> getChatBox(@Param("id") String id, @Param("type")Integer type);
    boolean insertChatBox(ChatBox chatBox);
    int getChatBoxNumberFromBlog(String id);

}
