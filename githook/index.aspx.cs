using System;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

using System.Diagnostics;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public partial class test_index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string res = "";

        try
        {
            String jsonData = new StreamReader(Request.InputStream).ReadToEnd();

            if (!string.IsNullOrEmpty(jsonData))
            {
                LogHelper.Info("信息：" + jsonData);

                JObject jd = JObject.Parse(jsonData);
                string myref = jd["ref"].ToString();
                List<string> added = (List<string>)jd["added"].ToObject(typeof(List<string>));
                List<string> modified = (List<string>)jd["modified"].ToObject(typeof(List<string>));
                List<string> removed = (List<string>)jd["removed"].ToObject(typeof(List<string>));

                string date = DateTime.Now.ToString();

                try
                {

                    //执行构建

                    //判断dev分支
                    if (myref.ToLower().Contains("refs/heads/dev"))
                    {
                        Process prc = new Process();
                        prc.StartInfo.FileName = "cmd.exe";
                        prc.StartInfo.UseShellExecute = false;
                        prc.StartInfo.RedirectStandardInput = true;
                        prc.StartInfo.RedirectStandardOutput = true;
                        prc.StartInfo.RedirectStandardError = true;
                        prc.StartInfo.CreateNoWindow = true;//是否显示DOS窗口
                        prc.Start();
                        prc.StandardInput.WriteLine("cd /d D:\\projects\\uzaistatics");
                        prc.StandardInput.WriteLine("grunt init");
                        prc.StandardInput.Close();
                        Response.Write(prc.StandardOutput.ReadToEnd());

                        string mailFrom = "info@ministars.cn";
                        List<string> mailToList = new List<string>();
                        string smtpServer = "smtp.mxhichina.com";
                        mailToList.Add("123456@qq.com");
                        string bod = "";
                        bod += "REF：" + (Newtonsoft.Json.JsonConvert.SerializeObject(myref)) + "\r\n<br>";
                        bod += "<HR>";
                        bod += "ADD：" + (Newtonsoft.Json.JsonConvert.SerializeObject(added)) + "\r\n<br>";
                        bod += "<HR>";
                        bod += "MODIFY：" + (Newtonsoft.Json.JsonConvert.SerializeObject(modified)) + "\r\n<br>";
                        bod += "<HR>";
                        bod += "REMOVE：" + (Newtonsoft.Json.JsonConvert.SerializeObject(removed)) + "\r\n<br>";
                        bod += "<HR>";
                        bod += @"<p style='text-align:right'>" + date + "</p>";
                        Common.MultiSendEmail(smtpServer, mailFrom, "123456", mailToList, null, null, "标题", bod, null, true);

                        res = "{status:\"1\",msg:\"静态资源构建成功!\"}";

                    }

                }

                catch (Exception)
                {
                    res = "{status:\"0\",msg:\"邮件发送失败!\"}";
                    throw;
                }
            }
            else
            {
                res = "{status:\"0\",msg:\"http get request!\"}";
            }
        }
        catch (Exception)
        {
            res = "{status:\"0\",msg:\"get hook data error!\"}";
            throw;
        }

        Response.Write(res);
    }
}