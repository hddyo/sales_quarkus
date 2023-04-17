package info.sales.service;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

import info.sales.entity.Hoge;

@ApplicationScoped
public class HogeService {

    public void get() {
        Hoge user = Hoge.findById(1L);
        String str = user.name;
        System.out.println(str);

        return;
    }

    @Transactional
    public void add() {

        Hoge user = new Hoge("2");
        user.persist();

        return;
    }

}
