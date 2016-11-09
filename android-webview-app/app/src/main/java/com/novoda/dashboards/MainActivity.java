package com.novoda.dashboards;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        final Preferences preferences = Preferences.from(MainActivity.this);
        final TextView urlView = (TextView) findViewById(R.id.url);
        urlView.setText(preferences.getUrl());

        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                preferences.setUrl(urlView.getText().toString());
                startActivity(new Intent(MainActivity.this, DashboardActivity.class));
            }

        });
    }

}
