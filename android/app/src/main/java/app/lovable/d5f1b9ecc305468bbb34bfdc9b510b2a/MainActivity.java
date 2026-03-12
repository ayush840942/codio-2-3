package web.codezen;

import com.getcapacitor.BridgeActivity;

import androidx.core.splashscreen.SplashScreen;
import android.os.Bundle;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(GoogleAuth.class);
        registerPlugin(InAppReviewPlugin.class);
    }
}
