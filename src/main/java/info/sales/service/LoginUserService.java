package info.sales.service;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

import info.sales.entity.LoginUser;

@ApplicationScoped
public class LoginUserService {

    public LoginUser findById(Long id) {
        LoginUser login = LoginUser.findById(id);
        return login;
    }

    public LoginUser findByName(String cd) {
        LoginUser login = LoginUser.findByName("a");
        return login;
    }

    public LoginUser findByloginCdAndPass(String cd, String pass) {
        return LoginUser.findByloginCdAndPass(cd, pass);
    }

    @Transactional
    public void add() {

        LoginUser login = new LoginUser("2", "2", "2", null, null);
        login.persist();

        return;
    }

}
