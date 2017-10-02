import { WhereIsRedditPage } from './app.po';

describe('where-is-reddit App', () => {
  let page: WhereIsRedditPage;

  beforeEach(() => {
    page = new WhereIsRedditPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to wr!!');
  });
});
