document.getElementById('theme_button').onclick = function () {
    var url = window.location.protocol + "//" + window.location.host + "/";
    if (document.getElementById('theme_css').href == url + "css/light.css") {
        document.getElementById('theme_css').href = url + "css/dark.css";
        if (window.localStorage) {
            localStorage['theme'] = 'dark';
        }
    }
    else {
        document.getElementById('theme_css').href = url + "css/light.css";
        if (window.localStorage) {
            localStorage['theme'] = 'light';
        }
    }
};

function loadTheme() {
    var url = window.location.protocol + "//" + window.location.host + "/";
    if (window.localStorage) {
        const maybeTheme = localStorage['theme']
        if (maybeTheme) {
            if (maybeTheme == 'dark') {
                document.getElementById('theme_css').href = url + "css/dark.css";
            }
            else {
                document.getElementById('theme_css').href = url + "css/light.css";
            }
        }
        else {
            document.getElementById('theme_css').href = url + "css/dark.css";
        }
    }
}