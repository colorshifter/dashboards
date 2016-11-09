package com.novoda.dashboards;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class DashboardActivity extends AppCompatActivity {

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setContentView(R.layout.dashboard);

        WebView webView = (WebView) findViewById(R.id.webview);
        webView.loadUrl(Preferences.from(this).getUrl());
        webView.getSettings().setUseWideViewPort(true);
        webView.setInitialScale(1);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
    }

}
