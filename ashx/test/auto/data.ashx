<%@ WebHandler Language="C#" Class="data" %>

using System;
using System.Web;

public class data : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string d = @"[538]吴小亮
[1136]吴国明
[1241]吴湘玉琦
[1252]吴启平
[1330]吴晔琼
[1517]吴测试
[1518]吴海跃";
        context.Response.Write(d);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}