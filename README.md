###p2p-udp
=======

一个用node.js写的UDP p2p 程序。基本目标就是能够实现p2p的通信

=======


####使用方法
发送握手包

    向服务端发送握手包
    格式 handShake address port
    例子 handShake 192.168.1.1 8888
    发送成功后会提示handShake success
    
设置监听端口

    设置本地监听的端口
    格式 port portnum
    例子 port 8080
    设置成功后会提示 server listening
    
建立p2p连接

    和其他电脑建立p2p连接
    格式 tunnel targetID
    例子 tunnel u42930roieklffaf
    建立成功后会提示 success
    注意： 一定要知道对方ID才能够建立连接
    
远程执行指令

    让已经建立p2p连接的主机执行特定指令
    格式 remote command
    例子 remote db
    执行后的结果会在本地显示出来
    
查看本地数据库

    格式 db
    执行后显示本地数据库
    
退出程序

    格式 quit
    
