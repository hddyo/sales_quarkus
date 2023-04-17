package info.sales.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "hoge")
public class Hoge extends PanacheEntityBase {

    @Id
    @SequenceGenerator(name = "hoge_id_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    public String name;

    public Hoge() {

    }

    public Hoge(String name) {
        this.name = name;
    }

}