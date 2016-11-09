package com.novoda.dashboards;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

class Preferences {

    private static final String KEY_URL = "KEY.url";

    private final SharedPreferences preferences;
    private final String defaultUrl;

    static Preferences from(Context context) {
        return new Preferences(PreferenceManager.getDefaultSharedPreferences(context),
                context.getString(R.string.default_url));
    }

    Preferences(SharedPreferences preferences, String defaultUrl) {
        this.preferences = preferences;
        this.defaultUrl = defaultUrl;
    }

    String getUrl() {
        return preferences.getString(KEY_URL, defaultUrl);
    }

    void setUrl(String url) {
        preferences.edit().putString(KEY_URL, url).apply();
    }

}
