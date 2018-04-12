package com.fe.atom.func.webpage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fe.atom.func.json.ParamJsonObject;

import java.io.IOException;
import java.util.Map;

/**
 * @classDesc: WebPage
 * @Author: Knove
 * @createTime: 2018/2/19 18:55
 * @email: knove@ntjump.cn
 */
public class WebPage {
    private static final String PAGENO = "pageNum";
    private static final String ROWCOUNT = "pageSize";
    private static final String ORDERBY = "orderby";
    /**
     * 页码
     */
    private int pageno;
    /**
     * 每页显示行数
     */
    private int rowcount;
    /**
     * 总记录数
     */
    private int total;
    /**
     * 排序 eg. orderby={username:1,score:-1}
     */
    private Map<String,Integer> orderby;

    public WebPage(int pageno, int rowcount) {
        if(pageno == 0) this.pageno = 1;
         else this.pageno = pageno;
        if(rowcount == 0) this.rowcount = 10;
        else this.rowcount = rowcount;

    }
    public WebPage(ParamJsonObject<Object> page) throws IOException {
        if(page==null||page.getParams()==null){
            this.pageno = 1;
            this.rowcount = 10;
        }else {
            if (page.getParams().containsKey(PAGENO)) {
                System.out.println(page.getParams().get(PAGENO));
                this.pageno =  Integer.valueOf(page.getParams().get(PAGENO).toString());
            } else {
                this.pageno = 1;
            }
            if (page.getParams().containsKey(ROWCOUNT)) {
                this.rowcount = Integer.valueOf(page.getParams().get(ROWCOUNT).toString());
            } else {
                this.rowcount = 10;
            }
            if (page.getParams().containsKey(ORDERBY)) {
                // Jackson String -> Map
                ObjectMapper mapper = new ObjectMapper();
                this.orderby = mapper.readValue(page.getParams().get(ORDERBY).toString(), Map.class);
            }
        }
    }
    public WebPage() {
    }

    @Override
    public String toString() {
        return "pageno:"+pageno+",rowcount:"+rowcount;
    }

    public int getPageno() {
        return pageno;
    }

    public void setPageno(int pageno) {
        this.pageno = pageno;
    }

    public int getRowcount() {
        return rowcount;
    }

    public void setRowcount(int rowcount) {
        this.rowcount = rowcount;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public Map<String, Integer> getOrderby() {
        return orderby;
    }

    public void setOrderby(Map<String, Integer> orderby) {
        this.orderby = orderby;
    }

}
