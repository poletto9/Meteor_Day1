App.info({
    id: 'com.hospital.person',
    name: 'บุคลากร',
    version: '0.0.1'
});

App.icons({
    'android_mdpi': 'icon/icon.png',
    'android_hdpi': 'icon/icon.png',
    'android_xhdpi': 'icon/icon.png',
    'android_xxhdpi': 'icon/icon.png',
    'android_xxxhdpi': 'icon/icon.png'
});

// App.launchScreens({
//     android_mdpi_portrait: 'icon/SplashScreen.PNG',
//     android_mdpi_landscape: 'icon/SplashScreen.PNG',
//     android_hdpi_portrait: 'icon/SplashScreen.PNG',
//     android_hdpi_landscape: 'icon/SplashScreen.PNG',
//     android_xhdpi_portrait: 'icon/SplashScreen.PNG',
//     android_xhdpi_landscape: 'icon/SplashScreen.PNG',
//     android_xxhdpi_portrait: 'icon/SplashScreen.PNG',
//     android_xxhdpi_landscape: 'icon/SplashScreen.PNG',
//     android_xxxhdpi_portrait: 'icon/SplashScreen.PNG',
//     android_xxxhdpi_landscape: 'icon/SplashScreen.PNG'
// })

App.setPreference('Orientation', 'portrait');
// App.setPreference('SplashScreen','none');
App.accessRule('http://*', { type: 'navigation' });
App.accessRule('https://*', { type: 'navigation' });