package com.fe.atom.service;

import com.fe.atom.domain.Recent;
import com.fe.atom.func.webpage.WebPage;

import java.util.List;

public interface RecentService {
    public List<Recent> queryRecent(String queryWord, WebPage webPage);
}
