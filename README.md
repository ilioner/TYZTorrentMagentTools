> ###### 只需要一个磁力链，就可以发车到全宇宙。--- 某司机。

###1. 安装
	
	clone工程并拖入目标工程即可
	
###2. 依赖项

* 由于用到nodejs所以务必在开发环境设置好nodejs开发环境
* 确保添加了如下依赖库

```
		CoreFoundation.framework
		libstdc++.6.0.9.tdb
		libchrome_zlib.a
		libsqlite3.a
		libleveldb.a
		libleveldown.a
		libhttp_parser.a
		libcare.a
		libjx.a
		libopenssl.a
		libsnappy.a
		libuv.a
		libmozjs.a
```
	
	
* 在TYZTorrentMagentTools/jscode目录下执行npm install安装node依赖。


###3. 开始发车

* 引入头文件

		#import "TYZTorMagentTools.h"

	
* 为了能够尽可能更多的搜索到节点，建议开始任务前同步下节点服务器（当然不同步也没关系）

		//同步trackslist地址
	    [TYZTorMagentTools getTrackers:^(id result) {
	        NSLog(@"===》%@",result);
	    }];

* 开启本地服务器也是为了进行P2P的文件片段交换。

		[TYZTorMagentTools startServer:^(id result) {
	        if ([result isKindOfClass:[NSString class]]) {
	         // 开启成功
	         NSLog(@"==========Started=========");
	        }else{
	         // 开启失败
	         NSLog(@"==========>%@",result);
	        }
	    }];


* 添加需要解析的磁力链接并开启下载

```
		
NSString *trackersList = (NSString *)[[NSUserDefaults standardUserDefaults]objectForKey:@"trackersList"];

[TYZTorMagentTools reuqest:TYZMagentState_START
		                            
		         magentLink:@"magnet:?xt=urn:btih:80B5153880E732FACD945CDA72D3BEF2349D415F&dn=W%e8%8a%b1%e6%a0%b7%e5%a5%b3%e7%8e%8b.I.Tonya.2017.BD720P.AAC.x264.English.CHS-ENG.BTDX8"
		           trackers:trackersList
		            handler:^(id result) {
		   NSLog(@"====》%@",result);
}];
```

* 获取播放地址，下载速度，下载进度

```
//哪里需要，加在哪里
[TYZTorMagentTools getCurrentState:^(id result) {
        NSLog(@"==》%@",result);
}];
```

###4. 关于播放

还是觉得VLC好用，获取播放地址后，使用VLC来播放目标地址视频绝对可行（除非下载的不是视频）。

###5. TODO

资源搜索引擎在封装中


