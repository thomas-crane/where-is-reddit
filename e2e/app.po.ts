import { browser, by, element } from 'protractor';

export class WhereIsRedditPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('wr-root h1')).getText();
  }
}
