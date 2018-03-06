//
//  TYZTorMagentTools.m
//  TYZTorrentMagentTools
//
//  Created by Tywin on 2018/3/6.
//  Copyright © 2018年 Tywin. All rights reserved.
//

#import "TYZTorMagentTools.h"
#import "JXcore.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "NetHelper.h"
@implementation TYZTorMagentTools

+ (void)getTrackers:(Handler)handler
{
    NSURL *url = [NSURL URLWithString:@"https://newtrackon.com/api/live"];
    NSData *data = [NSData dataWithContentsOfURL:url];
    NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    [[NSUserDefaults standardUserDefaults] setObject:string forKey:@"trackersList"];
    handler(string);
}

+ (void)startServer:(Handler)handler
{
    // Do any additional setup after loading the view, typically from a nib.
    // makes JXcore instance running under it's own thread
    [JXcore useSubThreading];
    
    // start engine (main file will be JS/main.js. This is the initializer file)
    [JXcore startEngine:@"jscode/main"];
    
    NSArray *params = [NSArray arrayWithObjects:@"./js/app.js", nil];
    [JXcore callEventCallback:@"StartApplication" withParams:params];
    
    // Define ScreenBrightness method to JS side so we can call it from there (see app.js)
    [JXcore addNativeBlock:^(NSArray *params, NSString *callbackId) {
        handler(@"Server start");
    } withName:@"serveron"];
    
    NSString *path = NSTemporaryDirectory();
    NSLog(@"====>path %@",path);
    [JXcore callEventCallback:@"SetTemp" withParams:@[path]];
    [JXcore callEventCallback:@"SetHost" withParams:@[[NetHelper getWifiAddress]]];
    
    // Listen to Errors on the JS land
    [JXcore addNativeBlock:^(NSArray *params, NSString *callbackId) {
        NSString *errorMessage = (NSString*)[params objectAtIndex:0];
        NSString *errorStack = (NSString*)[params objectAtIndex:1];
        
        NSLog(@"Error!: %@\nStack:%@\n", errorMessage, errorStack);
        handler(@{@"errorMessage":errorMessage,@"errorStack":errorStack});
    } withName:@"OnError"];
}

+ (void)reuqest:(TYZMagentState)state magentLink:(NSString *)magentLink trackers:(NSString *)trackers handler:(Handler)handler
{
    NSString *requestUrl = nil;
    if (state == TYZMagentState_START) {
        requestUrl = @"http://127.0.0.1:9870/torrent/play";
    }else{
        requestUrl = @"http://127.0.0.1:9870/torrent/stop";
    }
    
    NSString *urlString = [NSString stringWithFormat:@"%@?url=%@",requestUrl,magentLink];
    if (trackers) {
        urlString = [NSString stringWithFormat:@"%@&trackersList=%@",urlString,trackers];
    }
    
   urlString = [urlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    NSURL *url = [NSURL URLWithString:urlString];
    
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    
    NSURLSession *session = [NSURLSession sharedSession];

    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        
        if (error == nil) {
            NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
            
            NSLog(@"%@",dict);
            handler(dict);
        }else{
            handler(nil);
        }
    }];
    [dataTask resume];
}

+ (void)getCurrentState:(Handler)handler
{
    [JXcore addNativeBlock:^(NSArray *params, NSString *callbackId) {
        if (params.count>0) {
            handler(params[0]);
        }else{
            handler(nil);
        }
    } withName:@"UpdateTorrentState"];
}
@end
