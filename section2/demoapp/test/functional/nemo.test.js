
describe('@firstTest@', function () {
  it('should load a website', async function () {
    await this.nemo.driver.get(this.nemo.data.baseUrl);
  });

  it('should allow user to login',async function(){
    await this.nemo.view._waitVisible('.myform');
    await this.nemo.view._find('#email').sendKeys('siba@gmail.com');
    await this.nemo.view._find('#password').sendKeys('123456')
    await this.nemo.view._find('#login').click();
    await this.nemo.view._waitVisible('#home');
  });

  it('should allow user to log out',async function(){
    await this.nemo.view._waitVisible('#menu');
    await this.nemo.view._find('#menu').click();
    await this.nemo.view._waitVisible('#logout');
    await this.nemo.view._find('#logout').click();
    await this.nemo.view._waitVisible('.myform');
  });

});
