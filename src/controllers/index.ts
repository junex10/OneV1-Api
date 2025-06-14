// Web

import { AuthModule } from "./web/auth/auth.module";
import { NotificationsModule } from "./web/notifications/notifications.module";
import { ProfileModule } from "./web/profile/profile.module";
import { HomeModule } from "./web/home/home.module";

// App

import { AppAuthModule } from "./app/auth/auth.module";

export {
    AuthModule,
    NotificationsModule,
    ProfileModule,
    HomeModule,

    // App
    AppAuthModule
}