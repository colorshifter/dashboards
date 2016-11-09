package com.novoda.dashboards;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent data) {
        if (Intent.ACTION_BOOT_COMPLETED.equals(data.getAction())) {
            Intent intent = new Intent(context, DashboardActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        }
    }

}
