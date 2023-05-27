package info.sales.service;

import javax.enterprise.context.ApplicationScoped;
import info.sales.entity.LoginUser;

@ApplicationScoped
public class LoginUserService {

    /**
     * 
     * @param cd   ログインID
     * @param pass パスワード
     * @return ログイン情報
     */
    public LoginUser findByloginCdAndPass(String cd, String pass) {
        return LoginUser.findByloginCdAndPass(cd, pass);
    }

}
