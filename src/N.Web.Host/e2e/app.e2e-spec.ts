import { NTemplatePage } from './app.po';

describe('N App', function() {
  let page: NTemplatePage;

  beforeEach(() => {
    page = new NTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
