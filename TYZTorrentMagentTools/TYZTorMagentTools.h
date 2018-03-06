//
//  TYZTorMagentTools.h
//  TYZTorrentMagentTools
//
//  Created by Tywin on 2018/3/6.
//  Copyright © 2018年 Tywin. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum : NSUInteger {
    TYZMagentState_START,
    TYZMagentState_STOP
} TYZMagentState;

typedef void(^Handler)(id result);

@interface TYZTorMagentTools : NSObject

+ (void)getTrackers:(Handler)handler;

+ (void)startServer:(Handler)handler;

+ (void)reuqest:(TYZMagentState)state magentLink:(NSString *)magentLink trackers:(NSString *)trackers handler:(Handler)handler;

+ (void)getCurrentState:(Handler)handler;

@end
