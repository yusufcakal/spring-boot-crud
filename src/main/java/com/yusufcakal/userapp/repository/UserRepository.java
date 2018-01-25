package com.yusufcakal.userapp.repository;

import com.yusufcakal.userapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
