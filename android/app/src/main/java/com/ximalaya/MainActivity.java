package com.ximalaya;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate; // 手势库
import com.facebook.react.ReactRootView; // 手势库
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; // 手势库

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ximalaya";
  }

  // 手势库
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
