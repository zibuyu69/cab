package com.fe.atom.controller;

import com.fe.atom.domain.Blog;
import com.fe.atom.domain.ChatBox;
import com.fe.atom.dto.BlogDTO;
import com.fe.atom.dto.UserDTO;
import com.fe.atom.func.response.ResponseCode;
import com.fe.atom.func.response.ServerResponse;
import com.fe.atom.func.webpage.WebPage;
import com.fe.atom.service.BlogService;
import com.fe.atom.service.ChatBoxService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @classDesc:
 * @Author: Knove
 * @createTime: 2018/3/20 16:02
 * @email: knove@ntjump.cn
 */
@RestController
@RequestMapping("/cab")
public class ChatBoxController {
    /**
     * log4j日志工具
     */
    private static final Logger PLOG = LoggerFactory.getLogger(ChatBoxController.class);
    @Autowired
    private ChatBoxService chatBoxService;
    @PostMapping("/insertChatBox")
    public ServerResponse<Boolean> insertChatBox (@RequestBody ChatBox chatBox, HttpSession session) throws Exception {
        PLOG.info("   insertBlog   ————     接收到blog  =>>>>  "+chatBox);
        if(StringUtils.isEmpty(chatBox.getTarget_id())){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(),ResponseCode.NULLPOINT.getDesc());
        }
        UserDTO userDTO = (UserDTO)session.getAttribute("user_name");
        PLOG.info("   insertBlog   ————     根据session 获取当前的用户  =>>>>  "+userDTO);
        if(StringUtils.isEmpty(userDTO)){
            // 登陆过期 必传此
            return ServerResponse.createByErrorCodeMessage(ResponseCode.SESSIONFAILD.getCode(),ResponseCode.SESSIONFAILD.getDesc());
        }
        boolean insertFlag = chatBoxService.insertChatBox(chatBox, userDTO.getUserId());
        return ServerResponse.createBySuccess(insertFlag);
    }
    @PostMapping("/getBlogChatBoxById")
    public ServerResponse<List<ChatBox>> getBlogChatBoxById(@RequestBody ChatBox chatBox) throws Exception {
        String id = chatBox.getTarget_id();
        Integer type = chatBox.getChatbox_type();
        PLOG.info("   getBlogById   ————     接收到id =>>>>  " + id);
        PLOG.info("   getBlogById   ————     接收到type =>>>>  " + type);
        if (StringUtils.isEmpty(id) || StringUtils.isEmpty(type)) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NULLPOINT.getCode(), ResponseCode.NULLPOINT.getDesc());
        }
        List<ChatBox> chatBoxes = null;
        chatBoxes = chatBoxService.queryChatBox(id, type);
        return ServerResponse.createBySuccess(chatBoxes);
    }
}
