/**
 * Html 控制樣式模組
 */

class HtmlControl {

  // 切換專注模式，專注模式下無法 Scroll
  bodyFocusMode(status = true) {
    if (status)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'initial';
  }
}

export default new HtmlControl;
