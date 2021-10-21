package com.vaxune;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.wonday.live.RNLiveStreamPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oney.WebRTCModule.WebRTCModulePackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.viromedia.bridge.ReactViroPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SafeAreaContextPackage(),
            new RNGestureHandlerPackage(),
            new ExtraDimensionsPackage(),
          new AsyncStoragePackage(),
          new InCallManagerPackage(),
          new LinearGradientPackage(),
          new RNLiveStreamPackage(),
          new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM)),
          new WebRTCModulePackage(),
          new KCKeepAwakePackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
