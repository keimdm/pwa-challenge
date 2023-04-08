const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// added event handler for beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
    console.log("before install");
  });

// added event handler for install button
butInstall.addEventListener('click', async () => {
    console.log("click");
    const promptEvent = window.deferredPrompt;
    
    if (!promptEvent) {
        console.log("returned");
        return;
    }
    
    promptEvent.prompt();
    
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// added event handler for appinstalled event
window.addEventListener('appinstalled', (event) => {
    event.preventDefault();
    console.log("app installed");
    window.deferredPrompt = null;
}); 
