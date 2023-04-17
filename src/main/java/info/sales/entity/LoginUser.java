package info.sales.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.NamedQueries;
import org.hibernate.annotations.NamedQuery;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "login_user")
@NamedQueries({
        @NamedQuery(name = "LoginUser.getByName", query = "from LoginUser where login_cd = ?1")
})
public class LoginUser extends PanacheEntityBase {

    @Id
    @SequenceGenerator(name = "login_user_id_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "login_cd")
    public String loginCd;
    @Column(name = "full_name")
    public String fullName;
    @Column
    public String password;
    @Column
    public String salt;
    @Column(name = "created_at")
    public Date createdAt;

    public LoginUser() {
    }

    public LoginUser(String loginCd, String fullName, String password, String salt, Date createdAt) {
        this.loginCd = loginCd;
        this.fullName = fullName;
        this.password = password;
        this.salt = salt;
        this.createdAt = createdAt;
    }

    public static LoginUser findByName(String name) {
        return find("full_name", name).firstResult();

    }

    public static LoginUser findByloginCdAndPass(String loginCd, String pass) {

        return find("login_cd = ?1 and password =?2 ", loginCd, pass).firstResult();

    }

}