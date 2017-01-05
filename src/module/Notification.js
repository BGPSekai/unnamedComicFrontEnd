export default new class {
  constructor() {
    
  }

  init() {
    // request permission on page load
    document.addEventListener('DOMContentLoaded', function () {
      if (Notification.permission !== 'granted')
        Notification.requestPermission();
    });
  }

  notifyMe() {
    if (!Notification) {
      return false;
    }

    if (Notification.permission !== 'granted')
      Notification.requestPermission().then((data) => { console.log(data); });
    else {
      let notification = new Notification('Notification title', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: 'Hey there! You\'ve been notified!',
      });

      notification.onclick = function () {
        window.open('http://stackoverflow.com/a/13328397/1269037');      
      };
      
    }
  }
}
