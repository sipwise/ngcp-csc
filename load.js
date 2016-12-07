function initLocalStorage(checkSet) {
    checkSet();
};
initLocalStorage(function() {
    if (!localStorage.getItem('languageSelected')) {
        localStorage.setItem('languageSelected', 'en');
    };
});
